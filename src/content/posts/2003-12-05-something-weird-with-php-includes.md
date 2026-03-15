---
title: Something weird with PHP includes…
date: 2003-12-05
source: http://nathanpitman.com/7/something-weird-with-php-includes
archive: https://web.archive.org/web/20091207063659/http://nathanpitman.com:80/7/something-weird-with-php-includes
tags:
  - "Code"
---

There is something weird going on with PHP includes on a site which I’m working on. I’ve been trying to include a file which will change depending on where you are in the site, therefore the URL of the include is created by combining a number of variables and an existing string.

`$page_audience = "5-9s";  
$baseURL = "/mysite/";  
include($baseURL."/Includes/inc_footer_".$page_audience.".php");`

However, this simply does not work, it throws PHP errors all over the place. In the end I resorted to changing the ‘baseURL’ variable to an absolute file address.

`$baseURL = "d:/Inetpub/wwwroot/mysite/";`

Surely this isn’t necessary? Sure it works, but it’s a tad ugly. Do I simply have something wrong with my PHP installation on Windows, or am I missing something else?
