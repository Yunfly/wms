import Vue from 'vue'
import Vuex from 'vuex'
import states_hash from '@/util/states_hash.json'

import noPage from './noPage'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    menu: '',
    role: '',
    api: '',
    userInfo: {},
    states: Object.values(states_hash).map((x) => {
      return {
        value: x,
        label: x
      }
    })
  },
  mutations: {
    changeMenuPath(state, data) {
      state.menu = data
    },
    setRole(state, data) {
      // localStorage.role = data
      state.role = data
    },
    setApi(state, data) {
      state.api = data
    },
    setUserInfo(state, data) {
      state.userInfo = data
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
    },
    getUserInfo(state) {
      return state.userInfo
    }
  }
})
