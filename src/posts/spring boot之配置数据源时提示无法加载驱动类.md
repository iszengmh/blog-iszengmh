---
title: spring boot之配置数据源时提示无法加载驱动类
published: 2019-08-30 16:16:51
description: 'spring boot之配置数据源时提示无法加载驱动类'
image: ''
tags: [java,spring,spring boot]
category: java
draft: false 
lang: ''
---
<h1 id="ea6f3b87">参考链接</h1>
[](https://stackoverflow.com/questions/6202653/difference-between-oracle-jdbc-driver-classes/6202721#6202721)[Difference between Oracle jdbc driver classes?](https://stackoverflow.com/questions/6202653/difference-between-oracle-jdbc-driver-classes/6202721#6202721)[——stackoverflow@bw_üezi](https://stackoverflow.com/questions/6202653/difference-between-oracle-jdbc-driver-classes/6202721#6202721)  



<!--more-->

<h1 id="af3c8dff">spring boot之配置数据源时提示spring boot Cannot load driver class: oracle.jdbc.driver.OracleDriver</h1>
1. 环境的maven是自定义了本地仓库位置，但是idea配置maven的设置时却引用的C:\Users\Administrator\.m2\repository，如果自定义了，iDea中也一定要配置好。
2. Idea设置问题，由于我环境的maven是自定义了本地仓库位置，但是idea配置maven的设置时却引用的C:\Users\Administrator\.m2\repository，如果自定义了，iDea中也一定要配置好。



<!--more-->



![](https://cdn.nlark.com/yuque/0/2019/png/244275/1551884347572-64098d3c-b391-4934-9ee4-793fb17d85a6.png)

3. oracle9i开始就不允许使用_oracle.jdbc.driver.OracleDriver_驱动名,而需要使用**oracle.jdbc.OracleDriver**

<font style="color:#000000;"> </font>

4. <font style="color:#000000;">没有初始化相应的bean，或者没有使用注解@Bean使用于相关数源方法，以下我是之前错误的代码</font>



```java
@ConfigurationProperties("oracle.datasource")
public DataSourceProperties oracleDataSourceProperties(){
   return new DataSourceProperties();
}
@Bean
public DataSource oracleDataSource() {
   DataSourceProperties dataSourceProperties =oracleDataSourceProperties();
   System.out.println("oracle.datasource: {}"+dataSourceProperties.getUrl());
   return dataSourceProperties.initializeDataSourceBuilder().build();
}
@Bean
@Resource
public PlatformTransactionManager oracleTxManager(DataSource oracleDataSource) {
   return new DataSourceTransactionManager(oracleDataSource);
}
```



<font style="color:#000000;">以上如果仔细看，可以看到</font><font style="color:#000000;">oracleDataSourceProperties</font><font style="color:#000000;">()这个方法没有使用注解@Bean，导致其一个bean在初始时找不到,我在打印输出时提示“</font><font style="color:#000000;">oracle.datasource: {}null</font><font style="color:#000000;">”</font>

