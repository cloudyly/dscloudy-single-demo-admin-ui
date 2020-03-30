import axios from 'axios'
import { Message, Loading } from 'element-ui'
import store from '../store'
import { getToken } from '../permission/token-utils'

const instance = axios.create({
  timeout: 30 * 1000
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.token = `${getToken()}`
    }
    showLoading()
    return config
  },
  error => {
    closeLoading()
    Message.error('请求失败，请刷新页面后重试')
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    closeLoading()
    const respData = response.data
    if (respData && respData.status === 'SUCCESS') {
      return Promise.resolve(respData.responseBody)
    }
    Message({
      message: `${respData.detailMessages}(${respData.errorCode})`,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(response.data)
  },
  error => {
    console.log(JSON.stringify(error))
    closeLoading()
    const { code, message } = error
    if (code === 'ECONNABORTED' || message === 'Network Error') { // 请求超时
      Message({
        message: '请求超时，请稍后重试',
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(error)
    }
    Message({
      // message: error.message,
      message: `${error.response.data.detailMessages}(${error.response.data.errorCode})`,
      type: 'error',
      duration: 3 * 1000
    })
    if (error.response.data.errorCode === 'G0B00003') {
      setTimeout(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload()
        })
      }, 1500)
    }
    return Promise.reject(error)
  }
)

export const createAPI = (url, method, data) => {
  const config = {}
  if (method === 'get') {
    config.params = data
  } else {
    config.data = data || {}
  }
  return instance({
    url,
    method,
    ...config
  })
}

export const get = (url, data) => createAPI(url, 'get', data)
export const post = (url, data) => createAPI(url, 'post', data)
export const put = (url, data) => createAPI(url, 'put', data)
export const del = (url, data) => {
  return createAPI(url, 'delete', data)
}

export const createFormAPI = (url, method, data) => {
  const config = {
    data: data,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  config.responseType = 'json'
  config.transformRequest = [
    function (data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }
  ]
  return instance({
    url,
    method,
    ...config
  })
}
export const createImgAPI = (url, method, data) => {
  const config = {}
  config.data = data
  config.headers = {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  config.responseType = 'blob'
  config.transformRequest = [
    function (data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }
  ]
  return instance({
    url,
    method,
    ...config
  })
}

export function formPost (url, formData, hideErrorMsg) {
  // showLoading()
  return new Promise((resolve, reject) => {
    axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      // closeLoading()
      response = response.data
      if (response && response.status === 'SUCCESS') {
        resolve(response.responseBody)
      } else {
        if (!hideErrorMsg) {
          Message({
            message: `${response.detailMessages}(${response.errorCode})`,
            type: 'error',
            duration: 3 * 1000
          })
        }
      }
    }).catch((error) => {
      // closeLoading()
      if (!hideErrorMsg) {
        Message({
          message: error.message,
          type: 'error',
          duration: 3 * 1000
        })
      }
      reject(error)
    })
  })
}

export function download (url, param) {
  axios({
    method: 'get',
    url: url,
    headers: {
      token: getToken()
    },
    params: param,
    responseType: 'blob'
  }).then(response => {
    if (!response) {
      Message.error('导出失败')
      return
    }
    const blob = new Blob([response.data])
    const url = window.URL.createObjectURL(blob)
    const aLink = document.createElement('a')
    aLink.style.display = 'none'

    const fileName = response.headers['content-disposition'].split('filename=')[1]
    aLink.download = fileName
    aLink.href = url
    document.body.appendChild(aLink)
    aLink.click()
  }).catch(error => {
    Message.error('导出发生异常')
    console.log(error)
  })
}

let loading = null
let needLoadingRequestCount = 0

const startLoading = function () {
  loading = Loading.service({
    lock: true,
    text: '加载中，请稍候...',
    background: 'rgba(0, 0, 0, 0.1)',
    target: document.querySelector('.app-main'),
    customClass: '.hla-loading'
  })
}

const endLoading = function () {
  if (loading) {
    loading.close()
  }
}

const showLoading = function () {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

const closeLoading = function () {
  if (needLoadingRequestCount <= 0) {
    return
  }
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}
