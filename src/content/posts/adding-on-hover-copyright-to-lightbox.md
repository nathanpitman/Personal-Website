---
title: Adding on hover copyright to Lightbox
description: >-
  I’ve been using Lightbox by Lokesh Dakar on a current project and needed to
  add a simple copyright message on hover just to remind those nice users
  that...
date: '2006-02-13'
source: 'http://nathanpitman.com/447/adding-on-hover-copyright-to-lightbox'
archive: >-
  https://web.archive.org/web/20090522044029/http://nathanpitman.com:80/447/adding-on-hover-copyright-to-lightbox
tags:
  - Code
relatedPosts:
  - slug: adding-geographical-tags-to-your-website
    source: generated
  - slug: 3d-css-box-model
    source: generated
  - slug: if-you-just-smile
    source: generated
  - slug: styling-horizontal-rules-with-css
    source: generated
  - slug: browsing-xml-with-flash
    source: generated
---

I’ve been using [Lightbox](http://www.huddletogether.com/projects/lightbox/) by [Lokesh Dakar](http://www.huddletogether.com/) on a current project and needed to add a simple copyright message on hover just to remind those nice users that they really shouldn’t simply rip my client off by printing little snap shots directly from his website.

![](/images/136.jpg)

Obviosuly this won’t deter the determined, it’s by no means bulletproof, but perhaps will serve as a gentle reminder to others.

```css
#lightbox {  
 background-image: url(/assets/copyright.gif);  
 background-position: center;  
 background-repeat: no-repeat;  
}
```

  

```css
#lightbox a:hover img#lightboxImage {  
 filter:alpha(opacity=50);     
 -moz-opacity: 0.50;     
 opacity: 0.50;  
}
```

At first I was looking for an easy way to script the overlay of a PNG with a copyright text but in the end I just went with a nice little opacity effect on the photo in question, thus revealing a copyright message which had been set as the containing DIV background image. Keep it simple stupid.

Of course, if you know of a better method, let me know. 🙂
