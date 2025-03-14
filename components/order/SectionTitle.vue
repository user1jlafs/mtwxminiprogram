<template>
  <view class="section-title-box">
    <view class="section-title">
      <text>{{ title }}</text>
    </view>
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
</style>
