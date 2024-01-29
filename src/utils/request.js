import axios from 'axios'
import { ElMessage } from 'element-plus'
import { toEncryption } from './encryption'

const { VITE_BASE_URL } = import.meta.env
const getNewDate = () => String(Math.floor(new Date().valueOf() / 1000))

const service = axios.create({
  baseURL: VITE_BASE_URL,
  timeout: 5000,
})

service.interceptors.request.use(
  (config) => {
    config.headers.token = localStorage.getItem('token')
    config.headers.timestamp = getNewDate()
    config.headers.sign = toEncryption(config.data || config.params || {})
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const { data: res } = response

    if (res?.code !== 200) {
      ElMessage({
        message: res?.message || '请求失败！',
        type: 'error',
      })
      if (res.code === 10008) {
        localStorage.removeItem('user_code')
        localStorage.removeItem('token')
        localStorage.removeItem('user_money')
      }
      return Promise.reject(res)
    }
    return Promise.resolve(res)
  },
  (error) => {
    // ElMessage({
    //   message: '网络错误！',
    //   type: 'error',
    //   duration: 5 * 1000,
    // })
    console.log(error)
  }
)

function request2Get(config) {
  return service({
    ...config,
    method: 'get',
  })
}

function request2Post(config) {
  return service({
    ...config,
    method: 'post',
  })
}

export { request2Get, request2Post }
