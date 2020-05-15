---
date: '2020-05-14'
slug: vue
tag:
- Vue

title: Vue3.0 effect 源码解析
description: Vue3.0 effect 源码解析
author: 夜深_静悟
location: 东莞
image: 'https://api.bearcub.club/tag/husky.jpg'
meta:
  - name: title
    content: Vue3.0 effect 源码解析

  - name: description
    content: Vue3.0 effect 源码解析

  - name: keywords
    content: Vue3.0

  - name: author
    content: 夜深_静悟

  - name: language
    content: Chinese
---

## effect 副作用

effect.ts 维护 **targetMap**

注：想要更好了解 effect，可以配合 computed ，computed 是基于 effect 扩展的

```js
type Dep = Set<ReactiveEffect>
type KeyToDepMap = Map<any, Dep>
const targetMap = new WeakMap<any, KeyToDepMap>()
```

effect 两个类型接口

```js
export interface ReactiveEffect<T = any> {
  (): T
  _isEffect: true
  active: boolean
  raw: () => T
  deps: Array<Dep>
  options: ReactiveEffectOptions
}

export interface ReactiveEffectOptions {
  lazy?: boolean
  computed?: boolean
  scheduler?: (job: () => void) => void
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
  onStop?: () => void
}
```



### effect 

```js
export function effect<T = any>(
  fn: () => T,
  options: ReactiveEffectOptions = EMPTY_OBJ
): ReactiveEffect<T> {
  if (isEffect(fn)) {
    fn = fn.raw
  }
  const effect = createReactiveEffect(fn, options)
  if (!options.lazy) {  // 默认调用一次
    effect()
  }
  return effect
}
```



```js
const effectStack: ReactiveEffect[] = [] // 仅在 createReactiveEffect 中使用
let activeEffect: ReactiveEffect | undefined
```



### createReactiveEffect

这个函数的作用：给 effect 函数挂载属性 

```js
let uid = 0

function createReactiveEffect<T = any>(
  fn: (...args: any[]) => T,
  options: ReactiveEffectOptions
): ReactiveEffect<T> {
  const effect = function reactiveEffect(...args: unknown[]): unknown {
    if (!effect.active) {
      return options.scheduler ? undefined : fn(...args)
    }
      
    if (!effectStack.includes(effect)) { 
      cleanup(effect) 
        
      try {
        enableTracking()
        effectStack.push(effect)
        activeEffect = effect
        return fn(...args) 
        // fn() 中可能会触发trace、trigger，刚好使用 activeEffect
        // 如 fn() 中操作响应式数据(reactive、ref) 的 get、set -> 触发trace、trigger
          
      } finally {
        effectStack.pop()
        resetTracking()
        activeEffect = effectStack[effectStack.length - 1] // activeEffect == undefined
      }
    }
  } as ReactiveEffect
  
  effect.id = uid++
  effect._isEffect = true
  effect.active = true
  effect.raw = fn
  effect.deps = []
  effect.options = options

  return effect
}
```

effect 是个函数，挂在了上面几个属性，effect 会在 trigger 中的 run() 中执行，执行的结果就是上面的
return fn(...args)，即 fn() 中返回的数据



<br>

## trace

```js
export function track(target: object, type: TrackOpTypes, key: unknown) {
  if (!shouldTrack || activeEffect === undefined) {
    return
  }
  
  let depsMap = targetMap.get(target) // 寻找 target
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map())) // 形成 targetMap: { target: depsMap }
  }
    
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set())) // 形成 target: { key: dep }
  }
    
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)       // 添加副作用 该副作用有唯一id
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

trace 的作用：形成如下的结构
  targetMap: {
     target: {
       key: dep
     }
  }

  targetMap: new WeakMap()
  target: new Map()
  dep: new Set()
```



## trigger

```js
export function trigger(
  target: object,
  type: TriggerOpTypes,
  key?: unknown,
  newValue?: unknown,
  oldValue?: unknown,
  oldTarget?: Map<unknown, unknown> | Set<unknown>
) {
  const depsMap = targetMap.get(target) // key: dep 
  if (!depsMap) {
    // never been tracked
    return
  }

  const effects = new Set<ReactiveEffect>()
  const computedRunners = new Set<ReactiveEffect>()
  
  const add = (effectsToAdd: Set<ReactiveEffect> | undefined) => {
    if (effectsToAdd) {
      effectsToAdd.forEach(effect => {
        if (effect !== activeEffect || !shouldTrack) {
          if (effect.options.computed) {
            computedRunners.add(effect)
          } else {
            effects.add(effect) // effects 添加副作用
          }
        } else {
          // the effect mutated its own dependency during its execution.
          // this can be caused by operations like foo.value++
          // do not trigger or we end in an infinite loop
        }
      })
    }
  }

  if (type === TriggerOpTypes.CLEAR) {
    // collection being cleared
    // trigger all effects for target
    depsMap.forEach(add)
  } else if (key === 'length' && isArray(target)) {
    depsMap.forEach((dep, key) => {
      if (key === 'length' || key >= (newValue as number)) {
        add(dep)
      }
    })
  } else {
    // schedule runs for SET | ADD | DELETE
    if (key !== void 0) {
      add(depsMap.get(key)) // dep: {} 提取副作用
    }
    // also run for iteration key on ADD | DELETE | Map.SET
    const isAddOrDelete =
      type === TriggerOpTypes.ADD ||
      (type === TriggerOpTypes.DELETE && !isArray(target))
    if (
      isAddOrDelete ||
      (type === TriggerOpTypes.SET && target instanceof Map)
    ) {
      add(depsMap.get(isArray(target) ? 'length' : ITERATE_KEY))
    }
    if (isAddOrDelete && target instanceof Map) {
      add(depsMap.get(MAP_KEY_ITERATE_KEY))
    }
  }

  const run = (effect: ReactiveEffect) => {
    if (__DEV__ && effect.options.onTrigger) {
      effect.options.onTrigger({
        effect,
        target,
        key,
        type,
        newValue,
        oldValue,
        oldTarget
      })
    }
    if (effect.options.scheduler) {
      effect.options.scheduler(effect)
    } else {
      effect() // 执行副作用
    }
  }

  // Important: computed effects must be run first so that computed getters
  // can be invalidated before any normal effects that depend on them are run.
  computedRunners.forEach(run)
  effects.forEach(run) // 将副作用放在 run 中执行
}
```



## cleanup

```js
function cleanup(effect) {
    const { deps } = effect
    if (deps.length) {
        for (let i = 0; i < deps.length; i++) {
            deps[i].delete(effect)
        }
        deps.length = 0
    }
}
```

**cleanup() 在 createReactiveEffect 的用处：**

```js
it('should not be triggered by mutating a property, which is used in an inactive branch', () => {
  let dummy
  const obj = reactive({ prop: 'value', run: true })

  const conditionalSpy = jest.fn(() => {
    dummy = obj.run ? obj.prop : 'other'
  })
  effect(conditionalSpy)

  expect(dummy).toBe('value')
  expect(conditionalSpy).toHaveBeenCalledTimes(1)
  obj.run = false
  expect(dummy).toBe('other')
  expect(conditionalSpy).toHaveBeenCalledTimes(2)
  obj.prop = 'value2'
  expect(dummy).toBe('other')
  expect(conditionalSpy).toHaveBeenCalledTimes(2)
})

因为监听函数中，可能会由于 if 等条件判断语句导致的副作用数据不同。所以每次执行函数时，都要重新更新一次副作用。
```



## 副作用是什么？

副作用是一个**函数**（createReactiveEffect 函数中返回的、包装过的 effect）。响应式对象数据**更新**时，就会触发 trigger 函数，就会执行该对象的副作用(函数)。 computed、watchEffect 就是基于这样的原理，当数据更新时，computed、watchEffect 能捕捉到。



## 总结

effect 形成**副作用**(函数)，trace 形成**收集副作用的结构**，trigger **执行副作用**。

