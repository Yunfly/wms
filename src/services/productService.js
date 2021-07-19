import Axios from '../https/axios'
import * as commonConst from '../const/common'

export default class ProductService {
  static getListData(params) {
    return new Promise((resolve, reject) => {
      Axios.fetchGet('/item/get', params, true).then(
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

  static addItem(params) {
    return new Promise((resolve, reject) => {
      Axios.fetchPost('/item/add', params, true).then(
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

  static deleteItem(params) {
    return new Promise((resolve, reject) => {
      Axios.axios('/item/del', {
        params,
        method: 'DELETE'
      }).then(
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

  static updateItem(data) {
    return new Promise((resolve, reject) => {
      Axios.axios('/item/update', {
        data,
        method: 'PUT'
      }).then(
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
};
