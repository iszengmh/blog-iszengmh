---
title: aria2常用命令
published: 2025-08-30 16:16:51
description: 'aria2常用命令'
image: ''
tags: [aria2]
category: 下载工具
draft: false 
lang: ''
---

# 参考链接

[Aria2在线文档——Aria2](https://aria2.github.io/manual/en/html/aria2c.html)

# 描述

**aria2 是一个用于下载文件的实用程序。支持的协议包括 HTTP（S）、FTP、SFTP、BitTorrent 和 Metalink。aria2 可以下载一个 文件，并尝试利用您的最大值 下载带宽。它支持从 HTTP（S）/FTP 下载文件 /SFTP 和 BitTorrent 同时下载，而从 HTTP（S）/FTP/SFTP 将上传到 BitTorrent 群。使用 Metalink 块校验和，ARIA2 会自动验证数据块，而 下载文件。**

# 常规语法

<!--more-->
```bash
aria2c [<OPTIONS>] [<URI>|<MAGNET>|<TORRENT_FILE>|<METALINK_FILE>] ...
```

示例：

```bash
aria2c --log=./download.log --dir=.  https://www.baidu.com/
```

# 快捷使用的python脚本

## 根据输入的input file读取下载文件

```python

import subprocess
import os
import inspect

# 获取当前脚本所在目录（不包含文件名）
current_script_dir = os.path.dirname(os.path.abspath(__file__))
print("当前脚本所在目录：", current_script_dir)
#获取用户输入的参数
downloadlink = input("请输入你的input file（下载文件清单，详细规则请查看aria2官方文档）\n")
print("你的input file：", downloadlink)
command_line=f"aria2c --log={current_script_dir}/ariac2.log --input-file={current_script_dir}/download-input-file.txt"
def downloadProcess():
    print("开始下载")
    print("开始执行aria2命令：" + command_line)
    proc = subprocess.Popen(
        command_line, 
        stdin=None, # 标准输入 键盘
        stdout=subprocess.PIPE, # -1 标准输出（演示器、终端) 保存到管道中以便进行操作
        stderr=subprocess.PIPE, # 标准错误，保存到管道
        shell=True,
        env=dict(os.environ, LANG="en_US.UTF-8")   )
    outinfo, errinfo = proc.communicate() # 获取输出和错误信息
    print("aria2命令输出结果：" + outinfo.decode( errors='ignore'))
    print("aria2命令错误输出结果：" + errinfo.decode( errors='ignore'))
    print("aria2命令执行完毕")

downloadProcess()


input("按任意键退出...")
```

input file示例：

```plain
https://www.baidu.com/
	dir=E:\project_workspace\python_workspace\aria2c
	out=baidu.html
https://www.baidu.com/
	dir=E:\project_workspace\python_workspace\aria2c
	out=baidu.html
```

