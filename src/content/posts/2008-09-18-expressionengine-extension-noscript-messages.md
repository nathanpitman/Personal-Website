---
title: "ExpressionEngine Extension: NoScript Messages"
date: 2008-09-18
source: "http://nathanpitman.com/551/expressionengine-extension-noscript-messages"
archive: "https://web.archive.org/web/20090520003125/http://nathanpitman.com:80/551/expressionengine-extension-noscript-messages"
tags:
  - "ExpressionEngine"
---

While working on a project recently I noted that [ExpressionEngine](https://web.archive.org/web/20090520003125/http://www.expressionengine.com/index.php?affiliate=nathanpitman) uses a ‘JavaScript:history.go(-1)’ within the ‘User Message’ templates to allow you to return to the page from whence you came if you submit a form without completing all the required fields, perform a search and return no results etc.

I wanted to ‘do the right thing’ and ‘hacked’ an alternative as documented in [this thread](https://web.archive.org/web/20090520003125/http://expressionengine.com/forums/viewthread/85472/) on the ExpressionEngine Forums. This hack picked up the referring page URL and passed that to the User Message template instead.

I kept a note of my hack and when I had to upgrade this particular install to the latest point release I set about re-implementing it. At this point [Derek Jones](https://web.archive.org/web/20090520003125/http://derekderekderek.com/) helpfully pointed out that I could create an ExpressionEngine Extension to do the same job, negating the need to ‘re-implement’ the hack again and again. Thanks for the prod in the right direction Derek! Here’s my first ExpressionEngine Extension – ‘NoScript Messages’.

> **Download:** [ext.noscript\_messages.php.zip](/web/20090520003125/http://nathanpitman.com/files/ext.noscript_messages.php.zip)

Obviously let me know in the comments if you have any thoughts on how this can be improved. Enjoy!
