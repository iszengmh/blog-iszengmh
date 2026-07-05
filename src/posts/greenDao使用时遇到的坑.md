---
title: greenDao使用时遇到的坑
published: 2025-08-30 16:16:51
description: 'greenDao使用时遇到的坑'
image: ''
tags: [android,sqlite]
category: android
draft: false 
lang: ''
---



<h1 id="34acc5ae">ID名不根据实体类命名来创建表</h1>


这是我外部数据库表的设计

![](https://cdn.nlark.com/yuque/0/2020/jpeg/244275/1586006858157-b3fe509a-0b3d-475b-84d1-9e8d160d92f1.jpeg)

这是greendao规定的ID命名

![](https://cdn.nlark.com/yuque/0/2020/jpeg/244275/1586006858184-c9d0cc35-5ac8-4ebd-a97d-670814ff1195.jpeg)

我要是不用greendao创建表，我就一直找不到这个坑了

一直报错



> Caused by: android.database.sqlite.SQLiteException: table t_book has no column named _id (code 1): , while compiling: INSERT INTO "t_book" ("_id","F_BOOK") VALUES (?,?)
>



通过@Property()这个注解定义我外部数据库的字段名才能解决



<!--more-->
```plain
@Entity(nameInDb = "t_book")
public class Book {
    @Property(nameInDb = "id")//通过@Property()这个注解定义我外部数据库的字段名才能解决
    @Id(autoincrement = true)
    private Long id;
    private String f_book;

    @Generated(hash = 1839284504)
    public Book(Long id, String f_book) {
        this.id = id;
        this.f_book = f_book;
    }

    @Generated(hash = 1839243756)
    public Book() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getF_book() {
        return f_book;
    }

    public void setF_book(String f_book) {
        this.f_book = f_book;
    }
}
```

