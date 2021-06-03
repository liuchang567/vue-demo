// axios组件初始化
import axios from 'axios'
import qs from 'qs'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  withCredentials: true, // send cookies when cross-domain requests
  headers: {
  },
  timeout: 50000 // 请求超时时间
})

// http request 拦截器
service.interceptors.request.use(
  config => {
    if (config.data) {
      if (config.data.noLoading) {
        delete config.data.noLoading
        config.noLoading = true
      }
      if (config.data.needStringify) {
        delete config.data.needStringify
        config.data = qs(config.data)
      }
    } else if (config.params && config.params.noLoading) {
      delete config.params.noLoading
      config.noLoading = true
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// http response 拦截器
service.interceptors.response.use(
  response => {
    console.log(response)
    if (!response.config.noLoading) {
    }
    if (response.data instanceof Blob) {
      return Promise.resolve(response.data)
    } else if (response.data instanceof Array) {
      return Promise.resolve(response.data)
    } else if (response.data.code !== 0) {
      const rejection = {
        config: response.config,
        status: response.data.code,
        message: response.data.msg
      }
      console.log('请求错误')
      return Promise.reject(rejection)
    }
    return Promise.resolve(response.data)
  },
  error => {
    if (!error.config.noLoading) {
    }
    if (error.response) {
      if (error.response.status === 403) {
        console.log('请求重定向')
        window.location = 'https://www.bing.com/?FORM=Z9FD1'
      } else if (error.response.data && error.response.data.msg) {
        // Message.error(error.response.data.msg)
      } else {
        // Message.error(error.response.status + ' ' + error.response.statusText)
      }
    } else if (error.message) {
      // Message.error(error.message)
    }
    return Promise.reject(error)
  }
)

export default service