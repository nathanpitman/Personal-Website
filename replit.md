# Nathan Pitman — Personal Blog (Astro)

## Overview
A static personal blog built with Astro, containing 430 recovered blog posts (2002–2013) from nathanpitman.com. Designed for deployment to GitHub Pages.

## Key Considerations

Two principles guided every decision in this project.

**Authentic recreation.** The goal was not simply to publish the recovered content somewhere — it was to bring the site back as close to its original form as possible. That meant recreating the visual identity: the two-column layout, the indented post body, the serif typography, the restrained design language that characterised personal blogs of that era. Because the original site no longer existed to reference directly, the design was produced as a modern interpretation rather than a pixel-for-pixel copy, updated for today's screens (fully responsive, mobile-native) while remaining faithful to the spirit and aesthetic of the original. The original's unusual date format, the image bleed effect, the "hello, my name is" sidebar introduction — these details were deliberately preserved.

**Don't break the internet.** Despite the site having been offline for some years, its URLs still exist in the wild — in bookmarks, in other people's blog posts, in search engine indexes. A core requirement was that every historical URL should continue to work exactly as it did before, so that anyone following an old link would arrive at the right post rather than a 404. This meant the URL structure of the Astro site had to match the original site's permalink format precisely. By honouring the original slugs and path structure in the recovered Markdown filenames and Astro routing, all historical backlinks remain valid — doing a small part to keep the web intact despite the site's hiatus.

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

## Adding Images to Posts

1. Drop the image file into `public/images/`
2. Reference it in the post's Markdown body: `![Alt text](/images/filename.jpg)`
3. Commit and push — that's it

Images wider than 800px are automatically resized to 800px (preserving aspect ratio) before every build and dev server start, via `scripts/resize-images.mjs`. The script runs as a `prebuild`/`predev` npm hook, so no manual step is needed. GIF files are skipped. The original file in `public/images/` is updated in place; the large original is not kept separately.

## Dependencies
- `astro` ^4.0.0
- `@astrojs/rss` ^4.0.0
- `sharp` (devDependency) — image resizing at build time

---

## Blog Recovery Approach

The 430 posts spanning 2002–2013 were recovered from the Internet Archive (Wayback Machine) using an automated Python pipeline. The original site no longer existed, so the entire content corpus was reconstructed from archived snapshots. The recovery script and its intermediate output have since been removed from the repository, but the process is summarised here for the record.

A self-contained Python script drove the recovery end-to-end. It seeded from a late-2014 snapshot of the site's archives page — chosen because it was one of the last captures before the site went dark — and extracted every blog post link from that index. It then queried the Wayback Machine's CDX API to build a snapshot map for all known paths on `nathanpitman.com`, resolving each post URL to the best available archived version.

For each post the script fetched the archived HTML, extracted the title, date, and body content using a cascade of CSS selectors (to cope with at least two major site redesigns across the blog's 11-year life), and converted the result to Markdown. Dates were parsed from several formats including the original blog's unusual `Month DD. YY` two-digit-year style. Images were downloaded using the Wayback Machine's `im_` URL modifier to retrieve raw image bytes rather than the archive's HTML wrapper, and each downloaded file was validated by byte signature. Every post was written as a Markdown file with YAML frontmatter containing `title`, `date`, `source` (original URL), and `archive` (Wayback snapshot URL), preserving full provenance.

A post-processing pass was needed to strip Wayback Machine URL prefixes from hyperlinks inside the post bodies. The Wayback Machine rewrites every `href` in the HTML it serves, so the initial recovery produced hundreds of links pointing back into the archive rather than to their original destinations. These were unwrapped to restore the original target URLs. The `archive:` field in each post's frontmatter intentionally retains its Wayback URL — that field exists specifically to record the source snapshot.

The pipeline delivered 430 Markdown posts and 132 recovered images, which were copied into the Astro project's content collections and public assets respectively. The Astro site picks these up automatically; no manual editing of individual posts was needed.

---

## Expanding the Recovery: Tags

Tags did not exist in any structured form recoverable from the Wayback Machine. The original site ran on Textpattern from its early years before being migrated to ExpressionEngine in 2009 (documented in the "Migrating from TXP to EE - Conclusion" post), and both platforms used category and tag index URLs (e.g. `/category/`, `/tag/`) that were deliberately excluded from the recovery script's link extractor because they are index pages rather than posts. Reconstructing meaningful tags for 430 posts therefore required a separate, deliberate effort after the initial content recovery was complete.

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

The initial design template was created by Claude as an HTML/CSS mockup, derived directly from screenshots of the original nathanpitman.com website provided by the site's author. Those screenshots — along with the full original site — remain captured on the Internet Archive's Wayback Machine. That template was then interpreted and transformed into a working Astro component structure by Replit — breaking the monolithic HTML into `BaseLayout.astro`, the sidebar components, and individual page templates, while wiring it all into Astro's Content Collections and routing system.

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
