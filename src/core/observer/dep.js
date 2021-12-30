/* @flow */

import type Watcher from './watcher'
import { remove } from '../util/index'
import config from '../config'

let uid = 0

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 *
 * dep是一个有多个订阅指令的可观察对象
 */

// dep和watcher是多对多的关系
// 每个属性都有自己的dep
export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;  //这个是存放watcher的容器

  constructor () {
    this.id = uid++
    this.subs = []
  }

  // 添加订阅对象
  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  // 移除订阅对象
  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

  // 收集依赖
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  // 触发更新
  // 循环触发订阅者里面所有的实例的update方法
  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort((a, b) => a.id - b.id)
    }
    console.warn('=========== 数据变更触发通知，输出该属性相关的watchers ===========', subs)
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.

// 同一时间只有一个watcher被执行
// 默认Dep.target为null
Dep.target = null
const targetStack = []

// 在组件渲染过程中vue实例绑定的watcher被设置为Dep，为之后dep.depend准确收集watcher
export function pushTarget (target: ?Watcher) {
  targetStack.push(target)
  Dep.target = target
}

export function popTarget () {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}
