---
date: '2020-05-02'
slug: js
tag:
- JavaScript

title: js中的...运用
description: '了解js中的...运用'
author: 夜深_静悟
location: 东莞
image: 'https://api.bearcub.club/tag/car.jpg'
meta:
  - name: title
    content: js中的...运用

  - name: description
    content: 了解js中的...运用!

  - name: keywords
    content: 拓展运算符 rest 参数

  - name: author
    content: 夜深_静悟

  - name: language
    content: Chinese
---


## JavaScript 中 ... 的用法 

* 扩展运算符 ...   
* rest 参数 ...变量名 

<br>

任何 `Iterator`接口的对象都可以用**扩展运算符**转为真正的**数组**

原生具备`Iterator`接口的数据结构如下：

* Array
* Map
* Set
* String
* TypedArray
* 函数的 arguments 对象
* NodeList 对象

默认的`Iterator`接口部署在数据结构的 Symbol.iterator 属性，或者说，一个数据结构只要具有 Symbol.iterator 属性，就可以认为是 “可遍历的”（iterable）。就可以使用 for...of 循环。

<br>



## 数组

```js
const arr = [1, 2, 3]
const res = ...arr

res // 1, 2, 3
```



### 运用 - 数组的解构赋值

```js
const [first, ...rest] = [1, 2, 3, 4]
first // 1
rest // 2, 3, 4
```



<br>



### 运用 - 合并数组

```js
const arr1 = [1, 2]
const arr2 = [3, 4]

const all = [...arr1, ...arr2] // [1, 2, 3, 4]
```



<br>



## 运用 - 数组去重

```js
const arr1 = [1, 1, 2, 2, 3]
const arr2 = [...new Set(arr1)] // [1, 2, 3] 方法一
const arr3 = Array.from(new Set(arr1)) // [1, 2, 3] 方法二
```



<br>



### 运用 - 字符串

```js
[...'hello'] // ['h', 'e', 'l', 'l', 'o']

// 返回字符串长度的函数
function length(str){
    return [str].length
}
```



<br>



## 对象

取出参数对象的所有可遍历属性，并将其复制到当前对象之中。

```js
let z = { a: 3, b: 4 }
let n = { ...z }

n // { a: 3, b: 4 }
```

```js
等同于使用 Object.assign() 

let aClone = { ...a }
等同于
let aClone = Object.assign({}, a)
```



<br>



### 运用 - 对象的解构赋值

```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }
x // 1
y // 2
z // { a: 3, b: 4 }
```

注意：解构赋值必须是最后一个参数，否则报错。



<br>



### 运用 - 合并对象

```js
const a = { a: 1, aa: 2 }
const b = { b: 3 }
const ab = { ...a, ...b }

ab // { a: 1, aa: 2, b: 3 }
```



<br>



## rest 参数 

形式为 ...变量名，用于获取函数的多余参数。rest 参数搭配的变量是一个**数组**。

```js
function getArguments(...args){   
   return args 
}

getArguments('a', 'b') // [ "a", "b" ]
```

注意：rest 参数之后不能再有其他参数（即只能是最后一个参数），否自会报错。



