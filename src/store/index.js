import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const api = 'http://localhost:5000'
const api = 'http://kealine.top/highway/data'

export default new Vuex.Store({
  state: {
    api: api,
    page: null
  },
  mutations: {
    savePage (state, page) {
      state.page = page
    },
  },
  actions: {
  },
  modules: {
  }
})
