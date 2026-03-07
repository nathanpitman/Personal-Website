---
title: "Migrating from TXP to EE - Step 1"
date: 2008-09-22
source: "http://nathanpitman.com/553/migrating-from-txp-to-ee-step-1"
archive: "https://web.archive.org/web/20090524014744/http://nathanpitman.com:80/553/migrating-from-txp-to-ee-step-1"
tags:
  - "ExpressionEngine"
  - "Textpattern"
---

Ok so a lot of this will be obvious but hey, here we go… I’ve decided to tackle the migration by setting up an [ExpressionEngine](https://web.archive.org/web/20090524014744/http://www.expressionengine.com/index.php?affiliate=nathanpitman) Core Install on a sub domain ~~([http://ee.nathanpitman.com](https://web.archive.org/web/20090524014744/http://ee.nathanpitman.com/))~~ where I will be able to get everything up and running before I switch from the old Textpattern install for good.

First step quite obviously is to install ExpressionEngine Core (The free version of the CMS). I won’t explain how to do this, it’s dead easy and there are a ton of useful resources out there for you to look at if you’ve never used EE before.

First thing to do after you’ve completed the install is to modify the default custom field group for the default weblog to match the fields which you have in Textpattern. Textpattern has a ‘Body’ and ‘Excerpt’ field so you could simply rename the default ‘extended’ field if you want to feel at home.

As we’re migrating from Textpattern all our posts that we will be importing will be formatted with Textile or XHTML so we’re going to need to mimic that environment in ExpressionEngine. To do so we’ll need to install a handy little 3rd party plug-in called ‘Textile’! You can download the [Textile Plug-in](https://web.archive.org/web/20090524014744/http://expressionengine.com/downloads/details/textile/) from the ExpressionEngine website. Once installed you will need to log-in to your ExpressionEngine control panel again and change the default formatting for the custom fields (body and excerpt) to use ‘Textile’ rather than XHTML. Don’t worry if some of your Textpattern blog posts have XHTML in them, Textile will still render these just right.

Finally, before we move on to exporting our blog entries from Textpattern we need to install a module that will allow us to more easily upload and manage files as we are used to doing so with the Textpattern ‘Files’ tab. The nearest equivalent that I have found over the years is the [Low File Manager Module](https://web.archive.org/web/20090524014744/http://loweblog.com/freelance/article/ee-file-manager-module/). It doesn’t provide download counts but it does pretty much everything else you could want and ties in beautifully with the ExpressionEngine File Upload preference settings.

Next we’ll be looking at how to export all our blog entries from Textpattern and pull them into ExpressionEngine. :)

[Next Step…](/web/20090524014744/http://nathanpitman.com/journal/migrating-from-txp-to-ee-step-2/)

Tagged: [ExpressionEngine](/tag/expressionengine), [Textpattern](/tag/textpattern)
