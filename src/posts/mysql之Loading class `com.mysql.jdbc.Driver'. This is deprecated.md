---
title: mysql之Loading class `com.mysql.jdbc.Driver'. This is deprecated
published: 2019-08-30 16:16:51
description: 'mysql之Loading class com.mysql.jdbc.Driver. This is deprecated'
image: ''
tags: [mysql]
category: 数据库
draft: false 
lang: ''
---
<h1 id="bd1bf7e7">转载链接</h1>
[Loading class `com.mysql.jdbc.Driver'. This is deprecated. The new driver class is `com.mysql.cj.jdb——CSDN@不信成不了大牛](https://blog.csdn.net/anaini1314/article/details/71157791)  

<h1 id="16f5f9f6">mysql之Loading class `com.mysql.jdbc.Driver'. This is deprecated. The new driver class is `com.mysql.cj.jdbc.Driver'. The driver</h1>


异常错误：Loading class `com.mysql.jdbc.Driver'. This is deprecated. The new driver class is `com.mysql.cj.jdbc.Driver'. The driver is automatically registered via the SPI and manual loading of the driver class is generally unnecessary.



这个问题 是在我整合项目过程中出现的，用了最新的mysql 连接驱动

以前版本的jdbc.properties



<!--more-->
```plain
jdbc.driverClass   = com.mysql.dbc.Driver
jdbc.url= jdbc:mysql://127.0.0.1:3306/db?useUnicode=true&characterEncoding=utf8&serverTimezone=GMT
jdbc.username = root
jdbc.password = root123
```



现在按照最新官方提示支持将com.mysql.jdbc.Driver  改为  com.mysql.cj.jdbc.Driver



```plain
jdbc.driverClass   = com.mysql.cj.jdbc.Driver
jdbc.url= jdbc:mysql://127.0.0.1:3306/db?useUnicode=true&characterEncoding=utf8&serverTimezone=GMT
jdbc.username = root
jdbc.password = root123
```





---------------------  

作者：不信成不了大牛  

来源：CSDN  

原文：https://blog.csdn.net/anaini1314/article/details/71157791  

版权声明：本文为博主原创文章，转载请附上博文链接！

