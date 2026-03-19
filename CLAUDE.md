# CLAUDE.md — Project Notes for AI Sessions

## Project Overview

Astro static site deployed to GitHub Pages. No server-side logic — everything runs in the browser or is pre-built at deploy time.

## Search (Pagefind)

- Uses `pagefind` + `astro-pagefind`; the index is generated automatically during `astro build`
- The Pagefind JS bundle (`/pagefind/pagefind.js`) is **lazily imported** only on first modal open — do not eagerly load it on page load
- Search UI lives in `src/layouts/BaseLayout.astro` as a `<dialog>` element with a spotlight-style open/close animation
- Results are capped at 8; `r.data()` is only called on the top slice because it fetches full page data and is expensive

## Date Tokens in Post Pages — Do Not Remove

**File:** `src/pages/posts/[...slug].astro`

A hidden `<span class="date-search-tokens">` is rendered on every post page containing tokenized date strings:

```
YYYY-MM-DD  YYYY-MM  YYYY  MM  DD
```

This is intentional. Pagefind indexes visible text content, so these tokens make date-based search work — users can search "2026-03" or "2026" and find posts from that period. The span is visually hidden via CSS (`display: none` equivalent). **These look like dead code but are load-bearing — do not remove them.**

The `<article>` element also carries `data-pagefind-meta="date:YYYY-MM-DD"` for structured metadata access in search result data objects.

## WAAPI Modal Animation — Known Quirk

The search modal uses the Web Animations API for a fade+scale open/close effect.

**Critical:** `modal.getAnimations().forEach(a => a.cancel())` must be called before `showModal()`. Without it, a leftover `fill: 'forwards'` animation from a previous close freezes the modal at `opacity: 0` on subsequent opens — the dialog opens but is invisible.

The close animation uses `fill: 'forwards'` + a `setTimeout` (animation duration + 20ms buffer) before calling `modal.close()`. This keeps the element visually hidden during the async gap between animation end and the native close call.

## Key Files

| File | Purpose |
|------|---------|
| `src/layouts/BaseLayout.astro` | Search modal, WAAPI animation, Pagefind lazy load + query logic |
| `src/pages/posts/[...slug].astro` | Post page layout, hidden date tokens, `data-pagefind-meta` |
| `astro.config.mjs` | Pagefind build integration, PORT env var support |
| `package.json` | `pagefind` and `astro-pagefind` dependencies |
