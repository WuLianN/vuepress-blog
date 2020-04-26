---
date: '2020-04-25'
slug: http
tag:
- HTTP

title: https如何安全概念
description: https如何安全概念!
author: 夜深_静悟
location: 东莞
image: 'https://api.bearcub.club/tag/elephant.jpg'
meta:
  - name: title
    content: http

  - name: description
    content: http知识!

  - name: keywords
    content: http

  - name: author
    content: 夜深_静悟

  - name: language
    content: Chinese
---


```nginx
学习“透视HTTP协议”之安全篇
对http/https有兴趣可以上"极客时间"购买，深入理解。
```





## HTTP1.1 目前规定8种方法

1. GET：获取资源，可以理解为读取获知下载数据
2. HEAD：获取资源的源信息
3. POST：向资源提交数据，相当于写入或者上传数据 （新建）
4. PUT：类似POST（更新）
5. DELETE：删除数据
6. CONNECT：建立特殊的连接隧道
7. OPTIONS：列出可对资源实行的方法
8. TRACE：追踪请求 - 响应的传输路径



* post -> 增
* delete -> 删
* put -> 改
* get -> 查





## http 与 https 模型差别

<img width="600" height="300" src="https://api.bearcub.club/tech/http/http-4.png">





## 安全

* 机密性  -> 加密算法

* 完整性  -> 摘要算法

* 身份认证 -> 数字证书（ca）

* 不可否认 -> 数字签名





## 对称加密 

```nginx
 AES、ChaCha20。
```

<img width="600" height="400" src="https://api.bearcub.club/tech/http/http-1.png">







## 加密分组模式

```nginx
对称算法还有一个“分组模式”的概念，它可以让算法用固定长度的密钥加密任意长度的明文，把小秘密（即密钥）转化为大秘密（即密文）。
最新的分组模式被称为 AEAD（Authenticated Encryption with Associated Data），在加密的同时增加了认证的功能，常用的是 GCM、CCM 和 Poly1305。
```





## 非对称加密

```nginx
RSA、ECC
```

<img width="600" height="400" src="https://api.bearcub.club/tech/http/http-2.png">







## 混合加密

<img width="600" height="400" src="https://api.bearcub.club/tech/http/http-3.png">







## 摘要算法

```nginx
SHA224、SHA256、SHA384，分别能够生成 28 字节、32 字节、48 字节的摘要。
```

<img width="400" height="400" src="https://api.bearcub.club/tech/http/http-6.png">







## 数字签名

<img width="600" height="400" src="https://api.bearcub.club/tech/http/http-5.png">

