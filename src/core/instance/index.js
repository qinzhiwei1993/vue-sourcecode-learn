import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

// 通过混入的方式将各种方法放到Vue.prototype上 进行代码分割

// 初始化
initMixin(Vue)
// 状态、数据
stateMixin(Vue)
// 事件
eventsMixin(Vue)
// 生命周期
lifecycleMixin(Vue)
// 渲染
renderMixin(Vue)

export default Vue
