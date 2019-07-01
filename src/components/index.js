import Vue from 'vue'

// require.context 返回一个require函数
const componentContext = require.context('./global', true, /index\.js$/)
console.log(componentContext.keys())
componentContext.keys().forEach(item => {
  // debugger;
  const component = componentContext(item)
  if (item.indexOf('plugin') === -1) {
    // 普通全局组件
    Vue.component(component)
  } else {
    // 插件式组件
    Vue.use(component)
  }
})
