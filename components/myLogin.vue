<template>
  <view class="login-container">
    <view class="header">
      <image class="logo" src="/static/tabbar-picture/coffee-active.png" mode="aspectFit"></image>
      <text class="title">奶茶点单小程序</text>
    </view>
    <view class="login-box">
      <text class="login-title">请登录</text>
      <text class="login-desc">授权微信登录，体验更多功能</text>
      <button class="wx-login-btn" type="primary" @click="wxLogin">微信一键登录</button>
    </view>
  </view>
</template>

<script>
import { SendCodeRequest } from '@/api/WxUserLoginRequest'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      userInfo: null,
    }
  },
  methods: {
    ...mapActions('m_user', ['login']),
    // 获取临时token
    async getTempToken() {
      const [err, res] = await uni.login().catch(err => err)
      const code = res.code
      const resp = await SendCodeRequest(code, this.userInfo)
      uni.$showMsg('登录成功')
      // 更新Vuex中的用户状态
      this.login({
        token: resp.tempToken,
        userInfo: this.userInfo
      })
    },
    // 微信一键登录
    async wxLogin() {
      const [err,res] = await uni.getUserProfile({
        desc: '用于完善用户资料',
      })
      if (err?.errMsg === 'getUserProfile:fail auth deny') {
        uni.$showMsg('您拒绝了授权 !')
        return
      }
      this.userInfo = res.userInfo
      this.getTempToken()
    },
  }
}
</script>

<style lang="scss">
.login-container {
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f8f8;
  
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 60rpx;
    margin-top: 60rpx;
    
    .logo {
      width: 160rpx;
      height: 160rpx;
      margin-bottom: 20rpx;
    }
    
    .title {
      font-size: 36rpx;
      font-weight: bold;
      color: #333;
    }
  }
  
  .login-box {
    width: 100%;
    background-color: #fff;
    border-radius: 20rpx;
    padding: 40rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
    margin-bottom: 40rpx;
    
    .login-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 20rpx;
      display: block;
      text-align: center;
    }
    
    .login-desc {
      font-size: 28rpx;
      color: #666;
      margin-bottom: 60rpx;
      display: block;
      text-align: center;
    }
    
    .wx-login-btn {
      margin-bottom: 30rpx;
      border-radius: 10rpx;
      font-size: 30rpx;
      
      &.outline {
        background-color: #fff;
        color: #07c160;
        border: 1px solid #07c160;
      }
    }

    .phone-input {
      width: 90%;
    }
  }
  
  .result-box {
    width: 100%;
    background-color: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
    
    .result-title {
      font-size: 30rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 20rpx;
      display: block;
    }
    
    .result-content {
      background-color: #f5f5f5;
      padding: 20rpx;
      border-radius: 10rpx;
      font-size: 26rpx;
      color: #666;
      word-break: break-all;
    }
  }
}
</style>