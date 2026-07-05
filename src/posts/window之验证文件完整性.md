---
title: window之验证文件完整性
published: 2024-07-29 23:44:42
description: 'window之验证文件完整性'
image: ''
tags: [windows]
category: 操作系统
draft: false 
lang: 'zh_CN'
---

```
C:\Users\admin>CertUtil -hashfile kubectl.exe SHA256
SHA256 的 kubectl.exe 哈希:
03e6edfdbf73268aa72b6829f49a66c9a56db32aaec447e533fc0345f073e94d
CertUtil: -hashfile 命令成功完成。

C:\Users\admin>type kubectl.exe.sha256
03e6edfdbf73268aa72b6829f49a66c9a56db32aaec447e533fc0345f073e94d
C:\Users\iszengmh>
```

