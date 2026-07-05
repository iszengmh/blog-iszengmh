---
title: retrofit网络请求框架
published: 2017-08-30 16:16:51
description: 'retrofit网络请求框架'
image: ''
tags: [android]
category: android
draft: false 
lang: ''
---
<h1 id="ofBgh">文章来自[Retrofit2.0使用详解](http://blog.csdn.net/ljd2038/article/details/51046512)</h1>


android studio可引用gradle compile 集成retrofit



<!--more-->
```plain
    compile 'com.squareup.retrofit2:retrofit:2.1.0'
```



<h2 id="xw7hk">直接请求JOSN</h2>
首先创建一个interface请求接口

注解对应的包如下



```plain
import retrofit2.http.GET;
import retrofit2.http.Path;
```



以下请求接口



```plain
    interface GitHubApi{
        //owner：是用户路径
        //repo：是响应地址
        //很显然，这是多变的，不同有不同的路径
        //路径注入的方式，这种方式是get请求时，有需要多种变换
        @GET("repos/{owner}/{repo}/contributors")
        Call<ResponseBody> contributorsBySimpleGetCall(@Path("owner") String own,@Path("repo") String repo);
    }
```



上面这段代码，@GET()注解中，有用{}，对应参数上注解@Path。



下面调用代码



```plain
//实例retrofit，retrofit采用的是builder模式
 Retrofit retrofit=new Retrofit.Builder()
                .baseUrl("https://api.github.com/")
                .build();
 //调用create，让retrofit去实现我们所创建的interface
GitHubApi repo=retrofit.create(GitHubApi.class);

 Call<ResponseBody> responseBodyCall = repo.contributorsBySimpleGetCall("square","retrofit");

      Retrofit retrofit=new Retrofit.Builder()
                .baseUrl("https://api.github.com/")
                .build();
        GitHubApi repo=retrofit.create(GitHubApi.class);
        Call<ResponseBody> responseBodyCall = repo.contributorsBySimpleGetCall("square","retrofit");
     
     //请求网络，并返回response
        responseBodyCall.enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                try {
                    Log.i("contributor","是请求后的响应结果"+response.body().string());

                    Gson gson=new Gson();
                    ArrayList<Contributor> con=gson.fromJson(response.body().string(),new TypeToken<List<Contributor>>(){}.getType());
                if (con!=null){
                        for (Contributor contributor:con){
                            Log.i("contributor",contributor.getLogin());
                        }
                }else{
                    Log.i("contributor","con为空");
                }
                } catch (IOException e) {
                    e.printStackTrace();
                }

            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                Log.e("contributor","请求失败");
            }
        });
```



<h2 id="wB64U">通过依赖retrofit-converter-gson直接返回实体类</h2>
android studio首先需要再增加一个依赖



```plain
//这个依赖，是retrofit集成了gson，可用于直接转换为实体类，无需开发者解析
compile 'com.squareup.retrofit2:converter-gson:2.0.1'
```



square提供了多种解析json的依赖库



```plain
Gson: compile 'com.squareup.retrofit2:converter-gson:2.0.1'
Jackson: compile 'com.squareup.retrofit2:converter-jackson:2.0.1'
Moshi: compile 'com.squareup.retrofit2:converter-moshi:2.0.1'
Protobuf: compile 'com.squareup.retrofit2:converter-protobuf:2.0.1'
Wire: compile 'com.squareup.retrofit2:converter-wire:2.0.1'
Simple XML: compile 'com.squareup.retrofit2:converter-simplexml:2.0.1'
Scalars (primitives, boxed, and String): compile 'com.squareup.retrofit2:converter-scalars:2.0.1'
```



修改接口定义



```plain
          //需要添加依赖 compile 'com.squareup.retrofit2:converter-gson:2.0.1'，
          //这是retrofit的转换器，内部集成了gson
        //自动解析json将其转换为实体类
        @GET("repos/{owner}/{repo}/contributors")
        Call<List<Contributor>> getContributors(@Path("owner") String own,@Path("repo") String repo);
```



可以看到有一点不同，就是返回值中的泛型定义直接改为实体类集合



Retrofit的build增加了GSON转换器



```plain
 Retrofit retrofit=new Retrofit.Builder()
                .baseUrl("https://api.github.com/")
                //添加gson转换器，直接转换为实体类
                .addConverterFactory(GsonConverterFactory.create())
                .build();
```



实际调用展示



```plain
 Retrofit retrofit=new Retrofit.Builder()
                .baseUrl("https://api.github.com/")
                //添加gson转换器，直接转换为实体类
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        GitHubApi repo=retrofit.create(GitHubApi.class);
        Call<List<Contributor>> responseBodyCall = repo.getContributors("square","retrofit");


        responseBodyCall.enqueue(new Callback<List<Contributor>>() {
            @Override
            public void onResponse(Call<List<Contributor>> call, Response<List<Contributor>> response) {
                    Gson gson=new Gson();
                    if (response.body()!=null&&response.body().size()>0){
                        for (Contributor contributor:response.body()){

                            Log.i("contributor",contributor.getLogin());
                        }
                    }else{
                        Log.i("contributor","list为空");
                    }
            }

            @Override
            public void onFailure(Call<List<Contributor>> call, Throwable t) {
                Log.e("contributor","请求失败");
            }
        });
```

