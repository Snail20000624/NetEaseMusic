import App from './App'
import store from './store/index.js'


// #ifndef VUE3
import Vue from 'vue'

// 挂载 store
Vue.prototype.$store = store

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App);
  app.use(store);
  return {
    app
  }
}
// #endif