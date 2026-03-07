---
title: "ExpressionEngine Plug-in: UK Counties Select"
date: 2008-10-24
source: "http://nathanpitman.com/561/expressionengine-plug-in-uk-counties-select"
archive: "https://web.archive.org/web/20090518024248/http://nathanpitman.com:80/561/expressionengine-plug-in-uk-counties-select"
tags:
  - "ExpressionEngine"
---

Another day, another little [ExpressionEngine](https://web.archive.org/web/20090518024248/http://www.expressionengine.com/index.php?affiliate=nathanpitman) Plug-in. I needed to return a list of UK counties in a standalone entry form. I could have simply flicked on PHP for the template and spewed forth a foreach from an array but I thought I’d wrap it all up in a plug-in instead, so here it is.

The ‘UK Counties Select’ plug-in simply renders a drop down select form element with an alphabetical list of UK counties. Usage of the plug-in is as follows:

`{exp:np_uk_counties_select name="counties"}`

I could add options to specify a class, id etc but for now this does the job just fine for me.

> **Download:** [pi.np\_uk\_counties\_select.php.zip](https://web.archive.org/web/20090518024248/http://github.com/nathanpitman/np.uk_counties_select.ee_addon/zipball/master)

Obviously let me know in the comments if you have any thoughts on how this can be improved. Enjoy!

Tagged: [ExpressionEngine](/tag/expressionengine)
