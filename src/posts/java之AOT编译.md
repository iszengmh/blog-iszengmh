---
title: java之AOT编译
published: 2026-04-14 10:35:51
description: 'AOT编译是jdk9之后开发出来，新JAVA底层编译器。AOT编译具有静态编译的特征，能够在程序运行前实现将程序编译成机器码（无法针对反射、动态代理的编译，因为通常这些需要程序运行时即时加载），AOT避免JIT编译的预热时间，大幅度提高程序的运行效率，但是缺点比较明显，就是打包后比JIT的要大得多，AOT对微服务、serverless、云原生比较适用。'
image: 'assets/images/2026-04-14-10-47-40.png'
tags: [java,jdk9]
category: 'java'
draft: false 
lang: ''
---
# 参考链接

[JavaGuide——Github@Snailclimb](https://github.com/Snailclimb/JavaGuide/blob/main/docs/java/basis/java-basic-questions-01.md#aot-%E6%9C%89%E4%BB%80%E4%B9%88%E4%BC%98%E7%82%B9%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E5%85%A8%E9%83%A8%E4%BD%BF%E7%94%A8-aot-%E5%91%A2)

# 什么是AOT

AOT编译是jdk9之后开发出来，新JAVA底层编译器。AOT编译具有静编译的特征，能够在程序运行前实现将程序编译成机器码（无法针对反射、动态代理的编译，因为通常这些需要程序运行时即时加载），AOT避免JIT编译的预热时间，大幅度提高程序的运行效率，但是缺点比较明显，就是打包后比JIT的要大得多，AOT对微服务、serverless、云原生比较适用。

# JIT和AOT的比较

|对比维度|	JIT（即时编译）|	AOT（提前编译）|
|--|--|--|
|编译时机|	运行时编译|	运行前编译|
|启动速度|	较慢（需要预热）|	快（无需预热）|
|峰值性能|	更高（运行时优化）|	较低（缺少运行时信息）|
|内存占用|	较高|	较低|
|打包体积|	较小|	较大（包含机器码）|
|动态特性支持|	完全支持|	受限（反射、动态代理等）|
|适用场景|	长时间运行的服务|	云原生、Serverless、CLI 工具|

可以看出，AOT 的主要优势在于启动时间、内存占用和打包体积。JIT 的主要优势在于具备更高的极限处理能力，可以降低请求的最大延迟