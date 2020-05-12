---
date: '2020-05-10'
slug: http
tag:
- HTTP

title: 从输入URL到页面展示的过程
description: 从输入URL到页面展示的过程
author: 夜深_静悟
location: 东莞
image: 'https://api.bearcub.club/tag/sheep.jpg'
meta:
  - name: title
    content: 从输入URL到页面展示的过程

  - name: description
    content: 从输入URL到页面展示的过程

  - name: keywords
    content: URL

  - name: author
    content: 夜深_静悟

  - name: language
    content: Chinese
---



## 目前 Chrome 多进程最新架构

<img width="700" src="https://api.bearcub.club/tech/http/http-7.png">

<p align="center">最新的Chrome进程架构图</p>

* **浏览器进程**：主要负责界面显示、用户交互、子进程管理，同时提供存储等功能。
* **渲染进程**：核心任务是将 HTML、CSS 和 JavaScript 转换为用户可以与之交互的网页，排版引擎 Blink 和 JavaScript V8 引擎 都是运行在该线程中，默认情况下，Chrome 会为每个 Tab 标签创建一个渲染进程。处于安全考虑，渲染进程都是运行在沙箱模式下。
* **GPU进程**：Chrome 的 UI 界面都选择采用 GPU 来绘制。
* **网络进程**：主要负责页面的网络资源加载。
* **插件进程**：主要是负责插件的运行，因插件易崩溃，需要通过插件进程来隔离，以保证插件进程崩溃不会对浏览器和页面造成影响。



<br>



## HTTP 请求流程

<img width="700" src="https://api.bearcub.club/tech/http/http-8.png">

<p align="center">HTTP 请求流程示意图</p>



<br>



## 从输入URL到页面展示

<img width="700" src="https://api.bearcub.club/tech/http/http-9.png">

<p align="center">从输入URL到页面展示完整流程示意图</p>



<br>



* 首先，用户从浏览器进程里**输入请求消息**；
* 然后，网络进程**发起URL请求**；
* 服务器响应URL请求之后，浏览器进程又要**准备渲染进程**了；
* 渲染进程准备好之后，需要先向渲染进程提交页面数据，我们称之为**提交文档**阶段。这里的“文档”是指URL请求的响应体数据；
* 渲染进程接受完文档信息之后，便开始**解析页面和加载子资源**，完成页面的渲染。



<br>



更详细解释：

输入**URL**，浏览器进程会通过`进程间通信（IPC）`把 URL 请求发送至网络进程。网络进程会**查找本地缓存**是否缓存了该资源。如果有缓存资源，那么直接返回该资源给浏览器进程；如果在缓存中没有查找到资源，那么直接进入网络请求流程。请求前的第一步要进行 **DNS 解析**，获取域名所对应的 **IP**, 利用 IP 地址和服务器**建立 TCP 连接**，**发送HTTP请求**，若响应行的状态码为301、302一类的跳转信息，浏览器会跳转到新的地址继续导航(**重定向**)。如果响应行是200，那么表示浏览器可以继续处理该请求。根据 **Content-Type** 的类型进行下一步处理。如果 Content-Type 字段的值被浏览器判断为`下载类型`，那么该请求会被提交给浏览器的`下载管理器`，同时该 URL 请求的导航流程就此结束。但如果是 `HTML`，那么浏览器则会继续进行导航流程。



<br>

**关键词**：`本地缓存`、`DNS`、`IP`、`TCP`、`HTTP`、`重定向`、`Content-Type`

<br>



学习`《浏览器工作原理与实践》`（极客时间的课程）

小结 从输入URL到页面展示的过程

