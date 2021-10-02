import Axios from 'axios'
import {
  errorCode
} from '@/const/errorCode'
import router from '@/router'
import {
  MSG_TYPE_FAIL,
  MSG_TYPE_SUCCESS
} from '../const/common'
import ElementUI from 'element-ui'
import validate from '@/util/validate'
import baseUrl from '@/config/env'
import LoadingService from '@/services/loadingService'

const axios = Axios.create() // 创建axios实例
axios.defaults.baseURL = ''
axios.defaults.timeout = 3000
// 返回其他状态吗
axios.defaults.validateStatus = function(status) {
  return status >= 200 && status <= 500 // 默认的
}
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8'
// 设置超时时间
axios.defaults.timeout = 60000
// HTTPrequest拦截
axios.interceptors.request.use(
  config => {
    config.url = baseUrl + config.url
    const isToken = (config.headers || {}).isToken === false
    const token = window.localStorage.getItem('wms_auth_access_token')
    const lang = getLang()
    if (token && !isToken) {
      // 请求头插入OAuth 2.0支持
      config.headers.Authorization = token // token
    }
    config.headers['Accept-Language'] = lang
    // headers中配置serialize为true开启序列化
    if (config.method === 'post' && config.headers.serialize) {
      config.data = JSON.stringify(config.data)
      delete config.data.serialize
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// HTTPresponse拦截
axios.interceptors.response.use(
  res => {
    const status = Number(res.status) || 200
    const message =
      res.data.message || errorCode[status] || errorCode.default
    console.log(status)
    if (status === 401) {
      router.push({
        path: '/login'
      })
      ElementUI.Message({
        message: message,
        type: 'error'
      })
      LoadingService.closeLoading && LoadingService.closeLoading()
      return
    }

    if (status !== 200 || (res.data && res.data.code === MSG_TYPE_FAIL)) {
      ElementUI.Message({
        message: message,
        type: 'error'
      })
      return Promise.reject(new Error(message))
    }
    if (
      status === 200 &&
      res.data &&
      res.data.code === MSG_TYPE_SUCCESS &&
      validate.checkNotNull(res.data.message)
    ) {
      ElementUI.Message({
        message: res.data.message,
        type: 'success'
      })
    }
    return res.data
  },
  error => {
    console.log(11)
    return Promise.reject(new Error(error))
  }
)
// 返回一个Promise(发送post请求)
export function fetchPost(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(
        response => {
          resolve(response)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

// 返回一个Promise(发送post请求)
export function fetchPut(url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url, params)
      .then(
        response => {
          resolve(response)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

// 返回一个Promise(发送post请求)
export function fetchDelete(url, params) {
  return new Promise((resolve, reject) => {
    axios.delete(url, params)
      .then(
        response => {
          resolve(response)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

// 返回一个Promise(发送get请求)
export function fetchGet(url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: param
    })
      .then(
        response => {
          resolve(response)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

// 返回一个Promise(发送get请求) 有全局等待框
export function lFetchGet(url, param) {
  const lang = getLang()
  const loadingInstance = ElementUI.Loading.service({
    lock: true,
    text: lang === 'en' ? 'Loading...' : '加载中...'
  })
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: param
    })
      .then(
        response => {
          resolve(response)
          loadingInstance.close()
        },
        err => {
          reject(err)
          loadingInstance.close()
        }
      )
      .catch(error => {
        reject(error)
        loadingInstance.close()
      })
  })
}

// 返回一个Promise(发送post请求，参数在url上)
export function fetchPostQuery(url, params, encode) {
  let query = ''
  if (encode) {
    for (const key in params) {
      query += key + '=' + encodeURIComponent(params[key]) + '&'
    }
  } else {
    for (const key in params) {
      query += key + '=' + params[key] + '&'
    }
  }
  query = query.substr(0, query.length - 1)
  return new Promise((resolve, reject) => {
    axios.post(url + '?' + query, null)
      .then(
        response => {
          resolve(response)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

// 返回一个Promise(发送put请求，参数在url路径上)
export function fetchPutRoute(url, params) {
  let route = ''
  for (const key in params) {
    route += '/' + params[key]
  }
  return new Promise((resolve, reject) => {
    axios.put(url + route, null)
      .then(
        response => {
          resolve(response)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

// 返回一个Promise(发送put请求，参数在url路径上)
export function fetchGetRoute(url, params) {
  let route = ''
  for (const key in params) {
    route += '/' + params[key]
  }
  return new Promise((resolve, reject) => {
    axios.get(url + route)
      .then(
        response => {
          resolve(response)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

// 返回一个Promise(发送put请求，参数在url路径上) 有加载框
export function lFetchGetRoute(url, params) {
  const lang = getLang()
  const loadingInstance = ElementUI.Loading.service({
    lock: true,
    text: lang === 'en' ? 'Loading...' : '加载中...'
  })
  let route = ''
  for (const key in params) {
    route += '/' + params[key]
  }
  return new Promise((resolve, reject) => {
    axios.get(url + route)
      .then(
        response => {
          resolve(response)
          loadingInstance.close()
        },
        err => {
          reject(err)
          loadingInstance.close()
        }
      )
      .catch(error => {
        reject(error)
        loadingInstance.close()
      })
  })
}

// 返回一个Promise(发送put请求，参数在url路径上)
export function fetchDeleteRoute(url, params) {
  let route = ''
  for (const key in params) {
    route += '/' + params[key]
  }
  return new Promise((resolve, reject) => {
    axios.delete(url + route)
      .then(
        response => {
          resolve(response)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

export function uploadFile(url, params) {
  return new Promise((resolve, reject) => {
    const config = {
      timeout: 20000,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    axios.post(url, params, config)
      .then(
        response => {
          resolve(response)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

function getLang() {
  let lang = 'zh'
  if (navigator.cookieEnabled) {
    lang =
      localStorage.getItem('industryLang') || navigator.language.substr(0, 2)
  } else {
    lang = navigator.language.substr(0, 2)
  }
  return lang
}

export default {
  axios,
  fetchPost,
  fetchDelete,
  fetchPut,
  fetchPostQuery,
  fetchGet,
  fetchGetRoute,
  lFetchGet,
  lFetchGetRoute,
  fetchPutRoute,
  fetchDeleteRoute,
  uploadFile
}
