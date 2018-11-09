import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
import './registerServiceWorker'

// plugins
import './plugins/element'

// style
import 'element-ui/lib/theme-chalk/index.css'
import './stylus/index.styl'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) },
}).$mount('#app')
