# nathanpitman.com

A static personal blog built with [Astro](https://astro.build/), containing 430 recovered blog posts from 2002–2013. Deployed to GitHub Pages.

## Two guiding principles

**Authentic recreation.** The goal was not simply to publish the recovered content somewhere — it was to bring the site back as close to its original form as possible. That meant recreating the visual identity: the two-column layout, the indented post body, the serif typography, the restrained design language that characterised personal blogs of that era. The original's unusual date format, image bleed effect, and sidebar bio were deliberately preserved.

**Don't break the internet.** Despite the site having been offline for some years, its URLs still exist in the wild — in bookmarks, in other people's blog posts, in search engine indexes. Every historical URL must continue to work exactly as it did before. The URL structure of the Astro site matches the original site's permalink format precisely.

---

## Quick start

Install [Node.js](https://nodejs.org/) (LTS), then:

```bash
npm install
npm run dev
```

| Command | Action |
|---|---|
| `npm run dev` | Start local dev server at `http://localhost:4321` |
| `npm run build` | Build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally |

---

## Docs

- [Development guide](docs/development.md) — setup, project structure, deployment, dependencies
- [Content guide](docs/content.md) — post format, frontmatter fields, images, tags, scripts
- [Recovery & design](docs/recovery.md) — how the blog was recovered, design decisions, typography

## External

- [Astro documentation](https://docs.astro.build/) — the framework this site is built on

---

## AI context

`CLAUDE.md` at the root of this repo contains project notes for Claude AI sessions — architecture details, design constraints, and implementation notes accumulated over the project's development.

`/llms.txt` (served at the root URL) is a machine-readable site summary following the [llms.txt](https://llmstxt.org/) emerging standard, for AI systems that crawl or index the site.
