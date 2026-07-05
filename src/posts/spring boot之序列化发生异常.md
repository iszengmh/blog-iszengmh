---
title: spring boot之序列化发生异常
published: 2019-08-30 16:16:51
description: 'spring boot之序列化发生异常'
image: ''
tags: [java,spring,spring boot]
category: java
draft: false 
lang: ''
---
<h1 id="gKDT2">概述</h1>
我在项目遇到一个问题，我的bean中被@Document修饰的，代码中有几个封装的方法，但是我突然，为什么功能跑完后，那个方法突然会被调用多次。由于公司项目代码属于保密，以下代码只是示例

<h1 id="ZTV9q">主要依赖版本</h1>
spring-boot:1.5

spring-context:4.3.14

spring-web:4.3.14

spring-webmvc:4.3.14

thymeleaf-spring:4.2.16

<h1 id="LgsNI">bean</h1>
<!--more-->
```java
@Document
public class History {
    @Id
    private Long id;
    private String vd;
    public String getVdAdjusted(){
        System.out.println(vd+id);//这里面会被打印多次
        return vd+id;
    }
   
}
```

<h1 id="rAASq">方法</h1>
```bash
@RestControler
public class DataControler{
  @Autowired
  private HistoyDao historyDao;
  @RequestMapping
  public @ResponseBody List display(@RequestParam("username",required=false) String username){
    History history=historyDao.findLatestHistory();
    String vdAjusted=history.getVdAdjusted();
    List historyList=ArrayList.toList(Object[]{history})
    return historyList;
  }
}
```



没有经过深入研究，但是初步怀疑是return List时，spring在进行序列化过程中错误将非getter方法进行了调用。简单的解决方式是将`getVdAdjusted`中的`get`从方法名中去掉。

