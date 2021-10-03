import Vue from 'vue'
import md5 from 'js-md5'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Form, Field, Toast, Swipe, SwipeItem } from 'vant'
import 'lib-flexible/flexible'

Vue.use(Button).use(Form).use(Field).use(Toast)
Vue.use(Swipe).use(SwipeItem)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$toast = Toast
Vue.prototype.$md5 = md5
