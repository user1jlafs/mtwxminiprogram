<template>
  <view class="container">
    <!-- 状态栏占位 -->
    <view class="status-bar" :style="{height: statusBarHeight + 'px'}"></view>
    
    <!-- 顶部标题 -->
    <view class="header">
      <text class="title">我的订单</text>
    </view>
    
    <!-- 订单状态选项卡 -->
    <view class="order-tabs">
      <view 
        v-for="(tab, index) in tabs" 
        :key="index"
        class="tab-item"
        :class="{active: currentTab === index}"
        @tap="switchTab(index)"
      >
        <text>{{tab.name}}</text>
      </view>
    </view>
    
    <!-- 订单列表 -->
    <scroll-view class="order-list" scroll-y>
      <view v-if="orderList.length > 0">
        <view 
          class="order-item" 
          v-for="(order, index) in orderList" 
          :key="index"
          @tap="viewOrderDetail(order.id)"
        >
          <!-- 订单头部 -->
          <view class="order-header">
            <view class="shop-info">
              <uni-icons type="shop" size="16" color="#8B5A2B"></uni-icons>
              <text class="shop-name">奶茶小铺</text>
            </view>
            <text class="order-status" :class="'status-' + order.status">{{getStatusText(order.status)}}</text>
          </view>
          
          <!-- 订单商品 -->
          <view class="order-products">
            <view class="product-item" v-for="(product, pIndex) in order.orderItems" :key="pIndex">
              <image class="product-image" :src="product.product.image" mode="aspectFill"></image>
              <view class="product-info">
                <text class="product-name">{{product.product.name}}</text>
                <view class="product-specs">
                  <text class="product-spec" v-for="spec in product.specValues" :key="spec.id">{{spec.value}}</text>
                </view>
              </view>
              <view class="product-price">
                <text class="price">¥{{product.price}}</text>
                <text class="count">x{{product.quantity}}</text>
              </view>
            </view>
          </view>
          
          <!-- 订单汇总 -->
          <view class="order-summary">
            <text class="order-time">{{formatDate(order.createdAt)}}</text>
            <view class="order-total">
              <text class="total-count">共{{getTotalCount(order.orderItems)}}件商品</text>
              <text class="total-price">合计：¥{{order.totalAmount}}</text>
            </view>
          </view>
          
          <!-- 订单操作按钮 -->
          <view class="order-actions">
            <view class="action-btns">
              <button 
                v-if="order.status === 'pending'" 
                class="btn btn-cancel"
                @tap.stop="cancelOrder(order.id)"
              >取消订单</button>
              <button 
                v-if="order.status === 'pending'" 
                class="btn btn-primary"
                @tap.stop="payOrder(order.id)"
              >去支付</button>
              <button 
                v-if="order.status === 'shipping'" 
                class="btn btn-primary"
                @tap.stop="confirmOrder(order.id)"
              >确认收货</button>
              <button 
                v-if="order.status === 'completed'" 
                class="btn btn-default"
                @tap.stop="viewOrderDetail(order.id)"
              >查看详情</button>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 空订单提示 -->
      <view v-else class="empty-order">
        <uni-icons type="info" size="50" color="#CCCCCC"></uni-icons>
        <text class="empty-text">暂无相关订单</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { GetUserOrderListRequest, CancelOrderRequest, PayOrderRequest, ConfirmOrderRequest } from '@/api/OrderRequest'
import dateMixin from '@/mixins/dateMixin'

export default {
  mixins: [dateMixin],
  data() {
    return {
      statusBarHeight: 0,
      currentTab: 0,
      tabs: [
        { name: '全部', status: '' },
        { name: '待付款', status: 'pending' },
        { name: '已完成', status: 'completed' },
        { name: '已取消', status: 'cancelled' }
      ],
      // 订单数据
      orderList: []
    }
  },
  onShow () {
    this.isLogin()
    // 调用接口获取订单数据
    this.getOrderList()
  },
  onLoad() {
    // 获取状态栏高度
    const systemInfo = uni.getSystemInfoSync()
    this.statusBarHeight = systemInfo.statusBarHeight
  },
  methods: {
    isLogin () {
      // 判断是否登录
      const token = uni.getStorageSync('token')
      if (!token) {
        uni.showModal({
          title: '提示',
          content: '请先登录',
          showCancel: false,
          success: () => {
            uni.switchTab({
              url: '/pages/my/my'
            })
          }
        })
        return
      }
    },

    // 切换选项卡
    switchTab(index) {
      this.currentTab = index
      // 根据选项卡状态筛选订单
      this.getOrderList(this.tabs[index].status)
    },
    
    // 获取订单列表
    async getOrderList(status) {
      try {
        const res = await GetUserOrderListRequest(status)
        this.orderList = res
      } catch (error) {
        console.error('获取订单列表失败', error)
        uni.showToast({
          title: '获取订单列表失败',
          icon: 'none'
        })
      }
    },
    
    // 查看订单详情
    viewOrderDetail(orderId) {
      uni.navigateTo({
        url: `/subpkg/order_detail/order_detail?id=${orderId}`
      })
    },
    
    // 取消订单
    async cancelOrder(orderId) {
      try {
        await CancelOrderRequest(orderId)
        uni.showToast({
          title: '订单已取消',
          icon: 'success'
        })
        // 刷新订单列表
        this.getOrderList(this.tabs[this.currentTab].status)
      } catch (error) {
        console.error('取消订单失败', error)
        uni.showToast({
          title: '取消订单失败',
          icon: 'none'
        })
      }
    },
    
    // 支付订单
    async payOrder(orderId) {
      try {
        uni.showModal({
        	title: '温馨提示',
        	content: '你确定要支付吗',
        	success: async res => {
        		if (res.confirm) {
              await PayOrderRequest(orderId)
              uni.showToast({
                title: '支付成功',
                icon: 'success'
              })
              // 刷新订单列表
              this.getOrderList(this.tabs[this.currentTab].status)
        		} else if (res.cancel) {
        			uni.showToast({
                title: '取消支付',
                icon: 'none'
              })
        		}
        	}
        })
      } catch (error) {
        console.error('支付失败', error)
        uni.showToast({
          title: '支付失败',
          icon: 'none'
        })
      }
    },
    
    // 确认收货
    async confirmOrder(orderId) {
      try {
        uni.showModal({
        	title: '温馨提示',
        	content: '您确定要收货吗?',
        	success: async res => {
        		if (res.confirm) {
        			await ConfirmOrderRequest(orderId)
              uni.showToast({
                title: '已确认收货',
                icon: 'success'
              })
              // 刷新订单列表
              this.getOrderList(this.tabs[this.currentTab].status)
        		} else if (res.cancel) {
        		}
        	}
        })
      } catch (error) {
        console.error('确认收货失败', error)
        uni.showToast({
          title: '确认收货失败',
          icon: 'none'
        })
      }
    },
    
    // 获取订单状态文本
    getStatusText(status) {
      switch (status) {
        case 'pending':
          return '待付款'
        case 'paid':
          return '已支付'
        case 'preparing':
          return '备餐中'
        case 'shipped':
          return '配送中'
        case 'completed':
          return '已完成'
        case 'cancelled':
          return '已取消'
        default:
          return '未知状态'
      }
    },
    
    // 计算商品总数
    getTotalCount(products) {
      return products.reduce((total, item) => total + item.quantity, 0)
    }
  }
}
</script>

<style lang="scss">
.container {
  background-color: #FFF8F0; // 更改为奶茶色系的浅色背景
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden; // 防止外层容器滚动
}

.header {
  background: linear-gradient(to right, #8B5A2B, #A67C52); // 渐变背景
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 8px rgba(139, 90, 43, 0.2);
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #FFFFFF; // 白色文字在棕色背景上更显眼
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); // 添加文字阴影
}

.order-tabs {
  display: flex;
  background-color: #FFFFFF;
  padding: 0 10px;
  border-bottom: 1px solid #E8D4C0; // 更改为奶茶色系的边框
}

.tab-item {
  flex: 1;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.3s ease; // 添加过渡效果
}

.tab-item text {
  font-size: 14px;
  color: #8B5A2B; // 更改为奶茶色
}

.tab-item.active text {
  color: #8B5A2B;
  font-weight: bold;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 30px; // 稍微加宽
  height: 3px;
  background-color: #8B5A2B;
  border-radius: 3px;
}

.order-list {
  padding: 15px;
  flex: 1; // 使用flex布局自动填充剩余空间
  height: 0; // 配合flex:1使用
  overflow-y: auto; // 只在内部滚动
  box-sizing: border-box; // 确保padding不会增加元素实际大小
}

.order-item {
  background-color: #FFFFFF;
  border-radius: 12px; // 增加圆角
  margin-bottom: 15px;
  padding: 18px;
  box-shadow: 0 3px 10px rgba(139, 90, 43, 0.1); // 更美观的阴影
  border: 1px solid rgba(139, 90, 43, 0.05); // 添加细微边框
  transition: transform 0.2s ease; // 添加过渡效果
  
  &:active {
    transform: scale(0.98); // 点击时的缩小效果
  }
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid #F5EEE6; // 更改为奶茶色系的边框
}

.shop-info {
  display: flex;
  align-items: center;
}

.shop-name {
  font-size: 15px;
  color: #8B5A2B; // 更改为奶茶色
  margin-left: 5px;
  font-weight: 500; // 稍微加粗
}

.order-status {
  font-size: 14px;
  font-weight: 500;
  padding: 3px 8px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
}

.status-0 {
  color: #FF5500;
  background-color: rgba(255, 85, 0, 0.1); // 添加背景色
}

.status-1 {
  color: #3399FF;
  background-color: rgba(51, 153, 255, 0.1); // 添加背景色
}

.status-2 {
  color: #8B5A2B; // 更改为奶茶色
  background-color: rgba(139, 90, 43, 0.1); // 添加背景色
}

.order-products {
  padding: 12px 0;
  border-bottom: 1px solid #F5EEE6; // 添加边框
}

.product-item {
  display: flex;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.product-image {
  width: 65px;
  height: 65px;
  border-radius: 8px; // 增加圆角
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05); // 添加阴影
  border: 1px solid #F5EEE6; // 添加边框
}

.product-info {
  flex: 1;
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.product-name {
  font-size: 15px;
  color: #333333;
  margin-bottom: 6px;
  font-weight: 500; // 稍微加粗
}

.product-specs {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.product-spec {
  font-size: 12px;
  color: #999999;
  background-color: #F9F5F0; // 添加背景色
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-block;
}

.product-price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  width: 70px;
}

.price {
  font-size: 15px;
  color: #8B5A2B; // 更改为奶茶色
  font-weight: 500; // 稍微加粗
}

.count {
  font-size: 13px;
  color: #999999;
  margin-top: 4px;
}

.order-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  font-size: 13px;
  color: #666666;
}

.order-time {
  color: #999999;
}

.order-total {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.total-price {
  color: #8B5A2B; // 更改为奶茶色
  font-weight: bold;
  font-size: 15px;
  margin-top: 4px;
}

.order-actions {
  margin-top: 10px;
}

.action-btns {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn {
  font-size: 13px;
  padding: 5px 12px;
  border-radius: 20px; // 圆角按钮
  background-color: #FFFFFF;
  border: 1px solid #DDDDDD;
  color: #666666;
  line-height: 1.5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.btn-cancel {
  border-color: #DDDDDD;
  color: #666666;
  
  &:active {
    background-color: #F5F5F5;
  }
}

.btn-primary {
  background: linear-gradient(to right, #8B5A2B, #A67C52); // 渐变背景
  color: #FFFFFF;
  border: none;
  
  &:active {
    opacity: 0.9;
  }
}

.btn-default {
  border-color: #8B5A2B;
  color: #8B5A2B;
  
  &:active {
    background-color: rgba(139, 90, 43, 0.05);
  }
}

.empty-order {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
}

.empty-text {
  color: #999999;
  font-size: 14px;
  margin-top: 15px;
}
</style>