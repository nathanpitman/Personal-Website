# Blog Recovery from Internet Archive

## Overview
A Python script that recovers blog posts from the Internet Archive's Wayback Machine. It scrapes the archived blog at `nathanpitman.com`, extracts post content, converts HTML to Markdown, downloads images, and produces a folder structure ready for static site generators (Astro, Hugo, Jekyll).

## Architecture
- **Single script**: `recover_blog.py` handles the entire recovery pipeline
- **Output**: 
  - `posts/` — Markdown files with YAML frontmatter (`YYYY-MM-DD-slug.md`)
  - `assets/images/` — Downloaded post images
  - `posts.json` — Metadata for all recovered posts

## Dependencies (Python)
- `requests` — HTTP requests
- `beautifulsoup4` — HTML parsing
- `markdownify` — HTML to Markdown conversion
- `tqdm` — Progress bars
- `python-slugify` — URL-safe slug generation
- `pyyaml` — YAML handling

## How It Works
1. Fetches the archive index page from Wayback Machine
2. Extracts all blog post links from the index
3. Queries CDX API once for all archived paths (`collapse=urlkey`), building a snapshot lookup map
4. Resolves each post URL against the snapshot map (fallback: `/web/2014/{url}`)
5. Visits each archived post and extracts title, date, content, images
6. Converts HTML content to Markdown with frontmatter
7. Downloads images with validation (magic bytes + Content-Type check, Wayback `im_` URL normalization)
8. Saves everything to the output directories

## Results
- 430 posts recovered (2002–2013), 1 skipped (not archived), 0 errors
- 132 validated images downloaded
- All image files verified as actual image data (no HTML error pages)

## Running
```bash
python recover_blog.py
```
