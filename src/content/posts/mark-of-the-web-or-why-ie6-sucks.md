---
title: Mark of the web (or why IE6 sucks)
description: "An exploration of IE6's Mark of the Web security feature and why it causes so many headaches for web developers."
date: 2006-03-01
source: http://nathanpitman.com/454/mark-of-the-web-or-why-ie6-sucks
archive: https://web.archive.org/web/20090524024842/http://nathanpitman.com:80/454/mark-of-the-web-or-why-ie6-sucks
tags:
  - "Code"
  - "Web development"
---

I’ve been having a very interesting time during the past few days discovering what a total mess Microsoft has made of IE6 with the XP SP2 upgrade. Let me begin the story.

A few years back I wrote a simple HTML based Catalogue CD-ROM for a client. This provided users with an interface through which to navigate a large number of PDF documents. Recently they approached me to give this a bit of an update. The old version had a tree based navigation structure consisting of a number of interlinked HTML pages which displayed the contents of each branch.

Being as we now have modern web browsers that support XHTML and CSS I thought I’d bring things up to date, and simplify the maintenance process by incorporating the entire tree structure in a structured unordered list and then use some simple JavaScript to toggle the visibility of the branch elements. Sound slike a plan right? Yes.

Not long after getting something up and running I did some initial tests in both Firefox and Internet Explorer, all seemed good. I emailed a ZIP archive of the ‘work in progress’ over to the client for approval.

I hear back from the client that she’s getting a ‘Active Content’ warning in IE every time she trys to launch the HTML file.

*To help protect your security, Internet Explorer has restricted this file from showing active content that could access your computer.*

Hmm, ok. I open up IE, revert my setting to default just in case and test again. Lo and behold, I get the warning too.

So, [what’s changed in IE6 following an upgrade to XP SP2](http://www.phdcc.com/xpsp2.htm)? Well, to fill a number of security holes which might allow someone to execute code locally on your machine whilst browsing the web, Microsoft have opted to lock down and prevent any active content from running on your local machine at all (rather than fix the holes). Of course a user can ‘allow active content’ to be run on the local machine, but in most cases users will be freaked out by the dire warning which they have to manually over-ride.

Microsoft offer 3 solutions to this problem, but none of them are acceptable.

\*1. Ask users to [turn off local machine security](http://www.phdcc.com/xpsp2.htm#securityoptions)\*  
*Ok, I can’t really see any clients agreeing to that approach.*

**2. Add the ‘[Mark of the web](http://www.phdcc.com/xpsp2.htm#markoftheweb)’ to all your HTML pages**  
*No good as links to other file types don’t work. I can’t add an HTML comment to a PDF document now can I.*

\*3. Wrap your application in an [HTA file](http://www.phdcc.com/xpsp2.htm#hta)\*  
*This is IE only, Users without IE set as the default browser are out of luck if they try to run my clients CD-ROM.*

So, what can you do if you want to run an HTML based application off your local machine without having to resort to any of the above.

After a bit of digging I came across a fantastic little product called ‘[Server2Go](http://www.server2go-web.de). This is a fully functional free Apache web server that you can drag and drop onto a CD-ROM. This allows you to run your HTML application ‘through’ a real web server which exists only while that browser session is open, so to all intents are purposes your users are browsing ‘online content’ and so IE is quite happy to execute JavaScript and other Active Content.

Problem Solved! :)
