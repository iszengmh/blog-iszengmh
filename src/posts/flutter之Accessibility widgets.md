---
title: flutter之Accessibility widgets
published: 2026-04-21 18:13:00
description: 'flutter可以构建无障碍部件(Accessibility widgets)'
image: ''
tags: [flutter,dart,跨平台]
category: 'flutter'
draft: true 
lang: ''
---

# 参考链接

[Accessibility widgets——Flutter官方文档](https://docs.flutter.cn/ui/widgets/accessibility/)

# Listener

```dart
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

void main() {
  ListTile _tile(String title, String subtitle, IconData icon) {
    return ListTile(
      title: Text(
        title,
        style: const TextStyle(fontWeight: FontWeight.w500, fontSize: 20),
      ),
      subtitle: Text(subtitle),
      leading: Icon(icon, color: Colors.blue[500]),
    );
  }

  Widget _buildList() {
    return ListView(
      children: [
        _tile('CineArts at the Empire', '85 W Portal Ave', Icons.theaters),
        _tile('The Castro Theater', '429 Castro St', Icons.theaters),
        _tile('Alamo Drafthouse Cinema', '2550 Mission St', Icons.theaters),
        _tile('Roxie Theater', '3117 16th St', Icons.theaters),
        _tile(
          'United Artists Stonestown Twin',
          '501 Buckingham Way',
          Icons.theaters,
        ),
        _tile('AMC Metreon 16', '135 4th St #3000', Icons.theaters),
        const Divider(),
        _tile('K\'s Kitchen', '757 Monterey Blvd', Icons.restaurant),
        _tile('Emmy\'s Restaurant', '1923 Ocean Ave', Icons.restaurant),
        _tile('Chaiya Thai Restaurant', '272 Claremont Blvd', Icons.restaurant),
        _tile('La Ciccia', '291 30th St', Icons.restaurant),
      ],
    );
  }

  debugPaintSizeEnabled = true;
  runApp(MaterialApp(
      title: 'Shopping List',
      home: Scaffold(
          appBar: AppBar(title: Text('Shopping List')),
          body: Container(
              child: Listener(
                  onPointerSignal: (event) {
                    print("Pointer  event: $event");
                    if (event is PointerScrollEvent) {
                      print(event.scrollDelta.dy);
                      print("Pointer scroll at position: ${event.position}");
                    }
                  },
                  child: _buildList())))));
}
```
`Listener`可以监听大多数的用户操作事件。当你向上或者向上滑动屏幕时，会有相应的位置偏移打印
```log
Pointer  event: _TransformedPointerScrollEvent#f6b6b(position: Offset(235.0, 414.0), scrollDelta: Offset(-0.0, -25.0))
-25
Pointer scroll at position: Offset(235.0, 414.0)
Pointer  event: _TransformedPointerScrollEvent#8cfcb(position: Offset(235.0, 414.0), scrollDelta: Offset(-0.0, -25.0))
-25
Pointer scroll at position: Offset(235.0, 414.0)
Pointer  event: _TransformedPointerScrollEvent#1074d(position: Offset(235.0, 414.0), scrollDelta: Offset(-0.0, -25.0))
-25
Pointer scroll at position: Offset(235.0, 414.0)
Pointer  event: _TransformedPointerScrollEvent#535c9(position: Offset(235.0, 414.0), scrollDelta: Offset(-0.0, 25.0))
25
Pointer scroll at position: Offset(235.0, 414.0)
Pointer  event: _TransformedPointerScrollEvent#8b4c5(position: Offset(235.0, 416.0), scrollDelta: Offset(-0.0, 25.0))
25
Pointer scroll at position: Offset(235.0, 416.0)
Pointer  event: _TransformedPointerScrollEvent#4ed77(position: Offset(235.0, 418.0), scrollDelta: Offset(-0.0, 25.0))
25
Pointer scroll at position: Offset(235.0, 418.0)
```
