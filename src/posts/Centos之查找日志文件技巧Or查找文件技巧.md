---
title: Centos之查找日志文件技巧Or查找文件技巧
published: 2017-02-09 01:53:47
description: 'Centos之查找日志文件技巧Or查找文件技巧'
image: ''
tags: [centos,操作系统]
category: 操作系统
draft: false 
lang: ''
---

# 参考链接

[linux查看日志中特定字符串以及前后信息内容命令——CSDN@Tastill](https://blog.csdn.net/Tastill/article/details/80227541)

[Linux cat命令使用——CSDN@persistent_db](https://blog.csdn.net/XD_hebuters/article/details/79204812)

[倒序排列查看日志——CSDN@chenpuzhen](https://blog.csdn.net/chenpuzhen/article/details/83590476)

[Linux下，grep获取文件中的最后一次匹配项——CSDN@ 天命ming](https://blog.csdn.net/qq_27686779/article/details/84102141)

[Stop using tail -f (mostly)——Brian Storti](https://www.brianstorti.com/stop-using-tail/)

[Linux less命令——RUNOOB](https://www.runoob.com/linux/linux-comm-less.html)

# Centos之查找日志文件技巧

查看日志是每个开发人员排查问题首要过程，但是日志通常又是非常大，类型多，掌握必要的技巧、命令非常重要，本文提供实用、常用的命令查询。

# less命令技巧（强烈推荐使用这个命令）

强烈排期使用此命令查看日志，假设你有多个日志文件，那么你可以同时打开多个文件，并在多个文件间切换；假设你还需要对关键字进行搜索，可以通过输入 `?搜索字符` 向后查找、 输入`/搜索字符` 向前查找，当你退出后再进入它还能保留你刚才搜索后，高亮的字符；假设你还需要对文件的变更进行实时刷新，那么你只需在打开文件后按 `F` 文件随即实时刷新。

我通常的使用场景是，一次打开多个文件，用 `:n` 和 `:p` 切换文件，查看了文件了后又想看看实时日志，就按大写 `F` ，按 `Ctrl+c` 取消实时。当我同时想查询内容时，我只需 `G` 跳到文件尾部，再使用 `?搜索字符` 查找最新的日志。更多命令可以参考[Linux less命令——RUNOOB](https://www.runoob.com/linux/linux-comm-less.html)当然如果还不能满足你，可以尝试其他命令。[](https://www.runoob.com/linux/linux-comm-less.html)

## 打开多个文件进行查看


```shell
less <file1> <file2> <file3> <...>
# 打开文件后键入以下字符可以有额外操作：
# :e <file>  打开另一个文件
# :n 查看下一个文件
# :p 查看上一个文件
# G  跳到文件尾部
# v 编辑文件
# F 实时刷新文件，ctrl+c即出实时
# q  退出
```

# 查找需要的日志文件

通常目录下会有很多类型的日志文件，这时候就需要有命令匹配我们需要的日志文件显示。

```shell
ls -l -d *.log
# ls是列出指定目录文件清单的命令
# -d是查找指定文件
# *号是通配符，模糊匹配
```

# 全文显示

大文件真是最不好用的，针对小文件来说，敲得少，方便啊。

> cat <file>

# 指定文本查找最后一次匹配的内容

```shell
grep 'string you search' -A 1 <file> | tail -n 2 
# -n是trail的参数命令，表示显示尾部n行内容
```

# 倒序文件

命令是否适用，可能取决于你是日志是不是单行打印的，要是你的日志有程序有报错track信息的话，倒序显示就不好。

```shell
grep -10n '关键字' rock.log | sort -r
cat rock.log |grep -n '关键字' |more
```

# 查看不断刷新的日志文件

如果日志文件正在不断地输出，则这个命令可以实时查看日志文件变更，实时刷新并显示文件尾部内容。

```shell
# tail是用于查看文件内容的命令
tail -f  -n 15 <file>
# -f 指定文件，可以用于查看正在改变的日志文件
# -n是指定行数显示尾部

# 也是实时查看日志文件变更，但是不同于tail，它会打开Watching Mode进行查看
# 以下命令无法同时使用多个文件查看，必须先使用Ctrl+C结束实时模式，会自动进入多文件查看
less +F <file>
```
