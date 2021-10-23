import Axios from '../https/axios'
import * as cookieStore from '../https/cookieStore'
import urls from '../https/urls.js'
import * as commonConst from '../const/common'
// import {
//   bootstrop
// } from '../main'

// import router from '../router'
// import storeRouter from '../router/strore-router'

export default class UserService {
  static login(params) {
    return new Promise((resolve, reject) => {
      return Axios.fetchPost(urls.LOGIN, params, true).then(
        (res) => {
          if (res && res.payload.status === commonConst.MSG_TYPE_SUCCESS) {
            window.localStorage.setItem('wms_auth_access_token', res.payload.token)
            window.localStorage.setItem('wms_auth_expires', res.payload.token_expire)
            resolve(res.payload)
          } else {
            reject(res.payload)
          }
        },
        err => {
          reject(err)
        }
      )
    })
  }

  static logout() {
    return new Promise((resolve, reject) => {
      Axios.fetchPostQuery(urls.LOGOUT, null, false).then(
        (res) => {
          if (res && res.payload.status === commonConst.MSG_TYPE_SUCCESS) {
            cookieStore.remove('access_token')
            resolve(res.data)
          } else {
            reject(res.payload)
          }
        },
        err => {
          reject(err)
        }
      )
    })
  }

  static registry(params) {
    return new Promise((resolve, reject) => {
      Axios.fetchPost(urls.REGISTRY, params).then(
        (res) => {
          if (res && res.payload.status === commonConst.MSG_TYPE_SUCCESS) {
            resolve(res)
          } else {
            reject(res.payload)
          }
        },
        err => {
          reject(err)
        }
      )
    })
  }

  static resetPassword(params) {
    return new Promise((resolve, reject) => {
      Axios.fetchPost(urls.RESET_PASSWORD, params).then(
        (res) => {
          if (res && res.payload.status === commonConst.MSG_TYPE_SUCCESS) {
            resolve(res)
          } else {
            reject(res.payload)
          }
        },
        err => {
          reject(err)
        }
      )
    })
  }

  static getUserInfo() {
    return new Promise((resolve, reject) => {
      Axios.fetchGet(urls.PERSONAL_INFO, null).then(
        (res) => {
          if (res && res.payload.status === commonConst.MSG_TYPE_SUCCESS) {
            resolve(res.data)
          } else {
            reject(res.payload)
          }
        },
        err => {
          reject(err)
        }
      )
    })
  }
}
