<template>
  <view class="cart-component">
    <!-- 购物车抽屉内容 -->
    <view class="cart-drawer" :class="{active: isCartOpen}">
      <view class="drawer-header">
        <text class="drawer-title">已选商品</text>
        <view class="select-all" @click="toggleSelectAll">
          <uni-icons :type="isAllSelected ? 'checkbox-filled' : 'circle'" size="18" :color="isAllSelected ? '#8B5A2B' : '#ccc'"></uni-icons>
          <text>全选</text>
        </view>
        <view class="clear-btn" @click="clearCartItems">
          <uni-icons type="trash" size="18" color="#999"></uni-icons>
          <text>清空</text>
        </view>
      </view>
      
      <!-- 购物车商品列表 -->
      <scroll-view class="cart-items" scroll-y>
        <view v-if="cartItems.length === 0" class="empty-cart">
          <uni-icons type="cart" size="50" color="#DDDDDD"></uni-icons>
          <text>购物车是空的</text>
          <text class="empty-cart-tip">快去选购喜欢的奶茶吧~</text>
        </view>
        <view v-else class="cart-item" v-for="(item, index) in cartItems" :key="index">
          <view class="item-select" @click="toggleItemSelect(item.id, !item.selected)">
            <uni-icons :type="item.selected ? 'checkbox-filled' : 'circle'" size="20" :color="item.selected ? '#8B5A2B' : '#ccc'"></uni-icons>
          </view>
          <image class="item-image" :src="item.image" mode="aspectFill"></image>
          <view class="item-info">
            <text class="item-name">{{item.name}}</text>
            <text v-if="item.specs" class="item-specs">{{formatSpecs(item.specs)}}</text>
            <view class="item-price-box">
              <text class="item-price">¥{{item.price}}</text>
            </view>
          </view>
          <view class="quantity-control">
            <view class="quantity-btn minus" @click="decreaseQuantity(index)">
              <uni-icons type="minus" size="16" color="#8B5A2B"></uni-icons>
            </view>
            <text class="quantity-text">{{item.quantity}}</text>
            <view class="quantity-btn plus" @click="increaseQuantity(index)">
              <uni-icons type="plus" size="16" color="#FFFFFF"></uni-icons>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    
    <!-- 购物车遮罩层 -->
    <view class="cart-mask" v-if="isCartOpen" @click="toggleCart"></view>
    
    <!-- 底部购物车栏 -->
    <view class="cart-bar">
      <view class="cart-info" @click="toggleCart">
        <view class="cart-icon" :class="{ active: totalQuantity > 0 }">
          <uni-icons type="cart" size="24" color="#FFFFFF"></uni-icons>
          <text v-if="totalQuantity > 0" class="cart-badge">{{totalQuantity}}</text>
        </view>
        <view class="price-info" v-if="totalPrice > 0">
          <text class="total-price">¥{{Number(totalPrice).toFixed(2)}}</text>
        </view>
      </view>
      <view class="checkout-btn" :class="{ active: checkedPrice > 0 }" @click="checkout">
        <text>{{checkedPrice > 0 ? '去结算' : '未选购商品'}}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  data() {
    return {
      isCartOpen: false
    }
  },
  computed: {
    ...mapState('m_cart', ['cart']),
    ...mapGetters('m_cart', [
      'totalCount',
      'totalPrice',
      'checkedCount',
      'checkedPrice',
      'isAllSelected',
      'cartList'
    ]),
    // 购物车商品列表
    cartItems() {
      return this.cartList
    },
    // 购物车总数量
    totalQuantity() {
      return this.totalCount
    }
  },
  methods: {
    ...mapMutations('m_cart', [
      'addToCart',
      'updateGoodsQuantity',
      'removeGoodsById',
      'clearCart',
      'updateGoodsSelected',
      'updateAllGoodsSelected'
    ]),
    
    // 格式化规格信息为可读字符串
    formatSpecs(specs) {
      if (!specs) return ''
      
      // 过滤掉空值的规格
      const validSpecs = Object.entries(specs)
        .filter(([key, value]) => value && value.trim() !== '')
        .map(([key, value]) => {
          // 将规格类型转为中文显示
          let typeText = key
          switch(key) {
            case 'size': typeText = '杯型'; break;
            case 'sugar': typeText = '糖度'; break;
            case 'temperature': typeText = '温度'; break;
            case 'addon': typeText = '加料'; break;
          }
          return `${typeText}: ${value}`
        })
      
      return validSpecs.join(' | ')
    },
    
    // 切换购物车展开/收起状态
    toggleCart() {
      if (this.totalQuantity > 0) {
        this.isCartOpen = !this.isCartOpen
      }
    },
    
    // 增加商品数量
    increaseQuantity(index) {
      const item = this.cartItems[index]
      this.updateGoodsQuantity({
        id: item.id,
        quantity: item.quantity + 1
      })
    },
    
    // 减少商品数量
    decreaseQuantity(index) {
      const item = this.cartItems[index]
      if (item.quantity > 1) {
        this.updateGoodsQuantity({
          id: item.id,
          quantity: item.quantity - 1
        })
      } else {
        // 数量为1时，再减就是删除
        this.removeGoodsById(item.id)
      }
    },
    
    // 清空购物车
    clearCartItems() {
      uni.showModal({
        title: '提示',
        content: '确定要清空购物车吗？',
        success: res => {
          if (res.confirm) {
            this.clearCart()
            this.isCartOpen = false
          }
        }
      })
    },
    
    // 切换全选/取消全选
    toggleSelectAll() {
      this.updateAllGoodsSelected(!this.isAllSelected)
    },
    
    // 结算
    checkout() {
      if (this.checkedPrice > 0) {
        uni.navigateTo({
          url: '/subpkg/confirm_order/confirm_order'
        })
      } else {
        uni.showToast({
          title: '请先选择商品',
          icon: 'none'
        })
      }
    },
    
    // 切换商品选中状态
    toggleItemSelect(id, selected) {
      this.updateGoodsSelected({
        id,
        selected
      })
    }
  }
}
</script>

<style lang="scss">
/* 奶茶主题色变量 */
$tea-primary: #8B5A2B; /* 奶茶棕色 - 主色 */
$tea-secondary: #C39B77; /* 浅奶茶色 - 次要色 */
$tea-light: #FFF8F0; /* 奶茶背景色 - 浅色 */
$tea-accent: #E57373; /* 强调色 - 用于价格等 */
$tea-dark: #333333; /* 深色 - 用于文本和底栏 */
$tea-gradient: linear-gradient(135deg, $tea-secondary, $tea-primary);
$tea-shadow: 0 4rpx 12rpx rgba(139, 90, 43, 0.25);

.cart-component {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 900;
}

/* 购物车抽屉样式 */
.cart-drawer {
  position: fixed;
  bottom: 110rpx; /* 与底部购物车栏的高度对应 */
  left: 0;
  width: 100%;
  background-color: #FFFFFF;
  border-radius: 30rpx 30rpx 0 0;
  box-shadow: 0 -8rpx 30rpx rgba(0, 0, 0, 0.1);
  z-index: 999;
  transform: translateY(100%);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  max-height: 70vh; /* 限制最大高度为视口高度的70% */
  display: flex;
  flex-direction: column;
  
  &.active {
    transform: translateY(0);
    animation: bounceIn 0.5s;
  }
  
  .drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25rpx 20rpx 15rpx;
    border-bottom: 1rpx solid #F5F5F5;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      top: 12rpx;
      left: 50%;
      transform: translateX(-50%);
      width: 60rpx;
      height: 6rpx;
      background-color: #E0E0E0;
      border-radius: 3rpx;
    }
    
    .drawer-title {
      font-size: 32rpx;
      font-weight: bold;
      color: $tea-dark;
      margin-top: 15rpx;
      position: relative;
      
      &::before {
        content: '';
        position: absolute;
        left: -10rpx;
        top: 50%;
        transform: translateY(-50%);
        width: 4rpx;
        height: 28rpx;
        background-color: $tea-primary;
        border-radius: 2rpx;
      }
    }
    
    .select-all {
      display: flex;
      align-items: center;
      font-size: 26rpx;
      color: #666666;
      margin-left: auto;
      margin-right: 20rpx;
      background-color: $tea-light;
      padding: 10rpx 20rpx;
      border-radius: 30rpx;
      transition: all 0.2s ease;
      box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.05);
      
      &:active {
        opacity: 0.8;
        transform: scale(0.98);
      }
      
      text {
        margin-left: 8rpx;
      }
    }
    
    .clear-btn {
      display: flex;
      align-items: center;
      font-size: 26rpx;
      color: #999999;
      background-color: #F5F5F5;
      padding: 10rpx 20rpx;
      border-radius: 30rpx;
      transition: all 0.2s ease;
      box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.05);
      
      &:active {
        opacity: 0.8;
        transform: scale(0.98);
      }
      
      text {
        margin-left: 8rpx;
      }
    }
  }
  
  .cart-items {
    flex: 1;
    overflow-y: auto;
    padding: 10rpx 15rpx;
    -webkit-overflow-scrolling: touch; /* 增强iOS滚动体验 */
    
    .empty-cart {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 350rpx;
      color: #999999;
      font-size: 28rpx;
      
      .uni-icons {
        margin-bottom: 30rpx;
        opacity: 0.6;
        transform: scale(1.2);
      }
      
      .empty-cart-tip {
        margin-top: 15rpx;
        font-size: 24rpx;
        color: #BBBBBB;
        background-color: #F8F8F8;
        padding: 10rpx 20rpx;
        border-radius: 20rpx;
      }
    }
    
    .cart-item {
      display: flex;
      align-items: center;
      padding: 20rpx 15rpx;
      border-bottom: 1rpx solid #F5F5F5;
      position: relative;
      transition: all 0.2s ease;
      margin-bottom: 10rpx;
      border-radius: 12rpx;
      box-sizing: border-box;
      width: 100%;
      
      &:active {
        background-color: #FAFAFA;
      }
      
      &:last-child {
        border-bottom: none;
      }
      
      .item-select {
        padding: 8rpx;
        margin-right: 8rpx;
        flex-shrink: 0;
      }
      
      .item-image {
        width: 100rpx;
        height: 100rpx;
        border-radius: 12rpx;
        margin-right: 15rpx;
        box-shadow: $tea-shadow;
        background-color: $tea-light;
        object-fit: cover;
        border: 2rpx solid rgba(139, 90, 43, 0.1);
        flex-shrink: 0;
      }
      
      .item-info {
        flex: 1;
        min-width: 0;
        padding-right: 10rpx;
        overflow: hidden;
        
        .item-name {
          font-size: 28rpx;
          font-weight: bold;
          color: $tea-dark;
          margin-bottom: 8rpx;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .item-specs {
          font-size: 22rpx;
          color: #999999;
          margin-bottom: 8rpx;
          display: block;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          background-color: #F9F9F9;
          padding: 4rpx 10rpx;
          border-radius: 6rpx;
          max-width: 95%;
        }
        
        .item-price-box {
          .item-price {
            font-size: 28rpx;
            color: $tea-accent;
            font-weight: bold;
          }
        }
      }
      
      .quantity-control {
        display: flex;
        align-items: center;
        position: relative;
        margin-left: 10rpx;
        flex-shrink: 0;
        width: 160rpx;
        justify-content: space-between;
        
        .quantity-btn {
          width: 50rpx;
          height: 50rpx;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
          
          &.minus {
            background-color: #FFF8F0; /* 浅奶茶色背景 */
            border: 1rpx solid rgba(139, 90, 43, 0.2);
            
            &:active {
              opacity: 0.8;
            }
          }
          
          &.plus {
            background-color: $tea-primary; /* 奶茶主色 */
            border: none;
            
            &:active {
              opacity: 0.8;
            }
          }
        }
        
        .quantity-text {
          width: 40rpx;
          text-align: center;
          font-size: 28rpx;
          color: $tea-dark;
          font-weight: 500;
        }
      }
    }
  }
}

@keyframes bounceIn {
  0% { transform: translateY(20%); }
  70% { transform: translateY(-2%); }
  100% { transform: translateY(0); }
}

/* 遮罩层样式 */
.cart-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 998;
  backdrop-filter: blur(3px);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 底部购物车栏样式 */
.cart-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  height: 110rpx;
  background-color: #FFFFFF;
  box-shadow: 0 -2rpx 15rpx rgba(0,0,0,0.08);
  z-index: 1000;
  overflow: visible;
  
  .cart-info {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 20rpx;
      height: 60rpx;
      width: 1rpx;
      background-color: #F0F0F0;
    }
    
    .cart-icon {
      width: 85rpx;
      height: 85rpx;
      border-radius: 50%;
      background-color: #666666;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20rpx;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.2);
      position: relative;
      top: -30rpx;
      transition: all 0.3s ease;
      border: 4rpx solid #FFFFFF;
      z-index: 10;
      
      &.active {
        background: $tea-gradient;
        transform: translateY(-5rpx) rotate(15deg);
        animation: cartShake 0.5s ease-out;
      }
      
      .cart-badge {
        position: absolute;
        top: -8rpx;
        right: -8rpx;
        min-width: 32rpx;
        height: 32rpx;
        border-radius: 16rpx;
        background-color: $tea-accent;
        color: #FFFFFF;
        font-size: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 4rpx;
        box-shadow: 0 2rpx 6rpx rgba(229, 115, 115, 0.4);
        animation: pulse 2s infinite;
        font-weight: bold;
        z-index: 11;
      }
    }
    
    .price-info {
      margin-left: 5rpx;
      position: relative;
      top: -5rpx;
      
      .total-price {
        color: $tea-accent;
        font-size: 36rpx;
        font-weight: bold;
      }
    }
  }
  
  .checkout-btn {
    width: 240rpx;
    height: 100%;
    background-color: #EEEEEE;
    color: #999999;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32rpx;
    font-weight: bold;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    
    &.active {
      background: $tea-gradient;
      color: #FFFFFF;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, rgba(255,255,255,0.2), transparent);
      }
      
      &::after {
        content: '';
        position: absolute;
        width: 30rpx;
        height: 100%;
        top: 0;
        left: -100rpx;
        background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent);
        transform: skewX(-25deg);
        animation: shine 2s infinite;
      }
    }
    
    &.active:active {
      transform: scale(0.97);
    }
    
    text {
      position: relative;
      z-index: 1;
    }
  }
}

@keyframes cartShake {
  0% { transform: translateY(-8rpx) rotate(0deg); }
  25% { transform: translateY(-8rpx) rotate(15deg); }
  50% { transform: translateY(-8rpx) rotate(-10deg); }
  75% { transform: translateY(-8rpx) rotate(5deg); }
  100% { transform: translateY(-8rpx) rotate(0deg); }
}

@keyframes shine {
  0% { left: -100rpx; }
  20% { left: 100%; }
  100% { left: 100%; }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
</style>
