---
title: New tricks with Textile
date: 2005-10-19
source: http://nathanpitman.com/409/new-tricks-with-textile
archive: https://web.archive.org/web/20090718143332/http://nathanpitman.com:80/409/new-tricks-with-textile
tags:
  - "Code"
  - "Textpattern"
---

I’m using [textile](http://www.textism.com/tools/textile/) on a project I’m currently [working](http://www.ninefour.co.uk/) on and having come up against a bit of an issue I discovered a nifty little feature of textile which I’d never used before.

The problem I was having is as follows.

I’m pulling a field out of a database which is marked up using textile, I then call the ‘TextileThis’ function to render it back as XHTML. This is all good except for one thing. The text I’m pulling back is wrapped in an ‘href’ in order to link the entire body of text to another part of the site. When the textile ‘XHTML’s my text it’s auto wrapped in an opening and closing paragragh tag, that’s fine in most cases but in this situation it messes up the visual rendering of the link element:

`<a href="http://ninefour.co.uk"><p>This is my sample text</p></a>`

Obviously this isn’t ideal.

So, I took a poke about in the textile class file and discovered that ‘TextileThis’ accepts a number of arguments. Wow, never realised that before.

`function TextileThis($text, $lite='', $encode='', $noimage='', $strict='')`

Well I have no idea what ‘encode’ (URL encode maybe) and ‘strict’ do but ‘image’ will remove images and ‘lite’ prevents textile from wrapping it’s output in paragraph tags.

Success!
