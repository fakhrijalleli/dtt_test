import Vue from 'vue'
import App from './App.vue'
import Index from '@/router/index'
import Store from '@/store/store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/js/bootstrap.min.js'

Vue.config.productionTip = false
new Vue({
  router: Index,
  store: Store,
  render: h => h(App),
}).$mount('#app')
