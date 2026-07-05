---
title: java之当Date转java.sql.Date时失去时间精度
published: 2018-01-23 23:09:20
description: 'java之当Date转java.sql.Date时失去时间精度'
image: ''
tags: [java]
category: java
draft: false 
lang: ''
---
<h2 id="PlzUu">参考链接</h2>
[java.util.Date to java.sql.Date doesn't contain Time——Stackoverflow](https://stackoverflow.com/questions/30479069/java-util-date-to-java-sql-date-doesnt-contain-time)

<h2 id="dDOiA">java之当Date转java.sql.Date时失去时间精度</h2>
当我在尝试将 `2020-06-14T00:00:00+01:00` 将转成Date时，并准备将存储到数据库，我将它转化成 `java.sql.Date` 这个类，我debug发现日期居然变成`2020-06-14` 失去了后面 `07:00:00` 的time精度。



解决方法：

```java
Timestamp timestamp = new java.sql.Timestamp(date.getTime());
```

