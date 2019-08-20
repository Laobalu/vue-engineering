import axios from 'axios'
import router from '../router'
import Toast from '../components/global/plugin-toast'

const service = axios.create({
  timeout: 10000, // 超时时间
  baseURL: process.env.BASE_URL, // 将自动加在url前面
  headers: {} // 请求头
})

// 请求前拦截
service.interceptors.requset.use(config => {
  // http auth登录验证的一种方式，不安全也不常用，现在一般都用cookie session登录验证
  // token 验证，用户登录后会生成token，传给客户端保存在storage，请求发送时将token代入请求头，服务端验证过期
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, error => Promise.reject(error))

// 响应拦截
service.interceptors.response.use(response => {
  const responseCode = response.status
  if (responseCode === 200) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}, error => {
  const responseCode = error.response.status
  switch (responseCode) {
    // 登录过期
    case 401:
      router.replace({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
      break
      // 403: token过期
    case 403:
      Toast({
        type: 'error',
        content: 'token过期！'
      })
      localStorage.removeItem('token')
      setTimeout(() => {
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      }, 1000)
      break
    case 404:
      Toast({
        type: 'error',
        content: '网络请求不存在！'
      })
      break
    default:
      console.error(error)
      Toast({
        type: 'error',
        content: '其他错误'
      })
      break
  }
  return Promise.reject(error)
})

export default service
