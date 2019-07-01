import Vue from 'vue'
import Toast from './main.vue'

// 定义props
const type = ['info', 'success', 'error', 'wran']
const ToastConstructor = Vue.extend(Toast) // 创建toast子类
let requireProps = Object.keys(Toast.props).filter(prop => Toast.props[prop].required) // 必要的props
let toastPlugin = {}
let instances = []
// let initIndex = 0

// 生成toast实例
function generateInstance (options) {
  let instance = new ToastConstructor({
    propsData: options
  }).$mount(document.createElement('div'))

  instance.$once('toastClose', function () {
    // const curInstance = this;
    typeof options.onClose === 'function' && options.onClose()
  })
}

// 创建插件
toastPlugin.install = function (Vue) {
  // 添加vue的实例方法，使组件能通过this.$toast方式调用
  Vue.prototype.$toast = (options = {}) => {
    if (options.type && type.some(item => item === options.type)) {
      throw new Error(`不存在${options.type}类型`)
    }
    if (!requireProps.every(item => options.hasOwnProperty(item))) {
      throw new Error(`prop缺少必需类型`)
    }
    let instance = generateInstance(options)
    instances.push(instance)
  }
}

export default toastPlugin
