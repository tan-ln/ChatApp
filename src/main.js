import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import App from './App'
import router from './router'
import store from './store'
import animate from 'animate.css'
import '@/assets/styles/lib/font.css'

Vue.use(new VueSocketIO({
  // connection: SocketIO('127.0.0.1:1234') // if installed socket.io-client
  connection: 'http://localhost:1234'
}))
Vue.use(animate)

// 将此值设置为 false ,会关闭 Vue 启动时的提示信息，推荐
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
