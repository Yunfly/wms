import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    menu: '',
    role: ''
  },
  mutations: {
    changeMenuPath(state, data) {
      state.menu = data
    },
    setRole(state, data) {
      state.role = data
    }
  },
  actions: {},
  modules: {},
  getters: {
    getMenuPath(state) {
      return state.menu
    },
    getRole(state) {
      return state.role
    }
  }
})
