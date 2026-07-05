---
title: java之java1.7后的try-with-resource用法
published: 2018-01-23 23:09:20
description: 'java之java1.7后的try-with-resource用法'
image: ''
tags: [java]
category: java
draft: false 
lang: ''
---
<h1 id="nPGci">参考链接</h1>
[try-with-resource语法——CSDN@zhangSir134  ](https://blog.csdn.net/java_zhangshuai/article/details/88542224)

<h1 id="pqkCW">java之java1.7后的try-with-resource用法</h1>
> 如果一个类实现了AutoCloseable接口，并行重写close方法。
>
> 那么这个类就可以写在try-catch的try后面的括号中，并且能在try-catch块执行后自动执行这个方法。
>

<!--more-->
```powershell
public class TryWithResource implements AutoCloseable {

    private int age = 18;

    @Override
    public void close() throws Exception {
        System.out.println("this is close 方法");
    }

    public static void main(String[] args) {
        try (TryWithResource tryWithResource = new TryWithResource()) {
            System.out.println(tryWithResource.age);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

这个try-with-resource其实是finally的另外一种优雅的写法，用法仅限于你想在finally关闭各种资源时，这个时候可以采用try-with-resource用法，以下是原始用法供大家对比。

```powershell
public class TryWithResource{

    private int age = 18;

    public void close() throws Exception {
        System.out.println("this is close 方法");
    }

    public static void main(String[] args) {
        TryWithResource tryWithResource = new TryWithResource();
        try {
            System.out.println(tryWithResource.age);
        } catch (Exception e) {
            e.printStackTrace();
        }finally {
            try {
                tryWithResource.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
```

