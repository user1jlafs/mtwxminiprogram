<template>
  <view class="payment-section">
    <section-title title="支付方式" decoration-type="tea" />
    <view class="payment-option">
      <view class="payment-left">
        <image class="payment-icon" src="/static/wechat-pay.png" mode="aspectFit"></image>
        <text class="payment-name">微信支付</text>
      </view>
      <uni-icons type="right" size="14" color="#999"></uni-icons>
    </view>
  </view>
</template>

<script>
import SectionTitle from './SectionTitle.vue'

export default {
  name: 'PaymentMethod',
  components: {
    SectionTitle
  }
}
</script>

<style lang="scss">
.payment-section {
  background-color: #FFFFFF;
  padding: 30rpx;
  margin: 0 20rpx 20rpx;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.payment-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #F5F5F5;
}

.payment-left {
  display: flex;
  align-items: center;
}

.payment-icon {
  width: 40rpx;
  height: 40rpx;
  margin-right: 15rpx;
}

.payment-name {
  font-size: 28rpx;
  color: #333333;
}
</style>
