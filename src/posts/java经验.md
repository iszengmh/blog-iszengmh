---
title: java经验
published: 2018-01-23 23:09:20
description: 'java经验'
image: ''
tags: [java]
category: java
draft: false 
lang: ''
---
<h1 id="7Ght7">java 经验</h1>
<h2 id="88wtx">what different between Boolean.TRUE and true</h2>
<h3 id="Cu6Cf">参考链接</h3>
[What the difference between Boolean.TRUE and true](https://stackoverflow.com/questions/31775618/what-the-difference-between-boolean-true-and-true)

<h3 id="RDmHr">说明</h3>
> [](https://stackoverflow.com/posts/31775618/timeline)
>
> Firstly, I have
>

```plain
private Map<String, Boolean> mem = new HashMap<String, Boolean>();
```

> And then:
>

```plain
if (wordDict.contains(s) ||  Boolean.TRUE==mem.get(s)) {
        return true;
    }
```

> why can't I use "mem.get(s)==true" in the if statement. There will be a error "Line 6: java.lang.NullPointerException"
>

> I think I still cannot understant wrapper class well. Please give me some guidance. Thank you!
>



