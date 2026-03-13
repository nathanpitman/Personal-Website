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

### Stripping Wayback Machine URLs from Post Body Links

A significant post-processing problem emerged after the initial recovery: every hyperlink inside the body of every post was pointing back to the Internet Archive rather than to the original destination.

This happens because the Wayback Machine rewrites all `href` attributes in the HTML of any page it serves, wrapping them in its own URL prefix so that clicks stay within the archive. A link that originally read:

```
http://www.macromedia.com/software/flashcom/
```

became, in the archived HTML:

```
https://web.archive.org/web/20100111190538/http://www.macromedia.com/software/flashcom/
```

The recovery script faithfully preserved these as it converted the HTML to Markdown, meaning the recovered posts contained hundreds of links in the form:

```markdown
[link text](https://web.archive.org/web/<timestamp>/http://original-site.com/page)
```

Clicking any of them would take a reader to the Internet Archive instead of the intended destination. This needed to be resolved across the full corpus of posts.

The fix was to unwrap these URLs — stripping the `https://web.archive.org/web/<timestamp>/` prefix from every link in every post body to restore the original target URL. The pattern is straightforward:

```
https://web.archive.org/web/20100111190538/http://original-site.com/page
                                           ↓
http://original-site.com/page
```

This only applies to links in the post body content. The `archive:` field in each post's YAML frontmatter intentionally retains its Wayback URL — that field exists specifically to record the archive snapshot that was used as the source, for provenance.

### From Recovery Output to Published Site

Once `scripts/recover_blog.py` had run, URLs had been cleaned, and `import/posts/` and `import/images/` were populated, the recovered files were copied into the Astro project:

- `import/posts/*.md` → `src/content/posts/`
- `import/images/*` → `public/images/`

The Astro site picks these up automatically via Content Collections. No manual editing of individual posts was needed.

---

## Legacy Files
- `scripts/recover_blog.py` — Original blog recovery script (Wayback Machine scraper), outputs to `import/`
- `import/posts/` — Original recovered markdown files (copied to `src/content/posts/`)
- `import/images/` — Original recovered images (copied to `public/images/`)
- `import/posts.json` — Recovery metadata

---

## Expanding the Recovery: Tags

Tags did not exist in any structured form recoverable from the Wayback Machine. The original blog used WordPress category and tag URLs (e.g. `/category/`, `/tag/`), but those were deliberately excluded from the recovery script's link extractor because they are index pages rather than posts. Reconstructing meaningful tags for 430 posts therefore required a separate, deliberate effort after the initial content recovery was complete.

### How Tags Were Added

Tags were added to each post's YAML frontmatter as a curated, hand-applied taxonomy. Rather than scraping tag names from archived pages, the content of each post was used to classify it into a consistent set of topic tags. This produced a coherent tag vocabulary that reflects the actual subject matter of the blog across its 11-year run.

The resulting tags, and approximate post counts for the most active ones:

| Tag | Posts |
|---|---|
| Personal | 70 |
| Fireworks | 70 |
| Extensions | 55 |
| Technology | 53 |
| Design | 41 |
| Code | 36 |
| Web development | 34 |
| Jobs | 30 |
| Flash | 26 |
| ExpressionEngine | 26 |
| Adobe | 23 |
| Chatter | 22 |
| Family | 18 |
| Textpattern | 17 |

Tags are stored as a YAML array in each post's frontmatter:
```yaml
tags:
  - "Technology"
  - "Design"
```

The Content Collections schema in `src/content.config.ts` defines the field as:
```typescript
tags: z.array(z.string()).default([]),
```

The default of an empty array means posts without tags are valid and do not break the build.

### Tag Pages

Each tag gets its own statically-generated page at `/tag/<slug>` via `src/pages/tag/[tag].astro`. The `getStaticPaths()` function scans all posts at build time, builds a deduplicated map of tag slugs to display names, and emits one route per tag. Each tag page then:

- Filters all posts to only those carrying that tag
- Sorts them newest-first
- Renders the full post content (not just excerpts) for each, matching the pattern of the main journal page
- Highlights the current tag as active in the sidebar list

Tag slugs are generated via the shared `src/utils/slugify.ts` utility, ensuring that tag names with spaces or mixed case (e.g. "Web development") become clean URL segments (e.g. `web-development`), and that the same slug is always produced consistently whether coming from a post's frontmatter or from the sidebar.

### Tag Index in the Sidebar

The original site had no tag system, so there was no existing design to reference. A Tags section was added to the sidebar on two contexts:

- **`SidebarTags.astro`** — used on individual tag pages. Shows the full alphabetically-sorted tag list with post counts. The currently active tag is highlighted via an `active-tag` CSS class.
- **`SidebarArchives.astro`** — used on the main Archives page. Also shows the full tag list with post counts, giving the archives page a dual purpose: chronological browsing by year/month on the left, and topic-based browsing via the tag index in the sidebar.

Both components compute tag counts at build time by iterating over all posts and accumulating a count per slug:

```typescript
for (const post of allPosts.filter(post => !post.data.hidden)) {
  for (const tag of post.data.tags) {
    const s = slugify(tag);
    const existing = tagCounts.get(s);
    if (existing) {
      existing.count++;
    } else {
      tagCounts.set(s, { name: tag, slug: s, count: 1 });
    }
  }
}
```

Tags are displayed as `Tag Name (count)` and link directly to the tag page. This gave the rebuilt site a browsing dimension the original never had.

---

## Site Design

The visual design of the rebuilt site is a **modern interpretation of the original blog**, not a pixel-for-pixel recreation. The original site's aesthetic — serif typography, an indented post body, a restrained two-column layout — was the reference point, but the implementation was rebuilt from scratch for today's web.

### Design Origins

The initial design template was created by Claude as an HTML/CSS mockup, capturing the general look and feel of the kind of personal blog that existed in the mid-2000s. That template was then interpreted and transformed into a working Astro component structure by Replit — breaking the monolithic HTML into `BaseLayout.astro`, the sidebar components, and individual page templates, while wiring it all into Astro's Content Collections and routing system.

### Typography

Two Google Fonts are used:

- **Lora** — a contemporary serif used for body text, headings, and the post title. Chosen for its readability and its affinity with the "journal" character of the content.
- **Source Sans 3** — a clean sans-serif used for navigation, the sidebar, metadata, and UI chrome. Provides contrast against the serif body.

Both are loaded via a single `<link>` in `BaseLayout.astro`.

### Layout

The page uses CSS Grid with a `1fr 280px` column split — a wide content area on the left and a fixed-width sidebar on the right, with a max-width of 1020px centered on the page. This directly echoes the two-column structure of the original blog.

### Specific Nods to the Original

Two layout details were explicitly carried over from the original site's design:

- **Indented post body**: `.post-body` has a `padding-left: 5%`. This creates a subtle visual distinction between the post title and the body text, matching an idiosyncrasy of the original blog's layout.
- **Image bleed**: Featured images use a negative left margin (`margin-left: -20px`) so they visually "bleed" past the text indent back to the left edge of the content column, mirroring how images appeared in the original.

The date format displayed on posts also preserves the original's unusual style — `Mar 14. 04` (abbreviated month, two-digit year with a period) — rather than normalising to a conventional format.

### Mobile-first Responsive Design

The original blog had no responsive design (it predated that era). The rebuilt site is fully responsive, designed to be usable on any screen size.

**At 700px and below:**
- The two-column CSS Grid collapses to a single column, stacking the sidebar below the main content.
- The sidebar itself reflows into a two-column grid of its own (`1fr 1fr`) so the sidebar blocks sit side-by-side rather than forming one long vertical list.
- The site identity block spans the full width at the top of the sidebar area.

**At 420px and below:**
- The sidebar's two-column grid also collapses to a single column.
- The navigation bar reduces its padding and font size to remain comfortably usable on narrow handsets.

All images are `max-width: 100%; height: auto` throughout, and the image bleed effect is adjusted at small sizes to avoid overflow.

### CSS Architecture

All styles live in a single file: `public/styles/main.css`. The approach is deliberately straightforward — no preprocessor, no utility framework, no scoped component styles. Design tokens are set as CSS custom properties on `:root`:

```css
--border: #e2e0dc;
--text: #222222;
--serif: 'Lora', Georgia, serif;
--sans: 'Source Sans 3', system-ui, sans-serif;
```

This keeps the styling easy to read, easy to override, and free of build-time complexity — appropriate for a site whose content is the point, not its stack.
