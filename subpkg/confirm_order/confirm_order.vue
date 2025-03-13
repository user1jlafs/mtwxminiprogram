<template>
  <view class="container">
    <!-- 收货地址信息 -->
    <delivery-address 
      :pickup-method.sync="pickupMethod"
      :saved-addresses="savedAddresses"
      :selected-address="selectedAddress"
      :address-form="addressForm"
      @show-address-list="showAddressList"
      @show-region-picker="showRegionPicker"
      @toggle-default-address="toggleDefaultAddress"
    />
    
    <!-- 商品列表 -->
    <product-list 
      :products="cartProducts"
      @show-remark-popup="showRemarkPopup"
    />
    
    <!-- 支付方式 -->
    <payment-method />
    
    <!-- 取餐方式 -->
    <pickup-method 
      :dine-method.sync="dineMethod"
    />
    
    <!-- 底部结算栏 -->
    <order-footer 
      :total-price="totalPrice"
      :discount="discount"
      @submit-order="submitOrder"
    />
  </view>
</template>

<script>
import { CreateOrderRequest } from '@/api/OrderRequest'
import { mapState, mapGetters } from 'vuex'
import DeliveryAddress from '@/components/order/DeliveryAddress.vue'
import ProductList from '@/components/order/ProductList.vue'
import PaymentMethod from '@/components/order/PaymentMethod.vue'
import PickupMethod from '@/components/order/PickupMethod.vue'
import OrderFooter from '@/components/order/OrderFooter.vue'

export default {
  components: {
    DeliveryAddress,
    ProductList,
    PaymentMethod,
    PickupMethod,
    OrderFooter
  },
  data() {
    return {
      pickupMethod: 'self', // self-自提, delivery-外送
      dineMethod: 'store', // store-店内用餐, takeout-自提带走
      remark: '',
      // 购物车数据
      cartProducts: [],
      discount: 0,
      totalPrice: 0,
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
    ...mapState('m_user', ['userInfo']),
    ...mapGetters('m_cart', ['selectedCartList'])
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
      // 从Vuex中获取已选中的购物车商品
      const selectedProducts = this.selectedCartList;
      
      // 将购物车商品转换为订单商品格式
      this.cartProducts = selectedProducts.map(item => {
        return {
          id: item.id,
          name: item.name,
          specification: this.formatSpecs(item.specs),
          price: item.price,
          originalPrice: item.originalPrice || null,
          count: item.quantity,
          image: item.image,
          isSpecial: item.isSpecial || false
        };
      });
      
      // 计算总价
      this.calculateTotal();
    },
    
    // 计算总价
    calculateTotal() {
      let total = 0;
      let originalTotal = 0;
      
      this.cartProducts.forEach(item => {
        total += item.price * item.count;
        if (item.originalPrice) {
          originalTotal += item.originalPrice * item.count;
        } else {
          originalTotal += item.price * item.count;
        }
      });
      
      this.totalPrice = total.toFixed(1);
      // 计算优惠金额（原价总和 - 实际总价）
      this.discount = (originalTotal - total).toFixed(1);
      
      // 如果没有优惠，设置为0
      if (this.discount <= 0) {
        this.discount = 0;
      }
    },
    
    // 格式化规格信息为可读字符串
    formatSpecs(specs) {
      if (!specs) return '';
      
      // 过滤掉空值的规格
      const validSpecs = Object.entries(specs)
        .filter(([key, value]) => value && value.trim() !== '')
        .map(([key, value]) => {
          // 将规格类型转为中文显示
          let typeText = key;
          switch(key) {
            case 'size': typeText = '杯型'; break;
            case 'sugar': typeText = '糖度'; break;
            case 'temperature': typeText = '温度'; break;
            case 'addon': typeText = '加料'; break;
          }
          return `${typeText}: ${value}`;
        });
      
      return validSpecs.join(' | ');
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
          
          // 清空购物车中已选中的商品
          this.$store.commit('m_cart/removeSelectedGoods');
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
</style>
