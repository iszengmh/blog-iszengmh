---
title: 安装kubernetes失败(deperecated)
published: 2025-06-30 16:16:51
description: '安装kubernetes失败(deperecated)'
image: ''
tags: [kubernetes,容器]
category: 容器
draft: false 
lang: ''

---

<h1 id="RMAOk">参考链接</h1>
[gcr.io/k8s-minikube/kicbase:v0.0.46——渡渡鸟的容器镜像小站](https://docker.aityp.com/image/gcr.io/k8s-minikube/kicbase:v0.0.46)

<h1 id="TgCee">环境信息</h1>
Linux k8s1 6.8.0-40-generic #40~22.04.3-Ubuntu SMP PREEMPT_DYNAMIC Tue Jul 30 17:30:19 UTC 2 x86_64 x86_64 x86_64 GNU/Linux

<h1 id="kVS53">安装minikube失败</h1>

如下图所示，我是首先指定了k8s的版本，然后执行start会自动初始化kubernetes，但是提示无法下载相关的镜像

minikube start --kubernetes-version=v1.32.0

![](https://cdn.nlark.com/yuque/0/2025/png/244275/1750586780853-49931e38-feba-40f0-a329-88ecbb7d7dad.png)

捣鼓半天以为是虚拟机网络的问题，后面参考通义ai的解决方案才解决，其实就是k8s在关联相关镜像时，k8s有关联的tag是和国内的镜像站不一致

> <h2 id="5fbb9d9c"><font style="color:rgb(44, 44, 54);">🚫</font><font style="color:rgb(44, 44, 54);"> 根本原因</font></h2>
> + <font style="color:rgb(44, 44, 54);">Minikube 使用的是一个带</font><font style="color:rgb(44, 44, 54);"> </font>`<font style="color:rgb(44, 44, 54);background-color:rgba(175, 184, 193, 0.2);">sha256</font>`<font style="color:rgb(44, 44, 54);"> </font><font style="color:rgb(44, 44, 54);">摘要地址的镜像（如</font><font style="color:rgb(44, 44, 54);"> </font>`<font style="color:rgb(44, 44, 54);background-color:rgba(175, 184, 193, 0.2);">@sha256:...</font>`<font style="color:rgb(44, 44, 54);">），这种格式要求必须精确匹配远程仓库中的镜像摘要。</font>
> + <font style="color:rgb(44, 44, 54);">阿里云或其他国内镜像源可能没有该特定版本或摘要的镜像。</font>
> + <font style="color:rgb(44, 44, 54);">即使你本地有 </font>`<font style="color:rgb(44, 44, 54);background-color:rgba(175, 184, 193, 0.2);">kicbase:v0.0.46</font>`<font style="color:rgb(44, 44, 54);"> 镜像，如果没有对应的 digest 哈希值，Docker 也不会使用它。</font>

解决方法是把tag换成像带有sha256前缀的tag

[gcr.io/k8s-minikube/kicbase:v0.0.46——渡渡鸟的容器镜像小站](https://docker.aityp.com/image/gcr.io/k8s-minikube/kicbase:v0.0.46)

根据上面网站中提供的命令行，去下载对应的镜像

<!--more-->

```shell
docker pull swr.cn-north-4.myhuaweicloud.com/ddn-k8s/gcr.io/k8s-minikube/kicbase:v0.0.46
docker tag  swr.cn-north-4.myhuaweicloud.com/ddn-k8s/gcr.io/k8s-minikube/kicbase:v0.0.46  gcr.io/k8s-minikube/kicbase:v0.0.46
```

然后查看本地本地镜像的tag，发现tag是sha256:d24ac8081a1c40f708fc6e890eb16ec07e4fc51b437b112cfb2ab38f690a2ba8符合要求。

```shell
docker images --digests | grep kicbase
```

![](https://cdn.nlark.com/yuque/0/2025/png/244275/1750587761590-8e08665b-c4a6-41f3-b0c8-6a6f167ed414.png)

根据通义ai的说法，可以更换本地kicbase的镜像的Tag，我本来是想替换minikube下载的kicbase镜像，但是似乎失败了，后面pull渡渡鸟这个镜像一查之后发现这个tag符合要求

![](https://cdn.nlark.com/yuque/0/2025/png/244275/1750588006056-54532fc5-a630-4a99-b0c0-9245492550aa.png)

反正本地docker有个符合的kicbase就可以了，直接跑minikube start --kubernetes-version=v1.32.0

![](https://cdn.nlark.com/yuque/0/2025/png/244275/1750588094226-8499819d-4679-4326-bdf4-de067ae3d079.png)
