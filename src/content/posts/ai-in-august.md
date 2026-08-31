---
title: AI in August
date: '2026-08-31'
description: >-
  Month two of my AI log. In August: an outreach tool for stalled onboarding
  clients, a genuinely tricky AI tutor bug fixed, auditing SEO keywords against our
  ICPs, a contract-review skill, and a reply to
  "I'm Done Using AI" that I should probably turn into its own post.
tags:
  - AI
  - Making things
relatedPosts:
  - slug: ai-in-july
    source: generated
  - slug: rediscovering-making-things
    source: generated
  - slug: introducing-fedi-follow-catch
    source: generated
  - slug: scratching-an-itch-to-build-a-game
    source: generated
  - slug: energy-economy-in-open-transport-tycoon-deluxe
    source: generated
bluesky: 'https://bsky.app/profile/nathanpitman.com/post/3muemui55vr7o'
mastodon: 'https://mastodon.social/@nathanpitman/117189490569530056'
---

Month two of my AI log. July was mostly Lerares and Enricher but August was busier and more scattered across the business. Here's what I got up to.

## Ember: reigniting stalled onboarding clients

I've been supporting our Client Success Director in building Ember, a tool that pulls data out of Planhat (the client success platform we run on) to spot clients who've stalled in onboarding and nudge them back into motion over email and WhatsApp.

This one started life as a static UI demo that our CSD knocked together in a hackathon with HG. I fed the output into Claude Code and used it to turn a rough demo into an actual phase 1 plan, a roadmap for what comes after, and a map of the dependencies we'd need to untangle to ship it. Going from "here's a screen someone mocked up" to something resembling a project plan in an afternoon is still pretty intoxicating.

## Lerares: bug squashing and a genuinely tricky "stuck" bug

Ahead of some wider internal learner testing at iHasco I squashed a decent pile of bugs in Lerares, added a way to capture in-the-moment feedback on a bad AI tutor response (a simple thumbs down), and embedded a course completion survey so learners can tell us how the conversational format felt versus a linear, static training session.

The one which took a little more time than others was a bug where the tutor could get "stuck" treating a learner as difficult, even after they'd re-engaged  following a tricky moment in the conversation. Fiddly to track down as the model's behaviour looked fine in isolation and only went south a few turns later.

I also spent some more time on observability: tracking whether a session hits a safety-critical wrong answer, making it easier to see how much of a course got covered and which video clips were actually shown, and an export script that pulls all of this out for offline analysis in Claude once our internal testing wraps up.

## Auditing SEO/PPC keywords against our ICPs

I spent some time in Claude chat auditing our PPC campaign keywords against our ICPs and where we want the business to go, looking for gaps across our campaigns and in on-site content on our marketing domain. This turned up a decent number of opportunities we weren't targeting and is helping sharpen the on-page copy on a few landing pages.

My observation here is that while I can definitley see some  leading-edge PPC and SEO agencies leaning in on this kind of tooling, others aren't and I'm pretty sure AI driven audit and analysis in PPC and SEO is going to become table stakes for the sector pretty quickly (if not already).

## A contract negotiation skill

After a busy couple of weeks supporting our new Sales Director with legal queries attached to larger ACV deals, I decided to build a Claude skill that captures relevant iHASCO product knowledge and our commercial position on various topics, to help generate a first pass review of legal queries. It's been genuinely useful, rapidly pulling out the key points (legalese stripped back) that really need focus in a discussion with our  legal counsel.

## "I'm Done Using AI"

Kottke [shared a link on Bluesky](https://bsky.app/profile/kottke.org/post/3msvuil6o7l26) to [I'm Done Using AI](https://brettcodes.com/im-done-using-ai/) on brettcodes.com:

> "It made me lazy. It made me stop caring. It made me a worse programmer. It made me depressed. Because I stopped doing the hard work, I stopped learning, I stopped growing, I stopped being the one making the software."

I left a comment:

> Interesting. Have we ever seen a shift in web development that's driven such a wild divide?
>
> As a one time designer/developer who hadn't written a line of code for half a decade, I feel very differently. I should probably write about that on my blog.

I probably should. Consider that a threat for next month.

## A few smaller things

- I ran a Claude SEO/AEO audit on nathanpitman.com, this blog, to see how it holds up against the same standard I'm applying at work (pretty well
as it turns out).
- We'd inherited some old SCORM packages through an acquisition where the source files are long gone, and needed to make some copy changes and SCORM output adjustments. Rather than rebuild the courses from scratch, we just threw Claude Code at it (it barely flinched).
- We've been using a Claude Chat  Project to assemble the inputs for a programme of work from a number of workstream leads and surface any gaps between what's being proposed vs the original brief so we can move quickly and dig into what's missing.

*More next month!*
