---
title: "ExpressionEngine Extension: Push to FoxyCart"
date: 2010-03-04
source: "http://nathanpitman.com/596/expressionengine-extension-push-to-foxycart"
archive: "https://web.archive.org/web/20100307023931/http://nathanpitman.com:80/596/expressionengine-extension-push-to-foxycart"
tags:
  - "ExpressionEngine"
---

While working on a project recently with the [FoxEE](https://web.archive.org/web/20100307023931/http://www.hccdevelopment.com/Web-Based-Software/Product/FoxEE/) E-commerce module for ExpressionEngine we discovered that it doesn’t integrate at all well with the [Solspace User Module](https://web.archive.org/web/20100307023931/http://www.solspace.com/software/detail/user/). This is understandable because the Solspace User Module circumvents the standard process for user registration and profile updates in ExpressionEngine. The upshot of this is that you simply ‘cannot’ make single sign on with FoxyCart work with FoxEE if your users are registering or updating their profile using the Solspace User Module. Now this is a bit of a problem since pretty much any E-commerce site built on ExpressionEngine will be using the Solspace User Module to allow users to easily manage their account details etc.

After much hacking and messing about I suggested to [Ed](https://web.archive.org/web/20100307023931/http://www.edkelly.co.uk/) who was working with us at [Nine Four](https://web.archive.org/web/20100307023931/http://ninefour.co.uk/) at the time that we could perhaps build an extension that used the [User Module Hooks](https://web.archive.org/web/20100307023931/http://www.solspace.com/docs/addon/c/User/extension_hooks/) and the [FoxyCart API](https://web.archive.org/web/20100307023931/http://wiki.foxycart.com/integration/php/api_customeredit_example) to do the job. Ed went away and came back a very short time thereafter with a working solution. We like to call this little extension ‘Push to FoxyCart’ and we’d love to share it with anyone else that’s come up against the same problem that we did.

To clarify, you only need this extension if you are using the Solspace User Module, FoxEE and FoxyCart and you want to enable SSO for your ExpressionEngine site members. The extension is very simply but it requires some basic configuration.

> **Download:** [ext.push\_to\_foxycart.php.zip](https://web.archive.org/web/20100307023931/http://expressionengine.com/?ACT=51&fid=36&aid=10054_BWUlqyG5UVW53o1VZmIJ&board_id=1)

At line 13 you will have to enter your ‘FoxyCart Domain’ (mysite.foxycart.com for example) and at line 14 your FoxyCart API token. Finally you’ll need to change the mapping of the FoxyCart fields to the ExpressionEngine custom member profile fields on lines 100 through to 119. This should be pretty obvious… if not then perhaps you already bit off more than you can chew! :)

Make sure you’re running PHP5 and have access to CURL on your server, upload the extension, enable it and you should be good to go. [For support I’ve created a topic on the ExpressionEngine forums](https://web.archive.org/web/20100307023931/http://expressionengine.com/forums/viewthread/148101/), hopefully if I’m not able to help with any problems you encounter then someone else might be able to chime in. :)

Tagged: [ExpressionEngine](/tag/expressionengine)
