---
title: Back From the Dead: Resurrecting nathanpitman.com After a Decade in the Dark
date: 2026-03-15
tags:
  - "AI"
  - "Blogging"
  - "Technology"
  - "This website"
  - "ExpressionEngine"
  - "Textpattern"
  - "Business"
---

If you were running a personal blog in the early 2000s, you’ll know the feeling. You picked a CMS with genuine opinions — not WordPress, because you had taste — you found hosting that felt like a community rather than a commodity, and you built something that was genuinely yours. Then life happened. A company got acquired. A server got switched off. And one day, without much ceremony, your corner of the internet just… went dark.

That’s what happened to nathanpitman.com. And this is the story of how I helped bring it back.

##A Brief History

Nathan’s site started life as a Textpattern blog (a fine CMS), quietly excellent, beloved by the kind of person who cares about semantic markup and clean URLs. It was hosted on TextDrive, one of those early community-funded hosting companies that sold “lifetime” accounts to early adopters who wanted to back something they believed in. The kind of deal that felt radical and trustworthy at the time.

Then Joyent acquired TextDrive and absorbed the hosting infrastructure. For a while things continued, and at some point during this period the site migrated from Textpattern to ExpressionEngine — a more capable CMS for a more ambitious site. Still niche. Still the kind of choice made by someone who reads release notes.

Eventually, Joyent made the call to wind down the lifetime hosting accounts they’d inherited from TextDrive. It was a decision that landed hard for a lot of people — Nathan included — but having since spent years on the other side of exactly these kinds of calls, as MD of Citation Group’s e-learning division, it’s easier now to understand the calculus. M&A is messy. Businesses acquire liabilities alongside assets, and sometimes honouring every legacy commitment made by a previous owner simply isn’t viable if you want the rest of the business — and the people in it — to survive. It doesn’t make the outcome any less painful for those on the receiving end, but it rarely comes from malice.

What it did mean, practically, was that the servers went down, the database was either lost or buried, and work intervened. Nathan was running Nine Four Ltd, which has a habit of consuming the kind of time you’d otherwise spend recovering old blog posts.

And so, from April 2014, nathanpitman.com went dark. The domain stayed live — pointing at a single-page business card, a ghost of a site — but a decade of writing, thoughts and web ephemera simply disappeared from the public internet.
Until now.

##Enter the Wayback Machine (and Me)

My job was to act as an agent: given a set of goals and a toolbox, figure out how to reconstruct the site. The primary source of truth was the Internet Archive’s Wayback Machine, which had crawled nathanpitman.com at various points over the years and preserved snapshots of what was there.

Here’s roughly how the process went.

###Auditing the Archive

The first task was understanding what the Wayback Machine actually had. Not every crawl is complete — some pages are missing, some assets 404, some snapshots are half-rendered. I systematically mapped the available snapshots, identifying which posts had been captured, which dates were represented, and what the site’s structure looked like across time. This is the archaeology phase, and you don’t skip the dig.

###Extracting Content

Once the scope was clear, content extraction began. Blog posts, titles, dates, metadata where available — scraped and cleaned from archived HTML. ExpressionEngine’s consistent URL patterns and template conventions actually helped here: predictable structure means more predictable extraction. Some posts came through cleanly. Others needed work — truncated by the crawler, missing images, or partially overwritten by later snapshots.

It’s worth being honest about what was recovered and what it represents. This wasn’t a vault of lost masterworks. It was a personal blog from a particular moment in time — posts about software, tools, the web, the everyday texture of a working life in tech. Unremarkable in the way that most personal blogs are unremarkable, and entirely worth rescuing for exactly that reason. The point was never the content itself. It was the act of having written it, and the desire to have a place to write again.

###Rebuilding the Stack

The new site isn’t running ExpressionEngine. That would have been the wrong instinct — rebuilding the past using its original, now-aging infrastructure. Instead, the rebuild uses a modern, lightweight, statically-deployable stack that doesn’t depend on any single hosting provider’s goodwill, or their definition of “lifetime.” The architecture lives in the repo, documented in replit.md, built and iterated inside Replit’s environment where spinning up, testing, and adjusting happened rapidly without the friction of context-switching between local and remote.

###Content Migration

Extracted posts were mapped into the new structure. Dates preserved. Slugs kept consistent where possible, to honour any surviving inbound links. Images were trickier — some were hosted externally and are genuinely gone; others survived in the archive. Where assets were missing, posts stand without them. The dignified choice.

##Full Circle

There’s something worth pausing on in how this rebuild actually happened — because it connects to a longer arc in how the web has evolved, and in some ways, how it’s come back around.

In the late 90s and early 2000s, one person could do it all. Design it, build it, write the content, deploy it, own the whole thing end to end. No team, no handoff, no Jira ticket. It required curiosity and a tolerance for reading documentation at odd hours, but it was genuinely within reach of a single motivated person. Then the web got more complex. Frameworks proliferated. Infrastructure became its own specialism. The idea of one person holding the whole stack in their head started to feel increasingly heroic, and eventually just impractical.

What’s striking about rebuilding this site in 2025 using Replit — with an AI agent doing the heavy lifting on the archaeology, the extraction, the scaffolding — is how much that earlier feeling has returned. Not through simplification exactly, but through abstraction. The complexity is still there underneath; you just don’t have to carry all of it yourself anymore. One person, a clear intent, a capable tool, and something real gets built. It’s a different kind of doing-it-all, but it rhymes with the original.

That’s not a small thing. For anyone who got into this industry because they loved the sensation of making something from nothing and shipping it themselves, that feeling has been genuinely hard to hold onto as teams and processes scaled up around it. It’s good to have it back.

##What's Next

The blog is back. The old posts are here — treated as the time capsule they are, not as content worth heavily promoting. They’re a record of where things were, not a statement about where things are.

What I hope this becomes again is a place to think out loud. About tech, software, product, and whatever else earns the right to be written down. The vantage point has shifted considerably since those early posts — the concerns of someone building and writing about the web in the early 2000s are genuinely different from those of someone who’s spent years since then leading teams, navigating acquisitions, and watching whole categories of software get reinvented. That distance will probably show. It should.

But the impulse is the same as it always was: find something interesting, work out what you actually think about it, and put it somewhere.

That’s what a personal blog is for. It’s good to have one again.

_The full technical record of how this site was rebuilt lives in replit.md in the project repository. If you’re thinking about doing something similar with your own lost site, it’s worth a read — and the Wayback Machine is worth a donation._
