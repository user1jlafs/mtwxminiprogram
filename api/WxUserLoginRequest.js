import http from '@/utils/request'

// 发送code获取openid和session_key
export function SendCodeRequest(code, userInfo) {
  return http.post('/api/wx/code2session', {
    code,
    userInfo
   })
}
// 获取微信用户信息
export function GetUserInfoRequest() {
  return http.get('/api/wx/user')
}