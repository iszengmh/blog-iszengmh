---
title: mysql之绿色版
published: 2019-08-30 16:16:51
description: 'mysql之绿色版'
image: ''
tags: [mysql]
category: 数据库
draft: false 
lang: ''
---
<h1 id="ea6f3b87">参考链接</h1>
[MySQL 5.7.20绿色版安装详细图文教程](https://www.jb51.net/article/129367.htm?utm_medium=referral)  

[mysql安装常见问题（系统找不到指定的文件、发生系统错误 1067 进程意外终止）——CSDN@MikanMu](https://blog.csdn.net/mhmyqn/article/details/17043921)  

[MySql免安装版安装配置，附MySQL服务无法启动解决方案——陈大VV    
](https://www.cnblogs.com/cenwei/p/6249856.html)



<h1 id="58378f0d">正文</h1>
<h2 id="6b2ff274">下载mysql解压版</h2>
![](https://cdn.nlark.com/yuque/0/2019/png/244275/1548617933737-b535ebc1-0570-447e-aad6-b4be74e0ad46.png)



<!--more-->



<h2 id="bd872cff">解压mysql，并在根目录创建my.ini</h2>


```shell
[client]
port=3306
default-character-set=utf8
[mysqld] 
# 设置MYSQL安装目录 
basedir=D:\Program Files (x86)\mysql-5.7.20
# 设置MYSQL数据目录 
datadir=D:\Program Files (x86)\mysql-5.7.20\data
port=3306
character_set_server=utf8
sql_mode=NO_ENGINE_SUBSTITUTION
#开启查询缓存
explicit_defaults_for_timestamp=true
```

<h2 id="914c1a08">创建mysql服务</h2>
以管理员身份证运行cmd，输入以下命令，创建mysql服务，并启动



```shell
cd D:\Program Files (x86)\mysql-5.7.20\bin
mysqld -install
```

<h2 id="7fc88aee">初始化data数据库目录</h2>
进入cmd命令，输入以下命令



```shell
mysqld --initialize-insecure --user=mysql
```

data已经自动创建，并初始化

输入以下命令，启动mysql服务



```shell
net start mysql
```



<h2 id="lho8G">修改密码</h2>
初次系统是默认用户是root，默认没有密码，以管理员身份证运行cmd，输入以下命令，进入mysql



```plain
mysql -hlocalhost -uroot -p
```

在登录 mysql后，输入以下命令，修改密码：



```powershell
 set password=password("root");
```



