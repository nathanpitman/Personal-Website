---
title: Energy Transition Industries Gets a Proper Going Over
date: '2026-09-27'
description: >-
  Two days of fixes and much better sprites for my OpenTTD energy mod, helped
  along by Claude Opus and a few people kind enough to actually try it.
tags:
  - Gaming
  - Making things
  - AI
---

Back in May I shared [Energy Transition Industries](/posts/energy-economy-in-open-transport-tycoon-deluxe), my little energy economy mod for OpenTTD, and fully expected nobody to look at it. Then people actually started trying it and reporting bugs (the first issues landed within a week of that post), which was lovely and a bit humbling in equal measure. It's also the reason I've spent the last two days giving it a proper going over.

Some of what turned up was embarrassing, I'll be honest. The Game Script that's meant to drive town growth never actually did anything. It went looking for the Power cargo by number, OpenTTD hands the label over as text, so it never found it... and quietly sat there doing nothing. The Power and Uranium cargos weren't registering with the game at all, and every coal mine on the map was being drawn as a hydro dam. So the headline feature from my last post didn't work. Good stuff.

That's all fixed now, along with a pile of smaller things. Wind turbines turn, Power and Uranium have their own cargo icons, hydro dams have to sit on real water and can face any direction, and news messages tell you which town just got a new wind farm. The worker mechanic has gone too, it was more hassle than it was worth. There's also a headless check that boots a real copy of OpenTTD, generates a map and runs a few months to make sure the industries really do produce what they should.

The bit I'm most pleased with though is the art. In April Claude's sprites were poor at best, mostly smooth shapes that looked nothing like the chunky pixel art around them. This time round, with Claude Opus doing the work, it's a different story. We wrote a proper sprite spec together, checked it against the OpenTTD wiki and original TTD art, and worked through every sprite one industry at a time. Things are now lit from the lower right like the base game, solar panels tilt towards the light, the nuclear cooling tower uses the base-game palette, and everything ships at normal size so it doesn't look oddly sharp when you zoom in. It even worked out that the substation shouldn't have a pylon since the game has no overhead power lines (a detail I'd never have spotted). It's not perfect, a pixel artist would still do better, but it finally looks like it belongs in the game.

If you've tried it, thank you, it's the reason I'm still tinkering. [Grab v13 on GitHub](https://github.com/nathanpitman/Open-TTD-Renewable-Energy-Mod) and let me know what breaks next.
