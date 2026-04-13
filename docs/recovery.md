# Blog Recovery & Design

## Blog Recovery

The 430 posts spanning 2002–2013 were recovered from the Internet Archive (Wayback Machine) using an automated Python pipeline. The original site no longer existed, so the entire content corpus was reconstructed from archived snapshots. The recovery script and its intermediate output have since been removed from the repository, but the process is summarised here for the record.

### The pipeline

A self-contained Python script drove the recovery end-to-end. It seeded from a late-2014 snapshot of the site's archives page — chosen because it was one of the last captures before the site went dark — and extracted every blog post link from that index. It then queried the Wayback Machine's CDX API to build a snapshot map for all known paths on `nathanpitman.com`, resolving each post URL to the best available archived version.

For each post the script fetched the archived HTML, extracted the title, date, and body content using a cascade of CSS selectors (to cope with at least two major site redesigns across the blog's 11-year life), and converted the result to Markdown. Dates were parsed from several formats including the original blog's unusual `Month DD. YY` two-digit-year style. Images were downloaded using the Wayback Machine's `im_` URL modifier to retrieve raw image bytes rather than the archive's HTML wrapper, and each downloaded file was validated by byte signature. Every post was written as a Markdown file with YAML frontmatter containing `title`, `date`, `source` (original URL), and `archive` (Wayback snapshot URL), preserving full provenance.

A post-processing pass stripped Wayback Machine URL prefixes from hyperlinks inside the post bodies. The Wayback Machine rewrites every `href` in the HTML it serves, so the initial recovery produced hundreds of links pointing back into the archive rather than to their original destinations. These were unwrapped to restore the original target URLs. The `archive:` field in each post's frontmatter intentionally retains its Wayback URL — that field exists specifically to record the source snapshot.

The pipeline delivered 430 Markdown posts and 132 recovered images, copied into the Astro project's content collections and public assets respectively.

### URL preservation

Despite the site having been offline for some years, its URLs still exist in the wild — in bookmarks, in other people's blog posts, in search engine indexes. A core requirement was that every historical URL should continue to work exactly as it did before. This meant the URL structure of the Astro site had to match the original site's permalink format precisely. By honouring the original slugs and path structure in the recovered Markdown filenames and Astro routing, all historical backlinks remain valid.

**URL preservation is a hard constraint** — do not change slug structure or URL paths.

---

## Tags

Tags did not exist in any structured form recoverable from the Wayback Machine. The original site ran on Textpattern from its early years before being migrated to ExpressionEngine in 2009, and both platforms used category and tag index URLs (e.g. `/category/`, `/tag/`) that were deliberately excluded from the recovery script's link extractor because they are index pages rather than posts.

Reconstructing meaningful tags therefore required a separate, deliberate effort after the initial content recovery. Rather than scraping tag names from archived pages, the content of each post was used to classify it into a consistent set of topic tags — a curated, hand-applied taxonomy that reflects the actual subject matter of the blog across its 11-year run.

---

## Site Design

The visual design of the rebuilt site is a modern interpretation of the original blog, not a pixel-for-pixel recreation. The original site's aesthetic — serif typography, an indented post body, a restrained two-column layout — was the reference point, but the implementation was rebuilt from scratch for today's web.

### Design origins

The initial design template was created by Claude as an HTML/CSS mockup, derived from screenshots of the original nathanpitman.com website. Those screenshots — along with the full original site — remain captured on the Internet Archive's Wayback Machine. That template was then interpreted and transformed into a working Astro component structure by Replit, breaking the monolithic HTML into `BaseLayout.astro`, sidebar components, and individual page templates, while wiring it all into Astro's Content Collections and routing system.

### Typography

Two Google Fonts are used:

- **Lora** — a contemporary serif used for body text, headings, and post titles. Chosen for its readability and affinity with the "journal" character of the content.
- **Source Sans 3** — a clean sans-serif used for navigation, the sidebar, metadata, and UI chrome. Provides contrast against the serif body.

Both are loaded via a single `<link>` in `BaseLayout.astro`.

### Layout

The page uses CSS Grid with a `1fr 280px` column split — a wide content area on the left and a fixed-width sidebar on the right, with a max-width of 1020px centered on the page. This directly echoes the two-column structure of the original blog.

### Intentional nods to the original

Several details were explicitly carried over from the original site's design:

- **Indented post body**: `.post-body` has `padding-left: 5%`. This creates a subtle visual distinction between the post title and body text, matching an idiosyncrasy of the original layout.
- **Image bleed**: Featured images use `margin-left: -20px` so they visually bleed past the text indent back to the left edge of the content column, mirroring how images appeared in the original.
- **Date format**: Posts display dates as `Mar 14. 04` (abbreviated month, period, two-digit year) — the original blog's unusual style, not a bug.
- **"Hello, my name is" sidebar**: the bio introduction block in the sidebar was a characteristic feature of the original.

These are deliberate — do not "fix" them.

### Responsive design

The original blog had no responsive design (it predated that era). The rebuilt site is fully responsive.

**At 700px and below:**
- The two-column CSS Grid collapses to a single column, stacking the sidebar below the main content.
- The sidebar reflows into a two-column grid of its own (`1fr 1fr`) so sidebar blocks sit side-by-side rather than forming one long vertical list.

**At 420px and below:**
- The sidebar's two-column grid also collapses to a single column.
- The navigation bar reduces its padding and font size to remain usable on narrow handsets.

All images are `max-width: 100%; height: auto` throughout, and the image bleed effect is adjusted at small sizes to avoid overflow.

### CSS architecture

All styles live in `public/styles/main.css`. The approach is deliberately straightforward — no preprocessor, no utility framework, no scoped component styles. Design tokens are set as CSS custom properties on `:root`:

```css
--border: #e2e0dc;
--text: #222222;
--serif: 'Lora', Georgia, serif;
--sans: 'Source Sans 3', system-ui, sans-serif;
```

This keeps the styling easy to read, easy to override, and free of build-time complexity — appropriate for a site whose content is the point, not its stack.
