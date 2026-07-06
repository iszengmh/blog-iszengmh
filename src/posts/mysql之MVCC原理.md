---
title: mysql之MVCC原理
published: 2026-07-01
description: '这篇文章讲解mysql是如何做到读写分离、实现多版本高并发控制的。'
image: ''
tags: [mysql]
category: 数据库
draft: true 
lang: ''
---

# mysql之MVCC原理

## 参考链接
[面试官：讲讲你对MVCC的理解？？被问懵了。。面试必看！——Bilibili@楼兰说技术](https://www.bilibili.com/video/BV1w2Jg6nEzg/?spm_id_from=333.1387.favlist.content.click&vd_source=92952779413abfdf58688ee145b37ee9)

[MySQL 的 MVCC：看不见的“时间机器”怎么帮你躲过脏读和幻读？——Dev@port smith](https://dev.to/port_smith_378e5d029689f4/mysql-de-mvcckan-bu-jian-de-shi-jian-ji-qi-zen-yao-bang-ni-duo-guo-zang-du-he-huan-du--3gn5)

## 哪些引擎支持MVCC

| 存储引擎 | 是否支持 MVCC | 关键特性与说明 |
| :--- | :--- | :--- |
| **InnoDB** | 是 | MySQL 默认的事务型存储引擎，完整支持 MVCC 。 |
| **NDB** (MySQL Cluster) | 是 | MySQL 集群使用的存储引擎，也支持 MVCC 。 |
| **MyISAM** | 否 | 早期默认引擎，不支持事务和 MVCC 。 |
| **ARCHIVE** | 否 | 专用于数据归档的引擎，不支持 MVCC 。 |
| **其他引擎** (如 MEMORY, MERGE 等) | 否 | 这些引擎通常为特定场景设计，一般也不支持 MVCC。 |

## MVCC是什么

