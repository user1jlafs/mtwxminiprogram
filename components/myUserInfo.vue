<template>
  <view class="container">
    <!-- 移除重复的状态栏占位，因为my.vue中已经有了 -->
    
    <!-- 顶部用户信息 -->
    <view class="user-info-section">
      <view class="user-bg">
        <image src="/static/tabbar-picture/coffee-active.png" mode="aspectFill" class="bg-image"></image>
      </view>
      <view class="user-content">
        <view class="avatar-box" @click="navigateTo('/subpkg/user_info/user_info')">
          <image :src="userInfo.avatarUrl" mode="aspectFill" class="avatar"></image>
          <view class="edit-avatar">
            <uni-icons type="camera" size="16" color="#FFFFFF"></uni-icons>
          </view>
        </view>
        <view class="user-detail">
          <view class="username-box">
            <text class="username">{{userInfo.nickName}}</text>
            <view class="edit-profile" @click="navigateTo('/subpkg/user_info/user_info')">
              <text class="edit-text">完善信息</text>
              <uni-icons type="right" size="14" color="#FFFFFF"></uni-icons>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 功能模块 -->
    <view class="function-section">
      <view class="function-row">
        <view class="function-item" @click="goToOrder">
          <view class="function-icon">
            <uni-icons type="list" size="24" color="#8B5A2B"></uni-icons>
          </view>
          <text class="function-text">我的订单</text>
        </view>
        <view class="function-item" @click="navigateTo('/subpkg/wallet/wallet')">
          <view class="function-icon">
            <uni-icons type="wallet" size="24" color="#8B5A2B"></uni-icons>
          </view>
          <text class="function-text">奶茶钱包</text>
        </view>
        <view class="function-item" @click="navigateTo('/subpkg/coupons/coupons')">
          <view class="function-icon badge-icon">
            <uni-icons type="gift" size="24" color="#8B5A2B"></uni-icons>
            <view class="badge" v-if="hasCoupons">{{couponCount}}</view>
          </view>
          <text class="function-text">优惠券</text>
        </view>
        <view class="function-item" @click="navigateTo('/subpkg/membership/membership')">
          <view class="function-icon">
            <uni-icons type="vip" size="24" color="#8B5A2B"></uni-icons>
          </view>
          <text class="function-text">会员中心</text>
        </view>
      </view>
      
      <view class="function-row">
        <view class="function-item" @click="navigateTo('/subpkg/address/address')">
          <view class="function-icon">
            <uni-icons type="location" size="24" color="#8B5A2B"></uni-icons>
          </view>
          <text class="function-text">收货地址</text>
        </view>
        <view class="function-item" @click="navigateTo('/subpkg/settings/settings')">
          <view class="function-icon">
            <uni-icons type="gear" size="24" color="#8B5A2B"></uni-icons>
          </view>
          <text class="function-text">设置</text>
        </view>
        <view class="function-item" @click="navigateTo('/subpkg/help/help')">
          <view class="function-icon">
            <uni-icons type="help" size="24" color="#8B5A2B"></uni-icons>
          </view>
          <text class="function-text">帮助中心</text>
        </view>
        <view class="function-item" @click="handleLogout">
          <view class="function-icon">
            <uni-icons type="close" size="24" color="#8B5A2B"></uni-icons>
          </view>
          <text class="function-text">退出登录</text>
        </view>
      </view>
    </view>
    
    <!-- 我的小幸运 -->
    <view class="lucky-section">
      <view class="section-title">
        <text>我的小幸运</text>
      </view>
      
      <!-- 冲击月奶茶星人 -->
      <view class="coupon-card" @click="navigateTo('/subpkg/ranking/ranking')">
        <view class="coupon-left">
          <view class="coupon-icon">
            <image src="/static/tabbar-picture/coffee-active.png" mode="aspectFit" class="coupon-image"></image>
          </view>
          <view class="coupon-info">
            <text class="coupon-title">冲击月奶茶星人冲榜得奖励</text>
            <view class="progress-bar">
              <view class="progress-inner" :style="{width: progressWidth}"></view>
            </view>
            <text class="progress-text">已达成 {{drinkCount}} 杯</text>
          </view>
        </view>
        <view class="coupon-right">
          <view class="coupon-btn">马上冲榜</view>
        </view>
      </view>
    </view>
    
    <!-- 底部导航占位 -->
    <view class="tabbar-placeholder"></view>
  </view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('m_user', ['userInfo'])
  },
  data() {
    return {
      statusBarHeight: 0,
      hasCoupons: true,
      couponCount: 1,
      drinkCount: 0,
      progressWidth: '10%',
      functionList: [
        { icon: 'list', text: '我的订单', path: '/subpkg/user_info/user_info' },
        { icon: 'wallet', text: '奶茶钱包', path: '/subpkg/wallet/wallet' },
        { icon: 'gift', text: '优惠券', path: '/subpkg/coupons/coupons', badge: 1 },
        { icon: 'vip', text: '会员中心', path: '/subpkg/membership/membership' },
        { icon: 'location', text: '收货地址', path: '/subpkg/address/address' },
        { icon: 'gear', text: '设置', path: '/subpkg/settings/settings' },
        { icon: 'help', text: '帮助中心', path: '/subpkg/help/help' },
        { icon: 'close', text: '退出登录', action: 'logout' }
      ]
    }
  },
  methods: {
    ...mapActions('m_user', ['logout']),
    goToOrder() {
      uni.switchTab({
        url: '/pages/order/order'
      })
    },
    navigateTo(path) {
      uni.navigateTo({
        url: path
      })
    },
    handleLogout() {
      // 显示确认对话框
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            this.logout()
            // 提示用户已退出登录
            uni.showToast({
              title: '已退出登录',
              icon: 'success'
            });
          }
        }
      });
    },
    getUserInfo() {
      // 这里可以添加获取用户信息的逻辑
      // 例如从本地存储或API获取
      const userInfo = uni.getStorageSync('userInfo');
      if (userInfo) {
        this.userInfo = JSON.parse(userInfo);
      }
    }
  },
  onLoad() {
    // 获取状态栏高度
    const systemInfo = uni.getSystemInfoSync();
    this.statusBarHeight = systemInfo.statusBarHeight;
    
    // 获取用户信息
    this.getUserInfo();
  }
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #F8F8F8;
  box-sizing: border-box;
  overflow-x: hidden;
}

/* 用户信息区域 */
.user-info-section {
  position: relative;
  height: 240rpx;
  overflow: hidden;
  border-radius: 0 0 30rpx 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  margin-top: 44px; /* 添加固定的顶部边距，避免被状态栏遮挡 */
}

.user-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.bg-image {
  width: 100%;
  height: 100%;
  filter: blur(2px);
  opacity: 0.8;
  background-color: #8B5A2B;
}

.user-content {
  position: relative;
  display: flex;
  align-items: center;
  padding: 30rpx;
  z-index: 2;
  height: 100%;
  box-sizing: border-box;
}

.avatar-box {
  position: relative;
  width: 140rpx;
  height: 140rpx;
  border-radius: 50%;
  overflow: hidden;
  border: 4rpx solid #FFFFFF;
  margin-right: 30rpx;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 100%;
  height: 100%;
}

.edit-avatar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40rpx;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-detail {
  flex: 1;
  color: #FFFFFF;
}

.username-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16rpx;
}

.username {
  font-size: 36rpx;
  font-weight: bold;
  margin-right: 10rpx;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.edit-profile {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 4rpx 12rpx;
  border-radius: 30rpx;
}

.edit-text {
  font-size: 22rpx;
  margin-right: 4rpx;
}

/* 功能模块 */
.function-section {
  background-color: #FFFFFF;
  border-radius: 20rpx;
  margin: -40rpx 30rpx 30rpx;
  padding: 20rpx;
  position: relative;
  z-index: 10;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.function-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.function-row:last-child {
  margin-bottom: 0;
}
.function-item {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx 0;
  transition: transform 0.2s ease;
}
.function-item:active {
  transform: scale(0.95);
}
.function-icon {
  position: relative;
  width: 80rpx;
  height: 80rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10rpx;
  background-color: #FFF9F0;
  border-radius: 50%;
  transition: all 0.3s ease;
}
.badge {
  position: absolute;
  top: -10rpx;
  right: -10rpx;
  background-color: #ff5252;
  color: #FFFFFF;
  font-size: 20rpx;
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
}
.function-text {
  font-size: 24rpx;
  color: #333333;
  margin-top: 6rpx;
}
/* 我的小幸运 */
.lucky-section {
  margin: 0 30rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  color: #333333;
  display: flex;
  align-items: center;
}

.section-title:before {
  content: '';
  display: inline-block;
  width: 8rpx;
  height: 32rpx;
  background-color: #8B5A2B;
  margin-right: 12rpx;
  border-radius: 4rpx;
}

/* 优惠券卡片 */
.coupon-card {
  background-color: #FFFFFF;
  border-radius: 16rpx;
  padding: 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.coupon-card:active {
  transform: scale(0.98);
}

.coupon-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.coupon-icon {
  width: 80rpx;
  height: 80rpx;
  background-color: #FFF0E6;
  border-radius: 16rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20rpx;
}

.coupon-image {
  width: 60rpx;
  height: 60rpx;
}

.coupon-info {
  flex: 1;
}

.coupon-title {
  font-size: 28rpx;
  color: #333333;
  margin-bottom: 10rpx;
  font-weight: 500;
}

.progress-bar {
  height: 10rpx;
  background-color: #f0f0f0;
  border-radius: 10rpx;
  overflow: hidden;
  margin-bottom: 10rpx;
}

.progress-inner {
  height: 100%;
  background-color: #8B5A2B;
  border-radius: 10rpx;
}

.progress-text {
  font-size: 24rpx;
  color: #999999;
}

.coupon-right {
  margin-left: 20rpx;
}

.coupon-btn {
  background-color: #8B5A2B;
  color: #FFFFFF;
  font-size: 24rpx;
  padding: 10rpx 30rpx;
  border-radius: 30rpx;
  box-shadow: 0 2rpx 6rpx rgba(139, 90, 43, 0.2);
}

/* 奖励卡片 */
.reward-card {
  background-color: #FFFFFF;
  border-radius: 16rpx;
  padding: 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.reward-card:active {
  transform: scale(0.98);
}

.reward-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.reward-icon {
  width: 80rpx;
  height: 80rpx;
  background-color: #FFF0E6;
  border-radius: 16rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20rpx;
}

.reward-image {
  width: 60rpx;
  height: 60rpx;
}

.reward-info {
  flex: 1;
}

.reward-title {
  font-size: 28rpx;
  color: #333333;
  margin-bottom: 6rpx;
  font-weight: 500;
}

.reward-desc {
  font-size: 24rpx;
  color: #999999;
}

/* 底部导航占位 */
.tabbar-placeholder {
  height: 100rpx;
}
</style>
