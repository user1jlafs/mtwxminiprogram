<template>
  <view class="container">
    <!-- 订单状态卡片 -->
    <view class="status-card">
      <view class="status-icon">
        <uni-icons :type="getStatusIcon(orderDetail.status)" size="32" color="#8B5A2B"></uni-icons>
      </view>
      <view class="status-info">
        <text class="status-text">{{getStatusText(orderDetail.status)}}</text>
        <text class="status-desc">{{getStatusDesc(orderDetail.status)}}</text>
      </view>
    </view>

    <!-- 配送信息 -->
    <view class="info-card">
      <view class="card-title">
        <uni-icons type="location" size="16" color="#8B5A2B"></uni-icons>
        <text>配送信息</text>
      </view>
      <view class="delivery-info">
        <text class="address">{{orderDetail.deliveryAddress}}</text>
      </view>
    </view>

    <!-- 订单商品 -->
    <view class="info-card">
      <view class="card-title">
        <uni-icons type="shop" size="16" color="#8B5A2B"></uni-icons>
        <text>订单商品</text>
      </view>
      <view class="product-list">
        <view class="product-item" v-for="(item, index) in orderDetail.orderItems" :key="index">
          <image :src="item.product.image" mode="aspectFill" class="product-image"></image>
          <view class="product-info">
            <text class="product-name">{{item.product.name}}</text>
            <view class="product-specs">
              <text class="spec-tag" v-for="spec in item.specValues" :key="spec.id">{{spec.value}}</text>
            </view>
          </view>
          <view class="product-price">
            <text class="price">¥{{item.price}}</text>
            <text class="quantity">x{{item.quantity}}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 订单信息 -->
    <view class="info-card">
      <view class="card-title">
        <uni-icons type="list" size="16" color="#8B5A2B"></uni-icons>
        <text>订单信息</text>
      </view>
      <view class="order-info">
        <view class="info-item">
          <text class="label">订单编号</text>
          <text class="value">{{orderDetail.orderNumber}}</text>
        </view>
        <view class="info-item">
          <text class="label">下单时间</text>
          <text class="value">{{formatDate(orderDetail.createdAt)}}</text>
        </view>
        <view class="info-item">
          <text class="label">备注</text>
          <text class="value">{{orderDetail.note || '无'}}</text>
        </view>
      </view>
    </view>

    <!-- 支付信息 -->
    <view class="info-card">
      <view class="payment-info">
        <view class="info-item">
          <text class="label">商品总额</text>
          <text class="value">¥{{orderDetail.totalAmount}}</text>
        </view>
        <view class="info-item" v-if="orderDetail.discount > 0">
          <text class="label">优惠金额</text>
          <text class="value">-¥{{orderDetail.discount}}</text>
        </view>
        <view class="info-item total">
          <text class="label">实付金额</text>
          <text class="value price-total">¥{{orderDetail.totalAmount}}</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { GetUserOrderDetailRequest } from '@/api/OrderRequest.js'
import dateMixin from '@/mixins/dateMixin.js'
export default {
  mixins: [dateMixin],
  data () {
    return {
      orderDetail: {}
    }
  },
  onLoad (options) {
    this.getOrderDetail(options.id)
  },
  methods: {
    async getOrderDetail (id) {
      const res = await GetUserOrderDetailRequest(id)
      console.log(res)
      this.orderDetail = res
    },
    // 根据订单状态返回不同的图标类型
    getStatusIcon(status) {
      switch (status) {
        case 'pending':
          return 'time';
        case 'shipped':
          return 'paperplane';
        case 'completed':
          return 'checkmark';
        case 'cancelled':
          return 'close';
        case 'preparing':
          return 'more-filled';
        default:
          return 'help';
      }
    },
    // 根据订单状态返回不同的文本
    getStatusText(status) {
      switch (status) {
        case 'pending':
          return '待支付';
        case 'shipped':
          return '配送中';
        case 'completed':
          return '已送达';
        case 'cancelled':
          return '已取消';
        case 'preparing':
          return '制作中';  
        default:
          return '未知状态';
      }
    },
    // 根据订单状态返回不同的描述
    getStatusDesc(status) {
      switch (status) {
        case 'pending':
          return '您的订单还未支付。';
        case 'shipped':
          return '您的订单正在配送中,请耐心等待。';
        case 'completed':
          return '您的订单已送达，感谢您的购买。';
        case 'cancelled':
          return '您的订单已取消，如有疑问请联系客服。';
        case 'preparing':
          return '您的订单正在制作中，请耐心等待。';
        default:
          return '未知状态，请联系客服。';
      }
    }
  }
}
</script>
<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #F8F8F8;
  padding-bottom: env(safe-area-inset-bottom);
}

.status-card {
  background: linear-gradient(135deg, #edc7a1, #926940);
  padding: 32rpx;
  display: flex;
  align-items: center;
  color: #FFFFFF;

  .status-icon {
    margin-right: 24rpx;
  }

  .status-info {
    .status-text {
      font-size: 32rpx;
      font-weight: bold;
      margin-bottom: 8rpx;
    }

    .status-desc {
      font-size: 24rpx;
      opacity: 0.8;
    }
  }
}

.info-card {
  background: #FFFFFF;
  margin: 20rpx;
  border-radius: 12rpx;
  padding: 24rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);

  .card-title {
    display: flex;
    align-items: center;
    padding-bottom: 16rpx;
    border-bottom: 1rpx solid #EEEEEE;
    margin-bottom: 16rpx;

    text {
      margin-left: 8rpx;
      font-size: 28rpx;
      color: #333333;
      font-weight: bold;
    }
  }
}

.product-list {
  .product-item {
    display: flex;
    padding: 16rpx 0;
    border-bottom: 1rpx solid #F5F5F5;

    .product-image {
      width: 120rpx;
      height: 120rpx;
      border-radius: 8rpx;
    }

    .product-info {
      flex: 1;
      margin-left: 16rpx;

      .product-name {
        font-size: 28rpx;
        color: #333333;
        margin-bottom: 8rpx;
      }

      .product-specs {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: hidden;

        .spec-tag {
          font-size: 22rpx;
          color: #999999;
          background: #F5F5F5;
          padding: 4rpx 12rpx;
          border-radius: 4rpx;
          margin-right: 8rpx;
        }
      }
    }

    .product-price {
      text-align: right;

      .price {
        font-size: 28rpx;
        color: #8B5A2B;
        font-weight: bold;
      }

      .quantity {
        font-size: 24rpx;
        color: #999999;
        margin-left: 8rpx;
      }
    }
  }
}

.order-info, .payment-info {
  .info-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16rpx;

    .label {
      color: #666666;
      font-size: 26rpx;
    }

    .value {
      color: #333333;
      font-size: 26rpx;
    }
  }

  .total {
    margin-top: 16rpx;
    padding-top: 16rpx;
    border-top: 1rpx solid #EEEEEE;

    .price-total {
      color: #8B5A2B;
      font-size: 32rpx;
      font-weight: bold;
    }
  }
}
</style>