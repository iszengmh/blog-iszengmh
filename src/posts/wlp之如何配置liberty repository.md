---
title: wlp之如何配置liberty repository
published: 2024-07-29 23:44:42
description: 'wlp之如何配置liberty repository'
image: ''
tags: [Websphere Application Server]
category: 中间件
draft: false 
lang: ''
---
<h1 id="9nk9M">参考链接</h1>
[Configuring repositories and proxy settings for the installUtility command——IBM Knowledge Center](https://www.ibm.com/support/knowledgecenter/SSEQTP_liberty/com.ibm.websphere.wlp.doc/ae/twlp_config_installutility.html)

<h1 id="Z67yP">wlp之如何配置liberty repository</h1>
<h2 id="jSShf">创建liberty repository模板</h2>
你可以通过以下命令，查看repository的配置，如果你没有配置repository，则会返回配置模板给你

<!--more-->
```powershell
installUtility viewSettings
```

将返回的模板复制到地址  `${wlp.install.dir}/etc/repositories.properties` ，没有etc目录要创建一个，没有properties要自己创建一个。

<h2 id="2bC57">配置说明</h2>
<h3 id="LH1h1">禁用网络repository</h3>
```powershell
useDefaultRepository=false
```

<h3 id="PXxkk">配置repository地址</h3>
windows

```powershell
dev-rep.url=http://dev.repo.ibm.com:9080/ma/v1
local-rep2.url=file:///c:/IBM/localrepo2
local-rep3.url=C:\IBM\localrepo3
local-rep4.url=C:\IBM\localrepo4.zip
```

HP-UX、Solaris、Linux、Unix

```powershell
dev-rep.url=http://dev.repo.ibm.com:9080/ma/v1
local-rep2.url=file:///usr/IBM/localrepo2
local-rep3.url=/usr/IBM/localrepo3
local-rep4.url=/usr/IBM/localrepo4.zip
```

<h3 id="SF4AE">如果Repository需要用户名密码</h3>
<font style="color:#323232;">If a user name and password are required and they are not set, you receive a prompt to provide them. For enhanced security, encode the password by using the </font>**securityUtility encode**<font style="color:#323232;"> action. For more information, see </font>[Liberty: securityUtility command](https://www.ibm.com/support/knowledgecenter/SSEQTP_liberty/com.ibm.websphere.wlp.doc/ae/rwlp_command_securityutil.html?view=kc)<font style="color:#323232;">.</font>

```powershell
dev-rep.user=myname                            
dev-rep.userPassword={aes}AH5NLyd7DfGb12pK17Pw+
```

<h3 id="gbOoW">如果你repository需要代理服务器</h3>
<font style="color:#323232;">For enhanced security, encode the value of the </font>`proxyPassword`<font style="color:#323232;"> property by using the </font>**securityUtility encode**<font style="color:#323232;"> action. If you do not set the user name and password, you receive a prompt to provide them.</font>

```plain
proxyHost=my.proxy.server.ibm.com
proxyPort=9080
proxyUser=myname
proxyPassword={aes}AH5NLyd7DfGb12pK17Pw+
```

<h2 id="eiJVu">查看验证repository验证信息</h2>
由于运行 `installUtility viewSettings` 会自动验证repository，  `--viewValidationMessages` 选项可以查看详细的repository验证过程

```powershell
installUtility viewSettings --viewValidationMessages
```

<h2 id="U8wlV">测试Repository</h2>
测试所有repository

```powershell
installUtility testConnection
```

测试指定repository

```powershell
installUtility testConnection <repository name>
```

