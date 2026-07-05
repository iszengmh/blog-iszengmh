---
title: docker之如何用命令搜索docker镜像
published: 2025-08-30 16:16:51
description: 'docker之如何用命令搜索docker镜像'
image: ''
tags: [docker,容器]
category: 容器
draft: false 
lang: ''
---

# 参考链接
[Search Docker Images with docker search Command——Config Server Firewall  ](https://www.configserverfirewall.com/docker/search-images/)

# 指定关键字搜索

```bash

docker search <the keyword you search>
#例如搜索oracle
docker search oracle

```

就可以返回相关的所有镜像了

![](https://cdn.nlark.com/yuque/0/2020/png/244275/1591887515230-ca3f1db9-36c0-4fe4-b30f-8aaf3f3276e2.png)



# 过滤非docker官方镜像

```bash
docker search --filter=is-official=true oracle
```



# 查询时不省略过长的镜像描述

在上一个命令，可以看到Description有很多被省略了，下面这个命令可以让查看全部的docker镜像描述

```bash
docker search  --no-trunc oracle
```

![](https://cdn.nlark.com/yuque/0/2020/png/244275/1591887818461-691fa1e2-a197-4d6c-b67d-e6d23e0e31c1.png)

# 设置返回结果数

> By default, search queries will only return up to 25 results, But we can control the limit using the '--limit' option.
>
> 默认情况下，搜索查询将只返回前面25结果，但是我们可以使用 `--limit` 选项控制限制。
>

```shell
docker search --limit=50 oracle
```

# 显示start最多的几条

显示oracle查询结果中，start最多的前5条

```shell
docker search --filter=stars=5 oracle
```

# 显示自动化镜像

```shell
docker search --filter=is-automated=true oracle
```

# --help查看更多帮助

```shell
docker search --help
```

# 命令是可以组合的

```shell
docker search --filter=stars=5 --filter=is-automated=true --no-trunc oracle
```



