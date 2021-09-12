import Axios from '@/https/axios'

/*
 * 过滤对象中空值
 * */
export function filterObject(obj) {
  const arr = Object.keys(obj)
  const res = {}
  arr.forEach(e => {
    if (obj[e] || obj[e] === 0) {
      res[e] = obj[e]
    }
  })
  return res
}

const state = {
  useName: 'sam',
  api: '',
  dataSource: [],
  pagination: {
    current: 1,
    size: 10
  },
  pageTotal: null,
  filters: {},
  loading: false
}
const mutations = {
  change_name(state, anotherName) {
    state.useName = anotherName
  },
  setApi(state, data) {
    state.api = data
  },
  setLoading(state, data) {
    state.loading = data
  },
  setDataSourece(state, data) {
    state.dataSource = data
  },
  updateFilters(state, data) {
    state.filters = data
  },
  updateStates(state, payload) {
    const item = {
      ...state,
      ...payload
    }
    Object.keys(item).forEach(x => {
      state[x] = item[x]
    })
  }
}
const actions = {
  changeName({
    commit,
    rootState
  }, anotherName) {
    if (rootState.job === 'web') {
      commit('change_name', anotherName)
    }
  },
  async init(ctx, playload = {}) {
    const {
      current,
      size
    } = ctx.state.pagination

    ctx.commit('setLoading', true)
    try {
      const res = await Axios.fetchGet(ctx.state.api, filterObject({
        ...playload,
        ...ctx.state.filters,
        current,
        size
      }))

      ctx.commit('updateStates', {
        dataSource: res.data.content || res.data.records,
        pagination: {
          ...ctx.state.pagination
        },
        pageTotal: res.data.totalElements || res.data.total

      })
    } catch (error) {

    }

    ctx.commit('setLoading', false)
  }
}
const getters = {
  localJobTitle(state, getters, rootState, rootGetters) {
    return rootGetters.jobTitle + ' aka ' + rootState.job
  },
  getApi(state) {
    return state.api
  }
}
// namespaced 属性，限定命名空间
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
