<template>
  <view class="container">
    <!-- 顶部商品信息区域 -->
    <view class="product-info-section">
      <image :src="productInfo.image" mode="aspectFill" class="product-image"></image>
      <view class="product-details">
        <text class="product-name">{{productInfo.name}}</text>
        <view class="product-meta">
          <text class="sugar-info">{{productInfo.description}}</text>
        </view>
        <text class="product-price">¥{{selectedPrice}}</text>
      </view>
    </view>
    
    <!-- 规格选择区域 -->
    <view class="specs-container">
      <!-- 使用双层循环渲染嵌套规格 -->
      <view 
        v-for="(specGroup, specIndex) in specs" 
        :key="specIndex"
        class="spec-section"
      >
        <text class="spec-title">{{specGroup.name}}</text>
        <view class="spec-options">
          <view 
            v-for="(specValue, valueIndex) in specGroup.specValues" 
            :key="valueIndex"
            class="spec-option" 
            :class="{active: selectedSpecs[specGroup.type] === specValue.value}"
            @tap="selectSpec(specGroup.type, specValue.value, specValue.extraCost || 0)"
          >
            <view class="option-content">
              <text>{{specValue.value}}</text>
              <text v-if="specValue.extraCost > 0" class="extra-price">+¥{{specValue.extraCost}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 底部操作栏 -->
    <view class="bottom-bar">
      <view class="quantity-control">
        <view class="quantity-btn minus" @tap="decreaseQuantity">
          <uni-icons type="minus" size="18" color="#8B5A2B"></uni-icons>
        </view>
        <text class="quantity-text">{{quantity}}</text>
        <view class="quantity-btn plus" @tap="increaseQuantity">
          <uni-icons type="plus" size="18" color="#8B5A2B"></uni-icons>
        </view>
      </view>
      <view class="action-buttons">
        <view class="add-to-cart-btn" @tap="addToCart">
          <text>加入购物车</text>
        </view>
        <view class="buy-now-btn" @tap="buyNow">
          <text>立即购买</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { GetProductSpecsRequest, GetProductRequest } from '@/api/ProductRequest'
import { mapMutations } from 'vuex'
import Decimal from "decimal.js"

export default {
  data () {
    return {
      id: 0,
      productInfo: { },
      specs: [],
      // 默认选中的规格
      selectedSpecs: {
        size: '大杯',
        addon: '',
        temperature: '正常冰',
        sugar: '少糖'
      },
      quantity: 1,
      basePrice: 0
    }
  },
  computed: {
    // 计算选中规格后的价格
    selectedPrice() {
      let totalPrice = new Decimal(this.basePrice)
      // 遍历所有规格组，计算额外价格
      if (Array.isArray(this.specs)) {
        this.specs.forEach(specGroup => {
          if (specGroup.specValues && Array.isArray(specGroup.specValues)) {
            // 查找当前选中的规格值
            const selectedValue = specGroup.specValues.find(
              item => item.value === this.selectedSpecs[specGroup.type]
            )
            // 如果有额外价格，加到总价中
            if (selectedValue && selectedValue.extraCost) {
              totalPrice = totalPrice.plus(new Decimal(selectedValue.extraCost))
            }
          }
        })
      }
      return totalPrice.toFixed(2)
    }
  },
  // 页面加载时获取传递过来的商品id
  onLoad (options) {
    this.id = options.id
    this.getProductInfo()
    this.getProductSpecs()
  },
  methods: {
    ...mapMutations('m_cart', ['addToCart']),
    
    // 获取商品信息
    async getProductInfo() {
      try {
        const res = await GetProductRequest(this.id)
        this.productInfo = res
        console.log(this.productInfo)
        this.basePrice = res.price
      } catch (error) {
        console.error('获取商品信息失败', error)
      }
    },
    
    // 获取商品规格
    async getProductSpecs () {
      try {
        const res = await GetProductSpecsRequest(this.id)
        console.log(res)
        this.specs = res.specs
      } catch (error) {
        console.error('获取商品规格失败', error)
      }
    },
    
    // 选择规格
    selectSpec(type, value, extraCost) {
      this.selectedSpecs[type] = value;
    },
    
    // 减少数量
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    
    // 增加数量
    increaseQuantity() {
      this.quantity++;
    },
    
    // 添加到购物车
    addToCart() {
      // 过滤掉空值的规格
      const filteredSpecs = {};
      Object.entries(this.selectedSpecs).forEach(([key, value]) => {
        if (value && value.trim() !== '') {
          filteredSpecs[key] = value;
        }
      });
      
      // 构建商品对象
      const cartItem = {
        id: this.id,
        name: this.productInfo.name,
        price: parseFloat(this.selectedPrice),
        image: this.productInfo.image,
        quantity: this.quantity,
        specs: filteredSpecs
      };
      
      // 调用Vuex的mutation添加到购物车
      this.$store.commit('m_cart/addToCart', cartItem);
      
      // 提示用户
      uni.showToast({
        title: '已加入购物车',
        icon: 'success',
        duration: 1500
      });
      
      // 可选：添加成功后关闭规格选择页面
      setTimeout(() => {
        uni.navigateBack();
      }, 1500);
    },
    
    // 立即购买
    buyNow() {
      // 先添加到购物车
      this.addToCart();
      
      // 然后跳转到结算页面
      uni.navigateTo({
        url: '/subpkg/confirm_order/confirm_order'
      });
    }
  }
}
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #FFF8F0; /* 更改为奶茶色系的浅色背景 */
  padding-bottom: 110rpx; /* 为固定底部栏留出空间 */
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto; /* 允许整个容器垂直滚动 */
  box-sizing: border-box;
}

/* 商品信息区域 */
.product-info-section {
  display: flex;
  padding: 30rpx;
  background-color: #FFFFFF;
  border-radius: 0 0 30rpx 30rpx;
  box-shadow: 0 6rpx 16rpx rgba(139, 90, 43, 0.1); /* 奶茶色阴影 */
  position: fixed;
  top: 0;
  left: 20rpx;
  right: 20rpx;
  z-index: 100;
  box-sizing: border-box;
  width: calc(100% - 40rpx); /* 确保宽度计算正确 */
}

.product-image {
  width: 180rpx;
  height: 180rpx;
  border-radius: 16rpx;
  margin-right: 24rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08); /* 添加轻微阴影 */
  transition: transform 0.3s ease; /* 添加过渡效果 */
}

.product-image:active {
  transform: scale(1.02); /* 点击时轻微放大效果 */
}

.product-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-name {
  font-size: 34rpx;
  font-weight: bold;
  color: #5D4037; /* 奶茶深棕色 */
  margin-bottom: 12rpx;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12rpx;
}

.sales-info, .sugar-info {
  font-size: 24rpx;
  color: #8D6E63; /* 奶茶浅棕色 */
}

.product-price {
  font-size: 38rpx;
  font-weight: bold;
  color: #D84315; /* 深奶茶红色 */
  text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.1); /* 添加轻微文字阴影 */
}

/* 规格选择区域 */
.specs-container {
  flex: 1;
  padding: 30rpx;
  margin: 0 20rpx; /* 统一边距 */
  margin-top: 240rpx; /* 为固定定位的商品信息区域留出空间 */
  background-color: #FFFFFF;
  border-radius: 30rpx 30rpx 0 0;
  padding-bottom: 120rpx; /* 确保内容不被底部栏遮挡 */
  box-shadow: 0 -4rpx 16rpx rgba(139, 90, 43, 0.05); /* 顶部奶茶色阴影 */
  box-sizing: border-box;
  width: calc(100% - 40rpx); /* 确保宽度计算正确 */
  overflow-x: hidden;
  margin-bottom: 20rpx; /* 底部添加一些间距 */
}

.spec-section {
  margin-bottom: 36rpx;
  position: relative;
  padding-bottom: 10rpx;
  width: 100%;
  box-sizing: border-box;
}

.spec-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #5D4037; /* 奶茶深棕色 */
  margin-bottom: 24rpx;
  display: block;
  position: relative;
  padding-left: 20rpx;
}

.spec-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 8rpx;
  height: 28rpx;
  background-color: #8B5A2B; /* 奶茶棕色 */
  border-radius: 4rpx;
}

.spec-options {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
  justify-content: flex-start;
}

.spec-option {
  width: calc(33.33% - 14rpx); /* 三等分布局，每个占据三分之一的宽度减去间距 */
  margin-bottom: 20rpx;
  margin-right: 20rpx; /* 添加固定的右边距 */
  padding: 16rpx 24rpx;
  background-color: #F5F5F5;
  border-radius: 16rpx;
  border: 2rpx solid transparent;
  transition: all 0.2s ease; /* 添加过渡效果 */
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  text-align: center;
}

/* 每行的第3个元素（3n）不需要右边距 */
.spec-option:nth-child(3n) {
  margin-right: 0;
}
.spec-option:active {
  transform: scale(0.98); /* 点击时缩小效果 */
}

.spec-option.active {
  background-color: #F3E5D7; /* 奶茶色背景 */
  border-color: #8B5A2B; /* 奶茶棕色边框 */
  color: #8B5A2B; /* 奶茶棕色文字 */
  box-shadow: 0 2rpx 8rpx rgba(139, 90, 43, 0.2); /* 增强阴影 */
}

.option-content {
  display: flex;
  flex-direction: column;
}

.option-desc {
  font-size: 22rpx;
  color: #999;
  margin-top: 6rpx;
}

.extra-price {
  font-size: 22rpx;
  color: #D84315; /* 深奶茶红色 */
  margin-top: 6rpx;
  font-weight: bold;
}

/* 底部操作栏 */
.bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 30rpx;
  background-color: #FFFFFF;
  border-top: 1rpx solid #F0F0F0;
  box-shadow: 0 -4rpx 16rpx rgba(139, 90, 43, 0.1); /* 奶茶色阴影 */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  width: 100%;
  height: 150rpx;
  box-sizing: border-box;
}

.quantity-control {
  display: flex;
  align-items: center;
}

.quantity-btn {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F3E5D7; /* 奶茶色背景 */
  border-radius: 30rpx;
  transition: all 0.2s ease;
  box-shadow: 0 2rpx 6rpx rgba(139, 90, 43, 0.1);
}

.quantity-btn:active {
  transform: scale(0.95);
  background-color: #E6D2BC; /* 点击时变深 */
}

.quantity-text {
  margin: 0 20rpx;
  font-size: 30rpx;
  color: #5D4037; /* 奶茶深棕色 */
  font-weight: bold;
}

.action-buttons {
  display: flex;
  flex: 1;
  justify-content: flex-end;
  margin-left: 20rpx;
  box-sizing: border-box;
}

.add-to-cart-btn, .buy-now-btn {
  padding: 0 30rpx;
  height: 76rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 38rpx;
  font-size: 28rpx;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.add-to-cart-btn {
  background-color: #F3E5D7; /* 奶茶色背景 */
  color: #8B5A2B; /* 奶茶棕色文字 */
  border: 2rpx solid #8B5A2B; /* 奶茶棕色边框 */
  margin-right: 20rpx;
}

.add-to-cart-btn:active {
  background-color: #E6D2BC; /* 点击时变深 */
  transform: scale(0.96);
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
}

.buy-now-btn {
  background-color: #8B5A2B; /* 奶茶棕色背景 */
  color: #FFFFFF;
  border: 2rpx solid #8B5A2B; /* 奶茶棕色边框 */
}

.buy-now-btn:active {
  background-color: #6D4C41; /* 点击时变深 */
  transform: scale(0.96);
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
}
</style>