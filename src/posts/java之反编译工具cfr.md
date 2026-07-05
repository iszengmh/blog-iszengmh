---
title: java之反编译工具cfr
published: 2018-01-23 23:09:20
description: 'java之反编译工具cfr'
image: ''
tags: [java,反编译]
category: java
draft: false 
lang: ''
---

在maven下载cfr-0.152.jar放指定目录

下面我写了一个简单的CMD命令，你创建一个bat文件放入以下命令：

```bash
@echo off
:A
rem 将用户的输入赋值给一个变量p
set /p inputDir=请输入即将反编译的路径 
set /p outputDir=请输入反编译的输出路径 
for /f  "tokens=*" %%a in ('dir /s/b/a-d %inputDir%') do (
	if  "%%~xa" equ ".class" ( 
		echo 正在反编译 %%a
	java -jar cfr_0_125.jar %%a --outputdir %outputDir%
	)

)
goto A
pause
```

