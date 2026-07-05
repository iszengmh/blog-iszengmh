---
title: 通过python控制安卓手机
published: 2018-05-16 22:40:52
description: '通过python控制安卓手机'
image: ''
tags: [python]
category: python
draft: false 
lang: ''
---
<h1 id="dpiUJ">参考链接</h1>
[Python Get Android Phone Touch Event Coordinate using ADB – ADB Tutorial](https://www.tutorialexample.com/python-get-android-phone-touch-event-coordinate-using-adb-adb-tutorial/#:~:text=In%20this%20tutorial%2C%20we%20will%20use%20python%20and,of%20touch%20event%2C%20and%200036%20is%20coordinate%20y.)

<h1 id="yppB5">通过python控制安卓手机</h1>
<h2 id="H3bma">下载adb程序</h2>
可以android官方网站下载

<h2 id="uChp8">获取屏幕触摸事件</h2>
参考：[Python Get Android Phone Touch Event Coordinate using ADB – ADB Tutorial](https://www.tutorialexample.com/python-get-android-phone-touch-event-coordinate-using-adb-adb-tutorial/#:~:text=In%20this%20tutorial%2C%20we%20will%20use%20python%20and,of%20touch%20event%2C%20and%200036%20is%20coordinate%20y.)

我们需要使用python的依赖库<font style="color:rgb(68, 68, 68);">subprocess.Popen()，我们在调用adb shell getevent的同时，可以获取到它的输出</font>

<!--more-->
```python
#!/usr/bin/python3
import subprocess

def get_xy():
    cmd = r'adb shell getevent'
    w = 0
    h = 0
    try:
        p1=subprocess.Popen(cmd,shell=True,stdout=subprocess.PIPE)
        for line in p1.stdout:
            line = line.decode(encoding="utf-8", errors="ignore")
            line = line.strip()

            if ' 0035 ' in line:
                e = line.split(" ")
                w = e[3]
                w = int(w, 16)
                
            if  ' 0036 ' in line:
                e = line.split(" ")
                h = e[3]
                h = int(h, 16)
                if h >0:
                    p = (w, h)
                    print(p) 
        p1.wait()
        
    except Exception as e:
        print(e)

size = get_xy()
print(size)

```

<h2 id="IsAeP">简单的滑动事件</h2>
获取通过上面的脚本获取到屏幕上的位置后，可以轻而易举地定制你的滑动事件

`adb shell input swipe <from_x> <from_y> <to_x> <to_y>`

```python
#!/usr/bin/python3
import os

def swipe():
    os.system('adb shell input swipe 828 1222 335 1273')
swipe()

```

再做一个简单的封装

```python
#!/usr/bin/python3
import os,time

def swipe(fromX,fromY,toX,toY):
    print('打印需要滑动的位置：',fromX,fromY,toX,toY)
    dictParams=locals();
    strSwipe='adb shell input swipe '
    for k,v in dictParams.items():
        strSwipe+=(' '+str(v))
    print('executing '+strSwipe)
    os.system(strSwipe)
    print('swipe done')

while 1!=2 :
    swipe(828,1222,335,1273)
    time.sleep(10)


```

![](https://cdn.nlark.com/yuque/0/2023/png/244275/1696149092914-7679371d-31f2-4bbc-bbff-51b6d523632b.png)

