---
title: AI in September
description: >-
  Month three of my AI log. In September: using Claude Design for PowerPoint slides, a 90s Macromedia Director animation
  brought back to life in HTML, OpenTTD Mod fixes and isometric sprites, plus Jev, doom headlines and mountains of AI slop.
date: '2026-09-30'
hidden: false
tags:
  - ai
  - making things
relatedPosts:
  - slug: ai-in-july
    source: generated
  - slug: ai-in-august
    source: generated
  - slug: rediscovering-making-things
    source: generated
  - slug: >-
      back-from-the-dead-resurrecting-nathanpitman-dot-com-after-a-decade-in-the-dark
    source: generated
  - slug: introducing-fedi-follow-catch
    source: generated
---

Month three of my AI log. More of a personal focus this time around with Claude turning up, with a bit of ChatGPT thrown in for good measure in the kitchen and the garden.

## At work

I've been using Claude Design to lay out slides with our design system for product strategy sessions we've been running this month. This is such a massive time saver compared to hand crafting interesting layouts - it's not perfect though, Claude constructs layouts in a way which quickly becomes problematic if you then want to make subsequent edits. You can obviously use the comment/edit feature in Claude Design, but that's criminal for for small tweaks (and burns tokens for no good reason). There's probably a middle ground somewhere, rapid prompting for the layout with tidier and easier to edit PowerPoint markup coming out the other end. The moment has passed but I'll probably revisit this one and see if I can address these challenges through a custom skill.

## At home and in the garden

I was missing a few key ingredients for a pasta dish, so I threw a photo of my herb cupboard at ChatGPT and got some great suggestions back which made a simple pasta, mince and beans dish a bit more interesting. Thumbs up!

I'm a complete amateur in the garden, so I've been using ChatGPT to identify plants and get guidance on where to plant them based on how the beds face into the sun and the proximity of shade from other plants. My most common question is "is this a weed?" :D

## Making things

Off the back of a bit of a jaunt down memory lane I found myself wanting to bring an animation I crafted in the 90's that only existed as a Macromedia Director file back to life. I handed Claude the source .dir and in one shot it pulled it apart, extracted the source frames and audio, and rebuilt the whole thing in HTML, CSS and JavaScript. [The output is less than 400 lines and it mirrors the original exactly](https://nathanpitman.github.io/head-space.org-matrix/N3-Restoration/index.html), right down to the seamless looping of the image and audio after the first play. Love it!

After realising that some real people have been experimenting with [the OpenTTD add-on that I built back in May](/posts/energy-economy-in-open-transport-tycoon-deluxe/) I decided to pick this back up and address some of its shortcomings. First off - I just threw Claude Code at the bugs that these players had logged, it not only fixed them but it also spun up a Linux VM, installed OpenTTD and validated the fixes.

Earlier in the year when I first threw this together, I had reluctantly accepted that the current crop of AI tools weren't going to bring corresponding sprite artwork I needed to life, I made do with same janky placeholders. I thought I'd give it a fresh shot with Claude Opus - while it's not perfect, [it's nailed the fundamentals and I've got some solid artwork I can now build on](https://github.com/nathanpitman/Open-TTD-Renewable-Energy-Mod#energy-transition-industries--openttd-mod).

## Recommended reading

[Jev, from TypeSafe AI](https://typesafe.ai/blog/introducing-system-one-models-and-jev) is worth reading up on. Where general AI models are designed to deliver results as a conversational string, Jev only ever answers in a fixed shape. It can't hallucinate its way outside of that container, it's ridiculously fast and way more efficient than general models.

A short article that I stumbled across via The Register about a professor who used the old "hidden agent instructions method" in a student task he set. This is both [hilarious, fantastic and horrifying all at once](https://www.supertalk.fm/alcorn-state-professor-uses-hidden-method-to-catch-32-students-using-ai/).

## Grumbling

In the latest round of headlines suggesting that "AI is going to kill us all", the usual suspects are calling for controls, the Verge have [a great write up on the history of AI executives calling for regulation](https://www.theverge.com/policy/995534/a-brief-history-of-ai-executives-calling-for-regulation). Do we need regulation? Probably. Is AI going to kill us? Probably not. Is it the humans in the loop that are the greatest risk? Most likely!

On the subject of AI slop, [this column by Nick at Sega Saturn Shiro](https://www.segasaturnshiro.com/2026/09/24/column-all-a-i-projects-are-digital-asbestos/) calls out AI generated retro video game projects as "digital asbestos". I won't argue that we've not been flooded with mountains of shit, but its worrh remembering that this is not unusual when we experience technological advances. [Paul Boag makes a similar point](https://boagworld.com/emails/ai-decision-making/), using desktop publishing as the example. When DTP arrived in the mid 80's, graphic designers panicked,  suddenly anybody could knock up flyers and posters and we were overrun with Comic Sans and clip art, this shift in capability beought a new baseline for what an expert was in that industry and I suspect we'll see the same for the sectors most impacted by AI. A new definition of roles and where "expertise and trust" sit.   The relative ease and pace at which things can be done after one of these shifts always drives an onslaught of slop, that wave will crest and subside as we find a new baseline.

And finally... a sobering software recommendation, one from my old acquaintance David Longworth, [a MacOS menubar app which tracks your AI usage and estimates carbon emissions and water & electricity usage](https://github.com/abovedave/ai-eco-impact).

*More next month!*
