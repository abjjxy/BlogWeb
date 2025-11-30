import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getToken, removeToken } from './auth'
import router from '../router'

// 创建实例
const request = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

// 请求拦截器：添加Token
request.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    ElMessage.error('请求参数错误')
    return Promise.reject(error)
  }
)

// 响应拦截器：处理错误
request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status
    switch (status) {
      case 401:
        removeToken()
        ElMessage.error('登录已过期，请重新登录')
        router.push('/admin/login')
        break
      case 403:
        ElMessage.error('没有权限')
        break
      default:
        ElMessage.error('请求失败')
    }
    return Promise.reject(error)
  }
)

export default request