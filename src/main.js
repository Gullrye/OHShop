import Vue from 'vue'
import md5 from 'js-md5'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Form, Field, Toast, Swipe, SwipeItem, Tab, Tabs, List, PullRefresh, GoodsAction, GoodsActionIcon, GoodsActionButton, Badge, SubmitBar, Checkbox, CheckboxGroup, SwipeCell, Stepper, Popup, AddressList, AddressEdit, Card } from 'vant'
import 'lib-flexible/flexible'
import { getRealImg } from './common/js/utils'

Vue.use(Button).use(Form).use(Field).use(Toast).use(Swipe).use(SwipeItem).use(Tab).use(Tabs).use(List).use(PullRefresh).use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton).use(Badge).use(SubmitBar).use(Checkbox).use(CheckboxGroup).use(SwipeCell).use(Stepper).use(Popup).use(AddressList).use(AddressEdit).use(Card)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$toast = Toast
Vue.prototype.$md5 = md5
Vue.prototype.getRealImg = getRealImg
