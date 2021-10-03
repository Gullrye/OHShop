import axios from 'axios'
import { Toast } from 'vant'
import router from '../router'

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '//47.99.134.126:28019/api/v1' : '//47.99.134.126:28019/api/v1'
// `withCredentials` indicates whether or not cross-site Access-Control requests
axios.defaults.withCredentials = true
// `headers` are custom headers to be sent
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.token = localStorage.getItem('token') || ''
// post 请求时，发送 json 形式的数据包
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use((res) => {
  if (typeof res.data !== 'object') {
    Toast.fail('服务端异常')
    return Promise.reject(res)
  }
  if (res.data.resultCode !== 200) {
    if (res.data.message) Toast.fail(res.data.message)
    if (res.data.resultCode === 416) {
      // 返回 416 代表没有登录状态，路由跳转到/login 页面
      router.push({ path: '/login' })
    }
    return Promise.reject(res.data)
  }
  return res.data
})

export default axios
