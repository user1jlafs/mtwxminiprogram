import http from '@/utils/request'

// 获取所有分类列表
export function GetAllCategoryListRequest (page = 1, pageSize = 999) {
  return http.get(`/api/categories?page=${page}&pageSize=${pageSize}`)
}
