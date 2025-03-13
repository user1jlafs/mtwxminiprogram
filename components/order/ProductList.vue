<template>
  <view class="product-section">
    <view class="section-header">
      <section-title title="已选商品" decoration-type="bubble" />
    </view>
    <view class="product-list">
      <view class="product-item" v-for="(item, index) in products" :key="index">
        <image class="product-image" :src="item.image" mode="aspectFill"></image>
        <view class="product-info">
          <view class="product-name-box">
            <text class="product-name">{{item.name}}</text>
            <view class="product-special" v-if="item.isSpecial">
              <text>特惠价</text>
            </view>
          </view>
          <text class="product-spec">{{item.specification}}</text>
          <view class="product-price-box">
            <text class="product-price">¥{{item.price}}</text>
            <text class="product-original" v-if="item.originalPrice">¥{{item.originalPrice}}</text>
            <text class="product-count">x{{item.count}}</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 备注特殊要求 -->
    <view class="remark-section">
      <view class="remark-header" @tap="showRemarkPopup">
        <view class="remark-left">
          <uni-icons type="compose" size="16" color="#8B5A2B"></uni-icons>
          <text>备注特殊要求</text>
        </view>
        <uni-icons type="right" size="14" color="#C39B77"></uni-icons>
      </view>
    </view>
    
    <!-- 温馨提示 -->
    <view class="tips-section">
      <view class="tips-icon">
        <uni-icons type="info" size="16" color="#C39B77"></uni-icons>
      </view>
      <text class="tips-text">温馨提示：建议收到高温量，社交距离，本店仅支持电子支付，订单完成后可前往发票管理中开具。</text>
    </view>
  </view>
</template>

<script>
import SectionTitle from './SectionTitle.vue'

export default {
  name: 'ProductList',
  components: {
    SectionTitle
  },
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  methods: {
    showRemarkPopup() {
      this.$emit('show-remark-popup')
    }
  }
}
</script>

<style lang="scss">
.product-section {
  background-color: #FFFFFF;
  padding: 30rpx;
  margin: 0 20rpx 20rpx;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
  position: relative;
}

.product-list {
  margin-bottom: 30rpx;
}

.product-item {
  display: flex;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #F5F5F5;
}

.product-image {
  width: 120rpx;
  height: 120rpx;
  border-radius: 12rpx;
  margin-right: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-name-box {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.product-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #333333;
  margin-right: 10rpx;
}

.product-special {
  background-color: #FFF0E5; // 淡奶茶色
  padding: 4rpx 10rpx;
  border-radius: 6rpx;
}

.product-special text {
  font-size: 20rpx;
  color: #E6A23C; // 奶茶黄色
}

.product-spec {
  font-size: 24rpx;
  color: #999999;
  margin-bottom: 10rpx;
  line-height: 1.4;
}

.product-price-box {
  display: flex;
  align-items: center;
}

.product-price {
  font-size: 28rpx;
  font-weight: bold;
  color: #8B5A2B; // 奶茶棕色
  margin-right: 10rpx;
}

.product-original {
  font-size: 24rpx;
  color: #999999;
  text-decoration: line-through;
  margin-right: 10rpx;
}

.product-count {
  font-size: 24rpx;
  color: #999999;
  margin-left: auto;
}

/* 备注区域 */
.remark-section {
  padding: 20rpx 0;
  border-top: 1rpx dashed #EEEEEE;
  border-bottom: 1rpx dashed #EEEEEE;
  margin-bottom: 20rpx;
}

.remark-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.remark-left {
  display: flex;
  align-items: center;
  
  text {
    font-size: 28rpx;
    color: #333333;
    margin-left: 8rpx;
  }
}

/* 温馨提示 */
.tips-section {
  display: flex;
  background-color: #FFF8F0; // 奶茶背景色
  padding: 15rpx;
  border-radius: 10rpx;
  align-items: flex-start;
}

.tips-icon {
  margin-right: 8rpx;
  margin-top: 4rpx;
}

.tips-text {
  font-size: 24rpx;
  color: #C39B77; // 浅奶茶色
  line-height: 1.5;
  flex: 1;
}
</style>
