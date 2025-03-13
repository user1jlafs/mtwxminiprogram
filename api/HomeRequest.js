import http from '@/utils/request'

// 获取首页数据
export function GetHomeDataRequest() {
  return http.get('/api/home')
}