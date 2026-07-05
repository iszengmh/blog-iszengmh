---
title: EventBus 报“Subscriber class already registered to event class”错误
published: 2025-08-30 16:16:51
description: 'EventBus 报“Subscriber class already registered to event class”错误'
image: ''
tags: [android]
category: android
draft: false 
lang: ''
---
这句子的话意思也很容易理解，“接收者类已经被注册为事件类了”。



之前我是这么写：

事件注册是写在onStart()里面的



<!--more-->
```plain
@Override
    protected void onStart() {
        super.onStart();
            EventBus.getDefault().register(this);
    }
```



来看一下Activity的生命周期：

![](https://cdn.nlark.com/yuque/0/2020/jpeg/244275/1586007045783-702c8bd1-a252-4b61-9e83-7a17e83e4fba.jpeg)



> onStart()方法会在onCreate()后调用一次，在onRestart()后又调用一次，所以难免会出现重复注册EvenBus的情况。
>



解决方式：



```plain
@Override
    protected void onStart() {
        super.onStart();
        if(!EventBus.getDefault().isRegistered(this)){//加上判断
            EventBus.getDefault().register(this);
        }
    }

    @Override
    protected void onDestroy() {
        if (EventBus.getDefault().isRegistered(this))//加上判断
                EventBus.getDefault().unregister(this);
        super.onDestroy();
    }
```

