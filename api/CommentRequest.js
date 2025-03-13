import request from '@/utils/request'

// 添加评价
export function AddCommentRequest (obj) {
  return request.post('/api/reviews', {
    orderId: obj.orderId,
    productId: obj.productId,
    rating: obj.rating,
    content: obj.content
  })
}
// 获取商品评价
export function GetProductCommentRequest (productId) {
  return request.get(`/api/reviews/product/${productId}`)
}
// 获取用户评价
export function GetUserCommentRequest () {
  return request.get('/api/reviews/user')
}
// 修改评价
export function UpdateCommentRequest (reviewId, obj) {
  return request.put(`/api/reviews/${reviewId}`, {
    rating: obj.rating,
    content: obj.content
  })
}
// 删除评价
export function DeleteCommentRequest (reviewId) {
  return request.delete(`/api/reviews/${reviewId}`)
}
// 获取所有评价(管理员)
export function GetAllCommentRequest (page, pageSize, keyword = '') {
  return request.get(`/api/reviews/admin/reviews?page=${page}&limit=${pageSize}&productName=${keyword}`)
}
