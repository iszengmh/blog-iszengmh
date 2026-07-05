---
title: 播放Assets下的指定音频时，变成播放所有音频了
published: 2017-08-30 16:16:51
description: '播放Assets下的指定音频时，变成播放所有音频了'
image: ''
tags: [android]
category: android
draft: false 
lang: ''
---
这是我assets目录下的音频

![](https://cdn.nlark.com/yuque/0/2020/jpeg/244275/1586008466544-fc36a057-b0b3-4a69-8f11-02a0d7e60f55.jpeg)



展示出错的代码



<!--more-->
```plain
try {
AssetFileDescriptor openFd=getAssets().openFd("crazy.mp3");
MediaPlayer mediaPlayer =new MediaPlayer();
mediaPlayer.setDataSource(openFd.getFileDescriptor());
		            mediaPlayer.prepare();
		            mediaPlayer.start();
} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
}
```



以上代码会导致assets目录下的所有音频全部播放



出错位置



```plain
mediaPlayer.setDataSource(openFd.getFileDescriptor());
```



应改成



```plain
mediaPlayer.setDataSource(openFd.getFileDescriptor(),openFd.getStartOffset(),openFd.getLength());
```



这样就可以播放指定的音频文件了



至于为什么会这样的问题，我只是突然发现了这个问题，还请高手能回答一下

