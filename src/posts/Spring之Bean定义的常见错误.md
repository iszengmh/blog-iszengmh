---
title: Spring之Bean定义的常见错误
published: 2019-08-30 16:16:51
description: 'Spring之Bean定义的常见错误'
image: ''
tags: [java,spring]
category: java
draft: false 
lang: ''
---
<h1 id="Mqm8J">参考链接</h1>
[Spring编程常见错误50例——极客时间@傅健](https://time.geekbang.org/column/article/364761)



<h1 id="8dF70">Spring之Bean定义的常见错误</h1>
<h2 id="HfTez">原型bean被固定</h2>
<!--more-->
```java

@RestController
public class HelloWorldController {

    @Autowired
    private ServiceImpl serviceImpl;

    @RequestMapping(path = "hi", method = RequestMethod.GET)
    public String hi(){
         return "helloworld, service is : " + serviceImpl;
    };
}
```

结果，我们会发现，不管我们访问多少次http://localhost:8080/hi，访问的结果都是不变的，如下：

> helloworld, service is : com.spring.puzzle.class1.example3.error.ServiceImpl@4908af
>



> 当一个属性成员 serviceImpl 声明为  @Autowired 后，那么在创建 HelloWorldController 这个 Bean  时，会先使用构造器反射出实例，然后来装配各个标记为 @Autowired 的属性成员（装配方法参考  AbstractAutowireCapableBeanFactory#populateBean）。具体到执行过程，它会使用很多  BeanPostProcessor 来做完成工作，其中一种是 AutowiredAnnotationBeanPostProcessor，它会通过  DefaultListableBeanFactory#findAutowireCandidates 寻找到 ServiceImpl 类型的  Bean，然后设置给对应的属性（即 serviceImpl 成员）。
>

关键执行步骤可参考 AutowiredAnnotationBeanPostProcessor.AutowiredFieldElement#inject：

```java

protected void inject(Object bean, @Nullable String beanName, @Nullable PropertyValues pvs) throws Throwable {
   Field field = (Field) this.member;
   Object value;
   //寻找“bean”
   if (this.cached) {
      value = resolvedCachedArgument(beanName, this.cachedFieldValue);
   }
   else {
     //省略其他非关键代码
     value = beanFactory.resolveDependency(desc, beanName, autowiredBeanNames, typeConverter);
   }
   if (value != null) {
      //将bean设置给成员字段
      ReflectionUtils.makeAccessible(field);
      field.set(bean, value);
   }
}
```

> 待我们寻找到要自动注入的 Bean 后，即可通过反射设置给对应的 field。这个 field 的执行只发生了一次，所以后续就固定起来了，它并不会因为 ServiceImpl 标记了 SCOPE_PROTOTYPE 而改变。
>

所以，**当一个单例的 Bean，使用 autowired 注解标记其属性时，你一定要注意这个属性值会被固定下来。**



解决方式如下 ：

+ 自动注入Context

```java

@RestController
public class HelloWorldController {

    @Autowired
    private ApplicationContext applicationContext;

    @RequestMapping(path = "hi", method = RequestMethod.GET)
    public String hi(){
         return "helloworld, service is : " + getServiceImpl();
    };
 
    public ServiceImpl getServiceImpl(){
        return applicationContext.getBean(ServiceImpl.class);
    }

}
```

+ 使用 Lookup 注解

我们的方法调用最终并没有走入案例代码实现的 return null 语句，而是通过 BeanFactory 来获取 Bean。所以从这点也可以看出，**在我们的 getServiceImpl 方法实现中，随便怎么写都行，这不太重要。**

```java

@RestController
public class HelloWorldController {
 
    @RequestMapping(path = "hi", method = RequestMethod.GET)
    public String hi(){
         return "helloworld, service is : " + getServiceImpl();
    };

    @Lookup
    public ServiceImpl getServiceImpl(){
        return null;
    }  

}
```

+ 使用proxyMode

```java
@Scope(value = "prototype", proxyMode = ScopedProxyMode.TARGET_CLASS)
```

