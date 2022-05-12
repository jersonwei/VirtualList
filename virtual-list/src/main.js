import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VituralScroll from '@/plugins'
Vue.config.productionTip = false

// 全局挂载插件
Vue.use(VituralScroll)
// vue原型全局挂载axios
Vue.prototype.$axios = axios
new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
