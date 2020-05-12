---
date: '2020-05-09'
slug: vue
tag:
- Vue

title: Vue3.0 reactivity 详解
description: Vue3.0 reactivity 详解，ts转js描述
author: 夜深_静悟
location: 东莞
image: 'https://api.bearcub.club/tag/husky.jpg'
meta:
  - name: title
    content: Vue3.0 reactivity 详解

  - name: description
    content: Vue3.0 reactivity 详解，ts转js描述

  - name: keywords
    content: Vue3.0

  - name: author
    content: 夜深_静悟

  - name: language
    content: Chinese
---

2个月前，恰逢疫情，无聊研究了一会 vue-next 的 reactivity 源码，由于自己的 typeScript 半桶水，
故将 typeScript 转化为 javaScript，手动替换，认识也更深了，不会写 Jest 测试，自己也模拟了测试，
基本没问题。现在，再过一遍，并且小结一下。

<br>

  更多详见

  我的仓库：[vue3.0-reactivity](https://github.com/WuLianN/vue3.0-reactivity)

  vue-next仓库：[vue-next](https://github.com/vuejs/vue-next)

<br>


[Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 

[Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)


<br>


proxy 语法

```js
const p = new Proxy(target, handler)
```

参数

`target`

要使用`Proxy`包装的**目标对象**（可以是任何类型的对象，包括原生数组、函数、甚至另一个代理）

`handler`

一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为 


<br>


```js
reactive(target)

要走的流程：
  reactive -> baseHandlers/collectionHandlers -> effect
```


<br>


## reactive

```js
const collectionTypes = new Set([Set, Map, WeakMap, WeakSet])
```

```js
import { mutableHandlers } from './baseHandlers'
import { mutableCollectionHandlers } from './collectionHandlers'

baseHandlers = mutableHanlers 
collectionHandlers  = mutableCollectionHandlers 

const observed = new Proxy(
    target, 
    collectionTypes.has(target.constructor) ? collectionHandlers : baseHandlers)

根据 target 的类型，选择不同的 handler
```


<br>


## baseHandlers 

可变数据的代理劫持方法

```js
export const mutableHandlers = {
  get,
  set,
  deleteProperty,
  has,
  ownKeys
}

拿两个例子 引出 track、trigger 的用处
import { track, trigger } from './effect.js'

const get = createGetter()

function createGetter(){
    return function get(target, key, receiver){
        // Reflect
        const res = Reflect.get(target, key, receiver)
        
        // track 
        track(target, TrackOpTypes.GET, key)
        
        return res 
    }
}

const set = createSetter()

function createSetter(){
    return function set( 
        target,
        key,
        value,
        receiver){
        
        // Reflect
        const result = Reflect.set(target, key, value, receiver)
        
         // don't trigger if target is something up in the prototype chain of original
        if (target === toRaw(receiver)) {
            if (!hadKey) {
                trigger(target, TriggerOpTypes.ADD, key, value)
            } else if (hasChanged(value, oldValue)) {
                trigger(target, TriggerOpTypes.SET, key, value, oldValue)
            }
        }
        
        return result
    }
}
```


<br>


## collectionHandlers 

可变集合数据的代理劫持方法

```js
export const mutableCollectionHandlers = {
  get: createInstrumentationGetter(false)
}
```


<br>


## effect

主要维护 targetMap 这份数据

```js
const targetMap = new WeakMap() // track、trigger 都会使用这个变量

const effectStack = [] // 只在 run() 中使用
let activeEffect // run()中对activeEffect赋值

// effect是一个函数，其下挂载了一些属性，用于描述其依赖和状态
export function effect(fn, options = {}) {
    if (isEffect(fn)) {
        fn = fn.raw
    }

    const effect = createReactiveEffect(fn, options)

    // 默认调用一次
    if (!options.lazy) {
        effect()
    }

    return effect
}
```


<br>


### track、trigger 的作用

```js
track 的作用：形成 targetMap 结构，dep 存储 effect
     targetMap: {
         target: {
           key: dep
         }
     }

     targetMap: new WeakMap()
     target: new Map()
     dep: new Set()


trigger 的作用：获取 dep 的 effect，进行更新
   addRunners() -> 提取依赖
   scheduleRun() -> 更新依赖
```


<br>


### track

```js
export function track(target, type, key) {
    if (!shouldTrack || activeEffect === undefined) {
        return 
    }

    let depsMap = targetMap.get(target)
    if (depsMap === void 0) {
        targetMap.set(target, depsMap = new Map())
    }

    let dep = depsMap.get(key)
    if (dep === void 0) {
        depsMap.set(key, dep = new Set())
    }

    if (!dep.has(activeEffect)) {
        dep.add(activeEffect)

        activeEffect.deps.push(dep)

        if (__DEV__ && activeEffect.options.onTrack) {
            activeEffect.options.onTrack({
                effect: activeEffect,
                target,
                type,
                key
            })
        }
    }
}
```

<br>


### trigger

```js
export function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target)
    
    if (depsMap === void 0) {
        // never been tracked
        return
    }

    const effects = new Set()
    const computedRunners = new Set()

    if (type === TriggerOpTypes.CLEAR) {
        // collection being cleared
        // trigger all effects for target
        depsMap.forEach(dep => {
            addRunners(effects, computedRunners, dep)
        })
    } else if (key === 'length' && isArray(target)) {
        depsMap.forEach((dep, key) => {
            if (key === 'length' || key >= newValue) {
                addRunners(effects, computedRunners, dep)
            }
        })
    } else {
        // schedule runs for SET | ADD | DELETE
        if (key !== void 0) {
            addRunners(effects, computedRunners, depsMap.get(key))
        }
        // also run for iteration key on ADD | DELETE | Map.SET
        if (
            type === TriggerOpTypes.ADD ||
            (type === TriggerOpTypes.DELETE && !isArray(target)) ||
            (type === TriggerOpTypes.SET && target instanceof Map)
        ) {
            const iterationKey = isArray(target) ? 'length' : ITERATE_KEY
            addRunners(effects, computedRunners, depsMap.get(iterationKey))
        }
    }

    const run = (effect) => {
        scheduleRun(
            effect,
            target,
            type,
            key,
            __DEV__
                ? {
                    newValue,
                    oldValue,
                    oldTarget
                } : undefined
        )
    }

    // Important: computed effects must be run first so that computed getters
    // can be invalidated before any normal effects that depend on them are run.
    computedRunners.forEach(run)
    effects.forEach(run)
}
```


<br>


## ref

```nginx
ref(value)
 要走的流程：
  普通数据类型：ref -> effect
  对象：ref -> reactive -> baseHandlers/collectionHandlers -> effect
```



```js
// 转化为响应式对象 还是要通过 reactive()
const convert = (val) =>
    isObject(val) ? reactive(val) : val
```



```js
export function ref(value) {
    return createRef(value)
}

function createRef(value, shallow = false) {
    if (isRef(value)) {
        return value
    }

    if (!shallow) {
        value = convert(value)
    }

    const r = {
        _isRef: true,
        get value() {
            track(r, TrackOpTypes.GET, 'value')
            return value
        },
        set value(newVal) {
            value = shallow ? newVal : convert(newVal)
            trigger(r, TriggerOpTypes.SET, 'value', __DEV__ ? {
                newValue: newVal
            } : void 0
            )
        }
    }

    return r
}
```


<br>


## computed

```js
computed用法：
  1. 参数为 函数
      const count = ref(1)
      const plusOne = computed(() => count.value + 1)

      console.log(plusOne.value) // 2

      plusOne.value++ // error

  2. 参数为 对象
      const count = ref(1)
      const plusOne = computed({
        get: () => count.value + 1,
        set: val => { count.value = val - 1 }
      })

      plusOne.value = 1
      console.log(count.value) // 0
```

```js
export function computed(getterOrOptions) {
   let getter
   let setter

   // 判断 getterOrOptions 是 函数/对象 ?
   if (isFunction(getterOrOptions)) {
      getter = getterOrOptions
      setter = __DEV__ ? () => {
         console.warn('Write operation failed: computed value is readonly')
      } : NOOP
   } else {
      getter = getterOrOptions.get
      setter = getterOrOptions.set
   }

   let dirty = true
   let value
   let computed

   const runner = effect(getter, {
      lazy: true,
      // mark effect as computed so that it gets priority during trigger
      computed: true,
      scheduler: () => {
         if (!dirty) {
            dirty = true
            trigger(computed, TriggerOpTypes.SET, 'value')
         }
      }
   })

   computed = {
      _isRef: true,
      // expose effect so computed can be stopped
      effect: runner,
      get value() {
         if (dirty) {
            value = runner()
            dirty = false
         }
         track(computed, TrackOpTypes.GET, 'value')
         return value
      },

      set value(newValue) {
         setter(newValue)
      }
   }

   return computed
}
```

打印：computed

```js
computed: {
      _isRef: true,
      effect: [Function: reativeEffect] {
      _isEffect: true,
      active: true,
      raw: [Function],
      deps: [],
      options: { lazy: true, computed: true, scheduler: [Function: scheduler] }
      },
      value: [Getter/Setter]
 }
```

