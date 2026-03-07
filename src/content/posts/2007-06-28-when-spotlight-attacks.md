---
title: "When Spotlight Attacks"
date: 2007-06-28
source: "http://nathanpitman.com/512/when-spotlight-attacks"
archive: "https://web.archive.org/web/20090823042016/http://nathanpitman.com:80/512/when-spotlight-attacks"
tags:
  - "Apple"
---

With my MacBook only being a couple of weeks old there are still a few kinks to iron out in the [Nine Four](https://web.archive.org/web/20090823042016/http://www.ninefour.co.uk/) IT infrastructure, one of those being printing to a shared printer on a Windows machine which I affectionately call ‘Oto’.

After having tried a number of drivers that are pre-installed with OS X and had no luck I decided to Google my problem and discovered a Tech note on the apple website which suggested that the drivers I needed could be installed from the OS X install disc. I followed the instructions and ran the installer, at this point OS X hangs completely, no access to the finder, no spinning ball of death, nothing. A few minutes pass with no further activity and I decide to force a hard reboot.

On restarting everything seems fine, I get the log-in prompt, enter my password and up pops my wallpaper, and then after a long wait, the spotlight and then after an even longer wait… nothing. I restart again, I get the same thing.

This is where the power of Google comes in handy, as does having a Windows machine called ‘Oto’ sitting around. I Google ‘*spotlight appears doesn’t start up os x*‘ and bam the first hit is a blog post by a guy called Philip McClure which [talks about the exact same problem](https://web.archive.org/web/20090823042016/http://grimthing.com/archives/2006/01/07/Mac_OSX_Tiger_hangs_on_boot/).

After a lengthy and very interesting read I take the advice of one of his commenters and download a little shareware app called [Onyx](https://web.archive.org/web/20090823042016/http://www.titanium.free.fr/pgs/english.html). I drop it onto a USB drive, copy it across to the MacBook (To start in safe mode hold down the shift key on boot), install it and then use it to safely delete the Spotlight index, as this apparently is what is causing my problem.

I restart my MacBook, log-in, the wallpaper pops up then after an excruciating wait (which I can only assume is spotlight rebuilding it’s index) everything is back to normal. Panic over!

**Update:** Argh! It happened again on Wednesday night (11/07/07) but was easy to sure thanks to Onyx.

**Update:** The Spotlight index got corrupted ‘again’ today (31/07/07) but was again easy to fix with Onyx. Twice in one month is a bit much though. :/

Tagged: [Apple](/tag/apple)
