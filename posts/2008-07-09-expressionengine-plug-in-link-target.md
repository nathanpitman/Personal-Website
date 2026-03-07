---
title: "ExpressionEngine Plug-in: Link Target"
date: 2008-07-09
source: "http://nathanpitman.com/542/expressionengine-plug-in-link-target"
archive: "https://web.archive.org/web/20090614184927/http://nathanpitman.com:80/542/expressionengine-plug-in-link-target"
---

Not sure how useful this [ExpressionEngine](https://web.archive.org/web/20090614184927/http://www.expressionengine.com/index.php?affiliate=nathanpitman) Plug-in will be to others out there but we’re using it here at [Nine Four](https://web.archive.org/web/20090614184927/http://www.ninefour.co.uk/) on the [Wired In](https://web.archive.org/web/20090614184927/http://www.wiredin.org.uk/) website to link from an IFrame back to the parent window. This is something you would usually achieve with:

`<a href="http://www.nathanpitman.com" target="_top">My Link Text</a>`

…but that’s not valid XHTML so instead we need to do:

`<a href="http://www.nathanpitman.com" onClick="top.location=this.href; return false">My Link Text</a>`

The ‘Link Target’ plug-in just helps to keep your template code clean by writing all the JavaScript for you. Typical usage of the plug-in is as follows:

`{exp:np_linktarget url="http://www.nathanpitman.com" target='top'}My Link Text{/exp:np_linktarget}`

By default you have to specify a ‘url’ and ‘target’ parameter and the plug-in also optionally accepts a link ‘title’ and ‘class’. Possible ‘type’ values are ‘top’ and ‘blank’. Each mimic the link target attributes ‘\_top’ and ‘\_blank’ respectively.

> **Download:** [pi.np\_linktarget.php.zip](/web/20090614184927/http://nathanpitman.com/files/pi.np_linktarget.php.zip)

Obviously let me know in the comments if you have any thoughts on how this can be improved. Enjoy!

Tagged: [ExpressionEngine](https://web.archive.org/web/20090614184927/http://nathanpitman.com/category/expressionengine/)
