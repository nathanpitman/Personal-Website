# Development Guide

## Prerequisites

Install [Node.js](https://nodejs.org/) (LTS version recommended). Verify with:

```bash
node -v
npm -v
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/nathanpitman/nathanpitman.com.git
cd nathanpitman.com
```

### 2. Install dependencies

```bash
npm install
```

This installs Astro and all other project dependencies into `node_modules/`. You do not need to install Astro globally.

---

## Common Commands

| Command | Action |
|---|---|
| `npm run dev` | Start local dev server at `http://localhost:4321` |
| `npm run build` | Build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally |

Press **Ctrl + C** to stop the dev server.

The dev server port can be overridden with a `PORT` environment variable — this is handled in `astro.config.mjs`.

---

## Project Structure

```
src/
  content/
    posts/          — 430 Markdown blog posts with YAML frontmatter
    pages/          — Static pages as Markdown (e.g. about.md)
  content.config.ts — Content collection schemas (posts + pages)
  layouts/
    BaseLayout.astro — Shared HTML shell (nav, head, footer, search modal)
  components/
    Sidebar.astro         — Standard sidebar (bio, recent posts, elsewhere, feeds)
    SidebarTags.astro     — Tag list sidebar (used on tag pages)
    SidebarArchives.astro — Archives sidebar (recent posts, feeds, tag list)
  pages/
    index.astro           — Journal/recently page (15 latest posts)
    archives.astro        — All posts grouped by year/month
    about.astro           — Biographical page
    posts/[...slug].astro — Individual post pages
    tag/[tag].astro       — Tag-filtered listing pages
    feed.xml.ts           — RSS feed endpoint
    feed.json.ts          — JSON feed endpoint
  utils/
    slugify.ts            — Shared slug helper (always use this for tag slugs)
public/
  styles/main.css   — All site styles (single file, no preprocessor)
  avatar.jpg        — Profile photo
  images/           — Blog post images
.github/
  workflows/
    deploy.yml      — GitHub Actions workflow for GitHub Pages deployment
```

---

## Deployment

Push to the `main` branch. The `.github/workflows/deploy.yml` GitHub Action builds and deploys to GitHub Pages automatically. The `site` value in `astro.config.mjs` should match your GitHub Pages URL.

To build locally:

```bash
npm run build
```

Output goes into `dist/`. The `dist/` folder is gitignored — do not commit it.

---

## Dependencies

- `astro` ^4.0.0
- `@astrojs/rss` ^4.0.0
- `astro-pagefind` — search index integration
- `@anthropic-ai/sdk` — Claude API for description generation script
- `sharp` (devDependency) — image resizing at build time
- `tsx` (devDependency) — TypeScript script runner for generate-descriptions

---

## What's in .gitignore

- `node_modules/` — reinstalled via `npm install`
- `dist/` — regenerated via `npm run build`
- `.astro/` — Astro's local cache, auto-generated

---

## Troubleshooting

**`npm run dev` fails after pulling changes?**
Run `npm install` again — new dependencies may have been added.

**Port already in use?**
Another process is on port 4321. Stop it, or run `npm run dev -- --port 3000` to use a different port.
