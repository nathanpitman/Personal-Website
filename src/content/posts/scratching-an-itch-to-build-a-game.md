---
slug: scratching-the-itch-to-build-a-game
title: Scratching the itch to build a game
date: 2026-04-11
description: From BBC Micro to browser - how nostalgia for text adventures, a
  dog-eared Ken Williams memoir, and some late-night Replit sessions led to a
  mobile-friendly port of Colossal Cave Adventure, built entirely on iOS.
tags:
  - Games
  - AI
---

Like many of you reading this, I grew up on computers. My earliest memories are of a BBC Micro which we had plugged into our CRT TV in the lounge, loading Elite from a tape drive, and hoping it didn't fail ten minutes in. Typing game code out from magazines line by line... only to discover I'd made a typo.

Before long my dad started to bring DOS based computers home from work, CRT based luggables which black and green screens running business tools like WordPerfect and later very early laptops with CGA LCD displays such as the [Tandy 1400 LT](https://en.wikipedia.org/wiki/Tandy_1400_LT) which I could use to play games.

I spent hours learning the exact commands required to navigate and instruct these machines, `cd` to move around, `dir` to see what was there... Despite my limited knowledge (and a few erroneous deletions no doubt!) this felt powerful, like a direct conversation with the computer (even if you had to be exact to make things work).

My earliest gaming memories on those machines are pretty vivid. I remember poking around in Microsoft BASIC, editing the [Gorilla Game](https://en.wikipedia.org/wiki/Gorillas_(video_game)) that shipped with MS-DOS 5 (the one where two giant apes on city rooftops throw exploding bananas at each other). I used to tweak the values in the .BAS file, save, re-run... see what I'd changed.

![Fair use, https://en.wikipedia.org/w/index.php?curid=1716850](https://upload.wikimedia.org/wikipedia/en/2/2f/Gorillas_screenshot.png)

Text adventures were also a part of my world. In a sense I guess they were an extension of the DOS interface, a blinking cursor that I could type words at to progress through a story. They reminded me of the "Choose your own adventure" books that I used to borrow from the local library every few weeks - I found them fascinating.

I can't remember exactly how the Sierra "Quest" games came into our house (probably pirated copies from my dads work!), but they did, and they created memories that really stuck. Games with that text-adventure DNA but with *pictures*, animation and sound (even if it was just a PC speaker). Memories of Roger Wilco bumbling through alien environments in glorious 16-colour EGA are still clear in my mind. Those early games still used a basic text parser, which had some charm that was lost in later games, as they moved on to more of a point and click user interface.

I played through the Sierra games as quickly as my dad could source them; King's Quest, Police Quest, Leisure Suit Larry (which I definitely wasn't old enough for!).

Getting to the point of all this... last year I picked up and consumed every single page of [Ken Williams memoir](https://www.amazon.com/dp/1716727367) and the desire to explore adventure games was rekindled. I'd also been fiddling around with [Replit](https://replit.com/refer/nathanpitman) at work and across a number of personal projects (one of them being to resurect this website), it occured to me that I could probably build my own text adventure game.

Now, while I do enjoy penning words from time to time, I'm certainly no storyteller - so I decided it might be fun to riff off an existing story or an existing game.

This led me down a bit of a rabbit hole, I definitley wasn't ready to embark upon creating a graphical adventure, but maybe I could create a modern mobile friendly interpretation of an old text adventure. A bit of searching and I stumbled across the story and lore that is [Colossal Cave Adventure](https://en.wikipedia.org/wiki/Colossal_Cave_Adventure), released a year before I was born and iterated and evolved so much over so many decades that it's now considered one of the most influential video games ever created.

This was a great base to start from as the original FORTRAN code had been [repackaged and released under an open source license](https://gitlab.com/esr/open-adventure) back in 2017.

![Colossal Cave Adventure running on a PDP-11/34 with a video display terminal](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Colossal_Cave_Adventure_on_VT100_terminal.jpg/960px-Colossal_Cave_Adventure_on_VT100_terminal.jpg)

Being the somewhat rusty developer I am, I started fooling around pretty quickly using Replit to parse the original story YAML file to build a POC and establish the basis of the user interface. I had a lot of fun and probably burnt more tokens that I needed to, in retrospect I should have spent some time riffing off how to approach this with ChatGPT or Claude to establish a structured plan.

Finding a few hours here and there during evenings and over weekends I managed to get what felt like a playable intepretation of the game up and running, deployed to Github pages and with some fun additions like an improved natural language parser.

I've definitley ran faster at this than I should have, as I've started to play through the game, shortcomings in logic and navigation paths have revealed themselves and much like the developers back in the 70's I'd not taken a "Test Driven Development" approach. Backing a game into tests after the fact... not fun. :D

But here's the thing which is likely familiar to anyone who's ever started a side project without a proper plan - I've enjoyed myself and that's all that matters!

I've loved fettling the user interface, taking the problem of a format born in the era of command line and making it feel at home on a modern mobile screen...

The thing I keep coming back to is that this project has been a really pure example of following what interests you. It started as "I want to build a game", evolved into "actually I want to adapt a game", shifted again into "I'm not really interested in the story at all, I'm interested in the interface", and has ended up somewhere I'm genuinely happy with.

Is it finished? Definitley not. Will it ever be? Probably not! But it's playable, it's live, and it was made entirely on iOS using Replit.

You can play it at [nathanpitman.github.io/CanonicalCaveAdventure](https://nathanpitman.github.io/CanonicalCaveAdventure/) or dig into the code at [github.com/nathanpitman/CanonicalCaveAdventure](https://github.com/nathanpitman/CanonicalCaveAdventure)

If you stumble into issues or problems, feel free to [log an issue](https://github.com/nathanpitman/CanonicalCaveAdventure/issues/new) and I'll see what I can do! :)
