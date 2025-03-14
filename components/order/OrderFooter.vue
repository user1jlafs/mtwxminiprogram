<template>
  <view class="footer">
    <view class="total-price">
      <text class="price-label">应付</text>
      <text class="price-value">¥{{totalPrice}}</text>
    </view>
    <view class="pay-btn" @tap="submitOrder">
      <uni-icons type="wallet" size="16" color="#FFFFFF"></uni-icons>
      <text>去支付</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'OrderFooter',
  props: {
    totalPrice: {
      type: [Number, String],
      required: true
    },
    discount: {
      type: [Number, String],
      default: 0
    }
  },
  methods: {
    submitOrder() {
      this.$emit('submit-order')
    }
  }
}
</script>

<style lang="scss">
.footer {
  position: fixed;
  bottom: 0; // 改为 0，确保贴合屏幕底部
  left: 0;
  width: 100%;
  height: 80rpx; // 适当调整高度
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15rpx 30rpx;
  // 增加安全区域的内边距，适配全面屏手机
  padding-bottom: env(safe-area-inset-bottom);
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  z-index: 100;
}

.total-price {
  align-items: baseline;
  margin-right: 20rpx;
}

.price-label {
  font-size: 28rpx;
  color: #333333;
  margin-right: 10rpx;
}

.price-value {
  font-size: 36rpx;
  font-weight: bold;
  color: #8B5A2B; // 奶茶棕色
}

.pay-btn {
  width: 200rpx;
  height: 70rpx;
  background: #FF6A00; // 鲜明的橙色
  border-radius: 35rpx;
  margin-right: 50rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 10rpx rgba(255, 106, 0, 0.3);
  
  text {
    font-size: 28rpx;
    color: #FFFFFF;
    font-weight: bold;
    margin-left: 8rpx;
  }
}
</style>
