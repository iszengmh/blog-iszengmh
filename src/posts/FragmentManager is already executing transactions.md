---
title: FragmentManager is already executing transactions
published: 2025-08-30 16:16:51
description: 'FragmentManager is already executing transactions'
image: ''
tags: [android]
category: android
draft: false 
lang: ''
---
文章来处：[解决 使用FragmentTabHost 和 viewpager时编译器报错 FragmentManager is already executing transactions](http://blog.csdn.net/quincyjiang/article/details/52653025)



这个报错说得也很明显，当前FragmentManager已经在执行了。

可能其他报错，可能是简单地说，只是重复执行而已，但是我的情况不一样

下面是我APP的情况

![](https://cdn.nlark.com/yuque/0/2020/jpeg/244275/1586006932093-416fdcc1-3c4f-4031-b2b5-5b6e9f2b088c.jpeg)



原因是第一次getFragmentManager()获取到的FragmentManager，只提供给activity那一层使用。

在viewPager那一层只能使用getChildFragmentManager()获取FragmentManager来处理子fragment。

