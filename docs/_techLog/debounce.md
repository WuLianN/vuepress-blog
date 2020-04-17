---
date: '2020-04-09'
slug: vuepress-modern
tag:
- Vue
- JavaScript

title: _.debounce()配合scroll
description: 防抖函数配合事件监听器!
author: 夜深_静悟
location: 东莞
image: 'https://api.bearcub.club/tag/bear.jpg'
meta:
  - name: title
    content: _.debounce()

  - name: description
    content: 防抖函数配合事件监听器!

  - name: keywords
    content: debounce

  - name: author
    content: 夜深_静悟

  - name: language
    content: Chinese & English
---

## :question: 问题

在 Vue 的 mounted() 中挂载一个 scroll 事件， 在 destroyed() 中移除 scroll 事件,


使用addEventListener绑定事件，removeEventListener移除事件。其中，addEventListener中的函数使用了_.debounce()，防抖作用。  


<br />

## :angry: 结果

在 destroyed() 中移除失败

代码如下

```js 
  mounted: function() {
    window.addEventListener(
      "scroll",
      _.debounce(this.handleScroll, 500, { leading: false, trailing: true }),
      true
    );
  },

  destroyed() {
    window.removeEventListener(
      "scroll",
      _.debounce(this.handleScroll, 500, { leading: false, trailing: true }),
      true
    );
  }
```

<br />

## :sunglasses: 原因


_debounced() -> 返回新的 debounced（防抖动）函数。  

问题就出在 “新” ，导致add和remove中的函数名对应不上  


<br />

## :key: 解决方案：

使用变量存储 _.debounce() 返回的函数，使得add和remove中函数名相对应

```js
  mounted: function() {
    this.debounce = _.debounce(this.handleScroll, 500, {
      leading: false,
      trailing: true
    });
    window.addEventListener("scroll", this.debounce, true);
  },

  destroyed() {
    window.removeEventListener("scroll", this.debounce, true);
  }
```



