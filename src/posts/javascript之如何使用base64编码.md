---
title: javascript之如何使用base64编码
published: 2025-08-30 16:16:51
description: 'javascript之如何使用base64编码'
image: ''
tags: [javascript]
category: javascript
draft: false 
lang: ''
---

# javascript之如何使用base64编码

## 参考链接

[How can you encode a string to Base64 in JavaScript?--StackOverflow@Shog9](https://stackoverflow.com/questions/246801/how-can-you-encode-a-string-to-base64-in-javascript#answer-247261)

[WindowOrWorkerGlobalScope.btoa()--MDN Web Docs@Mozilla](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa#unicode_strings)

## 使用btoa()和atob()

`btoa(string)` : 对传入的参数使用Base64进行编码，只能接受单字符为8位字节的参数。像中文和特殊符号不是单字符为8位字节的，这个函数会报错。

`atob()` :对传入的参数使用Base64进行解码，返回单字符为8个字节的字符串。



## 转换单字符不为8位字节的方法

```

function toBinary(string) {
  const codeUnits = new Uint16Array(string.length);
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = string.charCodeAt(i);
  }
  return String.fromCharCode(...new Uint8Array(codeUnits.buffer));
}
// a string that contains characters occupying > 1 byte
const myString = "☸☹☺☻☼☾☿";

const converted = toBinary(myString);
const encoded = btoa(converted);
console.log(encoded);  
```



