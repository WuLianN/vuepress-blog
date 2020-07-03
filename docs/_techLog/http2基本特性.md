---
date: '2020-06-08'
slug: http
tag:
- HTTP

title: http/2 基本特性
description: http/2 基本特性
author: 夜深_静悟
location: 广州
image: 'https://api.bearcub.club/tag/panda-1.jpg'
meta:
  - name: title
    content: http/2 基本特性

  - name: description
    content: http/2 基本特性

  - name: keywords
    content: HTTP/2

  - name: author
    content: 夜深_静悟

  - name: language
    content: Chinese
---

## http/2

<img src="https://api.bearcub.club/tech/http/http-11.png" width=500 height=300>



<br>

## 头部压缩

使用 **HPACK** 算法来压缩头部数据，在客户端和服务器两端建立 “字典” ，用索引号表示重复的字符串，还采用哈夫曼编码来压缩整数和字符串。压缩和解压缩就是查表和更新表的操作。

<img src="https://api.bearcub.club/tech/http/http-12.png" width=500  height=300>

<p align="center">静态表 (Static Table)</p>

但如果表里只有 Key 没有 Value，或者是自定义字段根本找不到该怎么办呢？这就要用到 “**动态表**”（Dynamic Table），它添加在静态表后面，结构相同，但会在编码解码的时候随时更新。



<br>



## 二进制帧

把原来的 “Header + Body” 的消息 “打散” 为数个小片的二进制 “帧”（Frame），用 “HEADERS” 帧存放头数据，

“DATA” 帧存放实体数据。

<img src="https://api.bearcub.club/tech/http/http-13.png" widht=500 height=300>

<p align="center">二进制报文</p>

帧开头是 3 个字节的长度（但不包括头的 9 个字节），默认上限是 2^14，最大是 2^24，也就是说 HTTP/2 的帧通常不超过 16K，最大是 16M。

**帧类型**，大致可以分成**数据帧**和**控制帧**两类，HEADERS 帧和 DATA 帧属于数据帧，存放的是 HTTP 报文，而 SETTINGS、PING、PRIORITY 等则是用来管理流的控制帧。HTTP/2 总共定义了 10 种类型的帧。帧类型详解可以看这篇[https://github.com/abbshr/rfc7540-translation-zh_cn/blob/master/6-zh-cn.md](https://github.com/abbshr/rfc7540-translation-zh_cn/blob/master/6-zh-cn.md)

**帧标志**，可以保存 8 个标志位，携带简单的控制信息。常用的标志位有 **END_HEADERS** 表示头数据结束，**END_STREAM** 表示单方向数据发送结束。

**流标识符**，也就是帧所属的“流”，接收方使用它就可以从乱序的帧里识别出具有相同流 ID 的帧序列，按顺序组装起来就实现了虚拟的“流”。



<br>



## 虚拟的 “流”

HTTP/2定义了一个 “流” （Stream）的概念，它是**二进制帧的双向传输序列**，同一个消息往返的帧会分配一个唯一的流 ID。



流的特点：

1. 流是可并发的，一个 HTTP/2  连接上可以同时发出多个流传输数据，也就是并发多请求，实现“多路复用”；
2. 客户端和服务器都可以创建流，双方互不干扰；
3. 流是双向的，一个流里面客户端和服务器都可以发送或接收数据帧，也就是一个“请求 - 应答”来回；
4. 流之间没有固定关系，彼此独立，但流内部的帧是有严格顺序的；
5. 流可以设置优先级，让服务器优先处理，比如先传  HTML/CSS，后传图片，优化用户体验；
6. 流 ID 不能重用，只能顺序递增，客户端发起的 ID 是奇数，服务器端发起的 ID  是偶数；
7. 在流上发送“RST_STREAM”帧可以随时终止流，取消接收或发送；
8. 第 0  号流比较特殊，不能关闭，也不能发送数据帧，只能发送控制帧，用于流量控制。



连接中无序的帧是如何依据流 ID 重组成流的

<img src="https://api.bearcub.club/tech/http/http-14.png" width=500 height=300>

<br>



## 多路复用

多个往返通信都复用一个连接（tcp）来处理



<br>



## 服务器推送

新建 “流” 主动向客户端发送消息。比如，在浏览器刚请求 HTML 时候，把可能会用的 JS、CSS文件发送给客户端，减少等待的延迟。



<br>



## 参考

《透视HTTP协议》

[https://github.com/abbshr/rfc7540-translation-zh_cn](https://github.com/abbshr/rfc7540-translation-zh_cn)



<br>

附：

**HTTP/2相关的RFC标准**：      

RFC7540 
1. [https://www.rfc-editor.org/rfc/rfc7540.txt](https://www.rfc-editor.org/rfc/rfc7540.txt)
2. [https://github.com/abbshr/rfc7540-translation-zh_cn](https://github.com/abbshr/rfc7540-translation-zh_cn)

RFC7541
1. [https://www.rfc-editor.org/rfc/rfc7541.txt](https://www.rfc-editor.org/rfc/rfc7541.txt)
2. [https://www.wolfcstech.com/2016/10/29/hpack-spec/](https://www.wolfcstech.com/2016/10/29/hpack-spec/)
