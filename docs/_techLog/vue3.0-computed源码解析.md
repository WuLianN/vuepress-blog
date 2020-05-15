---
date: '2020-05-13'
slug: vue
tag:
- Vue

title: Vue3.0 computed 源码解析
description: Vue3.0 computed 源码解析
author: 夜深_静悟
location: 东莞
image: 'https://api.bearcub.club/tag/husky.jpg'
meta:
  - name: title
    content: Vue3.0 computed 源码解析

  - name: description
    content: Vue3.0 computed 源码解析

  - name: keywords
    content: Vue3.0

  - name: author
    content: 夜深_静悟

  - name: language
    content: Chinese
---

## computed

传入一个 getter 函数，返回一个默认不可手动修改的 ref 对象。

```js
const count = ref(1)
const plusOne = computed(() => count.value + 1)

console.log(plusOne.value) // 2

plusOne.value++ // 错误！
```

或者传入一个拥有 `get` 和 `set` 函数的对象，创建一个可手动修改的计算状态。

```js
const count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1
  },
})

plusOne.value = 1
console.log(count.value) // 0
```



<br>



## 源码

runtime-core/src/apiComputed.ts   运行时的 computed，即暴露给用户使用的 computed。

```js
import {
  computed as _computed,
  ComputedRef,
  WritableComputedOptions,
  WritableComputedRef,
  ComputedGetter
} from '@vue/reactivity'
import { recordInstanceBoundEffect } from './component'

export function computed<T>(getter: ComputedGetter<T>): ComputedRef<T>
export function computed<T>(
  options: WritableComputedOptions<T>
): WritableComputedRef<T>
export function computed<T>(
  getterOrOptions: ComputedGetter<T> | WritableComputedOptions<T>
) {
  const c = _computed(getterOrOptions as any) // 看这里，computed 的入口
  recordInstanceBoundEffect(c.effect)
  return c
}
```



reactivity/src/computed.ts  computed 的核心代码，基于 effect 。

```js
export function computed<T>(
  getterOrOptions: ComputedGetter<T> | WritableComputedOptions<T>
) {
  let getter: ComputedGetter<T>
  let setter: ComputedSetter<T>

  if (isFunction(getterOrOptions)) { // computed 的参数是 函数/对象
    getter = getterOrOptions
    setter = __DEV__    // 这里就是 plusOne.value++ 错误的原因，不提供 setter
      ? () => {
          console.warn('Write operation failed: computed value is readonly')
        }
      : NOOP
  } else {
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }

  let dirty = true
  let value: T
  let computed: ComputedRef<T>

  const runner = effect(getter, {
    lazy: true, // 开启懒加载
    // mark effect as computed so that it gets priority during trigger
    computed: true, // 开启计算属性 -> trigger 中使用
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
        dirty = false // 下一次触发依赖
      }
      track(computed, TrackOpTypes.GET, 'value') // 追踪依赖
      return value
    },
    set value(newValue: T) {
      setter(newValue)
    }
  } as any
  
  return computed // 返回一个 computed 对象
}
```

