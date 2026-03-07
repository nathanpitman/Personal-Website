---
title: "A simple JavaScript to toggle page elements"
date: 2007-02-16
source: "http://nathanpitman.com/498/a-simple-javascript-to-toggle-page-elements"
archive: "https://web.archive.org/web/20090526234246/http://nathanpitman.com:80/498/a-simple-javascript-to-toggle-page-elements"
tags:
  - "Code"
---

No rocket science here but I thought I’d blog this for my own future reference. Just a handy little script to have about.

`function toggle(elementID){  
var target1 = document.getElementById(elementID)  
if (target1.style.display == 'none') {  
target1.style.display = 'block'  
} else {  
target1.style.display = 'none'  
}  
}`

Just give the element you want to ‘toggle’ on and off an ID and then pass that to this script.

`<a href="javascript: toggle('track_list_2');">Show/Hide</a>`

That’s all. :)

Tagged: [Code](/tag/code)
