# CLAUDE.md — Project Notes for AI Sessions

## Project Overview

Static personal blog built with Astro 4, containing 430 recovered blog posts (2002–2013) from nathanpitman.com. Deployed to GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`). No server-side logic — everything runs in the browser or is pre-built at deploy time.

**URL preservation is a hard constraint.** Historical URLs still exist in the wild (bookmarks, other blogs, search indexes). Do not change slug structure or URL paths — every old link must continue to work.

## Architecture

- **Content**: Astro Content Collections with glob loader. Schema in `src/content.config.ts`
- **Posts**: `src/content/posts/` — 430 Markdown files with YAML frontmatter
- **Pages**: `src/content/pages/` — static pages (e.g. about)
- **Feeds**: RSS at `/feed.xml` and JSON Feed at `/feed.json`
- **Styling**: Single file `public/styles/main.css` — no preprocessor, no scoped component styles. Design tokens as CSS custom properties on `:root`: `--border`, `--text`, `--serif`, `--sans`

## Content Format

Posts use YAML frontmatter:

```yaml
title: "Post Title"
description: "optional"
date: YYYY-MM-DD
source: "original URL"
archive: "Wayback Machine URL"
tags:
  - "Tag1"
```

- `description` is optional — if absent, auto-generated at build time (first paragraph for posts <300 words; Claude API for posts ≥300 words)
- `source` and `archive` are provenance fields — do not remove them
- `hidden: true` excludes a post from all listings without deleting it
- `tags` defaults to `[]` — posts without tags are valid and do not break the build

## Automated Scripts — Don't Duplicate Manually

- **Image resize**: `scripts/resize-images.mjs` runs automatically as the `predev`/`prebuild` npm hook. Resizes images >800px wide in `public/images/` in-place. Skips GIFs. Never manually resize images — the hook handles it.
- **Description generation**: `scripts/generate-descriptions.ts` — run with `npm run generate-descriptions`. Requires `ANTHROPIC_API_KEY`. Safe to re-run (skips posts that already have a description).

## Tag System

- Tag pages at `/tag/<slug>` via `src/pages/tag/[tag].astro`
- Slug generation via `src/utils/slugify.ts` — always use this shared utility for tags, never roll a custom slugify
- Tag sidebar components: `SidebarTags.astro` (used on tag pages), `SidebarArchives.astro` (used on the archives page)

## Design Details — Intentional, Don't Change

These are deliberate nods to the original site's aesthetic:

- **Indented post body**: `padding-left: 5%` on `.post-body` — matches the original layout's visual indent
- **Image bleed**: `margin-left: -20px` on featured images — bleeds back past the text indent to the column edge
- **Date format**: displayed as `Mar 14. 04` (abbreviated month, period, two-digit year) — the original blog's unusual style, not a bug
- **Two-column layout**: CSS Grid `1fr 280px`, max-width 1020px — mirrors the original

## Search (Pagefind)

- Uses `pagefind` + `astro-pagefind`; the index is generated automatically during `astro build`
- The Pagefind JS bundle (`/pagefind/pagefind.js`) is **lazily imported** only on first modal open — do not eagerly load it on page load
- Search UI lives in `src/layouts/BaseLayout.astro` as a `<dialog>` element with a spotlight-style open/close animation
- Results are capped at 8; `r.data()` is only called on the top slice because it fetches full page data and is expensive
- **Index scoping**: `data-pagefind-body` on `<article>` in `[...slug].astro` limits post-page indexing to article content only. All `<aside>` sidebar components carry `data-pagefind-ignore` to prevent sidebar content (nav links, "Elsewhere" profiles, etc.) from polluting search results.

## Date Tokens in Post Pages — Do Not Remove

**File:** `src/pages/posts/[...slug].astro`

A hidden `<span class="date-search-tokens">` is rendered on every post page containing tokenized date strings:

```
YYYY-MM-DD  YYYY-MM  YYYY  MM  DD
```

This is intentional. Pagefind indexes visible text content, so these tokens make date-based search work — users can search "2026-03" or "2026" and find posts from that period. The span is visually hidden via CSS. **These look like dead code but are load-bearing — do not remove them.**

The `<article>` element also carries `data-pagefind-meta="date:YYYY-MM-DD"` for structured metadata access in search result data objects.

## WAAPI Modal Animation — Known Quirk

The search modal uses the Web Animations API for a fade+scale open/close effect.

**Critical:** `modal.getAnimations().forEach(a => a.cancel())` must be called before `showModal()`. Without it, a leftover `fill: 'forwards'` animation from a previous close freezes the modal at `opacity: 0` on subsequent opens — the dialog opens but is invisible.

The close animation uses `fill: 'forwards'` + a `setTimeout` (animation duration + 20ms buffer) before calling `modal.close()`. This keeps the element visually hidden during the async gap between animation end and the native close call.

## Key Files

| File | Purpose |
|------|---------|
| `src/layouts/BaseLayout.astro` | Shared HTML shell, search modal, WAAPI animation, Pagefind lazy load |
| `src/pages/posts/[...slug].astro` | Post page layout, hidden date tokens, `data-pagefind-meta`, `data-pagefind-body` |
| `src/content.config.ts` | Content collection schemas (posts + pages) |
| `src/utils/slugify.ts` | Shared slug utility — use for all tag slugs |
| `public/styles/main.css` | All site styles (single file, no preprocessor) |
| `astro.config.mjs` | Pagefind build integration, PORT env var support |
| `scripts/resize-images.mjs` | Auto image resizer (runs as npm predev/prebuild hook) |
| `scripts/generate-descriptions.ts` | Claude API description generator |
| `.github/workflows/deploy.yml` | GitHub Actions deploy to GitHub Pages |
