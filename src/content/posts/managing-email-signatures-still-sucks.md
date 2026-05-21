---
title: “Managing Email Signatures Still Sucks…”
date: '2026-05-21'
description: >-
  Sixteen years ago I wrote three sentences about email signatures being a
  mess. Turns out they still are — but for different reasons now.
tags:
  - Marketing
  - Technology
relatedPosts:
  - slug: email-signatures
    source: generated
  - slug: sitevista-launches-email-testing-service
    source: generated
  - slug: mark-of-the-web-or-why-ie6-sucks
    source: generated
  - slug: how-not-to-apply-for-a-job
    source: generated
  - slug: sitevista-to-become-litmus
    source: generated
---

Back in December 2009, [I wrote three sentences about email signatures](https://nathanpitman.com/posts/email-signatures/). The gist was: every email client handles signatures differently, rolling them out across a business was a pain, and surely someone could fix this with a URL schema and a bit of server-side logic?

I was running Nine Four at the time, I’d probably just been through the ritual of building an HTML email signature template for a client and aside from wrestling with Outlook’s rendering engine, I was probably also realising what a pain it was going to be for the client to roll it out in a reliable way.

Now… some sixteen years later, I’m going through exactly the same exercise, however this time I’m the client, and I’ve got a proper reason to find a solution to that distribution problem, beyond an abstract blog-able frustration.

We’ve been doing a fairly thorough review of our prospect journey and somewhere in the middle of that process it’s became pretty uncomfortable for me to see how inconsistent our email signatures are. Different fonts, some with social media icons, some without, broken layouts, old links, old branded promo banners - [it’s a hot mess](https://sighq.app/posts/why-your-team-emails-all-look-different/).

The current process, if you can call it that, is that we periodically send round an email asking colleagues to cut and paste a signature in their email client. Some of us do it the same day, some of us forget (guilty!) and sometime we copy and paste it but mess up the formatting when trying to personalise it to our own needs.

Of course over time… all of this just continues to drifts, until the next round of “can everyone update their signatures please” and the cycle repeats... :D

This might feel minor in isolation but when I zoom out and think about the cumulative brand impression across millions of outbound emails every year, it’s nuts that we’re OK with this process.

It amazes me that in the 17 years that have passed since that post… neither Microsoft or Google have done anything meaningful to resolve this gap - thankfully a bunch of independent businesses have been emerged around providing a solution (we’ll be checking these out!).

Some of these work by routing all your email through their servers (Arghhhh! GDPR minefield!), but more recently it looks like a number have started to adopt a more sophisticated approach, [leveraging APIs in Outlook](https://learn.microsoft.com/en-us/samples/officedev/office-add-in-samples/outlook-add-in-set-signature/) and Gmail to inject signatures on compose events, that feels much more like the way this should happen, and not far off what I was imagining way back in 2009.

Missed opportunity perhaps?
