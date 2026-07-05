---
title: UnsupportOperationException，使用Arrays.asList()报错原因
published: 2019-05-11 22:12:08
description: 'UnsupportOperationException，使用Arrays.asList()报错原因'
image: ''
tags: [java]
category: java
draft: false 
lang: ''
---

常常使用Arrays.asLisvt()后调用add，remove这些method时出现java.lang.UnsupportedOperationException异常。这是由于：



Arrays.asLisvt() 返回java.util.Arrays$ArrayList， 而不是ArrayList。



Arrays\$ArrayList和ArrayList都是继承AbstractList，remove，add等 method在AbstractList中是默认throw UnsupportedOperationException而且不作任何操作。ArrayList override这些method来对list进行操作，但是Arrays\$ArrayList没有override remove(int)，add(int)等，所以throw UnsupportedOperationException。

