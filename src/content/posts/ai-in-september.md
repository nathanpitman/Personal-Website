---
title: 'AI in September'
description: >-
  A month of AI odds and ends: slides, gap analyses, sprite graphics, a
  resurrected Director project and some grumbling about the doom headlines.
date: 2026-09-30
hidden: true
tags:
  - ai
  - monthly roundup
---

Mostly Claude this month, with a bit of ChatGPT in the kitchen and the garden.

## Work

I've been using Claude Design to lay out slides with our design system, and it's a massive time saver compared to hand crafting interesting layouts in PowerPoint. What's annoying is the PowerPoint file it spits out. A basic shape with some text in it comes out as a shape with a separate text layer sat on top, and the bounds of the two never match. It should really be text inside the shape. Tweaking anything by hand afterwards is a proper faff. You can use the comment/edit feature in Claude Design, but that's slow for small tweaks (and burns tokens for no good reason). There must be a middle ground somewhere, rapid prompting for the layout but tidier PowerPoint markup coming out the other end.

I also did a fast gap analysis on a bunch of project submissions against the original brief, to give feedback to the workstream leads. Give Claude the context and it's super quick at spotting where the focus needs to go.

We're looking at the AI tutor and whether we can swap models for different kinds of output, to speed up response times and save tokens. I've been using Claude Code to plan an A/B test on output quality. Sonnet for everything so far, but I suspect Haiku would cope fine with the basic, non-challenging responses. We'll see.

Oh, and we're looking at setting up tiger teams for AI initiatives. The biggest blocker hasn't been ideas, it's having the capacity to deliver them. So now we need to work out how to unblock that.

## Home

Missing a few key ingredients for a pasta dish, I threw a photo of my herb cupboard at Copilot / ChatGPT and got some great suggestions for making pasta, mince and beans a bit more interesting. Worked rather well.

I'm something of an amateur in the garden, so ChatGPT has been handy for identifying plants and working out where to put them based on which way the beds face the sun. The most common question is "is this a weed?"

## Making things

I handed Claude a Macromedia Director .dir file from the late 90s. In one shot it pulled it apart like a puzzle, extracted the source frames and audio, and rebuilt the whole thing in HTML, CSS and JavaScript in under 400 lines. It mirrors the original Director output exactly, right down to the seamless looping after the first play. Mind blowing.

Opus 5.5 is actually good at sprite graphics now. Sonnet gave me a hard time with them back in April, but Opus one-shotted the sprites for my OpenTTD add-on. I've also discovered Claude Code can just run a Linux install of OpenTTD, headless, and check whether its code changes have fixed the bug. There were two bug reports from genuine OpenTTD players sat there since May that I'd missed, and Claude Code "just fixed" them with no bother.

## Reading

This one is a different kind of model to Claude, from a startup called [TypeSafe AI](https://typesafe.ai/blog/introducing-system-one-models-and-jev). Jev is what they call a "System One Model". Where Claude chats and writes things out token by token (so it's slowish, and can go off-script), Jev only ever answers in a fixed shape, a bit like ticking boxes on a form: "is this customer likely to churn, yes/no, 87% confident". It can't hallucinate its way outside that shape, and it's quick and cheap. So not a conversation, more a very fast gauge sat inside a piece of software, for things like "route this ticket to team A or B". I think that's interesting.

Caught this one as well, which is hilarious, fantastic and horrifying all at once: [Alcorn State professor uses hidden method to catch 32 students using AI](LINK-TO-SUPERTALK-ARTICLE).

## Grumbling

The latest round of "AI might kill us all, please slow down" headlines, with the usual suspects calling for controls ([a brief history of AI executives calling for regulation](https://www.theverge.com/policy/995534/a-brief-history-of-ai-executives-calling-for-regulation) is worth a read). Is this real? I'm not convinced. It's a very fancy autocomplete engine with a massive amount of context and knowledge behind it, and it's not sentient!!! I do wonder if the BBC and others are misrepresenting the risk, and failing to explain that to people. And whether this is just the AI companies getting ahead of regulation that might stifle their value, which would be convenient.

Along similar lines, [this column](https://www.segasaturnshiro.com/2026/09/24/column-all-a-i-projects-are-digital-asbestos/) calls AI projects "digital asbestos". Is it just someone not realising that every advance in authoring tools brings a wave of slop first? Every technical advance is environmentally damaging until we find a way to refine it and make it more efficient, and we're already seeing that with LLMs splintering off into leaner subsets like Jev. The wave will crest, there'll be a bubble burst, investors will lose billions, and AI will find its natural level just like the dot com boom and bust. Nobody counted the servers the internet needed either, we just didn't think about it then. Progress is progress.
