---
title: Websphere Application Server之常用命令
published: 2024-07-29 23:44:42
description: 'Websphere Application Server之常用命令'
image: ''
tags: [Websphere Application Server]
category: 中间件
draft: false 
lang: ''
---
<h1 id="NWeFj">参考链接</h1>
[Administering profiles——IBM Knowledge Center](https://www.ibm.com/support/knowledgecenter/SSSH27_9.0.2/com.ibm.rational.clearcase.cc_ms_install.doc/topics/was_install/r_WAS_IHS_tools.htm)

<h1 id="UmoyM">Websphere Application Server之常用命令</h1>
<h2 id="O387G">delete profile</h2>


```powershell
# delete profile by using windows command 
C:\IBM\WebSphere\AppServer\bin\manageprofiles.bat -delete -profileName [profile name] -username [admin username]-password [admin password]
# On UNIX/Linux:On Linux:
was_install_dir/bin/manageprofiles.sh –delete –profileName profile

```



