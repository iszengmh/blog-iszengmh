---
title: Websphere Application Server之如何在程序获取keystore中的证书
published: 2024-07-29 23:44:42
description: 'Websphere Application Server之如何在程序获取keystore中的证书'
image: ''
tags: [Websphere Application Server]
category: 中间件
draft: false 
lang: ''
---
<h1 id="iNSuc">参考链接</h1>
[Class JSSEHelper——IBM WebSphere Application Server Hypervisor Edition 8.5.5](https://www.ibm.com/support/knowledgecenter/SSCKBL_8.5.5/com.ibm.websphere.javadoc.doc/web/apidocs/com/ibm/websphere/ssl/JSSEHelper.html#getSSLSocketFactory(java.util.Map,%20java.util.Properties))

<h1 id="XbRRU">Websphere Application Server之如何在程序获取keystore中的证书</h1>
<h2 id="l69MJ">Websphere Application Server之如何在程序获取keystore中的证书</h2>
<!--more-->
```java
com.ibm.websphere.ssl.JSSEHelper jsseHelper = com.ibm.websphere.ssl.JSSEHelper.getInstance();
		try {
			// String alias = "ssl key";
			Properties sslProps = jsseHelper.getProperties(alias);
			System.out.println(alias + " properties : ");
			LOG.info(alias + " properties : ");
			Set states = sslProps.keySet();
			Iterator itr = states.iterator();
			while (itr.hasNext()) {
				String str = (String) itr.next();
				System.out.println(str + " = " + sslProps.getProperty(str));
				LOG.info(str + " = " + sslProps.getProperty(str));
			}
		} catch (com.ibm.websphere.ssl.SSLException e) {
			e.printStackTrace();
		}
```

<h2 id="OSBym">如何生成SSLContext</h2>
```java
com.ibm.websphere.ssl.JSSEHelper jsseHelper = com.ibm.websphere.ssl.JSSEHelper.getInstance(); 
Properties sslProps = jsseHelper.getProperties(sslConfigOM); 
javax.net.ssl.SSLContext sslContext = jsseHelper.getSSLContext(null, sslProps);
```

如果项目有使用HttpComponents，则可以直接使用，构建 `SSLConnectionSocketFactory` 

```java
org.apache.http.conn.ssl.SSLConnectionSocketFactory sslsf = new org.apache.http.conn.ssl.SSLConnectionSocketFactory(
				sslContext,
                new String[] {"TLSv1"},
                null,
                SSLConnectionSocketFactory.getDefaultHostnameVerifier());
```

