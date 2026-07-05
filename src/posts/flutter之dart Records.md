---
title: flutter之dart Records
published: 2026-04-18 21:29:51
description: 'dart Records是anonymous, immutable, aggregate type，其实有点像python的元组，也有点像java的List.of()，都是immutable不可变集合。各大语言在最初的设计是并没有这种不可变集合的，但是我觉得这跟常量是有一定相似的，都是为了解决多线程之间互相读取数据时，带来的数据同步性问题，现代计算机由单核发展多核，为解决越来越复杂多线程交互而实现'
image: ''
tags: [flutter,dart,跨平台]
category: 'flutter'
draft: false 
lang: ''
---

# 参考链接

[Records——Dart](https://dart.cn/language/records)

# Records 在dart中的最低版本

Records require a language version of at least 3.0.

# 基本写法

Records是用小括号包裹的集合，这一点倒是和python有点相似。

```dart
var record = ('first', a: 2, b: true, 'last');
```

Records可以直接在方法返回参数，函数参数定义。Records好像在dart没有具体类型包装，不像有int或者double，可以直接变量申明，如下：
```dart
(int, int) swap((int, int) record) {
  var (a, b) = record;
  return (b, a);
}

// Record type annotation in a variable declaration:
(String, int) record;

// Initialize it with a record expression:
record = ('A string', 123);

```

# 构造可命名字段的Records

可命名字段Records,是由小括号作为大包围，大括号作为小包围，并可定义成员变量名。赋值可直接引用变量名赋值，如下所示：

```dart
// Record type annotation in a variable declaration:
({int a, bool b}) record;

// 初始化这个record的变量，a和b分别指定并赋值
record = (a: 123, b: true);

```

下面是不一样，如果把recordXY赋值给recordAB，是会报错的，因为它们是不一样类型，可命名字段的Records是Records类型定义概念的一部分，所以即使里面类型一样，也是不相同的Records类型。

```dart
({int a, int b}) recordAB = (a: 1, b: 2);
({int x, int y}) recordXY = (x: 3, y: 4);

// Compile error! These records don't have the same type.
// recordAB = recordXY;
```

但是你可以定义成位置字段，这个函数中位置形参是相似的

```dart
(int a, int b) recordAB = (1, 2);
(int x, int y) recordXY = (3, 4);

recordAB = recordXY; // OK.
```
下面这种也是位置字段
```dart 
(num, Object) pair = (42, 'a');

var first = pair.$1; // Static type `num`, runtime type `int`.
var second = pair.$2; // Static type `Object`, runtime type `String`.
```

Record中元素的调用方式，其中a和b是可命名字段 

```dart 
var record = ('first', a: 2, b: true, 'last');

print(record.$1); // Prints 'first'
print(record.a); // Prints 2
print(record.b); // Prints true
print(record.$2); // Prints 'last'
```

# Records没有单独的类型申明

Records没有单独类型申明，Records变量的唯一性取决于Records中的字段数量、字段类型、record变量名，三个条件决定这个变量是否重复、唯一，三个条件官网称之为Record's shape 



While you can't declare a unique type for a record shape, you can create type aliases for readability and reuse. To learn how and when to do so, check out [Records and typedefs](https://dart.cn/language/records#records-and-typedefs).


# Record可命名字段和位置字段的区别

**因为比较反直觉，所以还是着重写两种区别，要注意下面这两种的区别**

```dart
//这个叫可命名字段，可根据字段名进行赋值，不需要顺序一致
({int a, int b}) recordA;
//这个位置字段，赋值时，可以固定顺序给相应字段赋值
(int a int b) recordB;

```

例如下面：

```dart 
//即使你赋值顺序打乱，只要保证引用的字段不出错，也是无碍的
  ({int a, int b}) recordA = (b: 1, a: 2);
  print("recordA.a: ${recordA.a}, recordA.b: ${recordA.b}");//recordA.a: 2, recordA.b: 1
//要注意下面这个编译是会出错的，因为位置字段，不允许你引用字段名进行赋值
(int a int b) recordB = (b: 1, a: 2);//error

//下面这个是正确的，但是要注意位置字段，在调用字段时，不允许指定字段名。
  (int a, int b) recordB = (2, 1);
  print("recordB.a: ${recordB.$1}, recordB.b: ${recordB.$2}");//recordB.a: 2, recordB.b: 1
```


不过可命名字段是只可用于申明的类型，或者方法的返回参数、形参。挺反直觉的，所以上面的内容还要与下面的再区分一下

```dart
final buttons = [
    (                      // ← 这里创建的是命名字段 Record！
      label: "Button I",   // 使用 label: 语法
      icon: "test",
      onPressed: () => ...,
    ),
    ...
];

// 因为创建时用了 label: / icon: / onPressed: 语法
// Dart 推断类型为：({String label, String icon, void Function() onPressed})
// 所以可以用名字访问
print(buttons[0].label);      // ✅ 正确
print(buttons[0].icon);       // ✅ 正确
buttons[0].onPressed();       // ✅ 正确
```

```dart
final buttons = [
    (                      // ← 没有名字，纯位置
      "Button I",          // 只有值，没有 label:
      "test",
      () => print("..."),
    ),
];

// 类型推断为：(String, String, void Function())
print(buttons[0].$1);     // ✅ "Button I"
print(buttons[0].$2);     // ✅ "test"
print(buttons[0].label);  // ❌ 编译错误！没有 label 这个名字
```

# Record的比较

Record's shape 跟刚刚讲过是由字段数量、字段类型、record变量名决定的，可命名字段的顺序是不影响判断Record是否相同的，如下

```dart
(int x, int y, int z) point = (1, 2, 3);
(int r, int g, int b) color = (1, 2, 3);

print(point == color); // Prints 'true'.

```

```dart
({int x, int y, int z}) point = (x: 1, y: 2, z: 3);
({int r, int g, int b}) color = (r: 1, g: 2, b: 3);

print(point == color); // Prints 'false'. Lint: Equals on unrelated types.
```

# 解构

Dart应该借鉴了JS或者python的解构语法，将Record赋值时，可分解为多个变量。由于返回的类型可定义为命名字段和位置字段，所以解构的也分两种
```dart 
// Returns multiple values in a record:
(String name, int age) userInfo(Map<String, dynamic> json) {
  return (json['name'] as String, json['age'] as int);
}

final json = <String, dynamic>{'name': 'Dash', 'age': 10, 'color': 'blue'};

// 因为userInfo返回的Record的位置字段，这里解构只是按顺序返回了，将第一个元素给name，第二元素给age
var (name, age) = userInfo(json);
print("$name,$age");//Dash,10
*/
```

因为是命名字段所以可引用对应的命名字段并分解为多个变量
```dart
// Returns multiple values in a record:
({String name, int age}) userInfo(Map<String, dynamic> json) {
  return (name: json['name'] as String, age: json['age'] as int);
}

final json = <String, dynamic>{'name': 'Dash', 'age': 10, 'color': 'blue'};

//下面这个相当于var (name: name, age: age) = userInfo(json);  只不过省略了对命名字段的引用，实际由于可命名字段引用的解构，所以即使顺序互换也无妨：var (age: age,name: name,) = userInfo(json);  但是顺序互换了就不能采用下面的省略命名的方式
var (: name, : age) = userInfo(json);
print("name: $name, age: $age");//name: Dash, age: 10
```

# Record的数据结构

官方文档突然又称是tuple了，果然是借鉴python或者其他语言的，还不如直接称之tuple呢，学过其他语言的一眼就看出来是tuple

```dart
final buttons = [
  (
    label: "Button I",
    icon: const Icon(Icons.upload_file),
    onPressed: () => print("Action -> Button I"),
  ),
  (
    label: "Button II",
    icon: const Icon(Icons.info),
    onPressed: () => print("Action -> Button II"),
  )
];
//不过
print(
      "Buttons: $buttons[0].label, ${buttons[0].icon}, ${buttons[0].onPressed}");
```

# 为Record定义一个方便的类型

因为Record没有自己类型，每次申明都需要完整字段申明。所以，可以typedef关键字，为Record定义一个类，表面看像是一个类，但是实际内部是一个Record

```dart
typedef ButtonItem = ({String label, Icon icon, void Function()? onPressed});
final List<ButtonItem> buttons = [
  // ...
];
```

更多的应用，如定义一个Container

```dart
List<Container> widget = [
  for (var button in buttons)
    Container(
      margin: const EdgeInsets.all(4.0),
      child: OutlinedButton.icon(
        onPressed: button.onPressed,
        icon: button.icon,
        label: Text(button.label),
      ),
    ),
];
```

将Record作为类的构造参数，那么你在调用时就可以类来申明变量
```dart
class ButtonItem {
  final String label;
  final Icon icon;
  final void Function()? onPressed;
  ButtonItem({required this.label, required this.icon, this.onPressed});
  bool get hasOnpressed => onPressed != null;
}

```
或者用extension type关键实现类型抽象。但是要注意dart怎么必须是3.3.0或者更高版本(This requires the 'inline-class' language feature to be enabled.
Try updating your pubspec.yaml to set the minimum SDK constraint to 3.3.0 or higher, and running 'pub get'.)
```dart
extension type ButtonItem._(({String label, Icon icon, void Function()? onPressed}) _) {
  String get label => _.label;
  Icon get icon => _.icon;
  void Function()? get onPressed => _.onPressed;
  ButtonItem({required String label, required Icon icon, void Function()? onPressed})
      : this._((label: label, icon: icon, onPressed: onPressed));
  bool get hasOnpressed => _.onPressed != null;
}
```

无论上面哪种实现，都可以用下面方式调用
```dart
final List<ButtonItem> buttons =  [
  ButtonItem(
    label: "Button I",
    icon: const Icon(Icons.upload_file),
    onPressed: () => print("Action -> Button I"),
  ),
  ButtonItem(
    label: "Button II",
    icon: const Icon(Icons.info),
    onPressed: () => print("Action -> Button II"),
  )
];
```