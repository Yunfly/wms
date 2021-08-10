import Vue from 'vue'
import Vuex from 'vuex'

import noPage from './noPage'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    menu: '',
    role: '',
    api: ''
  },
  mutations: {
    changeMenuPath(state, data) {
      state.menu = data
    },
    setRole(state, data) {
      state.role = data
    },
    setApi(state, data) {
      state.api = data
    }
  },
  actions: {},
  modules: {
    noPage
  },
  getters: {
    getMenuPath(state) {
      return state.menu
    },
    getRole(state) {
      return state.role
    },
    getApi(state) {
      return state.api
    }
  }
})
