---
title: "Hide template based content until a specified date in ExpressionEngine"
date: 2011-07-14
source: "http://nathanpitman.com/609/hide-template-based-content-until-a-specified-date-in-expressionengine"
archive: "https://web.archive.org/web/20110717182237/http://nathanpitman.com:80/609/hide-template-based-content-until-a-specified-date-in-expressionengine"
tags:
  - "ExpressionEngine"
---

Sometimes it’s desirable to hide content on your website from users a specified date. With ExpressionEngine we already have built in functionality to do this with weblog/channel entries. If you want to achieve a similar effect for blocks of template code then you can simply combine the conditional and date tags as follows:

`{if {current_time format="%d%m%Y"} >= "17072011"}...{/if}`

Initially I thought I might need a plug-in to achieve the desired result but it was great to discover I could do just what I wanted out of the box. :)

**Update:** As pointed out by Philip there are [some issues](https://web.archive.org/web/20110717182237/http://twitter.com/synx508/status/91496649033138178) with this approach so tread carefully people, I’ve only tested this concept in a scenario where the current date falls within the same month/year etc.
