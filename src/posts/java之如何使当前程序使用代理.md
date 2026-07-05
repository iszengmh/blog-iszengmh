---
title: java之如何使当前程序使用代理
published: 2018-01-23 23:09:20
description: 'java之如何使当前程序使用代理'
image: ''
tags: [java]
category: java
draft: false 
lang: ''
---

<h1 id="VKpaC">参考链接</h1>


[java中设置网络代理——简书@jijs](https://www.jianshu.com/p/9e1abe05314d) 



<h1 id="9rrtR">java之如何使当前程序使用代理</h1>
<h2 id="jldiB">概述</h2>
<h2 id="cSPtQ">java中支持的代理</h2>
<font style="color:#2F2F2F;">java中支持 HTTP代理、HTTPS代理、Socket代理、FTP代理 。</font>



<!--more-->

<h2 id="emjLU">程序中编写程序使用代理</h2>


```java
//使用http协议
System.setProperty("http.proxyHost", "192.168.10.130");
System.setProperty("http.proxyPort", "808");
System.setProperty("http.nonProxyHosts", "192.168.3.249 | 192.168.3.100");
//https代理
System.setProperty("https.proxyHost", "192.168.10.130");
System.setProperty("https.proxyPort", "808");
System.setProperty("https.nonProxyHosts", "192.168.3.249 | 192.168.3.100");
//ftp代理
System.setProperty("ftp.proxyHost", "192.168.10.130");
System.setProperty("ftp.proxyPort", "808");
System.setProperty("ftp.nonProxyHosts", "192.168.3.249 | 192.168.3.100");
//使用socks协议连接
Properties prop = System.getProperties();
prop.put("proxySet", true);
prop.setProperty("socksProxyHost", "143.168.16.188");
prop.setProperty("socksProxyPort", "1780");
//注意：socks无法使用忽略IP配置
//prop.setProperty("nonProxyHosts", "192.168.1.82");//192.168.1.82 | 192.168.3.100

```



<h2 id="lasfA">jvm变量中设置代理</h2>


```powershell
# 在系统启动时，使用-D项来设置代理。
# http代理
java -Dhttp.ProxyHost=143.168.16.188 -Dhttp.ProxyPort=1780 com.test.mydemo
# https代理
java -Dhttps.ProxyHost=143.168.16.188 -Dhttps.ProxyPort=1780 com.test.mydemo
# ftp代理
java -Dftp.ProxyHost=143.168.16.188 -Dftp.ProxyPort=1780 com.test.mydemo
# socks代理
java -Dsocks.ProxyHost=143.168.16.188 -Dsocks.ProxyPort=1780 com.test.mydemo
```



