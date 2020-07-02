import axios from 'axios'
import store from '@/store'
import JSONBigint from 'json-bigint'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [
    function(data) {
      try {
        return JSONBigint.parse(data)
      } catch (err) {
        return data
      }
    }
  ]
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  err => Promise.reject(err)
)

export default request
