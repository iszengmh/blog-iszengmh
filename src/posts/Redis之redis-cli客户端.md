---
title: Redis之redis-cli客户端
published: 2017-08-30 16:16:51
description: 'Redis之redis-cli客户端'
image: ''
tags: [redis]
category: 数据库
draft: false 
lang: ''
---
<h1 id="0TihI">参考链接</h1>
[Redis-cli命令最新总结——博客园@silent ](https://www.cnblogs.com/silent2012/p/5368925.html)

[Redis 命令——Runoob.com](https://www.runoob.com/redis/redis-commands.html)

<h1 id="wTnIY">Redis之redis-cli客户端</h1>
redis-cli是专用于访问redis server的客户端

<h2 id="CDd4n">启动redis-cli</h2>
直接输入以下命令，则会直接访问本地redis server，由于redis默认端口为6379，则访问自动按照localhost:6379没有密码进行登录 

```powershell
redis-cli
```

当需要访问远程redis时，则输入以下格式命令

```powershell
redis-cli -h host -p port -a password
# 示例 redis-cli -h 127.0.0.1 -p 6379 -a "mypass"
```

<h2 id="k1Z0W">常用命令</h2>
```powershell
# 查看所有key
keys *
# 设置一个key的值 示例：set sex 1
set <key> <value>
# 删除一个key 示例 del sex
DEL <key>
```



