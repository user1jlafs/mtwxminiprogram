import request from '@/utils/request'

// 创建订单
export function CreateOrderRequest (obj) {
  return request.post('/api/orders', obj)
}
// 获取用户订单列表
export function GetUserOrderListRequest () {
  return request.get('/api/orders')
}
// 获取订单详情
export function GetUserOrderDetailRequest (orderId) {
  return request.get(`/api/orders/${orderId}`)
}
// 取消订单
export function CancelOrderRequest (orderId) {
  return request.put(`/api/orders/${orderId}/cancel`)
}
// 支付订单
export function PayOrderRequest (orderId) {
  return request.put(`/api/orders/${orderId}/pay`)
}
// 确认收货
export function ConfirmOrderRequest (orderId) {
  return request.put(`/api/orders/${orderId}/receive`)
}
// 管理员获取所有订单
export function GetAllOrderListRequest (obj) {
  return request.get('/api/orders/admin/all', { params: obj })
}
// 管理员更新订单状态
export function UpdateOrderStatusRequest (orderId, status) {
  return request.put(`/api/orders/admin/${orderId}/status`, { status })
}
// 管理员删除订单
export function DeleteOrderRequest (orderId) {
  return request.delete(`/api/orders/admin/${orderId}`)
}
