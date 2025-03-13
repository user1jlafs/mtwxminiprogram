<template>
  <view class="container">
    <view class="status-bar" :style="{height: statusBarHeight + 'px'}"></view>
    <!-- 轮播图 -->
    <swiper class="banner-swiper" circular indicator-dots autoplay :interval="3000" :duration="500" indicator-active-color="#8B5A2B">
      <swiper-item v-for="(item, index) in bannerList" :key="index">
        <image :src="item.imageUrl" mode="aspectFill" class="banner-image"></image>
      </swiper-item>
    </swiper>
    
    <!-- 分类导航 -->
    <scroll-view scroll-x class="category-section" show-scrollbar="false">
      <view @click="switchToOrder" class="category-item" v-for="(item, index) in categoryList" :key="index">
        <image :src="item.image" mode="aspectFill" class="category-icon"></image>
        <text class="category-name">{{item.name}}</text>
      </view>
    </scroll-view>
    
    <!-- 推荐商品 -->
    <view class="recommend-section">
      <view class="section-header">
        <text class="section-title">热门推荐</text>
        <text class="more-text" @click="switchToOrder">更多 ></text>
      </view>
      <scroll-view scroll-x class="recommend-scroll" show-scrollbar="false">
        <view @click="switchToOrder" class="recommend-item" v-for="(item, index) in recommendList" :key="index">
          <image :src="item.image" mode="aspectFill" class="recommend-image"></image>
          <text class="recommend-name">{{item.name}}</text>
          <text class="recommend-desc">{{item.description}}</text>
          <view class="recommend-bottom">
            <text class="recommend-price">¥{{item.price}}</text>
            <view class="add-btn">
              <uni-icons type="plusempty" size="20" color="#FFFFFF"></uni-icons>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    
    <!-- 新品上市 -->
    <view class="special-section">
      <view class="section-header">
        <text class="section-title">新品上市</text>
        <text class="more-text" @click="switchToOrder">更多 ></text>
      </view>
      <view class="special-list">
        <view @click="switchToOrder" class="special-item" v-for="(item, index) in newProducts" :key="index">
          <image :src="item.image" mode="aspectFill" class="special-image"></image>
          <view class="special-info">
            <text class="special-name">{{item.name}}</text>
            <text class="recommend-desc">{{item.description}}</text>
            <view class="special-price-box">
              <text class="special-price">¥{{item.price}}</text>
              <view class="newadd-btn">
                <uni-icons type="plusempty" size="20" color="#FFFFFF"></uni-icons>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { GetHomeDataRequest } from '@/api/HomeRequest'
export default {
  data() {
    return {
      statusBarHeight: 0,
      bannerList: [],
      categoryList: [],
      recommendList: [],
      newProducts: []
    }
  },
  async onLoad() {
    // 获取状态栏高度
    const systemInfo = uni.getSystemInfoSync();
    this.statusBarHeight = systemInfo.statusBarHeight;
    const res = await GetHomeDataRequest()
    this.bannerList = res.data.banners
    this.categoryList = res.data.categories
    this.recommendList = res.data.recommendedProducts
    this.recommendList = res.data.recommendedProducts
    this.newProducts = res.data.newProducts
  },
  methods: {
    switchToOrder() {
      uni.switchTab({
        url: '/pages/product/product'
      })
    }
  }
}
</script>

<style lang="scss">
.container {
  background-color: #F8F8F8;
  min-height: 100vh;
  box-sizing: border-box;
  overflow-x: hidden;
}

.status-bar {
  width: 100%;
  background-color: #FFFFFF;
}

.header {
  display: flex;
  align-items: center;
  padding: 20rpx 30rpx;
  background-color: #FFFFFF;
  position: sticky;
  top: 0;
  z-index: 100;
  box-sizing: border-box;
}

.location {
  display: flex;
  align-items: center;
  margin-right: 20rpx;
}

.location-text {
  font-size: 28rpx;
  color: #333333;
  margin-right: 4rpx;
}

.location-icon {
  font-size: 24rpx;
  color: #666666;
}

.search-bar {
  flex: 1;
  display: flex;
  align-items: center;
  height: 60rpx;
  background-color: #F5F5F5;
  border-radius: 30rpx;
  padding: 0 20rpx;
}

.search-text {
  font-size: 26rpx;
  color: #999999;
  margin-left: 10rpx;
}

.banner-swiper {
  height: 28vh;
  margin: 0 20rpx 20rpx;
  width: calc(100% - 40rpx);
  box-sizing: border-box;
}

.banner-image {
  width: 100%;
  height: 100%;
  border-radius: 10rpx;
}

.category-section {
  display: flex;
  padding: 30rpx 20rpx 40rpx;
  background-color: #FFFFFF;
  margin: -20rpx 20rpx 20rpx;
  border-radius: 20rpx 20rpx 0 0;
  position: relative;
  z-index: 1;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  white-space: nowrap;
  box-sizing: border-box;
  width: calc(100% - 40rpx);
}

.category-item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  width: 140rpx;
  padding: 15rpx 10rpx;
  border-radius: 12rpx;
  transition: all 0.3s ease;
  margin-right: 15rpx;
}

.category-item:active {
  transform: scale(0.95);
  background-color: #FFF9F0;
}

.category-icon {
  width: 90rpx;
  height: 90rpx;
  border-radius: 50%;
  margin-bottom: 16rpx;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.category-item:active .category-icon {
  transform: translateY(-5rpx);
}

.category-name {
  font-size: 26rpx;
  color: #333333;
  font-weight: 500;
  margin-top: 5rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 30rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #8B5A2B;
  position: relative;
  padding-left: 20rpx;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 8rpx;
  height: 30rpx;
  background-color: #8B5A2B;
  border-radius: 4rpx;
}

.more-text {
  font-size: 24rpx;
  color: #999999;
}

.recommend-section, .special-section {
  background-color: #FFFFFF;
  margin: 0 20rpx 20rpx;
  border-radius: 20rpx;
  padding-bottom: 20rpx;
  width: calc(100% - 40rpx);
  box-sizing: border-box;
}

.recommend-scroll, .special-scroll {
  white-space: nowrap;
  padding: 0 20rpx;
  box-sizing: border-box;
  width: 100%;
}

.recommend-item {
  display: inline-block;
  width: 280rpx;
  margin-right: 20rpx;
  background-color: #FFF9F0;
  border-radius: 15rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.recommend-image {
  width: 280rpx;
  height: 280rpx;
  border-radius: 15rpx 15rpx 0 0;
}

.recommend-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #333333;
  margin: 10rpx 15rpx 5rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}

.recommend-desc {
  font-size: 22rpx;
  color: #999999;
  margin: 0 15rpx 10rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}

.recommend-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 15rpx 15rpx;
}

.recommend-price {
  font-size: 30rpx;
  font-weight: bold;
  color: #E57373;
}

.add-btn {
  width: 50rpx;
  height: 50rpx;
  background-color: #8B5A2B;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.newadd-btn {
  width: 50rpx;
  height: 50rpx;
  background-color: #8B5A2B;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.2);
}

.newadd-btn:active {
  transform: scale(0.9);
  background-color: #7A4A1D;
}

.special-list {
  padding: 0 20rpx;
}

.special-item {
  display: flex;
  width: 100%;
  height: 180rpx;
  margin-bottom: 20rpx;
  background-color: #FFF9F0;
  border-radius: 15rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.special-image {
  width: 180rpx;
  height: 180rpx;
  object-fit: cover;
}

.special-info {
  flex: 1;
  padding: 15rpx 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.special-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #333333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.special-price-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10rpx;
  width: 100%;
}

.special-price {
  font-size: 32rpx;
  font-weight: bold;
  color: #E57373;
  margin-right: 10rpx;
}

.original-price {
  font-size: 24rpx;
  color: #999999;
  text-decoration: line-through;
}
</style>