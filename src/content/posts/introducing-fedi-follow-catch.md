---
title: Introducing 'Fedi Follow Catch'
description: >-
  Compare your Bluesky and Mastodon follows and close the gaps, one click at a
  time. Built with Claude Code, no backend, nothing stored.
date: '2026-06-20'
relatedPosts:
  - slug: >-
      back-from-the-dead-resurrecting-nathanpitman-dot-com-after-a-decade-in-the-dark
    source: generated
  - slug: scratching-an-itch-to-build-a-game
    source: generated
  - slug: must-have-add-ons-for-any-new-eecms-project
    source: generated
  - slug: 10-questions-for-jon-hicks-going-it-alone
    source: generated
  - slug: im-a-dad
    source: generated
---

I've got two separate social graphs right now — one on Bluesky, one on Mastodon — and no real sense of how much they overlap. I follow people on one who I probably also want to follow on the other, but I had no way of seeing the gap. So I asked <a href="">Claude</a> to help me figure out a way to actually see it: compare both follow lists and surface who I was missing on each side.

That's what **Fedi Follow Catch** is for. :D

## What it does

It's a single-page tool: paste in your Bluesky handle and app password, paste in a Mastodon instance URL and access token, it fetches your follows lists from both then it does the boring bit you don't want to do by hand — diffing the two lists against each other and showing you exactly who you're missing on each side.

Click through, follow, move to the next one. It's less "sync" and more "catch" — the two networks passing a list back and forth, and you get complete control over ticking off the gaps one at a time until there's nothing left.

It deliberately doesn't follow anyone for you. There's no write access required to either API, nothing automated, nothing stored.

## How it's built

The whole thing is static — plain HTML/CSS/JS hosted on GitHub Pages, with no server and no database.

Every API call happens directly from your browser to Bluesky and to your own Mastodon instance. Nothing is stored — no localStorage, no cookies, no database row anywhere with your tokens in it. Refresh the page and you start again.

Complete disclosure, I did not write this, I prompted Claude Code and it make it all happen and it worked out the matching logic itself: checking known account-bridging patterns between the two networks first, then falling back to comparing display name and bio links where that wasn't detectable, and keeping a third "unmatched" pile for anything it couldn't confidently place — rather than quietly hiding the misses.

## The artwork and visual design

I generated the illustration with ChatGPT — a loose, playful image built around the "catch" idea, an elephant and butterfly playing together.

I handed the artwork to Claude with a prompt asking it to soften the initial dark and technical interface it threw at me. A lighter background, the playful tone of the illustration carried through into the type and spacing, less "admin dashboard", more "interactive game".

## Try it

You can try <a href="https://nathanpitman.github.io/Fedi-Follow-Catch/">Fedi Follow Catch</a> yourself, it's hosted on my Github account. and if you want to check the no-backend claim for yourself, feel free to <a href="https://github.com/nathanpitman/Fedi-Follow-Catch">dig into the code</a>. If you're active on both Bluesky and Mastodon and have never quite known how much your two follow lists overlap, hopefully you'll find this helpful.
