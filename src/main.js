// 导入js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import storeRouter from './router/strore-router'
import './plugins/element.js'
import Meta from 'vue-meta'

// 导入样式
import './assets/css/global.css'
import 'element-ui/lib/theme-chalk/display.css'
import 'font-awesome/css/font-awesome.css'
import 'element-ui/lib/theme-chalk/base.css'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition' // element内置动画
import store from './store'
import ElementUI from 'element-ui'
import VueClipboard from 'vue-clipboard2'

Vue.prototype.$handleResError = function(res) {
  if (!res) this.$message.error('Connection Failed...')
  else if (res.data.status !== 403) this.$message.error(res.data.message)
  else {
    this.$message.error('Authentication error, please login again')
    window.localStorage.clear()
    window.location.reload()
  }
}

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component(CollapseTransition.name, CollapseTransition)

Vue.use(Meta)
Vue.use(VueClipboard)

export function bootstrop(role = localStorage.role) {
  console.log('chonzhi', role)
  const _rooter = role === 'SELLER' ? router : storeRouter
  new Vue({
    router: _rooter,
    store,
    render: h => h(App)
  }).$mount('#app')
}

console.log(localStorage.role)
bootstrop()
