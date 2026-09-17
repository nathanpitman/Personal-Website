---
title: Colophon
description: What this site is actually built with — Astro, Lora, Pagefind, GitHub Pages and a handful of small automations.
---

This website is a pretty small pile of code holding up a couple of decades of personal ramblings and nonsense (2002 through 2013 being recovered from the Internet Archive in 2026 and everything added since). Here's how it's actually made.

## Typography

Headings are set to use your system default Sans Serif font (San Francisco on Mac and Segoe UI on Windows), body text meanwhile is set in Lora (falling back to Georgia or you next available serif option).

## Framework

The site itself is built with [Astro](https://astro.build). Every post is a simple Markdown file with a bit of YAML at the top (title, date, tags etc) which Astro turns into plain static HTML at build time. There's no database and no server doing anything clever. If I haven't written a post summary or description description myself, Claude has a go at one during the build, which feels like a very 2026 way of solving a very 2003 problem.

## Deployment

The site is hosted on GitHub Pages, deployed by a GitHub Action every time I push (or overnight, in case I've dated a post ahead of time and its date has arrived). During deployment any inline images over 800px get scaled automatically using [Sharp](https://www.npmjs.com/package/sharp). Once deployment it done, I ping [IndexNow](https://indexnow.org) so new posts turn up more quickly on search surfaces than they would otherwise.

## Search

[Pagefind](https://pagefind.app) handles on site search (that's the little magnifying glass, or ⌘K), creating an index at deploy time which can be queried using the Pagefind JavaScript search API.

## Tags

The site is architected around o corpus of new and historical tags, I reguarly review tags to make sure I don't end up with meaningless groupings with only a handful of posts. While I've not touched the body content of historical posts, I have audited and consolidated historical tags.

## Analytics

There's a Google Analytics tag in the header at the time being, though I'd like to switch this out for something less intrusive when I have time.
