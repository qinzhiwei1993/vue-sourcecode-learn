/* @flow */

import { mergeOptions } from '../util/index'

// 全局混入，会影响所有新建的实例
export function initMixin (Vue: GlobalAPI) {
  Vue.mixin = function (mixin: Object) {
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}
