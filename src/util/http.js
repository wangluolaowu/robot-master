import axios from 'axios'

let axiosInstance = axios.create({
  // baseURL: 'http://172.16.10.201:8080/',
  // baseURL: 'http://123.126.3.190:12212/',
  // baseURL: 'http://localhost:8090/api/',
  baseURL: 'http://localhost:8080/',
  // baseURL: 'https://bixi-test.cn.isn.corpintra.net/ct',
  // baseURL: 'http://172.16.18.97:8080/',
  headers: {
    // 'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': 'req.headers.origin || *',
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With',
    'Access-Control-Allow-Credentials': 'true',
    'X-Powered-By': '3.2.1',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  }
})
axiosInstance.interceptors.request.use(config => {
  let token = sessionStorage.getItem('token')
  if (token && token !== '') {
    config.headers.Authorization = token
  }
  return config
}, err => {
  return Promise.reject(err.res.data.errorDefaultMessage || err.res.data.errorMessage)
})

axiosInstance.interceptors.response.use(res => {
/* 在此处理请求返回内容 */
  console.log(res)
  // if (res.data.errorCode) {
  //   return Promise.reject(res.data.errorDefaultMessage)
  // }
  // if (!res.data.success) {
  //   return Promise.reject(res.data.errorMessage)
  // }
  let token = res.headers['Authorization']
  if (token && token !== '') {
    sessionStorage.setItem('token', token)
  }
  return res.data
}, err => {
  return Promise.reject(err.res.data.errorDefaultMessage || err.res.data.errorMessage)
})
export default {
  post (url, data = {}) {
    return axiosInstance({
      method: 'post',
      url,
      data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; application/json;charset=UTF-8'
      }
    })
  },
  delete (url, data = {}) {
    return axiosInstance({
      method: 'delete',
      url,
      data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
  },
  get (url, params = {}) {
    return axiosInstance({
      method: 'GET',
      url,
      params // get 请求时带的参数
    })
  }
}
