---
title: flutter之泛型Generics
published: 2026-04-19 15:16:00
description: 'JAVA中也有泛型，而且也是<>表示，应该借鉴JAVA的泛型'
image: ''
tags: [flutter,dart,跨平台]
category: 'flutter'
draft: false 
lang: ''
---

# 参考链接

[泛型(Generics)——Dart](https://dart.cn/language/generics)

# 基本语法

基础的语法其实和其他语言的差不多

```dart
abstract class Cache<T> {
  T getByKey(String key);
  void setByKey(String key, T value);
}
var names = <String>['Seth', 'Kathy', 'Lars'];
var pages = <String, String>{
  'index.html': 'Homepage',
  'robots.txt': 'Hints for web robots',
  'humans.txt': 'We are people, not machines',
};

//泛型的类型判断，在JAVA中，泛型实际上会运行被抹除掉，转换成实际类型，所以JAVA的判断实际的类型，而不是List<String>这个类型的判断
var names = <String>[];
names.addAll(['Seth', 'Kathy', 'Lars']);
print(names is List<String>); // true

```


# 泛型的约束

也是跟JAVA差不多，可以通过指定泛型只能是某个类的子类
```dart
class Foo<T extends SomeBaseClass> {
  // Implementation goes here...
  String toString() => "Instance of 'Foo<$T>'";
}

class Extender extends SomeBaseClass {
  ...
}

```

还可以在父类申明使用泛型
```dart
abstract interface class Comparable<T> {
  int compareTo(T o);
}

int compareAndOffset<T extends Comparable<T>>(T t1, T t2) =>
    t1.compareTo(t2) + 1;

class A implements Comparable<A> {
  @override
  int compareTo(A other) => /*...implementation...*/ 0;
}

int useIt = compareAndOffset(A(), A());
```


未泛型定义中，仍然可以通过获取元素
```dart
T first<T>(List<T> ts) {
  // Do some initial work or error checking, then...
  T tmp = ts[0];
  // Do some additional checking or processing...
  return tmp;
}
```