---
title: java之java8API转换日期的时区需要注意
published: 2018-01-23 23:09:20
description: 'java之java8API转换日期的时区需要注意'
image: ''
tags: [java]
category: java
draft: false 
lang: ''
---
ZonedDateTime.of不会根据你系统当前时区转换指定时区，只是在此时间上配置了时区

```java
		LocalDateTime local
				= LocalDateTime
				.parse("2018-11-03T12:45:30");

		// create a zoneid
		ZoneId zid = ZoneId.of("Europe/Paris");

		// create an ZonedDateTime object
		// using of()
		ZonedDateTime zt= ZonedDateTime.of(local, zid);

		// print result
		System.out.println("ZonedDateTime:"	+ zt);//ZonedDateTime:2018-11-03T12:45:30+01:00[Europe/Paris]

```

正确方式：配置时区再

```java
		LocalDateTime local
				= LocalDateTime
				.parse("2018-11-03T12:45:30");

		// create a zoneid
		ZoneId zid = ZoneId.of("Asia/Hong_Kong");//设置你当前的时区

		// create an ZonedDateTime object
		// using of()
		ZonedDateTime zt= ZonedDateTime.of(local, zid);

		ZonedDateTime zonedDateTime = zt.withZoneSameInstant(ZoneId.of("Europe/London"));
		// print result
		System.out.println("ZonedDateTime:"	+ zonedDateTime);//ZonedDateTime:2018-11-03T04:45:30Z[Europe/London]

```

