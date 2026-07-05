---
title: AndroidSchedulers的mainThread()无法切换到主线程
published: 2017-08-30 16:16:51
description: 'AndroidSchedulers的mainThread()无法切换到主线程，原来是细节问题'
image: ''
tags: [android]
category: android
draft: false 
lang: ''
---
<!--more-->
```plain
Observable.create(new Observable.OnSubscribe<Integer>() {
                   @Override
                   public void call(Subscriber<? super Integer> subscriber) {
                        for (int i=0;i<10;i++){
                            subscriber.onNext(i);
                        }
                       subscriber.onCompleted();
                   }
               })
                       .subscribeOn(Schedulers.io())
                       .subscribeOn(AndroidSchedulers.mainThread())//这里原来是要切换到主线程运行的
                       .subscribe(new Observer<Integer>() {
                   @Override
                   public void onCompleted() {
                       Log.i(MainActivity.class.getSimpleName(),"onCompleted");
                   }

                   @Override
                   public void onError(Throwable e) {
                       Log.i(MainActivity.class.getSimpleName(),"onError");
                   }

                   @Override
                   public void onNext(Integer i) {
                       Log.i(MainActivity.class.getSimpleName(),i+"");
                   }
               });
            }
        });
```



上面这段代码一直报，只有主线程才能更新View



> Only the original thread that created a view hierarchy can touch its views.
>



可能 有人发现了错误，细节啊



```plain
 .subscribeOn(AndroidSchedulers.mainThread())
```



上面的这段代码“subscribeOn()”这个方法是设定Observable所在线程，所以，是将Observable切换到主线程了



正确的应该是调用"observeOn()"方法



```plain
  .observeOn(AndroidSchedulers.mainThread())
```

