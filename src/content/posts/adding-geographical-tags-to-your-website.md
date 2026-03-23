---
title: Adding geographical tags to your website
description: "Having noticed geographical data in the meta tags of many blogs recently I decided to investigate a little further and work out how to indicate the..."
date: 2005-04-23
source: http://nathanpitman.com/346/adding-geographical-tags-to-your-website
archive: https://web.archive.org/web/20090522145154/http://nathanpitman.com:80/346/adding-geographical-tags-to-your-website/
tags:
  - "Code"
---

Having noticed geographical data in the [meta](http://www.shauninman.com/) [tags](http://www.andybudd.com/) of [many](http://www.smalltransport.com/) [blogs](http://www.hicksdesign.co.uk/journal/) recently I decided to investigate a little further and work out how to indicate the geographical location associated with my website. It took a bit of digging about, so I thought I’d share the results with you all.

### Step 1 – Your Longitude and Latitude

First off you need to discover your longitude and latitude. If like me you don’t have a [GPS device](http://froogle.google.co.uk/froogle?q=gps) then you can use a number of online resources. I plumped for [Streetmap](http://www.streetmap.co.uk/). Simply enter your postcode and then on the map screen scroll down to find the line of text that reads “Click here to convert/measure coordinates”. Click on the link and make a note of the latitude and longitude figures that are returned.  

`Lat: N 51:23:31 ( 51.391924 ) Long: W 0:44:45 ( -0.745941 )`

### Step 2 – Generate ‘Geo’ or ‘ICBM’ tags

Now we can generate the most commonly used geographical tags to place in the head of our web pages. I used the [Geo Tag Generator](http://geotags.com/geo/DMS3.html) at ‘Geotags.com’ to generate by ‘geo’ tags and the instructions for [adding a site to the GeoURL database](http://geourl.org/add.html) at ‘GeoURL.org’ to generate my ICBM tags.

Your tags should look something like this:  

`<meta name="ICBM" content="51.391924, -0.745941">  
<meta name="DC.title" content="nathanpitman.com">  
<meta name="geo.position" content="51.3919;-0.7458">  
<meta name="geo.region" content="GB-BRC">  
<meta name="geo.placename" content="Bracknell">`

### Step 3 – Use those tags!

Now simply place your tags in you document head and start adding yourself to geographical databases such as:

- [Feedmap.net](http://www.feedmap.net/BlogMap/submit.aspx)
- [GeoURL](http://geourl.org/ping/)

Hoorah!
