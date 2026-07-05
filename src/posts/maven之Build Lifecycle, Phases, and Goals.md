---
title: maven之Build Lifecycle, Phases, and Goals
published: 2019-08-30 16:16:51
description: 'maven之Build Lifecycle, Phases, and Goals'
image: ''
tags: [maven]
category: 持续集成与部署
draft: false 
lang: ''
---
<h1 id="YXFAL">参考链接</h1>
[Maven Build Lifecycle, Phases, and Goals——JouneyDev@Pankaj](https://www.journaldev.com/33659/maven-build-lifecycle-phases-goals)

[Introduction to the Build Lifecycle——Apache Maven Project](https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html)

[Plugin Bindings for default Lifecycle Reference——Apache Maven Project](https://maven.apache.org/ref/3.6.3/maven-core/default-bindings.html)

<h1 id="vO65Q">maven之Build Lifecycle, Phases, and Goals</h1>
<h2 id="s3ogr">maven生命周期</h2>
maven内置的Build生命周期：

1. **default**: 处理工程的构建和部署
2. **clean**: 处理工程清理
3. **site**: 处理工程网站文档的创建

<h2 id="o5Ega">maven Build阶段</h2>
以下是default的Build生命周期，即生命周期的阶段：

+ validate
+ compile
+ test
+ package
+ verify
+ install
+ deploy

> Build的顺序是由上到下，当我们运行一个maven命令时，也就是我指定了一个阶段去执行。
>
> <font style="color:#37474F;">Any maven build phases that come before the specified phase is also executed. For example, if we run </font>`mvn package`<font style="color:#37474F;"> then it will execute validate, compile, test, and package phases of the project.</font>
>
> <font style="color:#37474F;">任何maven build阶段在指定阶段后也会被执行，例如我们运行一个 </font>`<font style="color:#37474F;">mvn package</font>` 则它会执行工程的<font style="color:#37474F;">validate、compile,、test,和package阶段</font>
>

<h2 id="2PGFJ">maven build goals</h2>
> 一个build阶段是一个goals的集合组成，maven goals代表指定任务，有助于工程的构建和管理。  
>

有时候maven goals不一定是maven的阶段，即不一定默认的生命周期，也可能是插件，有时候经常会pom.xml中加入这些，这些插件可能是第三方开发的，有助于的我们构建goals

<!--more-->
```shell
mvn plugin-prefix:goal
mvn plugin-group-id:plugin-artifact-id[:plugin-version]:goal
```

 以下也是一个goal，但是不属于maven阶段，用于执行依赖树

```shell
mvn dependency:tree
```

<h2 id="wCYEQ">Build生命周期中POM的作用</h2>
默认的Build生命周期通常是够用的，但是你也可以构造一个maven build在工程中，在POM中 标签为`packaging` 用于构造maven build，一些有效的packaging如 `jar` 、<font style="background-color:rgba(0, 0, 0, 0.06);">war</font>和`ear` ，或者 `pom` ，不指定packaging，则默认是 `jar` ,每一个packaging都包含一些goal，用于绑定一个特定的生命周期， `jar` 会绑定goal去build生命周期。

| Phase | plugin:goal |
| --- | --- |
| <font style="color:#DD1144;background-color:#F7F7F9;">process-resources</font> | <font style="color:#DD1144;background-color:#F7F7F9;">resources:resources</font> |
| <font style="color:#DD1144;background-color:#F7F7F9;">compile</font> | <font style="color:#DD1144;background-color:#F7F7F9;">compiler:compile</font> |
| <font style="color:#DD1144;background-color:#F7F7F9;">process-test-resources</font> | <font style="color:#DD1144;background-color:#F7F7F9;">resources:testResources</font> |
| <font style="color:#DD1144;background-color:#F7F7F9;">test-compile</font> | <font style="color:#DD1144;background-color:#F7F7F9;">compiler:testCompile</font> |
| <font style="color:#DD1144;background-color:#F7F7F9;">test</font> | <font style="color:#DD1144;background-color:#F7F7F9;">surefire:test</font> |
| <font style="color:#DD1144;background-color:#F7F7F9;">package</font> | <font style="color:#DD1144;background-color:#F7F7F9;">jar:jar</font> |
| <font style="color:#DD1144;background-color:#F7F7F9;">install</font> | <font style="color:#DD1144;background-color:#F7F7F9;">install:install</font> |
| <font style="color:#DD1144;background-color:#F7F7F9;">deploy</font> | <font style="color:#DD1144;background-color:#F7F7F9;">deploy:deploy</font> |


