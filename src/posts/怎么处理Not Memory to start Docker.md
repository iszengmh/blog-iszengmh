---
title: 怎么处理Not Memory to start Docker
published: 2019-03-27 10:28:33
description: '怎么处理Not Memory to start Docker'
image: ''
tags: [docker,容器]
category: 容器
draft: false 
lang: ''
---
<h1 id="cGdPu">参考链接</h1>
[Freeing memory for Hyper-V VMs on Windows 8/8.1  ](https://docs.microsoft.com/en-us/archive/blogs/technet/mspfe/freeing-memory-for-hyper-v-vms-on-windows-88-1)

<h1 id="BZtgq">怎么处理Not Memory to start Docker</h1>
> Most people will start closing desktop applications like Outlook or Word  in order to free RAM, but I like my Outlook open, thank you, so I will  show you a better way by using a free Sysinternals tool by Mark  Russinovich, called [RAMmap](https://technet.microsoft.com/en-us/sysinternals/ff700229.aspx).大多数人会通过关闭桌面程序来腾出RAM空间，像关闭Outlook或者Word程序，但是我想要Outlook开关，因此我将分享一个更好的方法，通过使用一个免费的Sysinternals tool工具——RAMmap
>

<h2 id="mUxgO">第一步下载RAMmap工具</h2>
[https://docs.microsoft.com/en-us/sysinternals/downloads/rammap](https://docs.microsoft.com/en-us/sysinternals/downloads/rammap)

<h2 id="Upbnd">打开之后点击“Empty-->Empty Working Sets”</h2>
![](https://cdn.nlark.com/yuque/0/2020/png/244275/1588342796380-c926de65-40a5-442d-a80c-97256c39df3f.png)

<h2 id="qHADn">按F5刷新之后去重启docker</h2>
docker重启成功，不再提示没有memory

![](https://cdn.nlark.com/yuque/0/2020/png/244275/1588342849286-3f66c805-0e6d-42aa-9570-3faa259e2d28.png)

