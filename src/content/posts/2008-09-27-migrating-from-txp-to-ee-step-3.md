---
title: "Migrating from TXP to EE - Step 3"
date: 2008-09-27
source: "http://nathanpitman.com/555/migrating-from-txp-to-ee-step-3"
archive: "https://web.archive.org/web/20090518094453/http://nathanpitman.com:80/555/migrating-from-txp-to-ee-step-3"
tags:
  - "ExpressionEngine"
  - "Textpattern"
---

Now comes the exciting part. We’re going to import our old Textpattern artcicles into [ExpressionEngine](https://web.archive.org/web/20090518094453/http://www.expressionengine.com/index.php?affiliate=nathanpitman)!

First off we will need to upload the text file that we generated in our export from Textpattern in Step 2. I just dropped my file into the web root of my server so I could get at it easily from ExpressionEngine.

Once your file has uploaded log-in to your ExpressionEngine control panel and navigate to the ‘Admin’ tab and then ‘Utilities’ and ‘Import Utilities’. We’re going to use the ‘Movable Type Import Utility’.

Complete all the fields on the import screen, your file path should be something like ‘../txpexport.txt’. Everything here should be pretty obvious, I just made sure I un-ticked the ‘Create members from commenters?’ option but obviously you might want to do things differently.

I’d suggest you do a few dry runs first of all with a small export from your Textpattern install to verify that everything is working as expected. I did an export of 10 entries from Textpattern initially just to test and then deleted all the entries and categories before performing my final import.

Ok so we have all our articles imported now but we’re not quite done yet. We need to set up a ‘File Upload’ location for our Textpattern Images. I decided to just use the default ‘Main Upload Directory’ which is already configured in ExpressionEngine.

I downloaded all my image assets from my Textpattern image upload folder and uploaded them all to my ExpressionEngine image upload folder. Now in my case the file paths are different (though you could always mimic the folder location which Textpattern uses in ExpressionEngine. If like me you didn’t you can quickly and easily do a find and replace on all your article image file paths.

Navigate to ‘Admin’ and then ‘Utilities’ and select ‘Find and Replace’. In my case I entered ‘/images/uploads/’ in the ‘Search for this text’ field and ‘/images/uploads/uploads/’ in the ‘replace with this text’ field. Select the entry field that you want to affect and the click submit.

All of your article entries should now include any inline images or media. Next we’ll be looking at how to deal with Textpattern ‘links’ and ‘file assets’.

[Next Step…](/web/20090518094453/http://nathanpitman.com/journal/556/migrating-from-txp-to-ee-step-4)
