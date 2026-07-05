---
title: java之synchronized怎么提升性能
published: 2026-06-01
description: '本文尝试从一步步的改进来理解提升性能及提升性能中可能需要考虑的问题。'
image: ''
tags: [java,spring,并发]
category: java
draft: false 
lang: ''
---

# 参考链接

[Java重磅场景题：synchronized怎么提升性能？讲的最通俗的一次！——bilibili@图灵学院](https://www.bilibili.com/video/BV1mc9YBuE3e/?spm_id_from=333.1387.favlist.content.click&vd_source=92952779413abfdf58688ee145b37ee9)

# 通常的同步锁，是如何实现的

```java
    //main方法是模拟web接口的调用，HelloController作为一个被@RestController修饰的Controller，在spring中是单例的，所以下面的synchronized对HelloController进行加锁，从结果上来说也是符合期望的。
    public static void main(String[] args) throws InterruptedException {
        HelloController controller = new HelloController();
        Thread helloThread = new Thread(() -> {
            controller.save("清华大学");
        });
        Thread helloThread1 = new Thread(() -> {
            controller.save("北京大学");
        });
        Thread helloThread2 = new Thread(() -> {
            controller.save("北京大学");
        });
        helloThread.start();
        helloThread1.start();
        helloThread2.start();
        
        helloThread.join();
        helloThread1.join();
        helloThread2.join();
    }
    static Map<String, Integer> dataStore = new java.util.concurrent.ConcurrentHashMap<>();
    public static void saveData(String data) {
        if (dataStore.containsKey(data)) {
            dataStore.put(data, dataStore.get(data)+1);
        } else {
            dataStore.put(data, 1);
        }
        System.out.println("Current data store: " + dataStore);
    }
    //正常输出期望值是Current data store: {北京大学=2, 清华大学=1}
    @GetMapping("/save")
    public Map<String, Object> save(@RequestParam String data) {
        //HelloController.class是对这一class对象加锁，无论HelloController有多少实例，都可以实现加锁
        //用this加锁，只针对同一实例下，但是在spring中是生效的，因为spring的Controller是单例
        synchronized (this) {
            System.out.println("Saving data: " + data);
            saveData(data);
        }
        return Map.of("message", "Data saved successfully");
    }
```

上面代码就是传统的加锁方式,而且在不考虑spring的场景下，只从单纯的java程序来讲，没有任何问题，只是效率上低一些

# 在spring web场景下，你可能会用的高效加锁（但是这是错误的）


```java
    //main方法是模拟web接口的调用，为了更真实模拟web api调用，string的传入使用new String，这是spring web内部就是这样实现的，所以加锁要考虑new String的问题
    public static void main(String[] args) throws InterruptedException {
        HelloController controller = new HelloController();
        Thread helloThread = new Thread(() -> {
            controller.save(new String("清华大学"));
        });
        Thread helloThread1 = new Thread(() -> {
            controller.save(new String("北京大学"));
        });
        Thread helloThread2 = new Thread(() -> {
            controller.save(new String("北京大学"));
        });
        helloThread.start();
        helloThread1.start();
        helloThread2.start();
        
        helloThread.join();
        helloThread1.join();
        helloThread2.join();
    }
    static Map<String, Integer> dataStore = new java.util.concurrent.ConcurrentHashMap<>();
    public static void saveData(String data) {
        if (dataStore.containsKey(data)) {
            dataStore.put(data, dataStore.get(data)+1);
        } else {
            dataStore.put(data, 1);
        }
        System.out.println("Current data store: " + dataStore);
    }
    //正常输出期望值是Current data store: {北京大学=2, 清华大学=1}
    @GetMapping("/save")
    public Map<String, Object> save(@RequestParam String data) {
        
        synchronized (data) {
            System.out.println("Saving data: " + data);
            saveData(data);
        }
        return Map.of("message", "Data saved successfully");
    }
```
上面从`synchronized (this)`改成`synchronized (data)`，这一步改进，是防止对整个Controller进行阻塞，从而提升效率，但是这个改动是有bug，因为data在spring web中传入，并不是作为单例传入的，加锁会失败


聪明的你可能会用`String.intern()`，因为你考虑String也是存储在常量池中的，只要获取常量池中的对象就可以，但是很可惜这也是失败的。因为常量池是全局共享，用这个方法加锁，等用一个资源，对整个java程序进行了加锁。
```java

    @GetMapping("/save")
    public Map<String, Object> save(@RequestParam String data) {
        
        synchronized (data) {
            System.out.println("Saving data: " + data);
            saveData(data);
        }
        return Map.of("message", "Data saved successfully");
    }
```

# 正确高效的加锁方式

使用`ConcurrentHashMap`来形成锁的粒度从整个资源缩小到对单个数据维度的锁。关键调用`Object computeIfAbsent = lockMap.computeIfAbsent(data, k -> new Object());`,如果data存在则返回data，不存在则新建一个新对象放进Map
```java
    public static void main(String[] args) throws InterruptedException {
        HelloController controller = new HelloController();
        Thread helloThread = new Thread(() -> {
            controller.save(new String("清华大学"));
        });
        Thread helloThread1 = new Thread(() -> {
            controller.save(new String("北京大学"));
        });
        Thread helloThread2 = new Thread(() -> {
            controller.save(new String("北京大学"));
        });
        helloThread.start();
        helloThread1.start();
        helloThread2.start();
        
        helloThread.join();
        helloThread1.join();
        helloThread2.join();
    }
    static Map<String, Integer> dataStore = new java.util.concurrent.ConcurrentHashMap<>();
    public static void saveData(String data) {
        if (dataStore.containsKey(data)) {
            dataStore.put(data, dataStore.get(data)+1);
        } else {
            dataStore.put(data, 1);
        }
        System.out.println("Current data store: " + dataStore);
    }
    //正常输出期望值是Current data store: {北京大学=2, 清华大学=1}

    private final ConcurrentHashMap<String, Object> lockMap = new ConcurrentHashMap<>();
    @GetMapping("/save")
    public Map<String, Object> save(@RequestParam String data) {
        Object computeIfAbsent = lockMap.computeIfAbsent(data, k -> new Object());
        synchronized (computeIfAbsent) {
            System.out.println("Saving data: " + data);
            saveData(data);
        }
        return Map.of("message", "Data saved successfully");
    }
```

# 从其他业务场景考虑
比如业务场景是工作流系统， 一个ProcessConfig对应会生成多少execution的流，
那如果要实现加锁的话，针对整个ProcessConfig进行加锁，对性能的消耗太大，如果只对ProcessConfig.id进行加锁，那就可以缩小锁的粒度，从而实现性能的提升