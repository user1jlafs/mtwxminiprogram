import http from '@/utils/request'

// 获取所有商品
export function GetAllProductRequest (obj = {}) {
  return http.get('/api/products', { params: obj })
}
// 获取单个商品
export function GetProductRequest (productId) {
  return http.get(`/api/products/${productId}`)
}
// 获取商品规格
export function GetProductSpecsRequest (productId) {
  return http.get(`/api/products/${productId}/specs`)
}
// 获取热门搜索词
export function GetHotSearchRequest (count = '') {
  return http.get(`/api/search/hot-keywords?limit=${count}`)  
}