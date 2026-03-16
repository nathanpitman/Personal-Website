---
title: "ExpressionEngine Plug-in: Add VAT"
date: 2009-01-08
source: "http://nathanpitman.com/564/expressionengine-plug-in-add-vat"
archive: "https://web.archive.org/web/20090518024300/http://nathanpitman.com:80/564/expressionengine-plug-in-add-vat"
tags:
  - "ExpressionEngine"
---

I’ve just written a new [ExpressionEngine](http://www.expressionengine.com/index.php?affiliate=nathanpitman) plug-in called ‘**Add VAT**‘. This plug-in takes any numeric value and returns the value plus VAT. You also have to specify the VAT rate obviously.

Typical usage is as follows:

`{exp:np_add_vat price="120" rate="15"}`

I’m using the plug-in on a website I’m developing where I need to be able to display prices inclusive and exclusive of VAT. Currently the Simple Commerce module does not provide a facility to specify VAT or taxes.

> **Download:** [pi.np\_add\_vat.php.zip](/web/20090518024300/http://nathanpitman.com/files/pi.np_add_vat.php.zip)

If you have any further ideas as to how the plug-in could be developed do let me know. ![smile](http://nathanpitman.com/images/smileys/smile.gif)
