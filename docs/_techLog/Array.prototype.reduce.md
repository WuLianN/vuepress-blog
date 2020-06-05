---
date: '2020-06-03'
slug: js
tag:
- JavaScript

title: reduce方法详解
description: reduce方法详解
author: 夜深_静悟
location: 广州
image: 'https://api.bearcub.club/tag/turtle.jpg'
meta:
  - name: title
    content: reduce方法详解

  - name: description
    content: reduce方法详解

  - name: keywords
    content: reduce

  - name: author
    content: 夜深_静悟

  - name: language
    content: Chinese
---

**`reduce()`** 方法对数组中的每个元素执行一个由您提供的**reducer**函数(升序执行)，将其结果汇总为单个返回值

**reducer** 函数接收4个参数:

1. Accumulator (acc) (累计器)
2. Current Value (cur) (当前值)
3. Current Index (idx) (当前索引)
4. Source Array (src) (源数组)

您的 **reducer** 函数的返回值分配给累计器，该返回值在数组的每个迭代中被记住，并最后成为最终的单个结果值。



## 语法

```js
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
```



<br>



### 参数

**`callback`**

​    执行数组中每个值 (如果没有提供 `initialValue则第一个值除外`)的函数，包含四个参数：

​    **`accumulator`**

​       累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或`initialValue`（见于下方）。

​    **`currentValue`**

​       数组中正在处理的元素。

​    **`index`** 可选

​       数组中正在处理的当前元素的索引。 如果提供了`initialValue`，则起始索引号为0，否则从索引1起始。

​    **`array`** 可选

​       调用`reduce()`的数组。



<br>



### 返回值

函数累计处理的结果



<br>



**注意**：如果没有提供`initialValue`，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。如果提供`initialValue`，从索引0开始。

<br>

回调函数第一次执行时，`accumulator` 和`currentValue`的取值有两种情况：如果调用`reduce()`时提供了`initialValue`，`accumulator`取值为`initialValue`，`currentValue`取数组中的第一个值；如果没有提供 `initialValue`，那么`accumulator`取数组中的第一个值，`currentValue`取数组中的第二个值。



<h2>例子</h2>

### 数组里所有值的和

```js
const total = [0, 1, 2, 3].reduce((acc, cur) => acc + cur, 0) 
console.log(total) // 6 
```



<br>



### 累加对象数组里的值 

```js
const total = [{x: 1}, {x: 2}, {x: 3}].reduce((acc, cur) => acc + cur.x, 0)
console.log(total) // 6

有局限性，例如属性都要相同！
```



<br>



### 计算数组中每个元素出现的次数

```js
const names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice']
const countNames = names.reduce((acc, cur) => {
    if(acc.hasOwnProperty(cur)){
        acc[cur]++
    }else{
        acc[cur] = 1
    }

    return acc
}, {})

console.log(countNames) // { Alice: 2, Bob: 1, Tiff: 1, Bruce: 1 }
```



<br>



### 按属性对object分类

```js
const people = [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 20 }
]

function groupBy(objectArray, property){
    return objectArray.reduce((acc, cur) => {
        const key = cur[property]
        if(!acc[key]){
            acc[key] = []
        }
        acc[key].push(cur)
        return acc
    }, {})
}

const groupPeople = groupBy(people, 'age')
console.log(groupPeople) 
// { 
//   20: [
//     { name: 'Max', age: 20 }, 
//     { name: 'Jane', age: 20 }
//   ], 
//   21: [{ name: 'Alice', age: 21 }] 
// }
```



<br>



### 数组中的对象的属性值去重 [{}, {}, {}]

```js
const people = [
  { name: 'Alice', age: 21 },
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Max', age: 20 }
]

const obj = {}

const res = people.reduce((acc, cur) => {
    obj[cur.name] 
        ? ''
        : (obj[cur.name] = true, acc.push(cur))
    return acc
}, [])

console.log(res) 
// [
//    { name: 'Alic', age: 21 }, 
//    { name: 'Max', age: 20 }
// ] 
```



<br>

 

### 	求多个数组之间的交集 （阿里）

法一：只针对**数组**

```js
function intersect(...arr){
    return arr.reduce((acc, cur) => {
        return acc.filter(item => cur.includes(item))
    })
}

const arr1 = [1, 2, 3]
const arr2 = [2, 3, 4]
const arr3 = [3, 4, 5]

const res = intersect(arr1, arr2, arr3)
console.log(res) // [3]

如果没有提供 `initialValue`，那么`accumulator`取数组中的第一个值，`currentValue`取数组中的第二个值
```

法二：处理**数组和类数组**（有iterable接口的数据结构）

```js
function intersect(...arr){
    return arr.reduce((acc, cur) => [...acc].filter(item => new Set(cur).has(item)))
}

const arr1 = [1, 2, 3]
const arr2 = [2, 3, 4]
const arr3 = [3, 4, 5]
const arr4 = new Set(arr1) // {1, 2, 3}
const arr5 = new Set(arr2)
const arr6 = new Set(arr3)

const res1 = intersect(arr1, arr2, arr3)
const res2 = intersect(arr4, arr5, arr6)

console.log(res1) // [3]
console.log(res2) // [3]
```



**参考**

[MDN - Array.prototype.reduce](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

