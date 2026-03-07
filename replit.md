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
  content.config.ts — Content collection schema (title, date, source, archive)
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
    feed.xml.ts           — RSS feed endpoint
    feed.json.ts          — JSON feed endpoint
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
---
```

## Dependencies
- `astro` ^4.0.0
- `@astrojs/rss` ^4.0.0

## Legacy Files
- `recover_blog.py` — Original blog recovery script (Wayback Machine scraper)
- `posts/` — Original recovered markdown files (copied to `src/content/posts/`)
- `assets/images/` — Original recovered images (copied to `public/images/`)
- `posts.json` — Recovery metadata
