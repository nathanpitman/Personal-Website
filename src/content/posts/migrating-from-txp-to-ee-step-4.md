---
title: "Migrating from TXP to EE - Step 4"
description: "Step 4: fixing up content after the Textpattern-to-ExpressionEngine migration."
date: 2008-10-04
source: "http://nathanpitman.com/556/migrating-from-txp-to-ee-step-4"
archive: "https://web.archive.org/web/20090519081155/http://nathanpitman.com:80/556/migrating-from-txp-to-ee-step-4"
tags:
  - "ExpressionEngine"
  - "Textpattern"
---

Right so, a quick re-cap… we’ve exported our data from Textpattern, imported it into [ExpressionEngine](http://www.expressionengine.com/index.php?affiliate=nathanpitman) and done a quick find and replace to fix up our embedded images.

Next job on our list is to fix up any links to file assets which we have in our entries. Textpattern uses a file download manager which records total file downloads and obfuscates the actual file path in the URL which you place in your entry. ExpressionEngine, whilst being a fantastic CMS, does not provide support for file download counts or obfuscation (here’s hoping for EE2!) which is a shame but hey ho… let’s soldier on.

We’re going to have to repair any links to files in our entries because the two systems link to file assets in different ways. So within the ExpressionEngine control panel navigate to the ‘Edit’ tab and use the search tool at the top of the screen to search for the string ‘/file\_download/’ in ‘titles and entries’. This should give you a list of all the entries that you will need to fix up.

Unfortunately we’re going to have to do this manually (unless you can think of a better way!) so download all your file assets from your Textpattern install and then upload them to your file upload destination in ExpressionEngine (Prob best done via FTP).

Now we just need to amend the file paths in our entries so work through the list of entries that contain the ‘/file\_download/’ string and replace the old Textpattern file path references with the new ExpressionEngine file path references.

Now, you can either use the ‘copy and paste info’ that the ‘File Manager Module’ provides you with (a standard href link) or hand craft a Textile based equivalent. The choice is yours.

Ok so I ran out of time a little today and didn’t have a chance to explain how we can migrate out Textpattern Links but I promise I’ll cover that in my next post! ![smile](http://nathanpitman.com/images/smileys/smile.gif)

[Next Step…](/web/20090519081155/http://nathanpitman.com/journal/558/migrating-from-txp-to-ee-step-5)
