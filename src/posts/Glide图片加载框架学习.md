---
title: git之初始配置及Github关联
published: 2017-04-18 21:28:07
description: 'git之初始配置及Github关联'
image: ''
tags: [android]
category: android
draft: false 
lang: ''
---
<h1 id="2110e408">[学习资源来自博客园，请点击](http://www.cnblogs.com/whoislcj/p/5558168.html)</h1>


<h1 id="rc7uC">Glide(图片加载框架)</h1>


Glide默认加载图片的清晰度，即bitmap的格式为RGB_565



<h2 id="2835acce">添加依赖</h2>


<!--more-->
```plain
compile 'com.github.bumptech.glide:glide:3.5.2'//由于glide需要依赖V4包
compile 'com.android.support:support-v4:24.2.1'
```



<h2 id="6f685599">最简单加载并设置在imageView上</h2>


```plain
Glide.with(this)
.load("http://imgstore.cdn.sogou.com/app/a/100540002/527471.jpg")
.into(((ImageView)findViewById(R.id.image)));
```



<h2 id="d51c074a">针对对清晰度有更高的要求的</h2>


可以通过自定义GlideModel



<h3 id="f34a9eeb">实现gilde的GlideModule接口</h3>


```plain
package com.tc.glideimageloader.glide;
import android.content.Context;
import com.bumptech.glide.Glide;
import com.bumptech.glide.GlideBuilder;
import com.bumptech.glide.load.DecodeFormat;
import com.bumptech.glide.module.GlideModule;
	/**
	* Created by 辉神 on 2016/10/5.
	*/
	public class GlideConfiguration implements GlideModule {
	@Override
	public void applyOptions(Context context, GlideBuilder builder) {
	// Apply options to the builder here.
	builder.setDecodeFormat(DecodeFormat.***PREFER\_ARGB\_8888***);
	}
	@Override
	public void registerComponents(Context context, Glide glide) {
	// register ModelLoaders here.
	}
}
```



<h3 id="AndroidManifest.xml">AndroidManifest.xml</h3>


```plain
<meta-data 
android:name="com.tc.glideimageloader.glide.GlideConfiguration"
android:value="GlideModule"/>
```



<h2 id="e1b848a0">缓存策略</h2>


<h3 id="13ca1484">glide缓存所有尺寸的图片</h3>


glide图片加载原理：只加载固定尺寸，并在磁盘中缓存好。如：原为200*200，如果imageView为100*100，则加载时，glide会加载100*100的尺寸大小 到磁盘中，下次自动判断内存否已经加载了这个图片



但是如果，第一个页面的imageview只有100*100,当点击到第二个面的时候imageview是200*200了，第二页面又要重新加载一次



可以使用下面的方法，缓存全尺寸的图片，又缓存其他尺寸的图片：



```plain
Glide.with(this)
.load("http://imgstore.cdn.sogou.com/app/a/100540002/527471.jpg")
.diskCacheStrategy(DiskCacheStrategy.ALL)
.into(((ImageView)findViewById(R.id.image)));
```



<h3 id="def2fed2">DiskCaceStrategy的四个常量解说</h3>


```plain
all:缓存源资源和转换后的资源---缓存原尺寸图片和其他小尺寸的图片

none:不作任何磁盘缓存

source:缓存源资源----这个应该意思是只缓存源资源，可能是原尺寸图片

result：缓存转换后的资源-----缓存固定尺寸，也有可能与原尺寸有很大差异
```



<h2 id="adc3edd3">priority(Priority.NORMAL)下载优先级</h2>


```plain
Glide.with(this).load(imageUrl).priority(Priority.NORMAL).into(imageView);
```



<h2 id="6797a965">override(200,200)按尺寸缓存图片</h2>


<h2 id="45cbca52">centerCrop()和fitCenter()选择放置类型，</h2>


```plain
centerCrop()：

centerCrop在ImageView属性就有这个，用途就是，按比例扩大图片的size居中显示，使得图片长(宽)等于或大于View的长(宽)

fitCenter()：

fitCenter在IMageview也有属性，其实也一样用途，把图片按比例扩大/缩小到View的宽度，居中显示
```



<h2 id="52a5d323">transform()设置转换器，例：设置图片圆角</h2>


<h2 id="fe4aa1bb">设置需要加载的内容</h2>


项目中有很多需要先下载图片然后再做一些合成的功能，比如项目中出现的图文混排，该如何实现目标下



```plain
Glide.with(this).load(imageUrl).centerCrop().into(

new SimpleTarget<GlideDrawable>() {

@Override

public void onResourceReady(GlideDrawable resource, GlideAnimation<? super GlideDrawable> glideAnimation) {

imageView.setImageDrawable(resource);

}

}

);
```



<h2 id="c0a03fa1">设置占位图和加载出错图</h2>


```plain
Glide.with(this)
.load("http://imgstore.cdn.sogou.com/app/a/100540002/52741171.jpg")
.placeholder(R.mipmap.placeholder)
.error(R.mipmap.error)
.into(((ImageView)findViewById(R.id.image)));
```



<h2 id="9d59482b">加载GIF</h2>


无需设置什么鬼，自动加载，picasso框架就不能加载gif图片



<h3 id="cb545072">1、只加载静态图</h3>


```plain
Glide.with(this).load(imageUrl).asBitmap().into(imageView);//显示gif静态图片
```



<h3 id="c7cc2efa">2、只加载动态图</h3>


```plain
Glide.with(this).load(imageUrl).asGif().into(imageView);//显示gif动态图片
```



<h2 id="749cefcc">加载缩略图</h2>


```plain
Glide.with(this)
.load("http://imgstore.cdn.sogou.com/app/a/100540002/527471.jpg")
.placeholder(R.mipmap.placeholder)
.error(R.mipmap.error)
.diskCacheStrategy(DiskCacheStrategy.ALL)
.thumbnail(0.1f)//这样，gilde会加载缩略图，再加载全图
.into(((ImageView)findViewById(R.id.image)));
```



<h2 id="718d9e31">清理磁盘缓存</h2>


```plain
Glide.get(this).clearDiskCache();//清理磁盘缓存 需要在子线程中执行

Glide.get(this).clearMemory();//清理内存缓存 可以在UI主线程中进行
```

