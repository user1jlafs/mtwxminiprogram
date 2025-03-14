import request from '@/utils/request'

// 创建订单
export function CreateOrderRequest (obj) {
  return request.post('/api/orders', obj)
}
// 获取用户订单列表
export function GetUserOrderListRequest (status = '') {
  return request.get(`/api/orders?status=${status}`)
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
