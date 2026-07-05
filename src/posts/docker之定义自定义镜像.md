---
title: docker之定义自定义镜像
published: 2025-08-30 16:16:51
description: 'docker之定义自定义镜像'
image: ''
tags: [docker,容器]
category: 容器
draft: false 
lang: ''
---


# 参考链接
[Build and run your image——Docker](https://docs.docker.com/get-started/part2/)

[04｜创建容器镜像：如何编写正确、高效的Dockerfile-Kubernetes入门实战课-极客时间](https://time.geekbang.org/column/article/528660)

# 拉取sample代码

```git
git clone https://github.com/dockersamples/node-bulletin-board
cd node-bulletin-board/bulletin-board-app
```

# 创建镜像注意事项

> 1. 创建镜像需要编写 Dockerfile，写清楚创建镜像的步骤，每个指令都会生成一个 Layer。
> 2. Dockerfile 里，第一个指令必须是 FROM，用来选择基础镜像，常用的有 Alpine、Ubuntu 等。其他常用的指令有：COPY、RUN、EXPOSE，分别是拷贝文件，运行 Shell 命令，声明服务端口号。
> 3. docker build 需要用 -f 来指定 Dockerfile，如果不指定就使用当前目录下名字是“Dockerfile”的文件。
> 4. docker build 需要指定“构建上下文”，其中的文件会打包上传到 Docker daemon，所以尽量不要在“构建上下文”中存放多余的文件。
> 5. 创建镜像的时候应当尽量使用 -t 参数，为镜像起一个有意义的名字，方便管理。
>

# Demo

创建一个文件可以自定义名称，但是build的时候需要指定文件名称，也可以定义成Dockerfile，build的时候就不需要指定名称了

```dockerfile

FROM alpine:3.15                # 选择Alpine镜像
FROM ubuntu:bionic              # 选择Ubuntu镜像

```

假如文件名是Dockerfile.busybox，则可以使用以下命令在当前目录执行构建一个镜像。docker会逐条执行命令。

```bash

docker build -f Dockerfile.busybox

```

指定镜像名称，名称可以是demobusybox

```bash

docker build -f Dockerfile.busybox -t demobusybox

```

新的镜像暂时还没有名字（用 docker images 会看到是 ），但我们可以直接使用“IMAGE ID”来查看或者运行：

```bash
docker inspect b61
docker run b61
```

输出内容类似

```
Sending build context to Docker daemon   7.68kB
Step 1/2 : FROM busybox
 ---> d38589532d97
Step 2/2 : CMD echo "hello world"
 ---> Running in c5a762edd1c8
Removing intermediate container c5a762edd1c8
 ---> b61882f42db7
Successfully built b61882f42db7
```

# 命令解析

## RUN

RUN 通常会是 Dockerfile 里最复杂的指令，会包含很多的 Shell 命令，但 Dockerfile 里一条指令只能是一行，所以有的 RUN 指令会在每行的末尾使用续行符 \，命令之间也会用 && 来连接，这样保证在逻辑上是一行，就像下面这样：

```bash

RUN apt-get update \
    && apt-get install -y \
        build-essential \
        curl \
        make \
        unzip \
    && cd /tmp \
    && curl -fSL xxx.tar.gz -o xxx.tar.gz\
    && tar xzf xxx.tar.gz \
    && cd xxx \
    && ./config \
    && make \
    && make clean

```

## COPY

从本机复制文件到镜像

```bash

COPY ./a.txt  /tmp/a.txt    # 把构建上下文里的a.txt拷贝到镜像的/tmp目录
COPY /etc/hosts  /tmp       # 错误！不能使用构建上下文之外的文件

```

## EXPOSE

它用来声明容器对外服务的端口号，对现在基于 Node.js、Tomcat、Nginx、Go 等开发的微服务系统来说非常有用：

```bash

EXPOSE 443           # 默认是tcp协议
EXPOSE 53/udp        # 可以指定udp协议

```

# 忽略本地文件

可以在当前目录创建一个以`为后缀的文件，并在文件中指定需要忽略的文件，可以是如下格式

```

# docker ignore
*.swp
*.sh

```

