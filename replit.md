# Nathan Pitman — Personal Blog (Astro)

## Overview
A static personal blog built with Astro, containing 430 recovered blog posts (2002–2013) from nathanpitman.com. Designed for deployment to GitHub Pages.

## Architecture
- **Framework**: Astro 4 (static output)
- **Content**: Astro Content Collections with glob loader
- **Styling**: Custom CSS with Google Fonts (Lora + Source Sans 3)
- **Feeds**: RSS (`/feed.xml`) and JSON Feed (`/feed.json`)

## Project Structure
```
src/
  content/
    posts/          — 430 Markdown blog posts with YAML frontmatter
    pages/          — Static pages as Markdown (e.g. about.md)
  content.config.ts — Content collection schemas (posts + pages)
  layouts/
    BaseLayout.astro — Shared HTML shell (nav, head, footer)
  components/
    Sidebar.astro         — Standard sidebar (bio, recent posts, elsewhere, feeds)
    SidebarArchives.astro — Archives sidebar (recent posts, feeds)
  pages/
    index.astro           — Journal/recently page (15 latest posts)
    archives.astro        — All posts grouped by year/month
    about.astro           — Biographical page
    posts/[...slug].astro — Individual post pages
    tag/[tag].astro       — Tag filtered listing pages
    feed.xml.ts           — RSS feed endpoint
    feed.json.ts          — JSON feed endpoint
  utils/
    slugify.ts            — Shared slug helper
public/
  styles/main.css   — All site styles
  avatar.jpg        — Profile photo
  images/           — 132 blog post images
.github/
  workflows/
    deploy.yml      — GitHub Actions workflow for GitHub Pages deployment
```

## Running Locally
```bash
npm run dev      # Dev server on port 5000
npm run build    # Production build to dist/
npm run preview  # Preview production build on port 5000
```

## Deployment
Push to `main` branch on GitHub. The `.github/workflows/deploy.yml` GitHub Action will build and deploy to GitHub Pages automatically. Set `site` in `astro.config.mjs` to match the GitHub Pages URL.

## Content Format
Posts use YAML frontmatter:
```yaml
---
title: "Post Title"
date: YYYY-MM-DD
source: "original URL"
archive: "Wayback Machine URL"
tags:
  - "Tag1"
  - "Tag2"
---
```

## Dependencies
- `astro` ^4.0.0
- `@astrojs/rss` ^4.0.0

---

## Blog Recovery Approach

The 430 posts spanning 2002–2013 were recovered from the Internet Archive (Wayback Machine) using an automated Python pipeline. The original site no longer existed, so the entire content corpus was reconstructed from archived snapshots. Here is a detailed account of how that was done.

### The Recovery Script

The core tool is `scripts/recover_blog.py`, a self-contained Python script that takes the site from zero to a full set of Markdown files in a single run. It follows a five-stage pipeline, which it even prints out as it runs:

1. Fetch the archive index page
2. Extract blog post links
3. Build a Wayback Machine snapshot map
4. Process each post
5. Save metadata

#### Stage 1 — Seeding from the Archives Page

The script starts from a known-good snapshot of the site's archives page:

```
https://web.archive.org/web/20140206221944/http://nathanpitman.com/archives/
```

This particular snapshot (from February 2014) was chosen because it was one of the last captures before the site went dark, meaning it had the most complete list of post links. It served as the table of contents for the entire recovery.

#### Stage 2 — Extracting Post Links

The link extractor (`extract_post_links`) parses the archives HTML and pulls out every link that looks like a blog post. It handles two URL forms:

- Wayback-wrapped URLs (e.g. `/web/20120301/http://nathanpitman.com/some-post`) — it strips the Wayback prefix to recover the clean original URL
- Plain `nathanpitman.com` links

It also applies a skip list to avoid pulling in non-post pages like `/category/`, `/tag/`, `/page/`, `/wp-admin/`, `/feed`, and `/about`. Only paths with at least two URL segments were considered posts.

#### Stage 3 — Building the Snapshot Map via the CDX API

Rather than guessing at Wayback URLs, the script queries the **Wayback Machine CDX API** to build a map of every archived path on `nathanpitman.com`. The CDX API returns a structured list of timestamps and original URLs for all known snapshots, filtered to only HTTP 200 responses.

This snapshot map is then used to resolve each post URL to its best archived version. If the CDX lookup misses a URL (rare), it falls back to a generic 2014-era Wayback URL.

A 1-second delay between requests (`REQUEST_DELAY = 1.0`) was used throughout to be a respectful client and avoid rate limiting.

#### Stage 4 — Processing Each Post

For each post URL, `process_post` does the following:

**Fetching**: Retrieves the archived HTML. If the Wayback Machine returns its "has not archived that URL" or "Hrm." error pages, the post is skipped rather than saving junk.

**Title extraction** (`extract_title`): Looks for the title in this order of preference:
- An `<h2 class="title">` element (the original blog's markup)
- Any `<h2>` inside the `.entry` div
- Common CSS class patterns like `entry-title` or `post-title`
- The HTML `<title>` tag (with site name stripped off)
- Falls back to "Untitled"

**Date extraction** (`extract_date_from_post`): Looks for dates in:
- A `<span class="posted">` element (the original blog's date format, e.g. "March 14. 04")
- Any element with a class matching `date`, `time`, `posted`, `published`, etc.
- The `datetime` attribute on `<time>` elements
- The Wayback timestamp in the archive URL itself (used as a last resort)
- Falls back to `2014-01-01` if nothing else is found

The date parser handles many formats including the original blog's unusual `Month DD. YY` style (two-digit years).

**Content extraction** (`extract_post_content`): Finds the article body, stripping out:
- The post's own `<h2 class="title">` (to avoid duplication in Markdown)
- `<script>`, `<style>`, `<form>` tags
- Comments, share buttons, social widgets, related posts, sidebars, and nav elements
- The "Speak Your Mind" comments section and everything below it
- The `.posted` date div

**Image handling** (`process_images` + `download_image`): Scans the content for `<img>` tags, skips non-content images (avatars, emoji, tracking pixels, WordPress includes), and downloads the rest. A key challenge here was the Wayback Machine's URL scheme — image URLs needed to be normalized to use the `im_` modifier (e.g. `/web/20120301im_/http://...`) which forces the raw, undecorated image file rather than the archived HTML wrapper. The script validates each downloaded file by checking its byte signature (JPEG, PNG, GIF, WebP, SVG) to avoid saving broken downloads. Image filenames are sanitised and stored in `import/images/`, with `<img>` `src` attributes rewritten to `../images/<filename>`.

**Markdown conversion** (`html_to_markdown`): Uses `markdownify` with ATX-style headings (`##`) and hyphen bullets. Runs of three or more blank lines are collapsed to two.

**Filename generation**: Each post gets a filename in the form `YYYY-MM-DD-<slug>.md`. The slug is derived from the post title (up to 60 characters). If the title is uninformative ("untitled", "journal"), the URL path segment is used instead. Duplicate filenames get a suffix from the original URL slug.

**Frontmatter**: Each Markdown file is written with YAML frontmatter containing `title`, `date`, `source` (original URL), and `archive` (Wayback URL). This preserves full provenance for every post.

#### Stage 5 — Metadata Manifest

After processing all posts, the script writes `import/posts.json` containing the full list of recovered posts (sorted by date), total counts for recovered/skipped/failed posts, image counts, and a list of any errors. This manifest served as a useful audit log to confirm the recovery was complete.

### Key Challenges and How They Were Handled

**Inconsistent site designs across years**: The original blog's HTML structure changed over its 11-year life (2002–2013), spanning at least two major redesigns. The content and title extractors use a cascade of selectors — trying the original blog's specific CSS classes first, then falling back to generic semantic patterns — to handle these variations gracefully.

**Date format variety**: Early posts used a custom `Month DD. YY` date format (two-digit year). The date parser handles this plus ISO 8601, US/UK numeric formats, and various long-form month name formats, with a fallback to the archive snapshot timestamp.

**Wayback image wrapping**: Images served through the Wayback Machine are normally wrapped in an HTML frame with the archive toolbar. Using the `im_` URL modifier bypasses this and retrieves the raw image bytes. Without this, image downloads would have saved HTML pages instead of actual images.

**Duplicate detection**: The `used_filenames` set ensures that if two posts produce the same date + slug combination, the second one gets the original URL slug appended, preventing silent overwrites.

**Polite crawling**: A 1-second sleep between post requests and a 0.5-second sleep after each image download keeps the script from hammering the Wayback Machine. HTTP errors use exponential backoff with up to 3 retries.

### From Recovery Output to Published Site

Once `scripts/recover_blog.py` had run and populated `import/posts/` and `import/images/`, the recovered files were copied into the Astro project:

- `import/posts/*.md` → `src/content/posts/`
- `import/images/*` → `public/images/`

The Astro site picks these up automatically via Content Collections. No manual editing of individual posts was needed.

---

## Legacy Files
- `scripts/recover_blog.py` — Original blog recovery script (Wayback Machine scraper), outputs to `import/`
- `import/posts/` — Original recovered markdown files (copied to `src/content/posts/`)
- `import/images/` — Original recovered images (copied to `public/images/`)
- `import/posts.json` — Recovery metadata
