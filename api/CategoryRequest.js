import http from '@/utils/request'

// 获取所有分类列表
export function GetAllCategoryListRequest () {
  return http.get('/api/categories')
}
// 获取单个分类列表
export function GetCategoryListRequest (categoryId) {
  return http.get(`/api/categories/${categoryId}`)
}
// 创建分类(管理员)
export function CreateCategoryRequest (name, description) {
  return http.post('/api/categories', {
    name,
    description
  })
}
// 更新分类(管理员)
export function UpdateCategoryRequest (categoryId, name, description) {
  return http.put(`/api/categories/${categoryId}`, {
    name,
    description
  })
}
// 删除分类(管理员)
export function DeleteCategoryRequest (categoryId) {
  return http.delete(`/api/categories/${categoryId}`)
}
