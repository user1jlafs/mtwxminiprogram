<template>
  <view class="address-section">
    <section-title title="收货地址" decoration-type="tea" />
    
    <!-- 配送方式选择 -->
    <view class="delivery-options">
      <view class="option-item" :class="{active: pickupMethod === 'self'}" @tap="selectPickupMethod('self')">
        <view class="option-icon">
          <view class="option-circle" :class="{active: pickupMethod === 'self'}"></view>
        </view>
        <text class="option-text">自提</text>
        <view class="option-tag">自提</view>
      </view>
      <view class="option-item" :class="{active: pickupMethod === 'delivery'}" @tap="selectPickupMethod('delivery')">
        <view class="option-icon">
          <view class="option-circle" :class="{active: pickupMethod === 'delivery'}"></view>
        </view>
        <text class="option-text">外送</text>
      </view>
    </view>
    
    <!-- 自提时显示店铺信息 -->
    <view class="pickup-info" v-if="pickupMethod === 'self'">
      <view class="pickup-time-box">
        <uni-icons type="clock" size="16" color="#8B5A2B"></uni-icons>
        <text class="pickup-time">立即自取，约01:05可取</text>
      </view>
      <text class="pickup-desc">金牌奶茶师正在等待你下单</text>
    </view>
    
    <!-- 外送时显示地址表单 -->
    <view class="address-form" v-if="pickupMethod === 'delivery'">
      <!-- 使用已有地址 -->
      <view class="use-saved-address" v-if="savedAddresses.length > 0" @tap="showAddressList">
        <view class="saved-address-info" v-if="selectedAddress">
          <view class="address-user-info">
            <text class="address-name">{{selectedAddress.name}}</text>
            <text class="address-phone">{{selectedAddress.phone}}</text>
            <view class="default-tag" v-if="selectedAddress.isDefault">默认</view>
          </view>
          <view class="address-detail">
            <uni-icons type="location" size="16" color="#8B5A2B"></uni-icons>
            <text>{{selectedAddress.province}}{{selectedAddress.city}}{{selectedAddress.district}}{{selectedAddress.detailAddress}}</text>
          </view>
        </view>
        <view class="no-address-tip" v-else>
          <text>请选择收货地址</text>
        </view>
        <uni-icons type="right" size="16" color="#C39B77"></uni-icons>
      </view>
      
      <!-- 添加新地址表单 -->
      <view class="address-input-form" v-else>
        <view class="form-item">
          <text class="form-label">收货人</text>
          <input class="form-input" type="text" v-model="addressForm.name" placeholder="请输入收货人姓名" />
        </view>
        <view class="form-item">
          <text class="form-label">手机号码</text>
          <input class="form-input" type="number" v-model="addressForm.phone" placeholder="请输入手机号码" maxlength="11" />
        </view>
        <view class="form-item">
          <text class="form-label">所在地区</text>
          <view class="region-picker" @tap="showRegionPicker">
            <text v-if="addressForm.province">{{addressForm.province}} {{addressForm.city}} {{addressForm.district}}</text>
            <text v-else class="placeholder">请选择所在地区</text>
            <uni-icons type="right" size="14" color="#C39B77"></uni-icons>
          </view>
        </view>
        <view class="form-item">
          <text class="form-label">详细地址</text>
          <textarea class="form-textarea" v-model="addressForm.detailAddress" placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等" />
        </view>
        <view class="form-item switch-item">
          <text class="form-label">设为默认地址</text>
          <switch :checked="addressForm.isDefault" @change="toggleDefaultAddress" color="#8B5A2B" />
        </view>
      </view>
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
    pickupMethod: {
      type: String,
      required: true
    },
    savedAddresses: {
      type: Array,
      default: () => []
    },
    selectedAddress: {
      type: Object,
      default: null
    },
    addressForm: {
      type: Object,
      required: true
    }
  },
  methods: {
    selectPickupMethod(method) {
      this.$emit('update:pickupMethod', method)
    },
    showAddressList() {
      this.$emit('show-address-list')
    },
    showRegionPicker() {
      this.$emit('show-region-picker')
    },
    toggleDefaultAddress(e) {
      this.$emit('toggle-default-address', e)
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
}

/* 地址表单样式 */
.address-form {
  margin-top: 20rpx;
}

.use-saved-address {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  background-color: #FFF8F0;
  border-radius: 10rpx;
  border-left: 6rpx solid #C39B77;
}

.saved-address-info {
  flex: 1;
}

.address-user-info {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.address-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #333333;
  margin-right: 15rpx;
}

.address-phone {
  font-size: 26rpx;
  color: #666666;
}

.default-tag {
  font-size: 20rpx;
  color: #FFFFFF;
  background-color: #C39B77;
  padding: 2rpx 10rpx;
  border-radius: 6rpx;
  margin-left: 10rpx;
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

.no-address-tip {
  font-size: 28rpx;
  color: #999999;
}

.address-input-form {
  margin-top: 20rpx;
}

.form-item {
  margin-bottom: 20rpx;
}

.form-label {
  display: block;
  font-size: 28rpx;
  color: #333333;
  margin-bottom: 10rpx;
}

.form-input {
  width: 100%;
  height: 80rpx;
  background-color: #F8F8F8;
  border-radius: 8rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  color: #333333;
  box-sizing: border-box;
}

.region-picker {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80rpx;
  background-color: #F8F8F8;
  border-radius: 8rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  color: #333333;
  box-sizing: border-box;
}

.placeholder {
  color: #999999;
}

.form-textarea {
  width: 100%;
  height: 160rpx;
  background-color: #F8F8F8;
  border-radius: 8rpx;
  padding: 20rpx;
  font-size: 28rpx;
  color: #333333;
  box-sizing: border-box;
}

.switch-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delivery-options {
  display: flex;
  margin-bottom: 20rpx;
}

.option-item {
  display: flex;
  align-items: center;
  margin-right: 40rpx;
  position: relative;
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

.option-tag {
  position: absolute;
  top: -20rpx;
  right: -20rpx;
  background-color: #C39B77; // 浅奶茶色
  color: #FFFFFF;
  font-size: 20rpx;
  padding: 4rpx 10rpx;
  border-radius: 10rpx;
}

.pickup-info {
  display: flex;
  flex-direction: column;
  background-color: #FFF8F0; // 奶茶背景色
  padding: 15rpx;
  border-radius: 10rpx;
  border-left: 6rpx solid #C39B77; // 浅奶茶色边框
}

.pickup-time-box {
  display: flex;
  align-items: center;
  margin-bottom: 6rpx;
  
  .pickup-time {
    margin-left: 8rpx;
  }
}

.pickup-time {
  font-size: 28rpx;
  color: #8B5A2B; // 奶茶棕色
  font-weight: bold;
}

.pickup-desc {
  font-size: 24rpx;
  color: #C39B77; // 浅奶茶色
  margin-left: 24rpx;
}
</style>
