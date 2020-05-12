---
date: '2020-05-04'
slug: js
tag:
- JavaScript

title: JavaScript事件循环机制
description: JavaScript事件循环机制
author: 夜深_静悟
location: 东莞
image: 'https://api.bearcub.club/tag/turtle.jpg'
meta:
  - name: title
    content: JavaScript事件循环机制

  - name: description
    content: JavaScript事件循环机制

  - name: keywords
    content: Event Loop

  - name: author
    content: 夜深_静悟

  - name: language
    content: Chinese
---





## JavaScript 执行栈

<img width="700"  src="https://api.bearcub.club/tech/javascript/javascript-1.jpg">



<br>



## JavaScript 事件循环

JavaScript 是单线程语言，得靠异步。Node天生异步，使得IO强大。

* 同步任务
* 异步任务



<br>



<img height="500" src="https://api.bearcub.club/tech/javascript/javascript-2.png">



<br>



* 同步和异步任务分别进入不同的执行“场所”，同步的进入主线程，异步的进入Event Table并注册函数。
* 当指定的事情完成时，Event Table会将这个函数移入Event Queen。
* 主线程内的任务执行完毕为空，会去Event Queen读取对应的函数，进入主线程执行。
* 上述过程会不断重复，也就是常说的Event Loop(事件循环)。


<br>


**异步任务**又分为：

* 宏任务 macro task
* 微任务 micro task



<br>



* 宏任务：包括整体代码script、setTimeout、setInterval
* 微任务：Promise、process.nextTick



<br>



事件循环的顺序，决定js代码的执行顺序。进入整体代码(宏任务)后，开始第一次循环。接着执行所有的微任务。
然后再次从宏任务开始，找到其中一个任务队列执行完毕，再执行所有的微任务。

```js
setTimeout(() => {
    console.log('setTimeout');
})

new Promise((resolve) => {
    console.log('promise');
    resolve()
}).then(() => {
    console.log('then');
})

console.log('console');

// 打印
// promise
// console
// then
// setTimeout
```

* 这段代码作为宏任务，进入主线程。

* 先遇到`setTimeout`，那么将其回调函数注册后分发到宏任务Event Queen。

* 接下来遇到了`Promise`，`new Promise`立即执行，`then`函数分发到微任务Event Queue。

* 遇到`console.log()`，立即执行。

* 好啦，整体代码script作为第一个宏任务执行结束，看看有哪些微任务？我们发现了`then`在微任务Event Queue里面，执行。

* ok，第一轮事件循环结束了，我们开始第二轮循环，当然要从宏任务Event Queue开始。我们发现了宏任务Event Queue中`setTimeout`对应的回调函数，立即执行。

* 结束。

  

  <br>

  

  <img height=500 src="https://api.bearcub.club/tech/javascript/javascript-3.png">

  <br>
  
  

  ## 浏览器层面分析

**宏任务**

- 渲染事件（如解析DOM、计算布局、绘制）；
- 用户交互事件（如鼠标点击、滚动页面、放大缩小等）；
- JavaScript脚本执行事件；
- 网络请求完成、文件读写完成事件。



<br>



**微任务**

**微任务就是一个需要异步执行的函数，执行时机是在主函数执行结束之后、当前宏任务结束之前。**



<br>



产生**微任务**有两种方式

1. 使用`MutationObserver`监控某个 DOM 节点，然后再通过 JavaScript 来修改这个节点，
   获知为这个节点添加、删除部分子节点，当 DOM 节点发生变化时，就会产生 DOM 变化记录的微任务。

2. 使用`Promise`，当调用`Promise.resolve()`或者`Promise.reject()`的时候，也会产生微任务。



<br >

V8 引擎层面分析：

当 JavaScript 执行一段脚本的时候，V8会为其创建一个**全局执行上下文**，在创建全局执行上下文的同时，V8引擎也会在内部创建一个**微任务队列**，用来存放微任务。在当前宏任务执行的过程中，有时候也会产生多个微任务，这时候就需要这个微任务队列来保存这些微任务。



<br>



## 微任务的几个结论

* 微任务和宏任务是绑定的，每个宏任务在执行时，会创建自己的微任务队列。
* 微任务的执行时长会影响到当前宏任务的时长。比如一个宏任务在执行过程中，产生了100个微任务，执行每个微任务的时间是10毫秒，那么执行这100个微任务的时间就是1000毫秒，也可以说这100个微任务让宏任务的执行时间延长了1000毫秒。一定要注意控制微任务的执行时长。
* 在一个宏任务中，分别创建一个用于回调的宏任务和微任务，无论什么情况下，微任务都早于宏任务执行。



<br>



## 消息队列

<img width="700" src="https://api.bearcub.club/tech/javascript/javascript-4.png">

<p align="center">消息队列示意图</p>



<br>




## 参考

[https://juejin.im/post/59e85eebf265da430d571f89#heading-9](https://juejin.im/post/59e85eebf265da430d571f89#heading-9)

《浏览器工作原理与实践》

