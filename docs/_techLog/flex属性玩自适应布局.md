---
date: '2020-05-05'
slug: css
tag:
- CSS

title: Flex属性玩自适应布局
description: Flex属性玩自适应布局
author: 夜深_静悟
location: 东莞
image: 'https://api.bearcub.club/tag/bird.jpg'
meta:
  - name: title
    content: Flex属性玩自适应布局

  - name: description
    content: Flex属性玩自适应布局

  - name: keywords
    content: Flex

  - name: author
    content: 夜深_静悟

  - name: language
    content: Chinese
---

flex 属性用于设置或检索弹性盒模型对象的子元素如何分配空间。

flex 属性是 flex-grow、flex-shrink 和 flex-basis 属性的简写属性。

**注意：** 如果元素不是弹性盒模型对象的子元素，则 flex 属性不起作用。

* flex-grow: 一个数字，规定项目将相对于其他灵活的项目进行扩展的量。       
* flex-shrink: 一个数字，规定项目将相对于其他灵活的项目进行收缩的量。       
* flex-basis:  项目的长度。合法值："auto"、"inherit" 或一个后跟 "%"、"px"、"em" 或任何其他长度单位的数字。 

更通俗解释：

* flex-grow: flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
* flex-shrink: flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
* flex-basic: flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。



<br>



[flex布局教程](https://www.runoob.com/w3cnote/flex-grammar.html)



 <br>



```css
.bg1 { background: #e07171; }  
.bg2 { background: #6868c5; }
.bg3 { background: green; }
```



<br>



## Flex 如何实现三列宽度相同?

```html
 <div class="flex-box">
        <div class="flex-box-item bg1"></div>
        <div class="flex-box-item bg2"></div>
        <div class="flex-box-item bg3"></div>
 </div>
```

```css
.flex-box {
   width: 500px;
   height: 300px;
   display: flex;
   flex-direction: row;
}

.flex-box-item {    
  flex: 1;
}
```



<br>



## Flex 如何实现上下两行，上行高度自适应，下行高度 200px？

```html
 <div class="flex-box">
        <div class="flex-box-item1 bg1"></div>
        <div class="flex-box-item2 bg2"></div>
 </div>
```

```css
.flex-box {
    width: 500px;
    height: 300px;
    display: flex;
    flex-direction: column;
}

.flex-box-item1 {
    flex: 1 1 auto;
}

.flex-box-item2 {
    flex: 0 0 200px;
}
```



<br>



## Flex 实现左侧固定宽度，右侧自适应

```html
 <div class="flex-box">
        <div class="flex-box-item1 bg1"></div>
        <div class="flex-box-item2 bg2"></div>
 </div>
```

```css
.flex-box {
    width: 100%;
    height: 700px;
    display: flex;
    flex-direction: row;
}

.flex-box-item1 { 
   flex: 0 0 300px;
}

.flex-box-item2 {
   flex: 1 1 auto;
}
```

​				

<br>



## Flex 实现左、右侧固定宽度，中间自适应

```html
 <div class="flex-box">
        <div class="flex-box-item1 bg1"></div>
        <div class="flex-box-item2 bg2"></div>
        <div class="flex-box-item3 bg3"></div>
 </div>
```

```css
.flex-box {
    width: 100%;
    height: 700px;
    display: flex;
    flex-direction: row;
}

.flex-box-item1 {
   flex: 0 0 300px;
}

.flex-box-item3 {
   flex: 0 0 300px;
}

.flex-box-item2 {
   flex: 1 1 auto;
}
```



