import Vue from 'vue'
import App from './App.vue'
import store from './store/store.js'
// import './api'

import './components'
import router from './router/index'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
