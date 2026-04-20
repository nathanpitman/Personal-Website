# Content Guide

## Post Format

Posts are Markdown files in `src/content/posts/` with YAML frontmatter:

```yaml
---
title: "Post Title"
description: "Optional meta description (under 160 chars)"
date: YYYY-MM-DD
source: "original URL"
archive: "Wayback Machine URL"
tags:
  - "Tag1"
  - "Tag2"
---
```

### Frontmatter fields

| Field | Required | Notes |
|---|---|---|
| `title` | Yes | |
| `date` | Yes | `YYYY-MM-DD` format |
| `source` | Yes | Original URL from nathanpitman.com — provenance field, do not remove |
| `archive` | Yes | Wayback Machine snapshot URL — provenance field, do not remove |
| `description` | No | If absent, auto-generated at build time (see below) |
| `tags` | No | Defaults to `[]` — posts without tags are valid |
| `hidden` | No | Set `hidden: true` to exclude from all listings without deleting the file |

---

## Descriptions

If `description` is absent from a post's frontmatter, a fallback is generated at build time:

- Posts **under 300 words**: first paragraph extracted and trimmed to 160 characters
- Posts **300+ words**: Claude API generates a summary

To pre-generate descriptions and write them into frontmatter, run:

```bash
npm run generate-descriptions
```

This requires an `ANTHROPIC_API_KEY` environment variable. The script is safe to re-run — it skips posts that already have a description. API calls are rate-limited with a 200ms delay between requests.

---

## Adding Images

1. Drop the image file into `public/images/`
2. Reference it in the post's Markdown body: `![Alt text](/images/filename.jpg)`
3. Commit and push

Images wider than 800px are automatically resized to 800px (preserving aspect ratio) before every build and dev server start via `scripts/resize-images.mjs`. This runs as a `prebuild`/`predev` npm hook — no manual step needed. GIF files are skipped. The file in `public/images/` is updated in place.

---

## Tags

Each post can carry one or more tags in its frontmatter. Tags drive statically-generated pages at `/tag/<slug>`.

### Tag vocabulary

The current tag set and approximate post counts:

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

### How tag pages work

Each tag gets a statically-generated page at `/tag/<slug>` via `src/pages/tag/[tag].astro`. The `getStaticPaths()` function scans all posts at build time, builds a deduplicated map of tag slugs to display names, and emits one route per tag.

Tag slugs are generated via the shared `src/utils/slugify.ts` utility — always use this, never roll a custom slugify, to ensure consistent slug generation across components.

### Tag sidebar components

- **`SidebarTags.astro`** — used on individual tag pages. Shows the full alphabetically-sorted tag list with post counts; the active tag is highlighted.
- **`SidebarArchives.astro`** — used on the Archives page. Also shows the full tag list, giving the archives page dual-purpose: chronological browsing on the left, topic browsing in the sidebar.

Both components compute tag counts at build time by iterating all non-hidden posts.

---

## Sitemap

The sitemap is auto-generated at build time by `@astrojs/sitemap`. It produces `sitemap-index.xml` (the index) and `sitemap-0.xml` (all URLs).

Only canonical URLs are included. Redirect pages are excluded via a `filter` function in `astro.config.mjs`:

| Excluded pattern | Reason |
|---|---|
| `/category/{slug}/` | Meta-refresh redirects to `/tag/{slug}/` |
| `/posts/YYYY-MM-DD-{slug}/` | 301 redirects to canonical `/posts/{slug}/` |
| `/{id}/{slug}/` | Legacy ID URLs, 301 redirect to canonical post |

The remaining ~321 canonical URLs are: home, `/about`, `/archives`, all `/posts/{slug}/` pages, and all `/tag/{slug}/` pages.
