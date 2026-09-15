---
title: Colophon
description: What this site is actually built with — Astro, Lora, Pagefind, GitHub Pages and a handful of small automations.
---

You're looking at a fairly small pile of code holding up a couple of decades of nonsense (2002 through 2013 mostly, recovered from wherever the original site had scattered itself, plus whatever I've bothered to add since). Here's what it's actually made of.

Body text is set in Lora, a serif that's doing its best to look like it belongs on paper rather than a screen. Everything else, the nav, the dates, the bits and bobs, just falls back to whatever your system already has rather than dragging in a web font to render a menu.

The site itself is built with [Astro](https://astro.build). Every post is a Markdown file with a bit of YAML at the top (title, date, tags, a link back to wherever it originally lived) and Astro turns the lot into plain static HTML at build time. No database, no server doing anything clever, nothing to hack. If I haven't written a description myself, Claude has a go at one during the build, which feels like a very 2026 way of solving a very 2003 problem.

[Pagefind](https://pagefind.app) handles the search box (that's the little magnifying glass, or ⌘K), quietly indexing everything after each build so I don't have to run a search server anywhere for the sake of a personal blog.

It's hosted on GitHub Pages, deployed by a GitHub Action every time I push (or overnight, in case I've dated a post ahead of time and its day has finally arrived). Once it's live, something pings the search engines directly so new posts don't just sit there unindexed for weeks like they used to.

Images over 800px get shrunk automatically before anything ships, which is a job I would absolutely forget to do myself.

There's a Google Analytics tag in the header, for what it's worth. I'd rather be upfront about that than pretend otherwise.
