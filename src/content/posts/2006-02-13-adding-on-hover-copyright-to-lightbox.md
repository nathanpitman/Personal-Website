---
title: Adding on hover copyright to Lightbox
date: 2006-02-13
source: http://nathanpitman.com/447/adding-on-hover-copyright-to-lightbox
archive: https://web.archive.org/web/20090522044029/http://nathanpitman.com:80/447/adding-on-hover-copyright-to-lightbox
tags:
  - "Code"
---

I’ve been using [Lightbox](https://web.archive.org/web/20090522044029/http://www.huddletogether.com/projects/lightbox/) by [Lokesh Dakar](https://web.archive.org/web/20090522044029/http://www.huddletogether.com/) on a current project and needed to add a simple copyright message on hover just to remind those nice users that they really shouldn’t simply rip my client off by printing little snap shots directly from his website.

![](/images/136.jpg)

Obviosuly this won’t deter the determined, it’s by no means bulletproof, but perhaps will serve as a gentle reminder to others.

`#lightbox {  
 background-image: url(/assets/copyright.gif);  
 background-position: center;  
 background-repeat: no-repeat;  
}`

  

`#lightbox a:hover img#lightboxImage {  
 filter:alpha(opacity=50);     
 -moz-opacity: 0.50;     
 opacity: 0.50;  
}`

At first I was looking for an easy way to script the overlay of a PNG with a copyright text but in the end I just went with a nice little opacity effect on the photo in question, thus revealing a copyright message which had been set as the containing DIV background image. Keep it simple stupid.

Of course, if you know of a better method, let me know. ![smile](https://web.archive.org/web/20090522044029im_/http://nathanpitman.com/images/smileys/smile.gif)

Tagged: [Code](/tag/code)
