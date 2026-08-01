---
title: AI in July
date: 2026-08-01
description: >-
  Kicking off a monthly log of what I'm actually doing with AI, at work and
  at home — not the hype, just the stuff I've built, broken, and learned.
  First up: a conversational training tutor, lead enrichment without awkward
  form fields, a web player for animations trapped on 90s floppy disks, and
  turning a CRO audit into a redesigned page in hours instead of weeks.
tags:
  - AI
  - Making things
hidden: true
---

I've decided to start keeping a monthly log of what I'm actually doing with AI — at work and at home. Not the hype, just the stuff I've built, broken, and learned. Here's July.

## Lerares: a conversational tutor for workplace training

Built at an SLT session in Amsterdam (hence the name), Lerares is a proof of concept for repurposing training content we already own the IP for — turning static courses into a conversational experience that moves the learner through probing, teaching, and checking understanding, rather than just clicking "next."

The build itself was the easy part. The real learning came from our engineering team, who walked me through observability using Langfuse — watching how a conversation actually flows through a model, where it drifts, and how you'd catch that in production rather than just hoping for the best.

## Enricher: lead enrichment without the awkward form fields

We needed a way to enrich leads after form submission — FTE count, financial status, industry sector — without adding more fields to the form asking people for a Companies House number they'll never look up.

Turns out Claude handles this alarmingly well. It validates the email domain, scrapes the site's footer, about, and contact pages for signals (company number, registered address, that sort of thing), then does a fuzzy lookup against the Companies House API to confirm and fill in the gaps.

We're currently using it to review and validate lead data weekly before flipping it into a live enrichment step in the capture flow itself.

## A web player for animations trapped on 3.5" floppy disks since the 90s

I've got 21 backups of animations from the 90s that I've only ever been able to play back through VLC. Before they get lost in the next computer upgrade, I wanted them a proper, permanent home.

With Claude, I built a web player that reads ANM, FLC, and other ancient formats directly in the browser. It's a rough build for now — turning it into a proper permanent artefact is on the list.

## From CRO audit to redesigned page, in hours not weeks

Using Claude for design against a design system our own talented designers built, cross-referenced with a CRO audit and its recommendations, I can go from an old-style page to a redesigned one — CRO recommendations baked in — in hours instead of weeks.

This one is genuinely blowing my mind. Add in that you can go straight from Claude for design into Claude Code, and honestly, if I were still in the web design business I'd be watching this very closely. Things are moving fast.

## Matt Pocock's AI skills repo

Found [Matt Pocock's AI skills repository](https://github.com/mattpocock/skills) and his YouTube channel this month — essential viewing if you're figuring out how to work with tools like Claude Code. Favourites so far: **grill me**, **tickets**, **domain modelling**, and **improve codebase architecture**.

## Turning our ICPs into a Claude skill

Converted iHASCO's ICPs into a Claude skill that gets invoked automatically in any conversation touching product, marketing, or commercial work. It keeps our ICPs grounded in the conversation by default — so when Claude's helping evaluate or build a proposal, the people we're actually building for are always effectively in the room.

---

*More next month.*
