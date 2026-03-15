---
title: "Migrating from TXP to EE - Conclusion"
date: 2009-03-29
source: "http://nathanpitman.com/578/migrating-from-txp-to-ee-step-conclusion"
archive: "https://web.archive.org/web/20090518024316/http://nathanpitman.com:80/578/migrating-from-txp-to-ee-step-conclusion"
tags:
  - "ExpressionEngine"
  - "Textpattern"
---

Ok, so steps 1 through 5 pretty much got us to a conclusion but there was one little fact that really had me bugged about the migration. I wanted to persist the article IDs from Textpattern during the migration to ExpressionEngine because they are used in my permalink URLs. Basically I donât want to break the internet (or my small part of it) by altering the URL structure in the switch. How did I do it?

Open âcp.mt\_import.phpâ form within â/system/cp/â then at line 954 add:

`$ids = array();`

then at about line 1028 add:

`// IDs Hack  
if (strpos($parts['0'],'ID') !== false)  
{  
$ids[$id] = trim(str_replace('ID:','',$first_section[$i]));  
}`

At about line number 1765 amend the entry id value to:

`'entry_id' => $ids[$id],`

Now save and upload your amended import script. Back in Textpattern you’ll also need to add one new line to the top of your export script.

`ID: <txp:article_id />`

So your Textpattern export will now include the original article ID and the import process will maintain this (so long as you have deleted all other weblog entries prior to import).

So, that’s it. I’m all done… I migrated… now I just have to find the time to finish off the new design and implement it! Happy Migrating!!!
