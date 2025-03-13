import Request from 'luch-request'
const http = new Request()

// 全局配置
http.setConfig((config) => { /* config 为默认全局配置*/
    config.baseURL = 'http://localhost:3000' /* 根域名 */
    config.timeout = 5000
    return config
})

// 请求拦截
http.interceptors.request.use(config => {
  config.header['Authorization'] = uni.getStorageSync('token')
  return config
}, config => {
  console.error('请求错误：', config)
  return Promise.reject(config)
});

// 响应拦截
http.interceptors.response.use(res => {
  if (res.statusCode !== 200) throw new Error('请求失败')
  return res.data
}, error => {
  // 处理响应错误
  console.error('响应错误：', error)
  return Promise.reject(error)
})

export default http