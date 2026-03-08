import os
import re
import json
import time
import requests
from bs4 import BeautifulSoup
from markdownify import markdownify as md
from slugify import slugify
from tqdm import tqdm
from urllib.parse import urljoin, urlparse
from datetime import datetime

ARCHIVE_INDEX = "https://web.archive.org/web/20140206221944/http://nathanpitman.com/archives/"
WAYBACK_CDX_API = "https://web.archive.org/cdx/search/cdx"

POSTS_DIR = "import/posts"
IMAGES_DIR = "import/images"
POSTS_JSON = "import/posts.json"

SESSION = requests.Session()
SESSION.headers.update({
    "User-Agent": "Mozilla/5.0 (compatible; BlogRecoveryBot/1.0)"
})

REQUEST_DELAY = 1.0


def ensure_dirs():
    os.makedirs(POSTS_DIR, exist_ok=True)
    os.makedirs(IMAGES_DIR, exist_ok=True)


def fetch_url(url, retries=3):
    for attempt in range(retries):
        try:
            resp = SESSION.get(url, timeout=30)
            if resp.status_code == 200:
                return resp
            if resp.status_code == 404:
                return None
            print(f"  HTTP {resp.status_code} for {url}, retrying...")
        except requests.RequestException as e:
            print(f"  Request error: {e}, retrying...")
        time.sleep(2 * (attempt + 1))
    return None


def build_snapshot_map():
    print("  Fetching complete Wayback CDX index for nathanpitman.com...")
    snapshot_map = {}

    for attempt in range(3):
        try:
            resp = SESSION.get(
                WAYBACK_CDX_API,
                params={
                    "url": "nathanpitman.com",
                    "output": "text",
                    "fl": "timestamp,original,statuscode",
                    "filter": "statuscode:200",
                    "matchType": "host",
                    "collapse": "urlkey",
                },
                timeout=120,
            )
            if resp.status_code == 200 and resp.text.strip():
                for line in resp.text.strip().split("\n"):
                    parts = line.split(" ", 2)
                    if len(parts) >= 2:
                        timestamp = parts[0]
                        original = parts[1]
                        path = urlparse(original).path.rstrip("/")
                        if path:
                            norm = normalize_path(path)
                            if norm not in snapshot_map:
                                snapshot_map[norm] = {
                                    "timestamp": timestamp,
                                    "original": original,
                                }
                print(f"  Found {len(snapshot_map)} archived paths")
                return snapshot_map
        except Exception as e:
            print(f"  CDX API attempt {attempt + 1} failed: {e}")
            time.sleep(5)

    print("  WARNING: Could not fetch CDX index, will use direct URLs")
    return snapshot_map


def normalize_path(path):
    path = path.rstrip("/").lower()
    path = re.sub(r":80", "", path)
    return path


def find_snapshot_url(post_url, snapshot_map):
    parsed = urlparse(post_url)
    path = normalize_path(parsed.path)

    if path in snapshot_map:
        entry = snapshot_map[path]
        return f"https://web.archive.org/web/{entry['timestamp']}/{entry['original']}"

    return f"https://web.archive.org/web/2014/{post_url}"


def extract_post_links(html):
    soup = BeautifulSoup(html, "html.parser")
    links = []
    seen = set()

    entry_lists = soup.find_all("div", class_="entrylist")
    if not entry_lists:
        entry_lists = [soup]

    for container in entry_lists:
        for a in container.find_all("a", href=True):
            href = a["href"]

            wayback_match = re.match(
                r"(?:https?://web\.archive\.org)?/web/\d+/(http[s]?://nathanpitman\.com/.+)",
                href,
            )
            if wayback_match:
                clean_url = wayback_match.group(1)
            elif href.startswith("http") and "nathanpitman.com" in href and "web.archive.org" not in href:
                clean_url = href
            else:
                continue

            clean_url = clean_url.rstrip("/")
            parsed = urlparse(clean_url)
            path = parsed.path.rstrip("/")

            if not path or path in ("/", "/archives"):
                continue

            skip_patterns = [
                "/category/", "/tag/", "/page/", "/author/",
                "/wp-content/", "/wp-admin/", "/feed",
                "/archives", "/about", "/contact",
            ]
            if any(pat in path.lower() for pat in skip_patterns):
                continue

            path_parts = [p for p in path.split("/") if p]
            if len(path_parts) < 2:
                continue

            if clean_url not in seen:
                seen.add(clean_url)
                links.append(clean_url)

    return links


def extract_date_from_post(soup, url, archive_url=""):
    posted_span = soup.find("span", class_="posted")
    if posted_span:
        text = posted_span.get_text(strip=True)
        parsed = parse_blog_date(text)
        if parsed:
            return parsed

    date_selectors = [
        {"class_": re.compile(r"date|time|posted|published|entry-date", re.I)},
    ]
    for selector in date_selectors:
        el = soup.find(["time", "span", "div", "p", "abbr"], selector)
        if el:
            datetime_attr = el.get("datetime") or el.get("title")
            if datetime_attr:
                parsed = try_parse_date(datetime_attr)
                if parsed:
                    return parsed
            text = el.get_text(strip=True)
            parsed = try_parse_date(text)
            if parsed:
                return parsed

    time_el = soup.find("time")
    if time_el:
        datetime_attr = time_el.get("datetime")
        if datetime_attr:
            parsed = try_parse_date(datetime_attr)
            if parsed:
                return parsed

    ts_match = re.search(r"/web/(\d{4})(\d{2})(\d{2})", archive_url)
    if ts_match:
        return f"{ts_match.group(1)}-{ts_match.group(2)}-{ts_match.group(3)}"

    return "2014-01-01"


def parse_blog_date(text):
    text = text.strip()
    match = re.match(r"(\w+)\s+(\d{1,2})\.?\s+(\d{2,4})", text)
    if match:
        month_str = match.group(1)
        day = match.group(2)
        year_str = match.group(3)
        if len(year_str) == 2:
            year = int(year_str)
            year = year + 2000 if year < 50 else year + 1900
        else:
            year = int(year_str)
        try:
            month = datetime.strptime(month_str, "%b").month
        except ValueError:
            try:
                month = datetime.strptime(month_str, "%B").month
            except ValueError:
                return None
        return f"{year:04d}-{month:02d}-{int(day):02d}"
    return try_parse_date(text)


def try_parse_date(text):
    if not text:
        return None
    text = text.strip()
    formats = [
        "%Y-%m-%dT%H:%M:%S%z",
        "%Y-%m-%dT%H:%M:%S",
        "%Y-%m-%d",
        "%B %d, %Y",
        "%B %d %Y",
        "%b %d, %Y",
        "%b %d %Y",
        "%d %B %Y",
        "%d %b %Y",
        "%m/%d/%Y",
        "%d/%m/%Y",
    ]
    for fmt in formats:
        try:
            dt = datetime.strptime(text, fmt)
            return dt.strftime("%Y-%m-%d")
        except ValueError:
            continue
    return None


def extract_post_content(soup):
    entry_div = soup.find("div", class_="entry")
    if entry_div:
        for h2 in entry_div.find_all("h2", class_="title"):
            h2.decompose()
        for tag in entry_div.find_all(["script", "style", "form"]):
            tag.decompose()
        for tag in entry_div.find_all(class_=re.compile(r"comment|share|social|related|sidebar|nav", re.I)):
            tag.decompose()
        comments_header = entry_div.find("h3", string=re.compile(r"comment|speak your mind", re.I))
        if comments_header:
            for sibling in list(comments_header.find_next_siblings()):
                sibling.decompose()
            comments_header.decompose()
        for div in entry_div.find_all("div", class_="posted"):
            div.decompose()
        return str(entry_div)

    content_selectors = [
        {"class_": re.compile(r"entry-content|post-content|article-content|post-body", re.I)},
        {"id": re.compile(r"^content$|^post$|^article$|^entry$", re.I)},
    ]

    content_el = None
    for selector in content_selectors:
        content_el = soup.find(["div", "article", "section"], selector)
        if content_el:
            break

    if not content_el:
        content_el = soup.find("article")
    if not content_el:
        main = soup.find("main")
        if main:
            content_el = main

    if not content_el:
        return ""

    for tag in content_el.find_all(["nav", "footer", "aside", "script", "style", "form"]):
        tag.decompose()
    for tag in content_el.find_all(
        class_=re.compile(r"comment|share|social|related|sidebar|nav", re.I)
    ):
        tag.decompose()

    return str(content_el)


def extract_title(soup):
    soup_copy = BeautifulSoup(str(soup), "html.parser")

    h2_title = soup_copy.find("h2", class_="title")
    if h2_title:
        for span in h2_title.find_all("span"):
            span.decompose()
        for nobr in h2_title.find_all("nobr"):
            nobr.decompose()
        title_text = h2_title.get_text(strip=True)
        title_text = re.sub(r"\s+", " ", title_text).strip()
        title_text = re.sub(r"\s*\xa0\s*", " ", title_text).strip()
        if title_text:
            return title_text

    entry_div = soup_copy.find("div", class_="entry")
    if entry_div:
        h2_in_entry = entry_div.find("h2")
        if h2_in_entry:
            for span in h2_in_entry.find_all("span"):
                span.decompose()
            for nobr in h2_in_entry.find_all("nobr"):
                nobr.decompose()
            text = h2_in_entry.get_text(strip=True)
            text = re.sub(r"\s+", " ", text).strip()
            if text:
                return text

    title_selectors = [
        {"class_": re.compile(r"entry-title|post-title|article-title", re.I)},
    ]
    for selector in title_selectors:
        el = soup_copy.find(["h1", "h2"], selector)
        if el:
            return el.get_text(strip=True)

    title = soup_copy.find("title")
    if title:
        text = title.get_text(strip=True)
        text = re.split(r"\s*[|–—]\s*", text)[0].strip()
        if text and text.lower() not in ("journal", "home"):
            return text

    return "Untitled"


IMAGE_SIGNATURES = {
    b"\xff\xd8\xff": "jpg",
    b"\x89PNG": "png",
    b"GIF87a": "gif",
    b"GIF89a": "gif",
    b"RIFF": "webp",
    b"<svg": "svg",
}


def is_valid_image(content):
    if not content or len(content) < 8:
        return False
    for sig in IMAGE_SIGNATURES:
        if content[:len(sig)] == sig:
            return True
    return False


def normalize_wayback_image_url(img_url):
    match = re.match(r"(https?://web\.archive\.org/web/)(\d+)([a-z_]*)/(.+)", img_url)
    if match:
        return f"{match.group(1)}{match.group(2)}im_/{match.group(4)}"
    return img_url


def download_image(img_url, post_slug):
    try:
        clean_url = img_url
        wayback_match = re.match(r"https?://web\.archive\.org/web/\d+[a-z_]*/(.+)", img_url)
        if wayback_match:
            clean_url = wayback_match.group(1)

        parsed = urlparse(clean_url)
        filename = os.path.basename(parsed.path)
        if not filename or "." not in filename:
            filename = f"{post_slug}-image-{hash(img_url) % 10000}.jpg"

        filename = re.sub(r"[^\w\-.]", "_", filename)
        local_path = os.path.join(IMAGES_DIR, filename)

        if os.path.exists(local_path):
            with open(local_path, "rb") as f:
                existing = f.read(16)
            if is_valid_image(existing):
                return filename
            os.remove(local_path)

        raw_url = normalize_wayback_image_url(img_url)

        resp = fetch_url(raw_url)
        if resp and resp.content:
            content_type = resp.headers.get("Content-Type", "")
            if is_valid_image(resp.content) or "image/" in content_type:
                with open(local_path, "wb") as f:
                    f.write(resp.content)
                time.sleep(0.5)
                return filename

        if raw_url != img_url:
            resp = fetch_url(img_url)
            if resp and resp.content and is_valid_image(resp.content):
                with open(local_path, "wb") as f:
                    f.write(resp.content)
                time.sleep(0.5)
                return filename
    except Exception as e:
        print(f"  Failed to download image {img_url}: {e}")
    return None


def process_images(content_html, post_slug, archive_url):
    soup = BeautifulSoup(content_html, "html.parser")
    images_downloaded = []

    for img in soup.find_all("img"):
        src = img.get("src", "")
        if not src:
            continue

        skip_patterns = [
            "gravatar", "avatar", "emoji", "smilies",
            "wp-includes", "pixel", "tracking", "badge",
        ]
        if any(p in src.lower() for p in skip_patterns):
            continue

        if src.startswith("/web/"):
            img_url = "https://web.archive.org" + src
        elif src.startswith("http"):
            img_url = src
        else:
            img_url = urljoin(archive_url, src)

        local_filename = download_image(img_url, post_slug)
        if local_filename:
            img["src"] = f"../images/{local_filename}"
            images_downloaded.append(local_filename)

    return str(soup), images_downloaded


def html_to_markdown(html_content):
    markdown = md(
        html_content,
        heading_style="ATX",
        bullets="-",
        strip=["script", "style"],
    )
    markdown = re.sub(r"\n{3,}", "\n\n", markdown)
    markdown = markdown.strip()
    return markdown


def create_frontmatter(title, date, source_url, archive_url):
    title_escaped = title.replace('"', '\\"')
    return f"""---
title: "{title_escaped}"
date: {date}
source: "{source_url}"
archive: "{archive_url}"
---"""


def process_post(post_url, archive_url, used_filenames):
    resp = fetch_url(archive_url)

    if resp and ("has not archived that URL" in resp.text or "Hrm." in resp.text):
        resp = None

    if not resp:
        return None

    soup = BeautifulSoup(resp.text, "html.parser")

    title = extract_title(soup)
    date = extract_date_from_post(soup, post_url, archive_url)
    content_html = extract_post_content(soup)

    if not content_html or len(content_html.strip()) < 50:
        return None

    path_parts = [p for p in urlparse(post_url).path.split("/") if p]
    url_slug = path_parts[-1] if path_parts else ""

    post_slug = slugify(title, max_length=60)
    if not post_slug or post_slug in ("untitled", "journal"):
        post_slug = slugify(url_slug) if url_slug else "untitled"

    filename = f"{date}-{post_slug}.md"
    if filename in used_filenames:
        url_suffix = slugify(url_slug, max_length=30) if url_slug else str(len(used_filenames))
        filename = f"{date}-{post_slug}-{url_suffix}.md"
    used_filenames.add(filename)

    filepath = os.path.join(POSTS_DIR, filename)

    content_html, images = process_images(content_html, post_slug, archive_url)
    markdown_content = html_to_markdown(content_html)
    frontmatter = create_frontmatter(title, date, post_url, archive_url)

    full_content = f"{frontmatter}\n\n{markdown_content}\n"

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(full_content)

    return {
        "title": title,
        "date": date,
        "slug": post_slug,
        "source": post_url,
        "archive": archive_url,
        "filename": filename,
        "images": images,
    }


def main():
    print("=" * 60)
    print("Blog Recovery from Internet Archive")
    print("=" * 60)

    ensure_dirs()

    print("\n[1/5] Fetching archive index page...")
    resp = fetch_url(ARCHIVE_INDEX)
    if not resp:
        print("ERROR: Could not fetch the archive index page.")
        return

    print("[2/5] Extracting blog post links...")
    post_urls = extract_post_links(resp.text)
    print(f"  Found {len(post_urls)} blog post links")

    if not post_urls:
        print("ERROR: No blog post links found.")
        return

    print("\n[3/5] Building Wayback Machine snapshot map...")
    snapshot_map = build_snapshot_map()

    print(f"\n[4/5] Processing {len(post_urls)} posts...")
    print("  (Fetching archived content for each post)\n")
    all_posts = []
    errors = []
    skipped = 0
    used_filenames = set()

    for post_url in tqdm(post_urls, desc="Recovering posts"):
        archive_url = find_snapshot_url(post_url, snapshot_map)

        try:
            result = process_post(post_url, archive_url, used_filenames)
            if result:
                all_posts.append(result)
                tqdm.write(f"  ✓ {result['title']}")
            else:
                skipped += 1
                tqdm.write(f"  - Skipped: {post_url}")
        except Exception as e:
            errors.append({"url": post_url, "reason": str(e)})
            tqdm.write(f"  ✗ Error: {post_url}: {e}")

        time.sleep(REQUEST_DELAY)

    print(f"\n[5/5] Saving metadata to {POSTS_JSON}...")
    all_posts.sort(key=lambda p: p["date"])
    metadata = {
        "generated": datetime.now().isoformat(),
        "total_posts": len(all_posts),
        "total_skipped": skipped,
        "total_errors": len(errors),
        "posts": all_posts,
        "errors": errors,
    }
    with open(POSTS_JSON, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2, ensure_ascii=False)

    print("\n" + "=" * 60)
    print("Recovery Complete!")
    print("=" * 60)
    print(f"  Posts recovered: {len(all_posts)}")
    print(f"  Posts skipped:   {skipped}")
    print(f"  Posts failed:    {len(errors)}")
    total_images = sum(len(p["images"]) for p in all_posts)
    print(f"  Images saved:    {total_images}")
    print(f"\n  Posts directory:  {POSTS_DIR}/")
    print(f"  Images directory: {IMAGES_DIR}/")
    print(f"  Metadata file:   {POSTS_JSON}")

    if errors:
        print(f"\n  Failed URLs ({len(errors)}):")
        for err in errors[:10]:
            print(f"    - {err['url']}: {err['reason']}")
        if len(errors) > 10:
            print(f"    ... and {len(errors) - 10} more (see {POSTS_JSON})")


if __name__ == "__main__":
    main()
