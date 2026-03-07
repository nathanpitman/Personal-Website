---
title: Fireworks API wish
date: 2004-05-24
source: http://nathanpitman.com/138/fireworks-api-wish
archive: https://web.archive.org/web/20100106032947/http://nathanpitman.com/138/fireworks-api-wish
tags:
  - "Fireworks"
---

So, I’ve been looking into writing some more Fireworks MX Extensions recently and something has cropped up. The one thing the Fireworks API really lacks is a method for grouping history steps.

This only really rears its ugly head as you begin to develop more involved Commands or Command panels which generate larger numbers of fireworks api calls before completing.

For example, my ‘Duplicate, Offset & Rotate’ command panel can easily generate more than 30 actions. You may think ‘why is this an issue?’. Well, for the end user this creates a real useability issue when they want to perform a simple ‘undo’. They will discover that the individual actions called by the command panel have rendered the document history next to useless, and the undo has a unexpected behaviour, simply undo-ing the last action that the command panel executed, not the entire ‘set’ of actions.

While I was writing some of my commands that generate more actions (or steps as the history panel refers to them) I did tinker with increasing the number of history steps before the operation. This however isn’t ideal and still doesn’t resolve the unexpected behaviour that the user experiences.

So here’s my proposal for the Fireworks API:  

`fwapi.startHistoryGroup("name");  
// some actionscript here  
fwapi.endHistoryGroup("name");`

  
As you can see the function call has a single argument (name) which allows the developer to give his or her history group a unique reference that reflects that of the command or command panel. For the user the end result would be the difference between figure 1 and figure 2.

![Fireworks: Grouped History Steps](/images/18.jpg "Fireworks: Grouped History Steps")

Hey, if I’m lucky a member of the Fireworks software development team might be reading my blog. :)

Tagged: [Fireworks](/tag/fireworks)
