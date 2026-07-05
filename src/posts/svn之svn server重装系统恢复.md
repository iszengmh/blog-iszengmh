---
title: svn之svn server重装系统恢复
published: 2016-08-30 16:16:51
description: 'svn之svn server重装系统恢复'
image: ''
tags: [svn]
category: 持续集成与部署
draft: false 
lang: ''
---

<h1 id="bd1bf7e7">转载链接</h1>
[windows操作系统重装后恢复svn仓库、tortoisesvn客户端信息、及权限信息的方法——博客园@mni_Ya](http://www.cnblogs.com/painwhy/p/4085873.html)  

<h1 id="019fa851">svn之svn server重装系统恢复</h1>
<h2 id="0585c62f">**SVN仓库信息的恢复（使用visual svn作为svn服务器的）**</h2>
前提：必须要有原来的仓库文件

a.下载与原来同样版本的visual svn或者下载最新的visualsvn 。因为你不知道原来的visualsvn的版本，所以安装旧的版本是无法恢复仓库信息的，提示错误 Expected FS format between '1' and '3'; found format '4'。

visual svn下载地址：[https://www.visualsvn.com/server/](https://www.visualsvn.com/server/)

b.安装完之后把原来的仓库文件放入新的仓库位置



<!--more-->



<h2 id="ae5a8d41">svn客户端信息的恢复（使用tortoiseSvn作为客户端）</h2>
前提必须要有原来的svn文件

只要安装和从前tortoiseSvn一个版本的就好，版本信息可以在你的文件中的svn目录中看到，为隐藏目录

tortoiseSvn下载地址：[http://tortoisesvn.net/downloads.html](http://tortoisesvn.net/downloads.html)

<h2 id="41ed8f57">svn权限恢复</h2>
只要你记得原来的用户名密码可以直接用，要是不记得使用visualsvn建立一个新的用户分配权限，调节成没有权限是不行的

 

这是笔者重装了一次操作系统，总结出来恢复svn信息的方法，希望对遇到同样问题的人有帮助。



