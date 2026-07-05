---
title: android The specified child already has a parent
published: 2017-08-30 16:16:51
description: 'android The specified child already has a parent'
image: ''
tags: [android]
category: android
draft: false 
lang: ''
---


```plain
java.lang.IllegalStateException: 
The specified child already has a parent. You must call removeView() on the child's parent first.
```



这种问题普遍出现在动态添加View时



```plain
也就是非法状态异常，它说这个特定的child已经有一个parent了，你必须在这个parent中首先调用removeView()方法，才能继续你的内容。
这里很明显这个child是一个View，一个子（child）View必须依赖于父（parent）View，如果你要使用这个child，则必须通过parent，而你如果就是硬想使用这个child，那么就得让这个child与parent脱离父子关系（即removeView（））……
```

