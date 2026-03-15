---
title: "ExpressionEngine Plug-in: Encode/Decode"
date: 2008-07-22
source: "http://nathanpitman.com/547/expressionengine-plug-in-encode-decode"
archive: "https://web.archive.org/web/20090718143450/http://nathanpitman.com:80/547/expressionengine-plug-in-encode-decode"
tags:
  - "ExpressionEngine"
---

Every time I come up against something which I once would have resorted to PHP to solve, I end up writing a little plug-in these days instead. It just feels less dirty that way…

Anyhow, this one was developed to help me out when I needed to pass a string of data from one page to another in the URL. The string in question would occasionally include a forward slash and as such the string would become split as [Expression Engine](https://web.archive.org/web/20090718143450/http://www.expressionengine.com/index.php?affiliate=nathanpitman) interpreted it as two separate URL segments.

The ‘Encode/Decode’ plug-in takes any string of text and encodes or decodes it. Typical usage of the plug-in is as follows:

`{exp:np_encodedecode style="base64" direction="encode"}{title}{/exp:np_encodedecode}`

The plug-in offers ‘base64’ and ‘url’ encoding and decoding but it would be easy to add more options. For me base64 seems to work best.

> **Download:** [pi.np\_encodedecode.php.zip](/web/20090718143450/http://nathanpitman.com/files/pi.np_encodedecode.php.zip)

Obviously let me know in the comments if you have any thoughts on how this can be improved. Enjoy!
