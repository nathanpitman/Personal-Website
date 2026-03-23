---
title: "Migrating from TXP to EE - Step 5"
description: "Step 5: setting up links and finishing touches after migrating from Textpattern to ExpressionEngine."
date: 2008-10-16
source: "http://nathanpitman.com/558/migrating-from-txp-to-ee-step-5"
archive: "https://web.archive.org/web/20090518092434/http://nathanpitman.com:80/558/migrating-from-txp-to-ee-step-5"
tags:
  - "ExpressionEngine"
  - "Textpattern"
---

[ExpressionEngine](http://www.expressionengine.com/index.php?affiliate=nathanpitman) does not provide a ‘native’ facility for recording links but the immense flexibility of ExpressionEngine Weblogs allows you to create your own links facility by just creating a new Weblog with the relevant custom fields (Title, URL & Description) and then setting up a related category group.

Just as we exported our article data from Textpattern we ‘could’ also export our Link data and then use the same import process to pull it into ExpressionEngine.

However this is not the route I’m going to take. Personally I would much rather maintain my ‘noteworthy’ links using a tool like [Delicious](http://delicious.com/) so I’m going to show you how we can migrate our Textpattern links to Delicious and then have them displayed inline within an ExpressionEngine template.

Luckily for us there’s a fantastic Textpattern Extension called [ajw\_bookmarks](http://compooter.org/2007/01/textpattern-plugin-ajw-bookmarks/) that provides us with a quick and easy way to export our Links to a ‘Bookmarks’ file which most bookmark services and browsers can import.

Download and install the Extension within Textpattern and then navigate to the Bookmarks tab within Extensions and select the first option ‘Export bookmarks’.

Now that we have our locally saved Bookmarks file navigate to the [Import Bookmarks](https://secure.delicious.com/settings/bookmarks/import) tool on the Delicious website (obviously you will need to log-in first) and then choose the ‘Custom import’ option.

Now we want our bookmarks to be visible to the public so check ‘make all my imported bookmarks public’. If you wish to use Delicious to record bookmarks for personal use and also for display on your website you may want to tag all the bookmarks you are going to import with a keyword such as ‘noteworthy’ or similar. This is the approach I took. By adding this tag I can identify which bookmarks should be pulled out of Delicious for display on my website. Now click ‘Import Now’.

Delicious should have a bit of a think, depending on the size of your links collection and then display your imported bookmarks.

We’re going to use the ExpressionEngine ‘Magpie’ plug-in to pull our Delicious links into our template and display them inline. The plug-in will also cache the data so if Delicious should go down our site won’t fall apart. The Magpie plug-in is a part of the default ExpressionEngine install so just open up a template file and drop in the following code:

`{exp:magpie url="http://feeds.delicious.com/v2/rss/nathanpitman?count=10&tag=noteworthy" limit="10" refresh="60"}  
<ul>  
{items}  
<li><a href="{link}" title="{title}">{title}</a><br />  
{description}</li>  
{/items}  
</ul>  
{/exp:magpie}`

Obviously you’ll have to replace ‘nathanpitman’ in the feed URL with your own Delicious username and if you want to pull back bookmarks with a particular tag then include the ‘&tag=’ parameter and variable in the querystring as I have above.

You should now have a nice unordered list displaying your 10 most recent Delicious bookmarks or my 10 most recent Delicious bookmarks if you forgot to change the username in the URL. ![smile](http://nathanpitman.com/images/smileys/smile.gif)

If you need to you can also tweak the number of minutes that the plug-in waits before it refreshes the feed display, I’d opt for 60 minutes. The Magpie plug-in defaults to 3 hours if you don’t specify a refresh value.

[Conclusion…](/web/20090518092434/http://nathanpitman.com/journal/578/migrating-from-txp-to-ee-step-conclusion)
