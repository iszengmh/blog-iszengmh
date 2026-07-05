---
title: deepin之Could not get lock _var_lib_dpkg_lock-frontend - open
published: 2025-08-30 16:16:51
description: 'deepin之Could not get lock _var_lib_dpkg_lock-frontend - open'
image: ''
tags: [deepin,操作系统]
category: 操作系统
draft: false 
lang: ''
---

# 参考链接</h1>
[ubuntu 常见问题系列：E：Could not get lock /var/lib/dpkg/lock-frontend - open——CSDN@chonghu5376   ](https://blog.csdn.net/chonghu5376/article/details/100735206)

# deepin之Could not get lock /var/lib/dpkg/lock-frontend - open
我在准备更新证书时，发生了这个错误

> sudo apt-get install apt-transport-https ca-certificates
> 
> E: Could not get lock /var/lib/dpkg/lock - open (11: Resource temporarily unavailable)

> E: Unable to lock the administration directory (/var/lib/dpkg/), is another process using it?

这可能是由于进程被占用的原因，请依次输入以下命令，进行尝试：

```bash
sudo rm /var/cache/apt/archives/lock-frontend
sudo  rm /var/lib/dpkg/lock-frontend
sudo rm /var/cache/apt/archives/lock
sudo  rm /var/lib/dpkg/lock
```

然后再尝试你之前的命令。
