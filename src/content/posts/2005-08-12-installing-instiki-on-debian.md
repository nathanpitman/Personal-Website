---
title: Installing Instiki on Debian
date: 2005-08-12
source: http://nathanpitman.com/391/installing-instiki-on-debian
archive: https://web.archive.org/web/20100106033419/http://nathanpitman.com/391/installing-instiki-on-debian
tags:
  - "Linux"
---

I decided it was about time I had a play with [Instiki](https://web.archive.org/web/20100106033419/http://www.instiki.org/) here at [Bite CP](https://web.archive.org/web/20100106033419/http://www.bitecp.com/) since we used to have an install back at [Mirashade](https://web.archive.org/web/20100106033419/http://www.mirashade.com/).

On an unrelated note, [Mirashade has been liquidated!](https://web.archive.org/web/20100106033419/http://wck2.companieshouse.gov.uk/370f1cc4b2c4227139f5e9a7076b5de1//compdetails) I might post more on that another time.

Anyhow, back to the Instiki install. Before we can even go anywhere with Instiki we’ll need to install ‘Ruby’.

So log-in to your [Debian](https://web.archive.org/web/20100106033419/http://www.debian.org/) box as root and type:

`apt-get install ruby`

With this done we also need to install some additional modules that Debian requires:

`apt-get install ruby  
apt-get install libwebrick-ruby  
apt-get install libstrscan-ruby  
apt-get install rdoc  
apt-get install libzlib-ruby  
apt-get install libsoap-ruby1.8`

Right, with that done let’s [download the latest build](https://web.archive.org/web/20100106033419/http://rubyforge.org/frs/?group_id=186) of Instiki. Once this is done unzip the files and drop them into your ‘var/www’ folder. I created a parent folder called ‘Instiki’ to put them in.

Now from your linux command line navigate to the directory in which you have placed your instiki files and run:

`ruby instiki.rb`

Launch a [suitable browser](https://web.archive.org/web/20100106033419/http://www.getfirefox.com/) and enter the address of your linux box followed by a colon and ‘2500’.

> For example: [http://rooty:2500](https://web.archive.org/web/20100106033419/http://rooty:2500/)

You’ll now see a simple setup screen which asks you to provide a name and address for your web, and an administrative password.

![Instiki Setup](/images/106.gif "Instiki Setup")

With this screen completed click ‘Setup’ and your settings are saved. Now you’ll be dumped on your Wiki home page in ‘edit’ mode. You can start building your Wiki now… but before you do… one last task to complete.

If like me you want Instiki to run as a daemon (Essentially means it runs in background) then you’ll need to do the following (Thanks for the pointer [Jonathan](https://web.archive.org/web/20100106033419/http://www.turnipspatch.com/))

Log back in as root and type:

`nano /etc/init.d/bootmisc.sh`

Scroll right down to the bottom of the file and add the follwoing line above the ‘exit’ command:

`ruby /var/www/Instiki/instiki.rb -d`

Now, reboot you Debian box and you’re good to go.
