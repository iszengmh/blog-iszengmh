---
title: PagerAdapter适配有条目，但是空白？
published: 2017-08-30 16:16:51
description: 'PagerAdapter适配有条目，但是空白？'
image: ''
tags: [android]
category: android
draft: false 
lang: ''
---

其实关键点还是在这个方法，这是pagerAdapter里的方法，用于判断两个对象是否相等，我对viewpager的实现原理是这么理解的：先初始化后——再去获取——判断是否初始化的对象与获取到的对象是否一样；当然判断不一样就不会显示了；当然这只是我理解的，我还没有真正去研究它原理



<!--more-->
```plain
@Override
	public boolean isViewFromObject(View view, Object obj) {
		return view==obj;
	}
```



大家来看一下，我出现的错误instantiateItem是我写在pagerAdapter里面的接口的方法，用来初始化viewpager的条目内容



```plain
@Override
	public Object instantiateItem(View container, int position) {
		((ViewPager)container).addView(instantiateItemListener.instantiateItem(context, data,container,position));
		return instantiateItemListener.instantiateItem(context, data,container, position);
		
	}
```



或许你们已经看出来，关键在这一句，问题就在于，我addView的时候，初始化一次，返回方法对象的时候又调用了instantiateItem初始化了一次。所以两个对象是不一样，所以viewpager就不显示 了



> return instantiateItemListener.instantiateItem(context, data,container, position);
>



正确的写法是：



```plain
	@Override
	public Object instantiateItem(View container, int position) {
		View view = instantiateItemListener.instantiateItem(context,data,container,position);
		((ViewPager)container).addView(view);
		return view;
	}
```



这样就一样，哈哈！

