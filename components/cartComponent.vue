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
              <uni-icons type="plus" size="16" color="#8B5A2B"></uni-icons>
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
  transition: transform 0.3s ease;
  max-height: 60vh; /* 限制最大高度为视口高度的60% */
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
    
    .drawer-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333333;
    }
    
    .select-all {
      display: flex;
      align-items: center;
      font-size: 24rpx;
      color: #666666;
      margin-left: auto;
      margin-right: 20rpx;
      
      text {
        margin-left: 6rpx;
      }
    }
    
    .clear-btn {
      display: flex;
      align-items: center;
      font-size: 24rpx;
      color: #999999;
      
      text {
        margin-left: 6rpx;
      }
    }
  }
  
  .cart-items {
    flex: 1;
    overflow-y: auto; /* 确保内容可滚动 */
    padding: 0 10rpx; /* 减小左右内边距，为商品项留出更多空间 */
    
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
      padding: 30rpx 20rpx; /* 增加左右内边距 */
      border-bottom: 1rpx solid #F5F5F5;
      position: relative; /* 添加相对定位 */
      width: calc(100% - 40rpx); /* 确保宽度计算正确 */
      
      .item-image {
        width: 120rpx;
        height: 120rpx;
        border-radius: 12rpx;
        margin-right: 20rpx;
      }
      
      .item-info {
        flex: 1;
        min-width: 0; /* 防止内容溢出 */
        padding-right: 20rpx; /* 减小右侧内边距，不再为数量控制预留空间 */
        
        .item-name {
          font-size: 28rpx;
          font-weight: bold;
          color: #333333;
          margin-bottom: 6rpx;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .item-specs {
          font-size: 24rpx;
          color: #999999;
          margin-bottom: 6rpx;
          display: block;
        }
        
        .item-price-box {
          .item-price {
            font-size: 30rpx;
            color: #E57373;
            font-weight: bold;
          }
        }
      }
      
      .quantity-control {
        display: flex;
        align-items: center;
        position: relative;
        margin-left: 10rpx; /* 与商品信息保持一定距离 */
        min-width: 160rpx; /* 确保控制区域有足够的最小宽度 */
        
        .quantity-btn {
          width: 46rpx;
          height: 46rpx;
          border-radius: 50%;
          background-color: #F5F5F5;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0; /* 防止按钮被压缩 */
          
          &.minus {
            border: none;
            width: 50rpx;
            height: 50rpx;
            box-shadow: 0 2rpx 6rpx rgba(139, 90, 43, 0.4);
            transform: translateY(-1rpx);;
          }
          
          &.plus {
            border: none;
            width: 50rpx;
            height: 50rpx;
            box-shadow: 0 2rpx 6rpx rgba(139, 90, 43, 0.4);
            transform: translateY(-1rpx);
            
            .uni-icons {
              color: #FFFFFF !important;
              font-weight: bold;
            }
          }
        }
        
        .quantity-text {
          width: 50rpx;
          text-align: center;
          font-size: 28rpx;
          flex-shrink: 0; /* 防止文本被压缩 */
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
}

/* 底部购物车栏样式 */
.cart-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  height: 100rpx;
  background-color: #333333;
  box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.1);
  border-radius: 30rpx 30rpx 0 0;
  z-index: 1000;
  
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
      margin-right: 20rpx;
      box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.3);
      position: relative;
      top: -15rpx;
      transition: all 0.3s ease;
      
      &.active {
        background-color: #8B5A2B;
      }
      
      .cart-badge {
        position: absolute;
        top: -10rpx;
        right: -10rpx;
        min-width: 36rpx;
        height: 36rpx;
        border-radius: 18rpx;
        background-color: #E57373;
        color: #FFFFFF;
        font-size: 22rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 6rpx;
      }
    }
    
    .price-info {
      .total-price {
        color: #FFFFFF;
        font-size: 36rpx;
        font-weight: bold;
      }
    }
  }
  
  .checkout-btn {
    width: 240rpx;
    height: 100%;
    background-color: #CCCCCC;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32rpx;
    transition: background-color 0.3s ease;
    
    &.active {
      background-color: #8B5A2B;
    }
    
    &.active:active::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>