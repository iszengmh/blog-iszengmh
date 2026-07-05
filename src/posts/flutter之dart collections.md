---
title: flutter之dart collections
published: 2026-04-19 13:37:51
description: '大部分都是和其他语言相同，但是在实现灵活添加元素这块，比较特别，我记得EMCS6也有相关的语法。'
image: ''
tags: [flutter,dart,跨平台]
category: 'flutter'
draft: false 
lang: ''
---

# 参考链接

[collections——Dart](https://dart.cn/language/collections)

# List

在其他语言中大部分的List其实都是以数组的形态存在，但是dart的List其实是列表的形态存在。申明方式基本与其他语言没有差别

```dart
var list = [1, 2, 3];
var list = ['Car', 'Boat', 'Plane'];

//编译时常量List
var constantList = const [1, 2, 3];
// constantList[1] = 1; // This line will cause an error.
```

# Set
Set和java的Set是差不多，都是无序集合，并且每个元素都是唯一的。因为Set和Map在dart中都是以`{}`表示，所以当你创建空集忘记添加Set申明时，默认会被识别为`Map<dynamic, dynamic>`

```dart
var halogens = {'fluorine', 'chlorine', 'bromine', 'iodine', 'astatine'};
//空Set
var names = <String>{};
// Set<String> names = {}; // This works, too.

//因为Set和Map在dart中都是以{}表示，所以当你创建空集忘记添加Set申明时，默认会被识别为Map<dynamic, dynamic>
 var names = {}; // Creates a map, not a set.

 //添加元素
 var elements = <String>{};
elements.add('fluorine');
elements.addAll(halogens);
assert(elements.length == 5);

//编译时常量
final constantSet = const {
  'fluorine',
  'chlorine',
  'bromine',
  'iodine',
  'astatine',
};
// constantSet.add('helium'); // This line will cause an error.
```


# Map
与大多数语言一样，是键值对的集合

```dart
var gifts = {
  // Key:    Value
  'first': 'partridge',
  'second': 'turtledoves',
  'fifth': 'golden rings',
};

```

**但是这里要注意，即使你没有申明里面元素的类型，但是你一旦申明了一个Map，编译器会自动按元素的类型，给创建一个带有泛型的Map，可以看下面，所以当你添加错误的类型时，会导致编译错误**
```dart
  var nobleGases = {2: 'helium', 10: 'neon', 18: 'argon'};
  nobleGases[10] = 'test update'; //update existing element
  nobleGases[19] = 'neon'; //add new element
  //nobleGases['test'] = 'test';//这里添加了字符串作为key会编译错误，虽然申明没有具体申明类型，但是默认key就是只能是数字
  //nobleGases[20] = 100;//这里也会编译错误，因为value必须是字符串
  print(nobleGases);//{2: helium, 10: test update, 18: argon, 19: neon}
  print(nobleGases[2]);//helium
```

也可以这里申明一个map
```dart
var gifts = Map<String, String>();
gifts['first'] = 'partridge';
gifts['second'] = 'turtledoves';
gifts['fifth'] = 'golden rings';
print(gifts['first']);//partridge
var nobleGases = Map<int, String>();

assert(gifts['test'] == null);//没有找到会返回空，所以判断结果是true

assert(gifts.length == 2);

nobleGases[2] = 'helium';
nobleGases[10] = 'neon';
nobleGases[18] = 'argon';

//编译时常量
final constantMap = const {2: 'helium', 10: 'neon', 18: 'argon'};

// constantMap[2] = 'Helium'; // This line will cause an error.
```

# 集合中元素的类型可以有哪些

官网中写了有很多种，跟其他语言差不多，比较有意思是表达式元素，只有在运行时才会被添加集合中。

## null-aware elements 可按是否空值来添加元素
`absentValue`作为第二个元素时，被加了表达式，如果为空就不会被加到items中。但是在第四个元素中，因为没有加表达式所以直接以空值作为元素
```dart
int? absentValue = null;
int? presentValue = 3;
var items = [
  1,
  ?absentValue,
  ?presentValue,
  absentValue,
  5,
]; // [1, 3, null, 5]


//map下一些特殊例子，总结就是在Map中，无论是key还是value加表达式，都会影响元素是否添加成功
String? presentKey = 'Apple';
String? absentKey = null;

int? presentValue = 3;
int? absentValue = null;

var itemsA = {presentKey: absentValue}; // {Apple: null}
var itemsB = {presentKey: ?absentValue}; // key不为空，但是Value空时，map的内容是{}

var itemsC = {absentKey: presentValue}; // {null: 3}
var itemsD = {?absentKey: presentValue}; // 同样如果问号表达式在key上面，一样是空集{}

var itemsE = {absentKey: absentValue}; // 但是没有加表礞式，就不一样了，会添加空元素{null: null}
var itemsF = {?absentKey: ?absentValue}; // {}
```

## Spread elements可展开元素
`...<变量>`代表将这个变量展开，并将所有元素分别添加到新的集合中
`...?<变量>`加了问号可判断变是否为空，空的话就不会展开集合了。
```dart
var a = [1, 2, null, 4];
var items = [0, ...a, 5]; // [0, 1, 2, null, 4, 5]

//加了问号可判断变是否为空，空的话就不会展开集合了。
List<int>? a = null;
var b = [1, null, 3];
var items = [0, ...?a, ...?b, 4]; // [0, 1, null, 3, 4]
```

# if 元素

语法也比较反直觉

```dart
//当Data 符合相应的数据类型时，对将值赋给对应的新变量，最后拼接的字符串成为新元素，如下
Object data = 123;
var typeInfo = [
  if (data case int i) 'Data is an integer: $i',
  if (data case String s) 'Data is a string: $s',
  if (data case bool b) 'Data is a boolean: $b',
  if (data case double d) 'Data is a double: $d',
]; // [Data is an integer: 123, Data is a double: 123]


//“length: var wordLength”的意思是将word.lenght赋值给wordLength
//检查word是否为String类型，并创建一个变量wordLength
var word = 'hello';
var items = [
  1,
  if (word case String(length: var wordLength)) wordLength,
  3,
]; // [1, 5, 3]


//之前讲过“_”是一个占位符、通配符，在这里表示忽略对应值的比较
//int qty这里表示如果是第二个元素是整型，则条件成立
var orderDetails = ['Apples', 12, ''];
var summary = [
  'Product: ${orderDetails[0]}',
  if (orderDetails case [_, int qty, _]) 'Quantity: $qty',
  if (orderDetails case [_, _, ''])
    'Delivery: Not Started'
  else
    'Delivery: In Progress',
]; // [Product: Apples, Quantity: 12, Delivery: Not Started]


//else if比较好理解 
var a = 'apple';
var b = 'orange';
var c = 'mango';
var items = [
  0,
  if (a == 'apple') 1 else if (a case 'mango') 10,
  if (b case 'pear') 2 else if (b == 'mango') 20,
  if (c case 'apple') 3 else if (c case 'mango') 30,
  4,
]; // [0, 1, 30, 4]
```

# for 元素

比较好理解
```dart
var numbers = [2, 3, 4];
var items = [1, for (var n in numbers) n * n, 7]; // [1, 4, 9, 16, 7]
var items = [1, for (var x = 5; x > 2; x--) x, 7]; // [1, 5, 4, 3, 7]
var items = [1, for (var x = 2; x < 4; x++) x, 7]; // [1, 2, 3, 7]
```

# 控制流元素

```dart
//只有偶数存在number中时，才作为元素
var numbers = [1, 2, 3, 4, 5, 6, 7];
var items = [
  0,
  for (var n in numbers)
    if (n.isEven) n,
  8,
]; // [0, 2, 4, 6, 8]


//只有符合条件时，才去展开集合，其实集合里面也嵌入了表达式

var nestItems = true;
var ys = [1, 2, 3, 4];
var items = [
  if (nestItems) ...[
    for (var x = 0; x < 3; x++)
      for (var y in ys)
        if (x < y) x + y * 10,
  ],
]; // [10, 20, 30, 40, 21, 31, 41, 32, 42]

```