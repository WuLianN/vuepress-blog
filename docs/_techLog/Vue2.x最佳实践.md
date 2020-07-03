---
date: '2020-07-02'
slug: vue
tag:
- Vue

title: Vue2.x 最佳实践
description: Vue2.x 最佳实践
author: 夜深_静悟
location: 广州
image: 'https://api.bearcub.club/tag/duck.jpg'
meta:
  - name: title
    content: Vue2.x 最佳实践

  - name: description
    content: Vue2.x 最佳实践

  - name: keywords
    content: Vue2.x 最佳实践

  - name: author
    content: 夜深_静悟

  - name: language
    content: Chinese
---

Vue2.x 与 Vue3.x 的比较(改进)

options -> composition 

this (面对对象编程) -> hook (函数式编程)

生命周期有更改

- ~~`beforeCreate`~~ -> use `setup()`
- ~~`created`~~-> use `setup()`
- `beforeMount` -> `onBeforeMount`
- `mounted` -> `onMounted`
- `beforeUpdate` -> `onBeforeUpdate`
- `updated` -> `onUpdated`
- `beforeDestroy` -> `onBeforeUnmount`
- `destroyed` -> `onUnmounted`
- `activated` -> `onActivated`
- `deactivated` -> `onDeactivated`
- `errorCaptured` -> `onErrorCaptured`



<br>



### v-for key的作用

跟踪每个节点的身份，从而**重用**和**重新排序**现有元素



<br>

1. **key 为 index** :sunglasses:

​       **删除**、**替换**都会出现bug，复用 index 的逻辑。(list没有涉及操控**index**，即可使用)



 <img src="https://api.bearcub.club/tech/javascript/javascript-10.gif">

注：**c**，index为**2**，其color是**red**。删除**c**后，**d**的index为**2**了，color也为**red**，明显**复用**index为**2**的逻辑。



<br>

2. **key 为 随机数**  :x:

​       这招不能用，这招会导致整个 list **重新渲染**



<br>

3. **key 为 独一无二的 id**  :100:

​       这是最好的解决方案



<br>



## v-if vs v-show

`v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的**`事件监听器`**和**`子组件`**适当地被**销毁**和**重建**。

`v-if` 也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

:100: 如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。



<br>



### 组件 data 必须是一个 函数  Vue2.x

当在组件中使用 `data` property 的时候 (除了 `new Vue` 外的任何地方)，它的值必须是返回一个对象的函数。

:eyes: 当 `data` 的值是一个对象时，它会在**这个组件的所有实例之间共享**。

:broken_heart: data 为对象的后果：复用组件时，状态会失控。属性共享的弊端，属性一更改，复用组件的属性全更改。



注：Vue2.x - options，Vue3.x - composition，Vue3.x版本不用考虑这个问题了。

<br>



### 避免 `v-if` 和 `v-for` 用在一起

**永远不要把 `v-if` 和 `v-for` 同时用在同一个元素上。**

:eyes: 当 Vue 处理指令时，`v-for` 比 `v-if` 具有更高的**优先级**



一般我们在两种常见的情况下会倾向于这样做：

- 为了过滤一个列表中的项目 (比如 `v-for="user in users" v-if="user.isActive"`)。在这种情形下，请将 `users` 替换为一个计算属性 (比如 `activeUsers`)，让其返回过滤后的列表。
- 为了避免渲染本应该被隐藏的列表 (比如 `v-for="user in users" v-if="shouldShowUsers"`)。这种情形下，请将 `v-if` 移动至容器元素上 (比如 `ul`、`ol`)。



1. 

```html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

将会经过如下运算：

```js
this.users.map(function (user) {
  if (user.isActive) {
    return user.name
  }
})
```

因此哪怕我们只渲染出一小部分用户的元素，也得**在每次重渲染的时候遍历整个列表**，不论活跃用户是否发生了变化。

通过将其更换为在如下的一个**计算属性**上遍历：

```js
computed: {
  activeUsers: function () {
    return this.users.filter(function (user) {
      return user.isActive
    })
  }
}
```

```html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```



​	2.

```html
<ul>
  <li
    v-for="user in users"
    v-if="shouldShowUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

更新为：

```html
<ul v-if="shouldShowUsers">
  <li
    v-for="user in users"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```



<br>



### 路由参数解耦 Vue2.x

一般在组件内使用路由参数，大多数人会这样做：

```js
export default {
    methods: {
        getParamsId() {
            return this.$route.params.id
        }
    }
}
```

在组件中使用 `$route` 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。

正确的做法是通过 `props` 解耦

```js
const router = new VueRouter({
    routes: [{
        path: '/user/:id',
        component: User,
        props: true
    }]
})
```

将路由的 `props` 属性设置为 `true` 后，组件内可通过 `props` 接收到 `params` 参数

```js
export default {
    props: ['id'],
    methods: {
        getParamsId() {
            return this.id
        }
    }
}
```

另外你还可以通过函数模式来返回 `props`

```js
const router = new VueRouter({
    routes: [{
        path: '/user/:id',
        component: User,
        props: (route) => ({
            id: route.query.id
        })
    }]
})
```

Vue3.x 没有 **`this`** 了，Vue3.x 引进**路由**的方式如下：

```js
import { createRouter, createWebHistory } from 'vue-router'
// there is also createWebHashHistory and createMemoryHistory

createRouter({
  history: createWebHistory(),
  routes: [],
})
```



<br>



### 函数式组件

函数式组件是无状态，它无法实例化，没有任何的生命周期和方法。创建函数式组件也很简单，只需要在模板添加 `functional` 声明即可。一般适合只依赖于外部数据的变化而变化的组件，因其轻量，渲染性能也会有所提高。

组件需要的一切都是通过 `context` 参数传递。它是一个上下文对象，具体属性查看[文档](https://cn.vuejs.org/v2/guide/render-function.html#函数式组件)。这里 `props` 是一个包含所有绑定属性的对象。

```html
<template functional>
    <div class="list">
        <div class="item" v-for="item in props.list" :key="item.id" @click="props.itemClick(item)">
            <p>{{item.title}}</p>
            <p>{{item.content}}</p>
        </div>
    </div>
</template>
```

父组件使用

```html
<template>
    <div>
        <List :list="list" :itemClick="item => (currentItem = item)" />
    </div>
</template>
```

```js
import List from '@/components/List.vue'
export default {
    components: {
        List
    },
    data() {
        return {
            list: [{
                title: 'title',
                content: 'content'
            }],
            currentItem: ''
        }
    }
}
```



<br>



### watch高阶使用 Vue2.x

**立即执行**

`watch` 是在监听属性改变时才会触发，有些时候，我们希望在组件创建后 `watch` 能够立即执行

可能想到的的方法就是在 `create` 生命周期中调用一次，但这样的写法不优雅，或许我们可以使用这样的方法



```js
export default {
    data() {
        return {
            name: 'Joe'
        }
    },
    watch: {
        name: {
            handler: 'sayName',
            immediate: true
        }
    },
    methods: {
        sayName() {
            console.log(this.name)
        }
    }
}
```



<br>



**深度监听**

在监听对象时，对象内部的属性被改变时无法触发 `watch` ，我们可以为其设置深度监听

```js
export default {
    data: {
        studen: {
            name: 'Joe',
            skill: {
                run: {
                    speed: 'fast'
                }
            }
        }
    },
    watch: {
        studen: {
            handler: 'sayName',
            deep: true
        }
    },
    methods: {
        sayName() {
            console.log(this.studen)
        }
    }
}
```



<br>



**触发监听执行多个方法**

使用数组可以设置多项，形式包括字符串、函数、对象

```js
export default {
    data: {
        name: 'Joe'
    },
    watch: {
        name: [
            'sayName1',
            function(newVal, oldVal) {
                this.sayName2()
            },
            {
                handler: 'sayName3',
                immaediate: true
            }
        ]
    },
    methods: {
        sayName1() {
            console.log('sayName1==>', this.name)
        },
        sayName2() {
            console.log('sayName2==>', this.name)
        },
        sayName3() {
            console.log('sayName3==>', this.name)
        }
    }
}
```



<br>



**watch监听多个变量**

watch本身无法监听多个变量。但我们可以将需要监听的多个变量通过计算属性返回对象，再监听这个对象来实现“监听多个变量”

```js
export default {
    data() {
        return {
            msg1: 'apple',
            msg2: 'banana'
        }
    },
    computed: {
        msgObj() {
            const { msg1, msg2 } = this
            return {
                msg1,
                msg2
            }
        }
    },
    watch: {
        msgObj: {
            handler(newVal, oldVal) {
                if (newVal.msg1 != oldVal.msg1) {
                    console.log('msg1 is change')
                }
                if (newVal.msg2 != oldVal.msg2) {
                    console.log('msg2 is change')
                }
            },
            deep: true
        }
    }
}
```



<br>



### 监听组件生命周期 Vue2.x

通常我们监听组件生命周期会使用 `$emit` ，父组件接收事件来进行通知

子组件

```js
export default {
    mounted() {
        this.$emit('listenMounted')
    }
}
```

父组件

```html
<template>
    <div>
        <List @listenMounted="listenMounted" />
    </div>
</template>
```

其实还有一种简洁的方法，使用 `@hook` 即可监听组件生命周期，组件内无需做任何改变。同样的， `created` 、 `updated` 等也可以使用此方法。

```html
<template>
    <List @hook:mounted="listenMounted" />
</template>
```



<br>



### 参考

[Vue2.x 风格指南](https://cn.vuejs.org/v2/style-guide/)

[10个Vue开发技巧助力成为更好的工程师](https://juejin.im/post/5e8a9b1ae51d45470720bdfa#heading-12)