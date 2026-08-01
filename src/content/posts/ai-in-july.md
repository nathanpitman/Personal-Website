---
title: AI in July
date: 2026-07-31
description: >-
  Kicking off a monthly log of what I'm actually doing with AI, at work and
  at home. All the things I've built, broken, and learned. In July: a conversational training tutor,
  a lead enrichment API, a web player for animations trapped on 90s floppy disks, and turning a CRO
  audit into a set of redesigned web pages in hours instead of weeks.
tags:
  - AI
  - Making things
---

I've decided to start keeping a monthly log of what I'm actually doing with AI, both at work and at home. All the things I've built, broken, and learned. Here's July's.

## Lerares: a conversational tutor for workplace training

Kicked off in a Citation Group Senior Leadership Team AI hackathon session in Amsterdam (hence the name), Lerares is a proof of concept for a conversational tutor that leverages our training content at iHasco — turning our canonical course scripts into a conversational experience for learners that adapts to what they know, teaches what they're missing and judges understanding before confirming compliance.

The build so far has been pretty easy as the engineering team have been able to support me with JSON structured content from our course library that includes the script, AWS Video URLs, WebVTT, additional resources etc. I've been working to expand the capability of the tutor to include precise time coded clips from our course videos which support specific learning moments. Claude is inferring the trim points by comparing the raw script with the WebVTT closed caption markup to seek to the right place in a video timeline and show just the bit that matters.

One key learning here for me has been integrating tools like Langfuse into the architecture, so we can observe how the LLM interprets learner input and where it might be drifting from the content we've grounded it in and the guardrails we've established. While very early versions of this "worked", even with AI the devil is in the details, particularly in the need to establish deterministic outcomes where you want to be able to confidently prove you've assessed someones understanding.

## Enricher: lead enrichment without the awkward form fields

At iHasco we needed a way to validate some of the prospect data attributes we see coming from our marketing website lead forms. Initially this started as a one off script built with Claude Code to ingest, review and enrich prospect data to understand if we're under representing the value of particular leads.

While this is still very manual, it's evolved into an addressable API which we could potentially embed into our lead capture process, enriching leads on the fly rather than ad-hoc post acquisition. Claude handled this alarmingly well. It built a script that validates the email domain, scrapes the site's footer, about, and contact pages for additional signals (company number, registered address etc), then does a fuzzy lookup through the Companies House API to locate the best match and fill in any gaps.

The pain point right now is processing time, this need serious optimisation to make it work for anything other than ad-hoc or long running automations that back fill data post acquisition, the goal is to have this run fast enough that it could execute in the flow of a form submission.

## A web player for animations trapped on 3.5" floppy disks since the 90s

I've got 21 folders on my hard drive which are each a snapshot of a 3.5" floppy disk from the 90's. I'm not sure how I've managed to persist these between device changes over the years but I have! These disk backups contain a collection of animations created with DeluxePaint Animation (ANM), AutoDesk Animator (FLI/FLC), and Show Partner F/X (GX2/SPS).

While from time to time I've trawled through these and managed to get a few animations playing through VLC, I've not seen the Show Partner F/X animations for decades and I really wanted to give all of these animations from my childhood a proper permanent home through which I could also share them with my family.

This was a challenge I didn't actually expect Claude Code to succeed with, but with some sample files in hand it blew through the task, creating a static, dependency-free web page that lets me play these back in any browser with no plug-ins. The one single issue I came up against was a misalignment of colour palettes from Deluxe Paint Animation files, but giving Claude a comparison screenshot from VLC fixed that in one shot.

## From CRO audit to redesigned page, in hours not weeks

I've been using Claude Design to leverage the design system which our internal team has put together to create high fidelity mock ups of new page designs and page re-designs for our website to better communicate proposals within our Senior Leadership Team. This is an incredible tool and it provides a really effective canvas through which to evolve thinking live in a workshop environment with non designers, rapidly incorporating feedback and building out an artefact that everyone can understand and align to.

This last month we had a CRO audit done for our website. I'm keen to implement the changes and start A/B testing, but knew we'd have to wait for design capacity — so I was curious to see how Claude Design would interpret this input against designs I'd already built. It should have been obvious this would "just work," but I didn't expect it to be this quick or useful. Using Claude Design against our own design system, cross-referenced with the CRO audit's recommendations, I can go from an old-style page to a redesigned one with CRO recommendations baked in, in hours instead of weeks.

This one genuinely blows my mind. Add in that you can go straight from Claude Design into Claude Code — taking these mockups and turning it into working, shippable code without ever leaving the same workflow. If I was still in the web design and development business right now, I'd be watching this space extremely closely. The pace at which these tools are converging is hard to overstate: design, feedback, and implementation are collapsing into a single continuous process.

## Matt Pocock's AI skills

I don't recall how I stumbled across this, on YouTube I think... [Matt Pocock's AI skills repository](https://github.com/mattpocock/skills) and his [YouTube channel]() are absolutely essential viewing if you're figuring out how to  work best with tools like Claude Code. The videos are really well produced and presented and the same goes for the skills. My favourites so far: **grill me**, **tickets**, **domain modelling**, and **improve codebase architecture**.

## Turning our ICPs into a Claude skill

On the subject of skills. We've got a set of ICPs for iHasco which are documented in a PowerPoint. I've been thinking about how we bring these to life in the business and make sure they're "in the room" when we're discussing product, marketing or commercial changes. Then it suddenly occurred to me... make them a skill! These skills now get invoked automatically in any Claude conversation our team is having - so the people we're building for are always considered.

---

*More next month!*
