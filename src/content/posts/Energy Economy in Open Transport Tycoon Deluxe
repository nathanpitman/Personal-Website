---
title: "Energy Economy in Open Transport Tycoon Deluxe"
description: "A full energy economy mod for OpenTTD that introduces nuclear and renewable industries over time — built for my own amusement."
pubDate: 2025-05-09
tags: ["games", "making things", "openttd", "side projects"]
draft: false
---

OpenTTD is a game I come back to over and over again (for decades!). There's something deeply satisfying about its pace, the logic, building things, watching the towns grow, optimising travel routes for efficiency - I love it!

Something thats always nothered me though is how as the game clock ticks through the decades and the world changes with it, the energy economy remains static, the coal mine feeds the coal power station, the coal power station sits there forever, and somehow the game transitions to Maglev trains but we're still
generating electricity from coal! [Robert Llewellyn](https://bsky.app/profile/did:plc:icpcewckffb4arhmydvyovun) would be shook!

This bothered me so much that i decided to dust off a Claude chat and build something. now this is absolutely not finished, in fact the gaping chasm is the graphics... a pixel artist i am not so youll find some pretty ropey efforts from Claude in situ. maybe at soke point i can find someone generous enough to contribute some artwork. 

**Energy Transition Industries** is a NewGRF + Game Script combo that wires a proper energy economy into your game. New industries appear across the timeline — Hydroelectric Dams from 1950, Nuclear Power Plants from 1956, Tidal Stations in 1966, Wind Farms in 1980, Solar Farms from 1990. Coal plants stop spawning around 1970 and start closing out by 1990. The dates are all configurable if you want a different pace.

The bit I'm most pleased with is the invisible power grid. A Game Script runs every 30 days, scans towns for nearby generators, and sets growth rates based on how much power is available. No power? Town stops growing. Full power plus a nearby substation? It hums along nicely. It makes energy feel like something that actually matters, rather than just another cargo chain to ignore.

There's also a worker mechanic — generators need a steady supply of passengers to run at full output. It ties your transport network into your energy infrastructure in a way that feels natural.

I built this for myself but it's on GitHub if you fancy giving it a shot, feedback appreciated. 

[github.com/nathanpitman/Open-TTD-Renewable-Energy-Mod](https://github.com/nathanpitman/Open-TTD-Renewable-Energy-Mod)
