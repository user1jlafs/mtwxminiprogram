<template>
  <view class="pickup-section">
    <section-title title="取餐方式" decoration-type="tea" />
    <view class="pickup-options">
      <view class="pickup-option" :class="{active: dineMethod === 'store'}" @tap="selectDineMethod('store')">
        <view class="option-icon">
          <view class="option-circle" :class="{active: dineMethod === 'store'}"></view>
        </view>
        <text class="option-text">店内用餐</text>
      </view>
      <view class="pickup-option" :class="{active: dineMethod === 'takeout'}" @tap="selectDineMethod('takeout')">
        <view class="option-icon">
          <view class="option-circle" :class="{active: dineMethod === 'takeout'}"></view>
        </view>
        <text class="option-text">自提带走</text>
      </view>
    </view>
  </view>
</template>

<script>
import SectionTitle from './SectionTitle.vue'

export default {
  name: 'PickupMethod',
  components: {
    SectionTitle
  },
  props: {
    dineMethod: {
      type: String,
      required: true
    }
  },
  methods: {
    selectDineMethod(method) {
      this.$emit('update:dineMethod', method)
    }
  }
}
</script>

<style lang="scss">
.pickup-section {
  background-color: #FFFFFF;
  padding: 30rpx;
  margin: 0 20rpx 20rpx;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.pickup-options {
  display: flex;
  margin-top: 20rpx;
}

.pickup-option {
  display: flex;
  align-items: center;
  margin-right: 40rpx;
}

.option-icon {
  width: 40rpx;
  height: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10rpx;
}

.option-circle {
  width: 30rpx;
  height: 30rpx;
  border-radius: 50%;
  border: 2rpx solid #CCCCCC;
  display: flex;
  align-items: center;
  justify-content: center;
}

.option-circle.active {
  border-color: #8B5A2B; // 奶茶棕色
}

.option-circle.active::after {
  content: '';
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background-color: #8B5A2B; // 奶茶棕色
}

.option-text {
  font-size: 28rpx;
  color: #333333;
}
</style>
