---
title: AI in July
date: 2026-08-01
description: >-
  Kicking off a monthly log of what I'm actually doing with AI, at work and
  at home. All the things I've built, broken, and learned. In July: a conversational training tutor,
  a lead enrichment API, a web player for animations trapped on 90s floppy disks, and turning a CRO
  audit into a set of redesigned web pages in hours instead of weeks.
tags:
  - AI
  - Making things
hidden: true
---

I've decided to start keeping a monthly log of what I'm actually doing with AI, both at work and at home. All the things I've built, broken, and learned. Here's July's.

## Lerares: a conversational tutor for workplace training

Kicked off in a Senior Leadership Team AI hackathon session in Amsterdam (hence the name), Lerares is a proof of concept for repurposing our training content at iHasco — turning static courses into a conversational experience for learners that adapts to what they know, teaches the parts they're missing in plain English and judges understanding before confirming compliance. I've also been working to expand this to include trimmed clips of relevant video from the underlying courses. We're testing this with a select group of clients and learners and I'm super excited to see how this lands.

The build itself has been pretty easy as the engineering team have been able to support me with JSON structured content from our course library. One key learning here for me has been integrating tools like Langfuse into the architecture so we can observe how the LLM interprets learner input and where it might be drifting from the content we've fed it and the guardrails we've established. While very early versions of this "worked", even with AI the devil is in the details, particularly in the to establish deterministic outcomes where you need to be able to confidently prove you've assessed someones understanding of a compliance topic.

## Enricher: lead enrichment without the awkward form fields

We needed a way to validate some of the lead data attributes we see coming from our marketing website lead forms. Initially this started as a one off script built with Claude Code to ingest, review and enrich prospect submitted data to understand if we're down-weighting particular leads.

While this is still very manual, it's evolved into an addressable API which we could embed into our lead form submission process, enriching leads on the fly rather than ad-hoc post acquisition. Right now this uses the companies house API to do a fuzzy match on company name and pull back FTE count, financial status and industry sector - mitigating the need to ask prospects to complete these fields on the website.

Claude handled this alarmingly well. It built a script that validates the email domain, scrapes the site's footer, about, and contact pages for signals (company number, registered address, that sort of thing), then does a fuzzy lookup against the Companies House API to confirm and fill in the gaps.

The pain point right now is processing time, this need serious optimisation to make it work for anything other than ad-hoc or long running automations that back fill data post acquisition, the goal is to have this run fast enough that it could execute in the flow of a form submission.

## A web player for animations trapped on 3.5" floppy disks since the 90s

I've got 21 folders on my hard drive which are each a snapshot of a 3.5" floppy disk from the 90's. I'm not sure how I've managed to persist these between device changes over the years but I have! While from time to time I've trawled through these with a copy of VLC I've had no way to share these with my parents.




of  of animations from the 90s that I've somehow managed to persist between many only ever been able to play back through VLC. Before they get lost in the next computer upgrade, I wanted them a proper, permanent home.

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
