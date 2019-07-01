import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
let routes = [
  {
    name: 'home',
    path: '/',
    redirect: '/home'
  }
]
const routerContext = require.context('./', true, /index\.js$/)
console.log(routerContext.keys())
routerContext.keys().forEach(route => {
  // 过滤router文件夹根节点下的index.js
  if (route.startsWith('./index')) {
    return 0
  }
  const routerModule = routerContext(route)
  console.log(routerModule)
  routes.push(...(routerModule.default))
})

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
