import Vue from 'vue'
import Vuex from 'vuex'
import { getCart } from '../service/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartCount: 0
  },
  mutations: {
    addCart (state, payload) {
      state.cartCount = payload.count
    }
  },
  actions: {
    async updateCart (ctx) {
      const { data } = await getCart()
      ctx.commit('addCart', {
        count: data.length || 0
      })
    }
  },
  modules: {
  }
})
