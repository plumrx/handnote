import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
import mixins from './mixins'

// plugins
import './registerServiceWorker'
import './plugins/element'

// style
import 'element-ui/lib/theme-chalk/index.css'
import './stylus/index.styl'

// mixins
Vue.mixin(mixins)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) },
}).$mount('#app')
