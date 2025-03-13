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

.cart-component {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 900;
}

/* 购物车抽屉样式 */
.cart-drawer {
  position: fixed;
  bottom: 100rpx; /* 与底部购物车栏的高度对应 */
  left: 0;
  width: 100%;
  background-color: #FFFFFF;
  border-radius: 30rpx 30rpx 0 0;
  box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.1);
  z-index: 999;
  transform: translateY(100%);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  max-height: 65vh; /* 限制最大高度为视口高度的65% */
  display: flex;
  flex-direction: column;
  
  &.active {
    transform: translateY(0);
  }
  
  .drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    border-bottom: 1rpx solid #F0F0F0;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      top: 15rpx;
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
        height: 24rpx;
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
      padding: 8rpx 16rpx;
      border-radius: 20rpx;
      transition: all 0.2s ease;
      
      &:active {
        opacity: 0.8;
      }
      
      text {
        margin-left: 6rpx;
      }
    }
    
    .clear-btn {
      display: flex;
      align-items: center;
      font-size: 26rpx;
      color: #999999;
      background-color: #F5F5F5;
      padding: 8rpx 16rpx;
      border-radius: 20rpx;
      transition: all 0.2s ease;
      
      &:active {
        opacity: 0.8;
      }
      
      text {
        margin-left: 6rpx;
      }
    }
  }
  
  .cart-items {
    flex: 1;
    overflow-y: auto;
    padding: 10rpx 10rpx;
    
    .empty-cart {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 300rpx;
      color: #999999;
      font-size: 28rpx;
      
      .uni-icons {
        margin-bottom: 20rpx;
        opacity: 0.6;
      }
      
      .empty-cart-tip {
        margin-top: 10rpx;
        font-size: 24rpx;
        color: #BBBBBB;
      }
    }
    
    .cart-item {
      display: flex;
      align-items: center;
      padding: 25rpx 15rpx;
      border-bottom: 1rpx solid #F5F5F5;
      position: relative;
      transition: all 0.2s ease;
      
      &:active {
        background-color: #FAFAFA;
      }
      
      .item-select {
        padding: 10rpx;
        margin-right: 10rpx;
      }
      
      .item-image {
        width: 100rpx;
        height: 100rpx;
        border-radius: 12rpx;
        margin-right: 15rpx;
        box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
        background-color: $tea-light;
        object-fit: cover;
      }
      
      .item-info {
        flex: 1;
        min-width: 0;
        padding-right: 10rpx;
        
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
          font-size: 24rpx;
          color: #999999;
          margin-bottom: 10rpx;
          display: block;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .item-price-box {
          .item-price {
            font-size: 30rpx;
            color: $tea-accent;
            font-weight: bold;
          }
        }
      }
      
      .quantity-control {
        display: flex;
        align-items: center;
        position: relative;
        margin-left: 5rpx;
        
        .quantity-btn {
          width: 44rpx;
          height: 44rpx;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          
          &.minus {
            background-color: #F5F5F5;
            border: 1rpx solid #E0E0E0;
            
            &:active {
              opacity: 0.8;
            }
          }
          
          &.plus {
            background-color: $tea-primary;
            box-shadow: 0 2rpx 6rpx rgba(139, 90, 43, 0.3);
            
            &:active {
              opacity: 0.8;
              transform: scale(0.95);
            }
          }
        }
        
        .quantity-text {
          width: 40rpx;
          text-align: center;
          font-size: 26rpx;
          color: $tea-dark;
          font-weight: bold;
        }
      }
    }
  }
}

/* 遮罩层样式 */
.cart-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  backdrop-filter: blur(2px);
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
  height: 98rpx;
  background-color: $tea-dark;
  box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.1);
  border-radius: 20rpx 20rpx 0 0;
  z-index: 1000;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2rpx;
    background: linear-gradient(to right, $tea-secondary, transparent);
    opacity: 0.5;
  }
  
  .cart-info {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    
    .cart-icon {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      background-color: #666666;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15rpx;
      box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.3);
      position: relative;
      top: -15rpx;
      transition: all 0.3s ease;
      border: 3rpx solid $tea-dark;
      
      &.active {
        background: linear-gradient(135deg, $tea-secondary, $tea-primary);
        transform: translateY(-5rpx);
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
        box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
        animation: pulse 2s infinite;
      }
    }
    
    .price-info {
      .total-price {
        color: #FFFFFF;
        font-size: 32rpx;
        font-weight: bold;
        text-shadow: 0 1rpx 3rpx rgba(0, 0, 0, 0.2);
      }
    }
  }
  
  .checkout-btn {
    width: 220rpx;
    height: 100%;
    background-color: #CCCCCC;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30rpx;
    font-weight: bold;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    
    &.active {
      background: linear-gradient(to right, $tea-secondary, $tea-primary);
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, rgba(255,255,255,0.1), transparent);
      }
    }
    
    &.active:active {
      transform: scale(0.98);
    }
    
    text {
      position: relative;
      z-index: 1;
    }
  }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
</style>
