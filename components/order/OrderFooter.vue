<template>
  <view class="footer">
    <view class="total-price">
      <text class="price-label">应付</text>
      <text class="price-value">¥{{totalPrice}}</text>
    </view>
    <view class="total-detail">
      <uni-icons type="gift" size="14" color="#C39B77"></uni-icons>
      <text>总计优惠 ¥{{discount}}</text>
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
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100rpx;
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  padding: 0 30rpx;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  z-index: 100;
}

.total-price {
  display: flex;
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

.total-detail {
  display: flex;
  align-items: center;
  font-size: 24rpx;
  color: #999999;
  flex: 1;
  
  text {
    margin-left: 6rpx;
  }
}

.pay-btn {
  width: 200rpx;
  height: 70rpx;
  background: linear-gradient(to right, #C39B77, #8B5A2B); // 奶茶渐变色
  border-radius: 35rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 10rpx rgba(139, 90, 43, 0.3);
  
  text {
    font-size: 28rpx;
    color: #FFFFFF;
    font-weight: bold;
    margin-left: 8rpx;
  }
}
</style>
