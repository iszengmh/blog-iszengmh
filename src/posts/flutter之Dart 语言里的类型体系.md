---
title: flutter之Dart 语言里的类型体系
published: 2026-04-19
description: 'Dart 是类型安全的编程语言：Dart 使用静态类型检查和 运行时检查 的组合来确保变量的值始终与变量的静态类型或其他安全类型相匹配。尽管类型是必需的，但由于 类型推断，类型的注释是可选的。静态类型检查的一个好处是能够使用 Dart 的 静态分析器 在编译时找到错误。可以向泛型类添加类型注释来修复大多数静态分析错误。最常见的泛型类是集合类型 List<T> 和 Map<K,V> 。'
image: 'assets/images/2026-04-19-22-16-01.png'
tags: [flutter,dart,跨平台]
category: 'flutter'
draft: true 
lang: ''
---

# 参考链接

[](https://dart.cn/language/type-system#type-inference)

# flutter之Dart 语言里的类型体系

我感觉和python、JS是差不多的，但是还是应该更多了解一下类型推断的原理

# Covariant parameters
一些（很少使用的）编码模式依赖于对类型进行紧缩 通过用子类型覆盖参数类型，但该子类型无效。 在这种情况下，你可以使用关键词 告诉分析仪你是故意这么做的。 这样可以去除静态错误，而是检查是否有无效 运行时的参数类型。covariant

这种类似的我也只在JAVA中见过，但是是因为调用了过时的方法，但是这个只是API不推荐你使用这个方法，所以加了相应的注解，并不是不能用
```dart
class Animal {
  void chase(Animal x) {
     ...
  }
}

class Mouse extends Animal {
   ...
}

class Cat extends Animal {
  @override
  void chase(covariant Mouse x) {
     ...
  }
}
```