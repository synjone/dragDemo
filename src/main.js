import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import './editor.css'
import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

window.data = store.state