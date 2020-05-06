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



<br />



## JavaScript 事件循环

JavaScript 是单线程语言，得靠异步。Node天生异步，使得IO强大。

* 同步任务
* 异步任务



<br />



<img height="500" src="https://api.bearcub.club/tech/javascript/javascript-2.png">



<br />



* 同步和异步任务分别进入不同的执行“场所”，同步的进入主线程，异步的进入Event Table并注册函数。
* 当指定的事情完成时，Event Table会将这个函数移入Event Queen。
* 主线程内的任务执行完毕为空，会去Event Queen读取对应的函数，进入主线程执行。
* 上述过程会不断重复，也就是常说的Event Loop(事件循环)。


<br />


**异步任务**又分为：

* 宏任务 macro task
* 微任务 micro task



<br />



* 宏任务：包括整体代码script、setTimeout、setInterval
* 微任务：Promise、process.nextTick



<br />



事件循环的顺序，决定js代码的执行顺序。进入整体代码(宏任务)后，开始第一次循环。接着执行所有的微任务。然后再次从宏任务开始，找到其中一个任务队列执行完毕，再执行所有的微任务。

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

  

  <br />

  

  <img height=500 src="https://api.bearcub.club/tech/javascript/javascript-3.png">

  
  <br />

## 参考

[https://juejin.im/post/59e85eebf265da430d571f89#heading-9](https://juejin.im/post/59e85eebf265da430d571f89#heading-9)

