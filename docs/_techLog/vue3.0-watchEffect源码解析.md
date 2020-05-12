---
date: '2020-05-12'
slug: vue
tag:
- Vue

title: Vue3.0 watchEffect 源码解析
description: Vue3.0 watchEffect 源码解析
author: 夜深_静悟
location: 东莞
image: 'https://api.bearcub.club/tag/whiteFox.jpg'
meta:
  - name: title
    content: Vue3.0 watchEffect 源码解析

  - name: description
    content: Vue3.0 watchEffect 源码解析

  - name: keywords
    content: watchEffect

  - name: author
    content: 夜深_静悟

  - name: language
    content: Chinese
---

## watchEffect

立即执行传入的一个函数，并响应式追踪其依赖，并在其依赖变更时重新运行该函数。

```js
const count = ref(0)

watchEffect(() => console.log(count.value))
// -> 打印出 0

setTimeout(() => {
  count.value++
  // -> 打印出 1
}, 100)
```



<br>

### 停止监听

当 `watchEffect` 在组件的 `setup()` 函数或生命周期钩子被调用时， 侦听器会被链接到该组件的生命周期，并在组件卸载时自动停止。

在一些情况下，也可以显式调用返回值以停止侦听：

```js
const stop = watchEffect(() => {
  /* ... */
})

// 之后
stop()
```



<br>



### 清除副作用

有时副作用函数会执行一些异步的副作用, 这些响应需要在其失效时清除（即完成之前状态已改变了）。所以侦听副作用传入的函数可以接收一个 `onInvalidate` 函数作入参, 用来注册清理失效时的回调。当以下情况发生时，这个**失效回调**会被触发:

- 副作用即将重新执行时
- 侦听器被停止 (如果在 `setup()` 或 生命周期钩子函数中使用了 `watchEffect`, 则在卸载组件时)

```js
watchEffect((onInvalidate) => {
  const token = performAsyncOperation(id.value)
  onInvalidate(() => {
    // id 改变时 或 停止侦听时
    // 取消之前的异步操作
    token.cancel()
  })
})
```

我们之所以是通过传入一个函数去注册失效回调，而不是从回调返回它（如 React `useEffect` 中的方式），是因为返回值对于异步错误处理很重要。在执行数据请求时，副作用函数往往是一个异步函数：

```js
const data = ref(null)
watchEffect(async () => {
  data.value = await fetchData(props.id)
})
```

我们知道异步函数都会隐式地返回一个 Promise，但是清理函数必须要在 Promise 被 resolve 之前被注册。另外，Vue 依赖这个返回的 Promise 来自动处理 Promise 链上的潜在错误。



<br>



### 副作用刷新时机

Vue 的响应式系统会缓存副作用函数，并异步地刷新它们，这样可以避免同一个 tick 中多个状态改变导致的不必要的重复调用。在核心的具体实现中, 组件的更新函数也是一个被侦听的副作用。当一个用户定义的副作用函数进入队列时, 会在所有的组件更新后执行：

```html
<template>
  <div>{{ count }}</div>
</template>

<script>
  export default {
    setup() {
      const count = ref(0)

      watchEffect(() => {
        console.log(count.value)
      })

      return {
        count,
      }
    },
  }
</script>
```

在这个例子中：

- `count` 会在初始运行时同步打印出来
- 更改 `count` 时，将在组件**更新后**执行副作用。

请注意，初始化运行是在组件 `mounted` 之前执行的。因此，如果你希望在编写副作用函数时访问 DOM（或模板 ref），请在 `onMounted` 钩子中进行：

```js
onMounted(() => {
  watchEffect(() => {
    // 在这里可以访问到 DOM 或者 template refs
  })
})
```

如果副作用需要同步或在组件更新之前重新运行，我们可以传递一个拥有 `flush` 属性的对象作为选项（默认为 `'post'`）：

```js
// 同步运行
watchEffect(
  () => {
    /* ... */
  },
  {
    flush: 'sync',
  }
)

// 组件更新前执行
watchEffect(
  () => {
    /* ... */
  },
  {
    flush: 'pre',
  }
)
```



<br>



### 侦听器调试

`onTrack` 和 `onTrigger` 选项可用于调试一个侦听器的行为。

- 当一个 reactive 对象属性或一个 ref 作为依赖被追踪时，将调用 `onTrack`
- 依赖项变更导致副作用被触发时，将调用 `onTrigger`

这两个回调都将接收到一个包含有关所依赖项信息的调试器事件。建议在以下回调中编写 `debugger` 语句来检查依赖关系：

```js
watchEffect(
  () => {
    /* 副作用的内容 */
  },
  {
    onTrigger(e) {
      debugger
    },
  }
)
```

**`onTrack` 和 `onTrigger` 仅在开发模式下生效。**



<br>



## watchEffct 源码
源码位于 runtime-core/src/apiWatch.ts


```js
// Simple effect.
export function watchEffect(
  effect: WatchEffect,
  options?: BaseWatchOptions
): StopHandle {
  return doWatch(effect, null, options)
}
```



```js
import { effect, stop } from '@vue/reactivity'
EMPTY_OBJ = {}

function doWatch(
  source: WatchSource | WatchSource[] | WatchEffect,
  cb: WatchCallback | null,
  { immediate, deep, flush, onTrack, onTrigger }: WatchOptions = EMPTY_OBJ
): StopHandle {
  
  const instance = currentInstance 

  let getter: () => any
  if (isArray(source)) {
     
  } else if (isRef(source)) {
   
  } else if (cb) {
  
  } else { 
    // no cb -> simple effect (watchEffect 走这里！)
    getter = () => {
      if (instance && instance.isUnmounted) {
        return
      }
      if (cleanup) {
        cleanup()
      }
      return callWithErrorHandling(
        source,
        instance,
        ErrorCodes.WATCH_CALLBACK,
        [onInvalidate]
      )
    }
  }
    
  let cleanup: () => void
  const onInvalidate: InvalidateCbRegistrator = (fn: () => void) => {
    cleanup = runner.options.onStop = () => {
      callWithErrorHandling(fn, instance, ErrorCodes.WATCH_CLEANUP)
    }
  }
    
  let scheduler: (job: () => any) => void
  if (flush === 'sync') {
    scheduler = invoke
  } else if (flush === 'pre') {
    scheduler = job => {
      if (!instance || instance.isMounted) {
        queueJob(job)
      } else {
        // with 'pre' option, the first call must happen before
        // the component is mounted so it is called synchronously.
        job()
      }
    }
  } else {
    scheduler = job => queuePostRenderEffect(job, instance && instance.suspense)
  }
    
  const runner = effect(getter, {
    lazy: true,
    // so it runs before component update effects in pre flush mode
    computed: true,
    onTrack,
    onTrigger,
    scheduler: applyCb ? () => scheduler(applyCb) : scheduler
  })

  recordInstanceBoundEffect(runner)

  // initial run
  if (applyCb) {
   
  } else {
    runner() // effect() -> getter() -> callWithErrorHandling() 立即执行
  }

  return () => {
    stop(runner) // 停止监听
    if (instance) {
      remove(instance.effects!, runner)
    }
  }
}
```



### watchEffct 需要的外部函数 

```js
export function callWithErrorHandling(
  fn: Function,
  instance: ComponentInternalInstance | null,
  type: ErrorTypes,
  args?: unknown[]
) {
  let res
  try {
    res = args ? fn(...args) : fn() // 执行 watchEffect 传进来的函数
  } catch (err) {
    handleError(err, instance, type)
  }
  return res
}
```

```js
export const remove = <T>(arr: T[], el: T) => {
  const i = arr.indexOf(el)
  if (i > -1) {
    arr.splice(i, 1)
  }
}
```

```js
// record effects created during a component's setup() so that they can be
// stopped when the component unmounts
export function recordInstanceBoundEffect(effect: ReactiveEffect) {
  if (currentInstance) {
    ;(currentInstance.effects || (currentInstance.effects = [])).push(effect)
  }
}
```

