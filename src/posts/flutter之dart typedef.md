---
title: flutter之dart typedef
published: 2026-04-19 18:25:00
description: 'typedef就是将原本类型重新进行自定义，有些冗杂的申明表达式可以很简单地转换成单独类型。原以为这个内容应该很多特性，结果官网好像就一点点描述。'
image: ''
tags: [flutter,dart,跨平台]
category: 'flutter'
draft: false 
lang: ''
---
#  版本限制 

2.13之前也能允许对函数进行类型重定义。

# 参考链接

[typedef——Dart](https://dart.cn/language/typedefs)

# flutter之dart typedef

typedef就是将原本类型重新进行自定义，有些冗杂的申明表达式可以很简单地转换成单独类型。
```dart
typedef ListMapper<X> = Map<X, List<X>>;
Map<String, List<String>> m1 = {}; // Verbose.
ListMapper<String> m2 = {}; // Same thing but shorter and clearer.
```

还有在[flutter之dart Records](https://iszengmh.pages.dev/posts/flutter%E4%B9%8Bdart-records/)也提到过的，Records本身是没有类型定义，最适合Record

```dart
typedef ButtonItem = ({String label, Icon icon, void Function()? onPressed});
final List<ButtonItem> buttons = [
  // ...
];
```
# 函数的类型重新定义
2.13之前也能允许对函数进行类型重定义。下面这个语法在2.13之前也是支持的
```dart
typedef Compare<T> = int Function(T a, T b);

int sort(int a, int b) => a - b;

void main() {
  assert(sort is Compare<int>); // True!
}
```