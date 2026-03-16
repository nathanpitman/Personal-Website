---
title: "ExpressionEngine Plug-in: Member Online?"
description: "Whilst working on the Wired In website I came up against a little problem. I wanted to be ale to show if a specific user was online or offline, much like..."
date: 2008-07-08
source: "http://nathanpitman.com/541/expressionengine-plug-in-member-online"
archive: "https://web.archive.org/web/20090616071925/http://nathanpitman.com:80/541/expressionengine-plug-in-member-online"
tags:
  - "ExpressionEngine"
---

Whilst working on the [Wired In](http://www.wiredin.org.uk/) website I came up against a little problem. I wanted to be ale to show if a specific user was online or offline, much like you would on a social networking site. However although there are tags to return a list of online users within [ExpressionEngine](http://www.expressionengine.com/index.php?affiliate=nathanpitman), you cannot pass this a specific username with a view to returning a true/false response.

So, after poking around a few plug-ins which queried the DB for values (specifically the ‘“Member Info”:http://expressionengine.com/downloads/details/member\_info/’ plug-in) I decided to launch in and write my first plug-in to do the job for me.

The plug-in is called ‘**Member Online?**‘ and it accepts a ‘username’ for which it will then simply return a true or false value. Using the optional ‘return’ parameter you can specify the values you would like returned in place of true or false.

So, typical usage would be as follows:

`{exp:np_memberonline username="{username}" return="Online,Offline"}`

You could either use this to simply write a string out into the page, as I am, or use it to change the class of a page element to highlight online users perhaps.

> **Download:** [pi.np\_memberonline.php.zip](/web/20090616071925/http://nathanpitman.com/files/pi.np_memberonline.php.zip)

At the moment I’m using this alongside the Solspace ‘“User Module”:http://www.solspace.com/software/detail/user/’ to build the community aspects of the Wired In website so I’ve only developed it so far as required to meet those requirements. If you have any further ideas as to how the plug-in could be developed do let me know. :)
