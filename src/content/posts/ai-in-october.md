---
title: AI in October
description: >-
  Month four of my AI log. Engineering a Claude Code skill that streamlines migrating from WordPress to Astro, AI as a life admin assistant, Claude UI frustrations and a possible plan for the Xmas break.
date: '2026-10-30'
hidden: false
tags:
  - ai
  - making things
relatedPosts:
  - slug: ai-in-september
    source: generated
  - slug: ai-in-july
    source: generated
  - slug: ai-in-august
    source: generated
  - slug: rediscovering-making-things
    source: generated
  - slug: introducing-fedi-follow-catch
    source: generated
---

Month four of my AI log. Engineering a Claude Code skill that streamlines migrating from WordPress to Astro, AI as a life admin assistant, Claude UI frustrations and a possible plan for the Xmas break.

## A WordPress to Astro skill for Claude

I've engineered as Claude Code skill that streamlines [migrating from a WordPress site to Astro](https://github.com/nathanpitman/WordPress-to-Astro-migration-skill). You don't need admin access and you don't need to understand WordPress, the primary focus is migration to a basic Astro build with zero page markup changes (and therefore mitigating any negative SEO impact). I intended to keep building on this, I've run it locally against two of our group domains and it does a very decent job, next step is to incorporate a step that configures and installs a CMS like Payload for this to become a one stop migration tool.

## Instinct: AI as a life admin assistant

The latest hot thing in the world of personal assistants, [Instinct](https://instinct.com) turns up where you already speak with friends (Text messages or WhatsApp). After nabbing an invite from a colleague I've had some pretty positive experiences with this. It booked my car in for an MOT and a wheel alignment without me having to touch a web browser or pick up a phone, it went off and researched a bunch of options for a weekend stay in Edinburgh, including advising that I nab a railcard to reduce the journey costs, I've used it to set up reminders for things to do later by transcribing a text message while driving... and finally - every week it queries our local authority website and sends me a message to let me know exactly which bins to put out and when.

## Mounting frustrations with Claude's UI

The more time you spend leaning into new tooling, the more obvious it becomes that we've recreated the same old file and folder problems. It's impossible to work collaboratively. You can't download artefacts, so they end up trapped. You can't reference remote assets, only upload them. Outputs are hard to share across teams. There's also no easy way to organise and access memories and conversations: no auto-organisation by theme or topic, no auto-archive, just another list of 'things' to manage. [I tagged Borris Cherny](https://bsky.app/profile/nathanpitman.com/post/3mxa2kxyfs22p) and even asked Claude for a solution. Sadly there's no Claude conversation API, so you can't roll your own improvements either unless I'm missing something?

## A few smaller things

- I stumbled across [Agensi Paid Skills Marketplace](https://agensi.io), a home for commercial AI skills which your agent can leverage to complete tasks, recommending skills that fit your needs. Say yes to your agent, the transaction takes place in the background and work continues.

- [Dessa](https://block.xyz/dessa) is a speech to speech conversation model from Block, trained from scratch on human conversation audio alone. Unlike speaking to other agents, Dessa is not converting audio to text, responding in text and then converting that back to audio - instead it listens and responds in real time audio. Impressive.

- Some new side projects I'm pondering; a music visualiser for the Apple TV which would use a WLED controller to detect audio (a possible xmas project), a web app that would use the Hypervolt API to infer which charging sessions at home are mine or my daughters and finally, a better UI for a Sega Megadrive Flashcart.

*More next month!*


