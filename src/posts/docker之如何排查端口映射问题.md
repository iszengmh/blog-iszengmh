---
title: docker之如何排查端口映射问题
published: 2026-07-02
description: '起因是发现自己部署在电脑的docker服务immich访不了，但是进入容器用curl测试服务是正常，docker 日志也正常，那就是端口映射出问题了'
image: ''
tags: [docker,容器]
category: 容器
draft: false 
lang: ''
---

# docker之如何排查端口映射问题

## 概述

起因是发现自己部署在电脑的docker服务immich访不了，但是进入容器用curl测试服务是正常，docker 日志也正常，那就是端口映射出问题了
## 先查端口映射是否正常


```bash
docker ps --filter "name=immich" --format "table {{.Names}}\t{{.Ports}}"
```

```
C:\Users\Rise>docker ps --filter "name=immich" --format "table {{.Names}}\t{{.Ports}}"
NAMES                     PORTS
immich_server             2283/tcp
immich_postgres           5432/tcp
immich_machine_learning
immich_redis              6379/tcp
```

如果显示 0.0.0.0:2283->2283/tcp：说明映射配置正确，问题很可能出在服务监听地址上。

如果显示 127.0.0.1:2283->2283/tcp：说明端口只绑定了 127.0.0.1，这是导致无法通过局域网IP访问的原因。

但是以上打印的命令结果说明，端口并没有通过外部映射


## 使用compose

```shell
D:\project_workspace\immich-app>docker-compose down
[+] down 5/5
 ✔ Container immich_machine_learning Removed                                                                        0.4s
 ✔ Container immich_server           Removed                                                                        0.6s
 ✔ Container immich_redis            Removed                                                                        0.5s
 ✔ Container immich_postgres         Removed                                                                        0.6s
 ✔ Network immich_default            Removed                                                                        0.4s

D:\project_workspace\immich-app>docker-compose up -d
[+] up 4/5
 ✔ Network immich_default            Created                                                                        0.1s
 ✔ Container immich_postgres         Started                                                                        0.7s
 ✔ Container immich_redis            Started                                                                        0.7s
 ✔ Container immich_machine_learning Started                                                                        0.7s
 - Container immich_server           Starting                                                                       0.6s
Error response from daemon: ports are not available: exposing port TCP 0.0.0.0:12335 -> 127.0.0.1:0: listen tcp 0.0.0.0:12335: bind: An attempt was made to access a socket in a way forbidden by its access permissions.
```
发现端口映射失败

这个错误在 Windows 上很常见，通常是因为端口被系统保留（比如 Hyper-V 或 WSL 占用了某些端口段），或者被其他进程占用。而 12335 这个端口看起来并不是 Immich 默认的 2283，很可能是你的 docker-compose.yml 中额外配置了某个服务的端口映射（比如微服务间通信端口），或者这是某些旧版本遗留下来的配置。

## 查看宿主机端口占用

```bash
netstat -ano | findstr :12335
```
发现并没有被占用


## 查看h

```cmd
C:\Users\Rise>netsh int ipv4 show excludedportrange protocol=tcp

协议 tcp 端口排除范围

开始端口    结束端口
----------    --------
      4549        4648
      4649        4748
      4749        4848
      4863        4962
      5041        5140
      5141        5240
      5241        5340
      5341        5440
      5531        5630
      5704        5803
     11581       11680
     11681       11780
     11781       11880
     11881       11980
     11981       12080
     12081       12180
     12181       12280
     12281       12380
     50000       50059     *

* - 管理的端口排除。
```

**我发现我要映射的端口在12281-12380，Hyper-V被保留，这种情况通常发生在docker更新时，这个需要重新电脑解决**