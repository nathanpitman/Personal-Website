---
title: Setting up a LAMP server, Part 1.
date: 2005-06-22
source: http://nathanpitman.com/368/setting-up-a-lamp-server-part-1
archive: https://web.archive.org/web/20090527121350/http://nathanpitman.com:80/368/Setting-up-a-LAMP-server-Part-1
tags:
  - "Web development"
---

Here and there I’ve been finding time to continue with my [Debian](http://www.debian.org/) install. I have the most basic of installs finished and so over the past few days I’ve been adding some ingredients of my own to make this install even more scrummy.

The majority of my set up is pretty typical of any PHP">LAMP Server so you could follow my notes as instruction for yourself if you wish, although I must admit I’m no guru on the subject so don’t go directing any technical questions my way! This is **Step 1** in the process which covers **remote administration** and **visibility on a Windows network**.

As I’ve already stated I did a bare bones Debian install, I followed [instructions](http://www.osnews.com/story.php?news_id=2016&page=1) that I found on OSnews.com but bailed out at installing [XFree86](http://www.xfree86.org/) as I have no plans to use my Linux box as a desktop client. So with my linux box running, connected to my home network and logged in as root, I begun.

### Remote administration

First up I wanted to sort remote administration, primarily because my Linux box was sitting in our lounge next to the TV, and my PC is in our office upstairs. I was getting pretty fed up with googling, running downstairs, trying something, running back upstairs etc.

To remotely administer a linux box all you need to do is install SSH and a suitable client such as [Putty](http://www.putty.nl/) on your PC.

`apt-get install ssh`

Once installed pop back to your PC, launch Putty and connect to your Linux box, if you have problems try pinging the box from the Windows command prompt just to be sure you’re not doing anything stupid. :)

In theory you can now disconnect the monitor and keyboard that you had been running up and down the stairs with and do the rest from the comfort of your PC.

### Visibility on a Windows network

Next up I want to be able to browse part of my Linux box from Windows Explorer on my PC. To be able to do this I need to install an application on my Linux box called [Samba](http://www.samba.org/).

`apt-get install samba`

Once installed I navigated to ‘/etc/samba/’ and backed up the example smb.conf file and replaced it with the following:

`# Global Parameters  
workgroup = MSHOME  
netbios name = Samba  
encrypt passwords = yes`

  

`[homes]  
read only = no  
browseable = no`

  

`[sites]  
path = /var/www  
browseable = yes  
write list = @admins, root, nathan`

As you can see above I’ve given write permission to a few users, one of these (nathan) is a non standard user that I’ll create now using Samba. I’ll be using these user credentials to connect to the linux box so that I can browse my sites folder.

At this point you may realise that the Domain or Workgroup name that you specified during the Debian install process is incorrect. If this is the case you can easily amend it by editing the first line in the ‘resolv.conf’ file which is located in the ‘/etc/’ folder.

If you didn’t already create a Linux user (nathan) during the Debian install you can do so now.

To add a new Linux user…

`useradd -m nathan`

  

`passwd nathan`

Then to add the associated Samba user…

`smbpasswd -a nathan`

Samba will prompt you to enter a password, do so and then run:

`/etc/init.d/samba restart`

…to restart Samba. Once this is done fire up ‘My network places’ (Windows XP) and select ‘View workgroup computers’. You should see a machine called ‘Samba’. Select this and you should see a couple of available shares, select ‘sites’ and enter the username and password you gave Samba (above) to connect. Voila.
