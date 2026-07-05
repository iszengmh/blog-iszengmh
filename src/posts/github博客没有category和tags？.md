---
title: github博客没有category和tags？
published: 2025-08-30 16:16:51
description: 'github博客没有category和tags？'
image: ''
tags: [hexo,github]
category: 博客系统
draft: false 
lang: ''
---

# github博客没有category和tags？
在完成了github博客之前后发现菜单栏没有category和tags？
请按如下办法设置：

```
$ hexo new page "categories"
$ hexo new page "tages"
```
![这里写图片描述](http://img.blog.csdn.net/20170128010203505?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTEyNzQ2MjQ5OTQ=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
分别打开对应文件夹里面的md文件，并编辑
![这里写图片描述](http://img.blog.csdn.net/20170128010501819?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTEyNzQ2MjQ5OTQ=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
![这里写图片描述](http://img.blog.csdn.net/20170128010511304?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTEyNzQ2MjQ5OTQ=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
最后要在主题中的_config.yml中修改menu
![这里写图片描述](http://img.blog.csdn.net/20170128010757211?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTEyNzQ2MjQ5OTQ=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)