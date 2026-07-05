---
title: go之切换代理
published: 2025-08-30 16:16:51
description: 'go之切换代理'
image: ''
tags: [go]
category: go
draft: false 
lang: ''
---

# 参考链接

[ 解决golang被墙(go get golang.org/x/失败)——CSDN@Asimov__](https://blog.csdn.net/qq_41661056/article/details/103068485)

[go切换proxy中国代理——博客园@Awakenedy ](https://www.cnblogs.com/awakenedy/articles/12813936.html)

# 解决go被墙的问题

有两种方式，一种是直接从github下载对应项目的代码，然后编译安装到go的src目录下 `【目录】/src/golang.org/x/` ，二种是切换代理（推荐）



## 手动下载

<!--more-->
```powershell
cd %GOPATH%/src/golang.org/x/
git clone https://github.com/golang/crypto.git
# 安装编译这个包下的所有依赖
go install golang.org/x/crypto/...
```



## 切换代理

window:

```powershell
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.io
# https://goproxy.io 也可替换成阿里云的 https://mirrors.aliyun.com/goproxy或https://goproxy.cn,direct
```

linux

```bash
export GO111MODULE=on
export GOPROXY=https://goproxy.cn
# 或者使用以下
echo "export GO111MODULE=on" >> ~/.profile
echo "export GOPROXY=https://goproxy.cn" >> ~/.profile
source ~/.profile


```

