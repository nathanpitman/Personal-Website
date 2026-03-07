---
title: "Hiding the Solspace Tag Tab for certain Weblogs in ExpressionEngine"
date: 2008-07-15
source: "http://nathanpitman.com/544/hiding-the-solspace-tag-tab-for-certain-weblogs-in-expressionengine"
archive: "https://web.archive.org/web/20091002192953/http://nathanpitman.com:80/544/hiding-the-solspace-tag-tab-for-certain-weblogs-in-expressionengine"
---

The Solspace [Tag Module](https://web.archive.org/web/20091002192953/http://www.solspace.com/software/detail/tag/) is a fantastic addition to [ExpressionEngine](https://web.archive.org/web/20091002192953/http://www.expressionengine.com/index.php?affiliate=nathanpitman) but it lacks the option to ‘disable’ tags for certain weblogs (sections). Not to fear, your friend the PHP if statement is here. In ‘ext.tag.php’ at around about line 262 there is a code block called ‘Add tag tab to tab array’. Just modify those two lines as per the example below:

`$weblogs = array(3,4,9,10,11);  
if (!in_array($weblog_id, $weblogs)) {  
 $LANG->fetch_language_file('tag');  
 $publish_tabs['tag'] = $LANG->line('tags');  
}`

Obviously the ‘weblogs’ array is an array of weblog id’s that you do not want the ‘tag tab’ to be displayed for. You could do this round the other way, writing an array of weblogs that should include the tag tab but I felt this was the better option in my scenario.

Tagged: [ExpressionEngine](https://web.archive.org/web/20091002192953/http://nathanpitman.com/category/expressionengine/)
