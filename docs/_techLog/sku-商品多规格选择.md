---
date: '2020-07-01'
slug: javascript
tag:
- JavaScript

title: sku - 商品多规格选择
description: sku - 商品多规格选择
author: 夜深_静悟
location: 广州
image: 'https://api.bearcub.club/tag/bear.jpg'
meta:
  - name: title
    content: sku - 商品多规格选择

  - name: description
    content: sku - 商品多规格选择

  - name: keywords
    content: sku

  - name: author
    content: 夜深_静悟

  - name: language
    content: Chinese
---



思路可以看这篇文章[分分钟学会前端sku算法（商品多规格选择）](https://juejin.im/post/5eef2fcee51d4574113a0203#heading-9)，作者的 demo 是 react + ts，我将其转化为 Vue + js。

简单说一下思路吧！用**图**来描述产品属性之间的关系，用**矩阵**来表示产品属性之间的关系。

大佬 思路 -> 代码

菜鸟 代码 -> 思路



<br>

在class SpecAdjoinMatrix 中调用父类的constructor

```js
super(specList.reduce((total, current) => [...total, ...current.list], []))
// 注：specList 见下文标题 数据
// 可知：this.vertex = ["紫色", "红色", "套餐一", "套餐二", "64G", "128G", "256G"]
//      this.quantity = this.vertex.length = 7
```



## 创建邻接矩阵的源码解析

<br>

**创建一个顶点 x 顶点的长度的数组，抽象为顶点 x 顶点的矩阵**

```js
init() {
  this.adjoinArray = Array(this.quantity * this.quantity).fill(0)
}
```

<img src="https://api.bearcub.club/tech/javascript/javascript-7.png" width="500" height="400">


<br>
<br>

**传入顶点的值，获取该顶点的列**

```js
getVertexCol(id) {
  const index = this.vertex.indexOf(id) // 获取该顶点在vertex中的索引
  const col = []
  this.vertex.forEach((item, pIndex) => {
    col.push(this.adjoinArray[index + this.quantity * pIndex])
  })
  return col 
}
```

<img src="https://api.bearcub.club/tech/javascript/javascript-8.png" width="500" height="400">


<br>
<br>

**传入一个顶点数组，求出该数组所有顶点的列的和**

```js
getColSum(params) {
  const paramsVertex = params.map((id) => this.getVertexCol(id)) // 获得顶点对应的列的数组 [ [], [], ... ]
  const paramsVertexSum = []
  this.vertex.forEach((item, index) => {
    const rowtotal = paramsVertex
      .map((value) => value[index]) // 获得列中 vertex索引 对应的值
      .reduce((total, current) => {
         total += current || 0
         return total
      }, 0)
    paramsVertexSum.push(rowtotal)
  })
  return paramsVertexSum
}
```

<img src="https://api.bearcub.club/tech/javascript/javascript-9.png" width="500" height="400">



<br>
<br>


**传入一个顶点数组，求出并集**

```js
getUnions(params) {
  const paramsColSum = this.getColSum(params) // 顶点数组中顶点的列的和 []
  const unions = []
  paramsColSum.forEach((item, index) => {
    if (item && this.vertex[index]) unions.push(this.vertex[index]) // Boolean(0) === false
  })
  return unions
}
```

注：只要 **和** 大于0，即可说明 两者或两者以上有并集，如上图所示。



<br>

**传入一个顶点数组，求出交集**

```js
getIntersections(params) {
  const paramsColSum = this.getColSum(params) // 顶点数组中顶点的列的和 []
  const intersection = []
  paramsColSum.forEach((item, index) => {
    if (item >= params.length && this.vertex[index]) intersection.push(this.vertex[index])
  })
  return intersection
}
```

注：只要 **和** 大于等于 要交集的列的个数，即可说明 两者或两者以上有交集。



<br>

## 创建邻接矩阵

```js
export default class AdjoinMatrix {
  constructor(vertex) {
    this.vertex = vertex // 顶点数组
    this.quantity = this.vertex.length // 矩阵长度
    this.adjoinArray = [] // 矩阵数组
    this.init()
  }

  // 初始化数组
  init() {
    this.adjoinArray = Array(this.quantity * this.quantity).fill(0) // 创建矩阵且值全为0，一维数组抽象为矩阵
  }

 /*
  * @param id string
  * @param sides Array<string>
  *  传入一个顶点，和当前顶点可达的顶点数组，将对应位置置为1
  */
  setAdjoinVertexs(id, sides) {
    const pIndex = this.vertex.indexOf(id)
    sides.forEach((item) => {
      const index = this.vertex.indexOf(item)
      this.adjoinArray[pIndex * this.quantity + index] = 1
    })
  }

 /*
  * @param id string
  * 传入顶点的值，获取该顶点的列
  */
  getVertexCol(id) {
    const index = this.vertex.indexOf(id)
    const col = []
    this.vertex.forEach((item, pIndex) => {
      col.push(this.adjoinArray[index + this.quantity * pIndex])
    })
    return col
  }

 /*
  * @param params Array<string>
  * 传入一个顶点数组，求出该数组所有顶点的列的和
  */
  getColSum(params) {
    const paramsVertex = params.map((id) => this.getVertexCol(id))
    const paramsVertexSum = []
    this.vertex.forEach((item, index) => {
      const rowtotal = paramsVertex
        .map((value) => value[index])
        .reduce((total, current) => {
          total += current || 0
          return total
        }, 0)
      paramsVertexSum.push(rowtotal)
    })
    return paramsVertexSum
  }

 /*
  * @param params Array<string>
  * 传入一个顶点数组，求出并集
  */
  getUnions(params) {
    const paramsColSum = this.getColSum(params)
    const unions = []
    paramsColSum.forEach((item, index) => {
      if (item && this.vertex[index]) unions.push(this.vertex[index])
    })
    return unions
  }

  /*
   * @param params Array<string>
   * 传入一个顶点数组，求出交集
   */
  getIntersections(params) {
    const paramsColSum = this.getColSum(params)
    const intersection = []
    paramsColSum.forEach((item, index) => {
      if (item >= params.length && this.vertex[index]) intersection.push(this.vertex[index])
    })
    return intersection
  }
}
```

<br>

## 创建`多规格选择`邻接矩阵

```js
import AdjoinMatrix from './adjoin-martix'

export default class SpecAdjoinMatrix extends AdjoinMatrix {
  constructor (specList, specCombinationList) {
    super(specList.reduce((total, current) => [...total, ...current.list], [])) // 调用父类的constructor

    this.specList = specList
    this.specCombinationList = specCombinationList

    // 根据可选规格列表矩阵创建
    this.initSpec()
    // 同级顶点创建
    this.initSameLevel()
  }

  /**
   * 根据可选规格组合填写邻接矩阵的值
   */
  initSpec () {
    this.specCombinationList.forEach((item) => {
      this.fillInSpec(item.specs)
    })
  }

  // 填写同级点
  initSameLevel () {
    // 获得初始所有可选项
    const specsOption = this.getIntersections(this.vertex)
    this.specList.forEach((item) => {
      const params = []
      // 获取同级别顶点
      item.list.forEach((value) => {
        if (specsOption.includes(value)) params.push(value)
      })
      // 同级点位创建
      this.fillInSpec(params)
    })
  }

  /*
   * @params
   * 传入顶点数组，查询出可选规格
   */
  getSpecscOptions (params) {
    let specOptionCanchoose = []
    if (params.some(Boolean)) {
      // 获取可选项（交集）
      specOptionCanchoose = this.getIntersections(params.filter(Boolean))
    } else {
      // 所有可选项
      specOptionCanchoose = this.getUnions(this.vertex)
    }
    return specOptionCanchoose
  }

  /*
   * @params
   * 填写邻接矩阵的值
   */
  fillInSpec (params) {
    params.forEach((param) => {
      this.setAdjoinVertexs(param, params)
    })
  }
}
```

<br>

## 数据

```js
export const specList = [
  { title: '颜色', list: ['红色', '紫色'] },
  { title: '套餐', list: ['套餐一', '套餐二'] },
  { title: '内存', list: ['64G', '128G', '256G'] }
]

export const specCombinationList = [
  { id: '1', specs: ['紫色', '套餐一', '64G'] },
  { id: '2', specs: ['紫色', '套餐一', '128G'] },
  { id: '3', specs: ['紫色', '套餐二', '128G'] },
  { id: '4', specs: ['红色', '套餐二', '256G'] }
]
```

补充：specCombinationList 可用笛卡尔积生成，具体可看这篇文章[笛卡尔积](https://bearcub.club/2020/06/15/笛卡尔积/)



<br>



## 获得可选项

```js
spec(arr) {
  // 创建一个规格矩阵
  const specAdjoinMatrix = new SpecAdjoinMatrix(
    specList,
    specCombinationList
  );

  // 获得可选项表
  const optionSpecs = specAdjoinMatrix.getSpecscOptions(arr);
  return optionSpecs;
}

spec(['紫色']) // ["紫色", "套餐一", "套餐二", "64G", "128G"]
spec(['紫色', '套餐一']) // ["紫色", "套餐一", "64G", "128G"]
```

