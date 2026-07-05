---
title: kubernetes之存活探针Liveness Probe
published: 2026-06-27
description: '在docker中测试安装jenkins，然后发现jenkins pod的状态是CrashLoopBackOff ，但是logs里面没有看到明显报错，似乎是外部主动执行的stop，只看到了stop日志，所以在 Kubernetes 中，唯一会在 Pod 启动后主动杀死它的机制就是——存活探针（Liveness Probe）失败。'
image: ''
tags: []
category: ''
draft: true 
lang: ''
---


