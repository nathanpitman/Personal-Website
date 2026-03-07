---
title: "Migrating from TXP to EE - Step 2"
date: 2008-09-26
source: "http://nathanpitman.com/554/migrating-from-txp-to-ee-step-2"
archive: "https://web.archive.org/web/20090518092414/http://nathanpitman.com:80/554/migrating-from-txp-to-ee-step-2"
tags:
  - "ExpressionEngine"
  - "Textpattern"
---

So now we have our [ExpressionEngine](https://web.archive.org/web/20090518092414/http://www.expressionengine.com/index.php?affiliate=nathanpitman) install pretty much ready we need to export our data from Textpattern. At this point it may be wise to upgrade your Textpattern install to the [latest release](https://web.archive.org/web/20090518092414/http://www.textpattern.com/download).

During a bit of a [forum tennis match](https://web.archive.org/web/20090518092414/http://expressionengine.com/forums/viewthread/52585/) almost 3 years back(!) Jon Hicks and I managed to refine an export method which had been used for Textpattern previously to incorporate clean Textile and entry comments. I’ve summarised the steps you will need to take and the code you will need to use in your Textpattern templates below.

Before you start you will need to install a couple of Textpattern plug-ins to ensure that we can get our data out in just the right format.

First is a Textpattern plug-in called [msv\_show\_article\_field](https://web.archive.org/web/20090518092414/http://www.svihla.net/textpattern_plugins/) which is written by Martin Å vihla. This plug-in allows us to return the Textile formatted content for the articles instead of the HTML equivalent. This means that our articles will maintain their nice clean Textile formatting once imported into ExpressionEngine. Bonus!

Next is a plug-in called [glx\_thiscomment](https://web.archive.org/web/20090518092414/http://textpattern.org/plugins/213/glx_thiscomment) which is written by Johan Nilsson. This plug-in allows us to pull out the plain text name value for comments rather than the name wrapped in a ‘href’ linking to the comment authors website URL or email (the default behavior for the built in Textpattern comment tag). This is essential if we want to maintain article comments.

Now create 2 new Textpattern forms, one called ‘export’ and one called ‘exportcomments’. Add the following code to your ‘export’ form:

`TITLE: <txp:title />  
AUTHOR: <txp:author />  
DATE: <txp:posted format="%m/%d/%G %I:%M:%S %p" />  
PRIMARY CATEGORY: <txp:category1 />  
CATEGORY: <txp:category2 />  
<txp:php>echo "-----"."\n";</txp:php>  
BODY:  
<txp:msv_show_article_field name="Body" />  
<txp:php>echo "-----"."\n";</txp:php>  
<txp:if_excerpt>  
EXCERPT:<txp:msv_show_article_field name="Excerpt" /></txp:if_excerpt>  
<txp:php>echo "-----"."\n";</txp:php>    
<txp:if_comments>  
<txp:comments form="exportcomments" break="" />  
</txp:if_comments>  
<txp:php>echo "--------"."\n";</txp:php>`

…and the following code to your ‘exportcomments’ form:

`COMMENT:  
AUTHOR: <txp:glx_thiscomment key="name" />  
EMAIL: <txp:comment_email />  
URL: <txp:comment_web />  
DATE: <txp:posted format="%m/%d/%G %I:%M:%S %p" />  
<txp:message />  
-----`

Finally we need to call our ‘export’ form from a page template. Create a new page template called export and add the following code:

`<txp:article_custom section="name-of-your-txp-section-here" form="export" limit="500" offset="0" />`

Obviously you will need to tweak the parameters in your page template to suit the number of blog entries you have and the section from which you wish to export entries.

With all of the above done we should now be able to visit the public URL for this page template in our web browser ([http://yourdomainname.com/export/](https://web.archive.org/web/20090518092414/http://yourdomainname.com/export/)) and see the output. I had over 400 entries to export so the page took a while to load. Once fully loaded view source and save a copy to a plain text file on your local machine (txpexport.txt for example).

I know I promised to cover how we import this data into ExpressionEngine but I’ve been rambling on for a while now so I’ll leave that until my next post. ![smile](https://web.archive.org/web/20090518092414im_/http://nathanpitman.com/images/smileys/smile.gif)

[Next Step…](/web/20090518092414/http://nathanpitman.com/journal/migrating-from-txp-to-ee-step-3/)

Tagged: [ExpressionEngine](/tag/expressionengine), [Textpattern](/tag/textpattern)
