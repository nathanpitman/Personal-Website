---
title: "Styling Horizontal Rules with CSS"
date: 2004-10-26
source: "http://nathanpitman.com/275/styling-horizontal-rules-with-css"
archive: "https://web.archive.org/web/20090609213710/http://nathanpitman.com:80/275/styling-horizontal-rules-with-css"
---

Tip of the day… don’t waste hours trying to style Horizontal Rules consistently in different browsers. Instead wrap your HR in a div, set the HR to

`display: none`

and style the surrounding div instead.

`div.horRule {  
 height: 1px;  
 border-top: 1px solid #E5E5E5;  
 margin-top: 3px;  
 margin-bottom: 3px;  
 margin-left: 10px;  
 margin-right: 10px;  
}  
div.horRule hr {  
 display: none;  
}`

If a user is browsing your site with a device that doesn’t support CSS then they’ll still see the standard HR.

Tagged: [Code](https://web.archive.org/web/20090609213710/http://nathanpitman.com/category/code/)
