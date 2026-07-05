---
title: maven之The goal you specified requires a project to execute but there is no POM in this directory
published: 2019-08-30 16:16:51
description: 'maven之The goal you specified requires a project to execute but there is no POM in this directory'
image: ''
tags: [maven]
category: 持续集成与部署
draft: false 
lang: ''
---
<h1 id="bd1bf7e7">转载链接</h1>


[https://www.cnblogs.com/demonrain/p/5674091.html——博客园@demonrain](https://www.cnblogs.com/demonrain/p/5674091.html)



<h1 id="a1db7c12">maven之安装第三方jar到本地 出现 The goal you specified requires a project to execute but there is no POM in this directory 错误</h1>


```powershell
mvn install:install-file "-Dfile=cobra.jar" "-DgroupId=com.cobra" "-DartifactId=cobra" "-Dversion=0.98.4" "-Dpackaging=jar" "-DgeneratePom=true"
```



