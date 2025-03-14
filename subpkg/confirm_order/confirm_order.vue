<template>
  <view class="container">
    <!-- 收货地址信息 -->
    <delivery-address 
      :address="wxAddress"
      @address-selected="handleAddressSelected"
    />
    
    <!-- 商品列表 -->
    <product-list 
      :products="cartProducts"
      @show-remark-popup="showRemarkPopup"
      :remark="remark"
    />
    
    <!-- 支付方式 -->
    <payment-method />
    
    <!-- 底部结算栏 -->
    <order-footer 
      :total-price="totalPrice"
      :discount="discount"
      @submit-order="submitOrder"
    />
  </view>
</template>

<script>
import { CreateOrderRequest, PayOrderRequest } from '@/api/OrderRequest'
import { mapState, mapGetters } from 'vuex'
import DeliveryAddress from '@/components/order/DeliveryAddress.vue'
import ProductList from '@/components/order/ProductList.vue'
import PaymentMethod from '@/components/order/PaymentMethod.vue'
import OrderFooter from '@/components/order/OrderFooter.vue'

export default {
  components: {
    DeliveryAddress,
    ProductList,
    PaymentMethod,
    OrderFooter
  },
  data() {
    return {
      remark: '',
      // 购物车数据
      cartProducts: [],
      discount: 0,
      totalPrice: 0,
      // 微信收货地址
      wxAddress: null
    }
  },
  computed: {
    ...mapState('m_user', ['userInfo']),
    ...mapGetters('m_cart', ['selectedCartList'])
  },
  onLoad(options) {
    // 获取状态栏高度
    this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight
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
    // 从购物车获取商品列表
    this.getCartProducts()
    // 尝试从本地存储加载上次选择的地址
    try {
      const savedAddress = uni.getStorageSync('lastSelectedAddress')
      if (savedAddress) {
        this.wxAddress = JSON.parse(savedAddress)
      }
    } catch (e) {
      console.error('加载地址失败', e)
    }
  },
  methods: {
    // 处理地址选择
    handleAddressSelected(address) {
      // 更新微信地址
      this.wxAddress = address
      // 保存地址到本地存储
      uni.setStorageSync('lastSelectedAddress', JSON.stringify(address))
    },
    
    // 格式化规格信息为可读字符串
    formatSpecs(specs) {
      if (!specs) return ''
      const validSpecs = Object.entries(specs)
        .filter(([key, value]) => value && value.trim() !== '')
        .map(([key, value]) => {
          let typeText = key
          switch(key) {
            case 'size': typeText = '杯型'; break
            case 'sugar': typeText = '糖度'; break
            case 'temperature': typeText = '温度'; break
            case 'addon': typeText = '加料'; break
          }
          return `${typeText}: ${value}`
        })
      return validSpecs.join(' | ')
    },
    
    // 获取购物车商品
    getCartProducts() {
      const selectedProducts = this.selectedCartList
      this.cartProducts = selectedProducts.map(item => ({
        id: item.id,
        name: item.name,
        specification: this.formatSpecs(item.specs),
        specs: item.specs,
        price: item.price,
        originalPrice: item.originalPrice || null,
        count: item.quantity,
        image: item.image,
        isSpecial: item.isSpecial || false
      }))
      this.calculateTotal()
    },
    
    // 计算总价
    calculateTotal() {
      let total = 0
      let originalTotal = 0
      this.cartProducts.forEach(item => {
        total += item.price * item.count
        if (item.originalPrice) {
          originalTotal += item.originalPrice * item.count
        } else {
          originalTotal += item.price * item.count
        }
      })
      this.totalPrice = total.toFixed(1)
      this.discount = (originalTotal - total).toFixed(1)
      if (this.discount <= 0) {
        this.discount = 0
      }
    },
    
    // 显示备注弹窗
    showRemarkPopup() {
      uni.showModal({
        title: '添加备注',
        content: '',
        editable: true,
        placeholderText: '请输入特殊要求: 如少糖、少冰等',
        success: (res) => {
          if (res.confirm && res.content) {
            this.remark = res.content
          }
        }
      })
    },
    
    // 提交订单
    async submitOrder() {
      if (!this.userInfo) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        })
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/my/my'
          })
        }, 1500)
        return
      }
      if (!this.wxAddress) {
        uni.showToast({
          title: '请选择收货地址',
          icon: 'none'
        })
        return
      }
      const orderData = {
        items: this.cartProducts.map(item => ({
          productId: item.id,
          quantity: item.count,
          specs: item.specs
        })),
        deliveryAddress: '',
        paymentMethod: 'wechat',
        note: this.remark
      }
      if (this.wxAddress) {
        orderData.deliveryAddress = this.wxAddress.cityName + this.wxAddress.countyName + this.wxAddress.detailInfo
      }
      try {
        const result = await CreateOrderRequest(orderData)
        uni.showModal({
        	title: '温馨提示',
        	content: '你确定要支付吗',
        	success: async res => {
        		if (res.confirm) {
              // 调用支付接口
              await PayOrderRequest(result.id)
              this.$store.commit('m_cart/removeSelectedGoods')
              uni.showToast({
                title: '支付成功',
                icon: 'success'
              })
        		} else if (res.cancel) {
              uni.showToast({
                title: '取消支付',
                icon: 'none'
              })
        		}
            // 跳转到订单页面
            setTimeout(() => {
                uni.switchTab({
                  url: '/pages/order/order'
                })
            }, 1500)
        	}
        })
      } catch (error) {
        console.error(error)
        uni.showToast({
          title: '创建订单失败',
          icon: 'none'
        })
      }
    }
  }
}
</script>


