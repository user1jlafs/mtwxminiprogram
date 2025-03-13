<template>
  <view class="section-title-box">
    <view class="section-title">
      <text>{{ title }}</text>
    </view>
    <view class="tea-decoration" v-if="decorationType === 'tea'"></view>
    <view class="bubble-decoration" v-if="decorationType === 'bubble'"></view>
  </view>
</template>

<script>
export default {
  name: 'SectionTitle',
  props: {
    title: {
      type: String,
      required: true
    },
    decorationType: {
      type: String,
      default: 'tea', // 'tea' 或 'bubble'
      validator: value => ['tea', 'bubble', 'none'].includes(value)
    }
  }
}
</script>

<style lang="scss">
.section-title-box {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
  position: relative;
}

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #8B5A2B; // 奶茶棕色
  position: relative;
  padding-left: 20rpx;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 6rpx;
    height: 30rpx;
    background-color: #8B5A2B; // 奶茶棕色
    border-radius: 3rpx;
  }
}

.tea-decoration {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 30rpx;
  height: 30rpx;
  background-color: #FFF0E5; // 淡奶茶色
  border-radius: 50%;
  
  &::before {
    content: '';
    position: absolute;
    width: 15rpx;
    height: 6rpx;
    background-color: #C39B77; // 浅奶茶色
    border-radius: 3rpx;
    top: 12rpx;
    left: -10rpx;
  }
}

.bubble-decoration {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  background-color: #FFF0E5; // 淡奶茶色
  opacity: 0.6;
  
  &::before, &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background-color: #FFF0E5; // 淡奶茶色
  }
  
  &::before {
    width: 20rpx;
    height: 20rpx;
    right: -15rpx;
    top: 5rpx;
  }
  
  &::after {
    width: 10rpx;
    height: 10rpx;
    right: -25rpx;
    top: 15rpx;
  }
}
</style>
