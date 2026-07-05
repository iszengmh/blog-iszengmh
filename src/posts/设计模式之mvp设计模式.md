---
title: 设计模式之mvp设计模式
published: 2018-05-16 22:41:03
description: '设计模式之mvp设计模式'
image: ''
tags: [java]
category: java
draft: false 
lang: ''
---



<h1 id="MnP5e">参考链接</h1>


[《android-architecture》-googlesample](https://github.com/googlesamples/android-architecture/tree/todo-mvp/)



<h1 id="a1b97d97">mvp设计模式</h1>


<h2 id="f411d0f1">说明</h2>


  和传统的mvc不同的的是，原先controller的概念变为presenter，原意为“代理”的意思，mvp设计模式中，model和view的交互完全由Presenter进行代理，简单理解就是，View请求Model时，是先发送给Presenter，Presenter收到请求，再发送请求给Model，Model响应数据回Presenter，Presenter再响应回View，此时完成交互。Model请求View也是差不多的过程。

  mvp设计模式在Android最为常用。



<h2 id="58f3538c">传统MVC和MVP之间的图示比较</h2>


![](https://cdn.nlark.com/yuque/0/2019/png/244275/1560609538338-a7b7ddad-8142-4f3f-a6de-a42e9ca574ed.png)

![](https://cdn.nlark.com/yuque/0/2019/png/244275/1560609522736-9af018f0-8023-4170-b0a7-d00f9dac3c25.png)



<!--more-->

<h2 id="a8ea117a">google mvp</h2>


![](https://cdn.nlark.com/yuque/0/2019/png/244275/1560609574407-ea399c51-ce34-4da6-89f4-e33617c0b6e7.png)

<h3 id="BasePresenter">BasePresenter</h3>


```java
public interface BasePresenter {
    //可以用来初始化相关的数据
    void start();
}
```



<h3 id="BaseView">BaseView</h3>


```java
public interface BaseView<T> {
    //view层可以引用Presenter
    void setPresenter(T presenter);
}
```



<h3 id="module">module</h3>


<h4 id="contract">contract</h4>
这个是根据具体模块，抽象更多功能的类



```java
public interface TasksContract {
    interface View extends BaseView<Presenter> {
//可以再设计更多抽象方法···············
        void showTasks(List<Task> tasks);
    }
    interface Presenter extends BasePresenter {
//可以再设计更多抽象方法···············
        void loadTasks(boolean forceUpdate);
    }
}
```



<h4 id="View">View</h4>


```java
public class TasksFragment extends Fragment implements TasksContract.View {
    private TasksContract.Presenter mPresenter;
//其他方法略····················
    @Override
    public void showTasks(List<Task> tasks) {
        //Presenter向model获取数据后，将回调此方法，返回有数据的tasks给View层
    }
    @Override
    public void setPresenter(@NonNull TasksContract.Presenter presenter) {
    //Presenter实例化后回调TasksContract.View 中setPresenter()方法，从而View层也获取到Presenter的引用
        mPresenter = checkNotNull(presenter);
    }
}
```



<h4 id="Presenter">Presenter</h4>


```java
public class TasksPresenter implements TasksContract.Presenter {
//数据层data包中的封装类
    private final TasksRepository mTasksRepository;
//view层
    private final TasksContract.View mTasksView;
    public TasksPresenter(@NonNull TasksRepository tasksRepository, @NonNull TasksContract.View tasksView) {
        mTasksRepository = checkNotNull(tasksRepository, "tasksRepository cannot be null");
        mTasksView = checkNotNull(tasksView, "tasksView cannot be null!");
//使View层得到Presenter的引用
        mTasksView.setPresenter(this);
    }
}
```



<h3 id="Activity">Activity</h3>


在Activity中初始化Presenter的实现类，即可完成MVP模式的分层,view层只做视图展示，model层负责查询数据，Presenter负责View和model的代理。



```java
// Create the presenter
mTasksPresenter = new TasksPresenter(
        Injection.provideTasksRepository(getApplicationContext()), tasksFragment);
```



