---
title: docker之如何访问docker中k8s的服务
published: 2026-06-27
description: 'docker 下k8s，我本来是想开放端口映射的，但是一直测试不通过，所以暂时使用是非常规的手段，直接将宿主机的端口映射到POD的端口，而不是k8s的service NodePort'
image: ''
tags: [docker,kubernetes,容器]
category: 容器
draft: false 
lang: ''
---

docker 下k8s，我本来是想开放端口映射的，但是一直测试不通过，所以暂时使用是非常规的手段，直接将宿主机的端口映射到POD的端口，而不是k8s的service NodePort

```bash
#格式
kubectl port-forward pod/<podname> -n <namespace> <外部端口>:<待映射的内部端口>

#示例
kubectl port-forward pod/jenkins-555fdb57b5-2zw42 -n devops-tools 8080:8080
```