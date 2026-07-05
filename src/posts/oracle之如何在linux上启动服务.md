---
title: oracle之如何在linux上启动服务
published: 2019-08-30 16:16:51
description: 'oracle之如何在linux上启动服务'
image: ''
tags: [oracle,linux]
category: 数据库
draft: false 
lang: ''
---

# 参考链接
[linux下启动oracle服务](https://www.cnblogs.com/huaxingtianxia/p/8078982.html)

# oracle之如何在linux上启动服务
<font style="color:#333333;">[root@nstlbeta ~]# su - oracle//进入oracle模式</font>

<font style="color:#333333;">//启动oracle实例服务</font>

<font style="color:#333333;">[oracle@nstlbeta bin]$ sqlplus /nolog  //登录sqlplus</font>

<font style="color:#333333;">SQL> connect /as sysdba  //连接oracle</font>

<font style="color:#333333;">SQL> startup //起动数据库</font>

<font style="color:#333333;">SQL> exit  //退出sqlplus ，起动监听</font>

<font style="color:#333333;">启动监听服务</font>

<font style="color:#333333;">[oracle@nstlbeta bin]$ cd $ORACLE_HOME/bin //进入oracle安装目录</font><font style="color:#333333;">  
</font><font style="color:#333333;">[oracle@nstlbeta bin]$ lsnrctl start  //起动监听</font>

