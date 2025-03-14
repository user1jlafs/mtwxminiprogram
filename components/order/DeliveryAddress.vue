<template>
  <view class="address-section" @tap="chooseAddress">
    <section-title title="收货地址" decoration-type="tea" />
    
    <!-- 显示已选择的地址 -->
    <view class="address-display" v-if="address">
      <view class="address-info">
        <view class="user-info">
          <text class="name">{{address.userName}}</text>
          <text class="phone">{{address.telNumber}}</text>
        </view>
        <view class="address-detail">
          <uni-icons type="location" size="16" color="#8B5A2B"></uni-icons>
          <text>{{address.provinceName}}{{address.cityName}}{{address.countyName}}{{address.detailInfo}}</text>
        </view>
      </view>
      <uni-icons type="right" size="16" color="#C39B77"></uni-icons>
    </view>
    
    <!-- 未选择地址时显示提示 -->
    <view class="no-address" v-else>
      <uni-icons type="location" size="24" color="#C39B77"></uni-icons>
      <text>点击选择收货地址</text>
      <uni-icons type="right" size="16" color="#C39B77"></uni-icons>
    </view>
  </view>
</template>

<script>
import SectionTitle from './SectionTitle.vue'

export default {
  name: 'DeliveryAddress',
  components: {
    SectionTitle
  },
  props: {
    address: {
      type: Object,
      default: null
    }
  },
  methods: {
    chooseAddress() {
      // 调用微信小程序的收货地址API
      uni.chooseAddress({
        success: (res) => {
          // 将选择的地址信息传递给父组件
          this.$emit('address-selected', {
            userName: res.userName,
            telNumber: res.telNumber,
            provinceName: res.provinceName,
            cityName: res.cityName,
            countyName: res.countyName,
            detailInfo: res.detailInfo,
            postalCode: res.postalCode,
            nationalCode: res.nationalCode
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.address-section {
  background-color: #FFFFFF;
  padding: 30rpx;
  margin: 20rpx;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  cursor: pointer;
}

/* 已选择地址的样式 */
.address-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20rpx;
  padding: 20rpx;
  background-color: #FFF8F0;
  border-radius: 10rpx;
  border-left: 6rpx solid #C39B77;
}

.address-info {
  flex: 1;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.name {
  font-size: 28rpx;
  font-weight: bold;
  color: #333333;
  margin-right: 15rpx;
}

.phone {
  font-size: 26rpx;
  color: #666666;
}

.address-detail {
  display: flex;
  align-items: flex-start;
  font-size: 24rpx;
  color: #666666;
  line-height: 1.4;
  
  text {
    margin-left: 6rpx;
    flex: 1;
  }
}

/* 未选择地址时的样式 */
.no-address {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20rpx;
  padding: 30rpx 20rpx;
  background-color: #F8F8F8;
  border-radius: 10rpx;
  
  text {
    flex: 1;
    margin-left: 10rpx;
    font-size: 28rpx;
    color: #999999;
  }
}
</style>
