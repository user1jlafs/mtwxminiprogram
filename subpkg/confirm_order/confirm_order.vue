<template>
  <view class="container">
    <!-- 状态栏占位 -->
    <!-- <view class="status-bar" :style="{height: statusBarHeight + 'px'}"></view> -->
    
    <!-- 收货地址信息 -->
    <view class="address-section">
      <view class="section-title-box">
        <view class="section-title">
          <text>收货地址</text>
        </view>
        <view class="tea-decoration"></view>
      </view>
      
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
    
    <!-- 商品列表 -->
    <view class="product-section">
      <view class="section-header">
        <view class="section-title-box">
          <text class="section-title">已选商品</text>
        </view>
        <view class="bubble-decoration"></view>
      </view>
      <view class="product-list">
        <view class="product-item" v-for="(item, index) in cartProducts" :key="index">
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
    
    <!-- 支付方式 -->
    <view class="payment-section">
      <view class="section-title-box">
        <view class="section-title">
          <text>支付方式</text>
        </view>
        <view class="tea-decoration"></view>
      </view>
      <view class="payment-option">
        <view class="payment-left">
          <image class="payment-icon" src="/static/wechat-pay.png" mode="aspectFit"></image>
          <text class="payment-name">微信支付</text>
        </view>
        <uni-icons type="right" size="14" color="#999"></uni-icons>
      </view>
    </view>
    
    <!-- 取餐方式 -->
    <view class="pickup-section">
      <view class="section-title-box">
        <view class="section-title">
          <text>取餐方式</text>
        </view>
        <view class="tea-decoration"></view>
      </view>
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
    
    <!-- 底部结算栏 -->
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
  </view>
</template>

<script>
import { CreateOrderRequest } from '@/api/OrderRequest'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      statusBarHeight: 0,
      pickupMethod: 'self', // self-自提, delivery-外送
      dineMethod: 'store', // store-店内用餐, takeout-自提带走
      remark: '',
      // 模拟购物车数据
      cartProducts: [
        {
          id: '1',
          name: '生椰拿铁',
          specification: '大杯 16oz/ILAC金奖豆/冰/不另外加糖',
          price: 9.9,
          originalPrice: 29,
          count: 1,
          image: '/static/c1.png',
          isSpecial: true
        }
      ],
      discount: 19.1,
      totalPrice: 9.9,
      // 地址相关数据
      savedAddresses: [],
      selectedAddress: null,
      addressForm: {
        name: '',
        phone: '',
        province: '',
        city: '',
        district: '',
        detailAddress: '',
        isDefault: false
      }
    }
  },
  computed: {
    ...mapState('m_user', ['userInfo'])
  },
  onLoad(options) {
    // 获取状态栏高度
    this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
    
    // 如果有传递的商品ID，则从商品详情页跳转过来
    if (options.productId) {
      // 这里可以根据商品ID获取商品信息
      // 实际项目中应该调用API获取商品详情
    }
    
    // 从购物车获取商品列表
    this.getCartProducts();
  },
  methods: {
    // 获取购物车商品
    getCartProducts() {
      // 实际项目中应该从Vuex中获取购物车数据
      // this.cartProducts = this.$store.state.cart.cartList;
      
      // 计算总价
      this.calculateTotal();
    },
    
    // 计算总价
    calculateTotal() {
      let total = 0;
      this.cartProducts.forEach(item => {
        total += item.price * item.count;
      });
      this.totalPrice = total.toFixed(1);
    },
    
    // 选择取餐方式
    selectPickupMethod(method) {
      this.pickupMethod = method;
    },
    
    // 选择用餐方式
    selectDineMethod(method) {
      this.dineMethod = method;
    },
    
    // 显示备注弹窗
    showRemarkPopup() {
      uni.showModal({
        title: '添加备注',
        content: '请输入特殊要求',
        editable: true,
        placeholderText: '如少糖、少冰等',
        success: (res) => {
          if (res.confirm && res.content) {
            this.remark = res.content;
          }
        }
      });
    },
    
    // 显示地址列表
    showAddressList() {
      // 实际项目中应该从本地存储或API获取地址列表
      // 这里使用模拟数据
      if (this.savedAddresses.length === 0) {
        // 模拟数据
        this.savedAddresses = [
          {
            id: '1',
            name: '张三',
            phone: '13800138000',
            province: '广东省',
            city: '广州市',
            district: '天河区',
            detailAddress: '天河路385号太古汇',
            isDefault: true
          },
          {
            id: '2',
            name: '李四',
            phone: '13900139000',
            province: '广东省',
            city: '深圳市',
            district: '南山区',
            detailAddress: '科技园南区8栋',
            isDefault: false
          }
        ];
      }
      
      // 显示地址选择弹窗
      uni.showActionSheet({
        itemList: this.savedAddresses.map(addr => `${addr.name} ${addr.phone} ${addr.province}${addr.city}${addr.district}${addr.detailAddress}`),
        success: (res) => {
          this.selectedAddress = this.savedAddresses[res.tapIndex];
        }
      });
    },
    
    // 显示地区选择器
    showRegionPicker() {
      // 实际项目中应该使用uni-data-picker组件或其他地区选择组件
      // 这里使用简化的方式模拟
      uni.showToast({
        title: '请选择地区（实际项目中应使用地区选择器）',
        icon: 'none'
      });
      
      // 模拟选择结果
      setTimeout(() => {
        this.addressForm.province = '广东省';
        this.addressForm.city = '广州市';
        this.addressForm.district = '天河区';
      }, 1000);
    },
    
    // 切换默认地址
    toggleDefaultAddress(e) {
      this.addressForm.isDefault = e.detail.value;
    },
    
    // 提交订单
    async submitOrder() {
      // 检查用户是否登录
      if (!this.userInfo || !this.userInfo.id) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        setTimeout(() => {
          uni.navigateTo({
            url: '/pages/my/my'
          });
        }, 1500);
        return;
      }
      
      // 如果是外送模式，检查地址信息
      if (this.pickupMethod === 'delivery') {
        if (this.savedAddresses.length > 0 && !this.selectedAddress) {
          uni.showToast({
            title: '请选择收货地址',
            icon: 'none'
          });
          return;
        } else if (this.savedAddresses.length === 0) {
          // 检查地址表单
          if (!this.addressForm.name) {
            uni.showToast({
              title: '请输入收货人姓名',
              icon: 'none'
            });
            return;
          }
          if (!this.addressForm.phone) {
            uni.showToast({
              title: '请输入手机号码',
              icon: 'none'
            });
            return;
          }
          if (!this.addressForm.province || !this.addressForm.city || !this.addressForm.district) {
            uni.showToast({
              title: '请选择所在地区',
              icon: 'none'
            });
            return;
          }
          if (!this.addressForm.detailAddress) {
            uni.showToast({
              title: '请输入详细地址',
              icon: 'none'
            });
            return;
          }
        }
      }
      
      // 构建订单数据
      const orderData = {
        products: this.cartProducts.map(item => ({
          productId: item.id,
          count: item.count,
          specification: item.specification
        })),
        totalAmount: this.totalPrice,
        pickupMethod: this.pickupMethod,
        dineMethod: this.dineMethod,
        remark: this.remark
      };
      
      // 如果是外送模式，添加地址信息
      if (this.pickupMethod === 'delivery') {
        if (this.selectedAddress) {
          // 使用已选择的地址
          orderData.address = {
            name: this.selectedAddress.name,
            phone: this.selectedAddress.phone,
            province: this.selectedAddress.province,
            city: this.selectedAddress.city,
            district: this.selectedAddress.district,
            detailAddress: this.selectedAddress.detailAddress
          };
        } else {
          // 使用表单中填写的地址
          orderData.address = {
            name: this.addressForm.name,
            phone: this.addressForm.phone,
            province: this.addressForm.province,
            city: this.addressForm.city,
            district: this.addressForm.district,
            detailAddress: this.addressForm.detailAddress
          };
          
          // 如果设置为默认地址，保存到地址列表中
          if (this.addressForm.isDefault) {
            const newAddress = {
              id: Date.now().toString(),
              ...this.addressForm
            };
            
            // 将其他地址的默认状态设为false
            this.savedAddresses.forEach(addr => {
              addr.isDefault = false;
            });
            
            // 添加新地址到地址列表
            this.savedAddresses.push(newAddress);
            
            // 实际项目中应该保存到本地存储或通过API保存到服务器
            // uni.setStorageSync('savedAddresses', JSON.stringify(this.savedAddresses));
          }
        }
      }
      
      try {
        // 调用创建订单API
        const result = await CreateOrderRequest(orderData);
        
        // 创建订单成功，跳转到支付页面或订单详情页
        if (result && result.id) {
          uni.showToast({
            title: '订单创建成功',
            icon: 'success'
          });
          
          // 模拟支付成功
          setTimeout(() => {
            uni.redirectTo({
              url: `/pages/order/order?tab=1`
            });
          }, 1500);
          
          // 清空购物车
          // this.$store.commit('cart/clearCart');
        }
      } catch (error) {
        console.error('创建订单失败', error);
        uni.showToast({
          title: '创建订单失败',
          icon: 'none'
        });
      }
    }
  }
}
</script>

<style lang="scss">
.container {
  background-color: #F8F8F8;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 120rpx; // 为底部结算栏留出空间
}

.status-bar {
  width: 100%;
  background-color: #FFFFFF;
}

/* 地址信息区域 */
.address-section {
  background-color: #FFFFFF;
  padding: 30rpx;
  margin: 20rpx;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

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
}

.section-title::before {
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

/* 商品列表区域 */
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

.section-title-box {
  position: relative;
  z-index: 1;
}

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #8B5A2B; // 奶茶棕色
  position: relative;
  padding-left: 20rpx;
}

.section-title::before {
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

/* 支付方式 */
.payment-section, .pickup-section {
  background-color: #FFFFFF;
  padding: 30rpx;
  margin: 0 20rpx 20rpx;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.section-title-box {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
  position: relative;
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

/* 取餐方式 */
.pickup-options {
  display: flex;
  margin-top: 20rpx;
}

.pickup-option {
  display: flex;
  align-items: center;
  margin-right: 40rpx;
}

/* 底部结算栏 */
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