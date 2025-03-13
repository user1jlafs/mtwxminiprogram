<template>
  <view class="container">
    <!-- 状态栏占位 -->
    <view class="status-bar" :style="{height: statusBarHeight + 'px'}"></view>
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="search-box" @click="goToSearch">
        <uni-icons type="search" size="18" color="#999"></uni-icons>
        <text class="placeholder">搜索你想喝的...</text>
      </view>
    </view>
    
    <!-- 菜单内容区 -->
    <view class="menu-container">
      <!-- 左侧分类列表 -->
      <scroll-view class="category-list" scroll-y ref="categoryList" :scroll-with-animation="false">
        <view 
          v-for="(category, index) in categories" 
          :key="index"
          class="category-item"
          :class="{active: currentCategory === index}"
          @tap="switchCategory(index)"
          :id="'category-item-' + index"
        >
          <view class="category-content">
            <uni-icons v-if="currentCategory === index && category.name === '经典奶茶'" type="fire" size="16" color="#ff5500"></uni-icons>
            <text>{{category.name}}</text>
          </view>
        </view>
      </scroll-view>
      
      <!-- 右侧商品列表 -->
      <scroll-view class="product-list" scroll-y ref="productList" enhanced @scroll="onProductListScroll">
        <!-- 分类及商品列表（嵌套渲染） -->
        <view 
          v-for="(category, categoryIndex) in categories" 
          :key="categoryIndex" 
          class="category-section"
          :id="'category-' + categoryIndex"
        >
          <!-- 分类标题 -->
          <view class="category-title">
            <text>{{category.name}}</text>
          </view>
          
          <!-- 该分类下的商品列表 -->
          <view class="product-container">
            <view 
              class="product-item" 
              v-for="(product, productIndex) in category.products" 
              :key="productIndex"
            >
              <image class="product-image" :src="product.image" mode="aspectFill"></image>
              <view class="product-info">
                <text class="product-name">{{product.name}}</text>
                <text class="product-desc">{{product.description}}</text>
                <view class="product-price-box">
                  <text class="price">¥{{product.price}}</text>
                  <text class="original-price" v-if="product.originalPrice">¥{{product.originalPrice}}</text>
                </view>
              </view>
              <view class="add-btn" @click="goToSpec(product.id)">
                <uni-icons type="plusempty" size="20" color="#fff"></uni-icons>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <cartComponent></cartComponent>
  </view>
</template>

<script>
import { GetAllCategoryListRequest } from '@/api/CategoryRequest'
import cartComponent from '@/components/cartComponent'
export default {
  components: {
    cartComponent
  },
  data () {
    return {
      statusBarHeight: 0,
      currentCategory: 0,
      categories: [],
      products: [],
      // 添加一个变量用于存储各分类的位置信息
      categoryPositions: [],
      // 添加一个变量，用于管理滚动定时器
      scrollTimer: null
    }
  },
  onLoad () {
      // 获取状态栏高度
      const systemInfo = uni.getSystemInfoSync();
      this.statusBarHeight = systemInfo.statusBarHeight;
      this.getCategoryList()
    },
  // 在组件挂载后初始化分类位置信息
  mounted() {
    // 数据加载后，延迟执行以确保DOM已渲染
    setTimeout(() => {
      this.initCategoryPositions();
    }, 500);
  },
  // 监听右侧商品列表滚动事件
  onReady() {
    // 在页面准备完成后，获取scroll-view节点
    this.$nextTick(() => {
      const scrollView = this.$refs.productList;
      if (scrollView) {
        console.log('scroll-view节点已获取');
      }
    });
  },
  methods: {
    // 处理商品列表滚动事件
    onProductListScroll(e) {
      // 获取当前滚动位置
      const scrollTop = e.detail.scrollTop;
      
      // 如果分类位置信息尚未初始化，则不处理
      if (this.categoryPositions.length === 0) return;
      
      // 根据滚动位置判断当前显示的主要分类
      let currentIndex = 0;
      
      // 遍历所有分类位置，找到当前滚动位置对应的分类
      for (let i = this.categoryPositions.length - 1; i >= 0; i--) {
        // 如果滚动位置大于等于某个分类的位置，则认为当前显示的是该分类
        // 为了更好的用户体验，可以添加一个偏移量，比如50
        if (scrollTop >= this.categoryPositions[i] - 50) {
          currentIndex = i;
          break;
        }
      }
      
      // 如果当前分类发生变化，则立即更新左侧分类选中状态
      if (this.currentCategory !== currentIndex) {
        console.log(`滚动切换分类: 从${this.currentCategory}到${currentIndex}`);
        this.currentCategory = currentIndex;
      }
    },
    // 初始化所有分类的位置信息
    initCategoryPositions() {
      if (this.categories.length === 0) return;
      
      const query = uni.createSelectorQuery().in(this);
      const productListQuery = uni.createSelectorQuery().in(this);
      
      // 先获取scroll-view的位置信息
      productListQuery.select('.product-list').boundingClientRect(scrollViewData => {
        if (!scrollViewData) {
          console.error('无法获取product-list的位置信息');
          return;
        }
        
        // 获取所有分类的位置信息
        this.categories.forEach((_, index) => {
          query.select(`#category-${index}`).boundingClientRect(data => {
            if (data) {
              // 计算相对于scroll-view的位置
              const position = Math.max(0, data.top - scrollViewData.top);
              // 存储位置信息
              this.categoryPositions[index] = position;
              console.log(`初始化分类${index}位置: ${position}`);
            }
          }).exec();
        });
      }).exec();
    },
    // 切换分类
    switchCategory(index) {
      // 清除之前可能存在的定时器
      if (this.scrollTimer) {
        clearTimeout(this.scrollTimer);
      }
      
      // 立即更新当前分类索引
      this.currentCategory = index;
      
      // 滚动右侧商品列表到对应的分类区域
      this.$nextTick(() => {
        // 如果已经有缓存的位置信息，直接使用
        if (this.categoryPositions[index] !== undefined) {
          console.log(`使用缓存位置滚动到分类: ${index}, 位置: ${this.categoryPositions[index]}`);
          this.scrollToPosition(this.categoryPositions[index]);
        } else {
          // 否则重新计算位置
          const selectorQuery = uni.createSelectorQuery().in(this);
          selectorQuery.select(`#category-${index}`).boundingClientRect(data => {
            if (data) {
              // 获取scroll-view的滚动位置信息
              const productListQuery = uni.createSelectorQuery().in(this);
              productListQuery.select('.product-list').boundingClientRect(scrollViewData => {
                if (scrollViewData) {
                  // 计算需要滚动的位置（相对于scroll-view的顶部）
                  let scrollTop = data.top - scrollViewData.top;
                  
                  // 添加边界检查，确保scrollTop不为负值
                  scrollTop = Math.max(0, scrollTop);
                  
                  console.log(`滚动到分类: ${index}, 目标元素位置: ${data.top}, scroll-view位置: ${scrollViewData.top}, 计算的scrollTop: ${scrollTop}`);
                  
                  // 缓存位置信息以便下次使用
                  this.categoryPositions[index] = scrollTop;
                  
                  // 滚动到指定位置
                  this.scrollToPosition(scrollTop);
                } else {
                  console.error('无法获取product-list的位置信息');
                }
              }).exec();
            } else {
              console.error(`无法找到分类元素: category-${index}`);
            }
          }).exec();
        }
      });
    },
    // 封装滚动方法
    scrollToPosition(scrollTop) {
      uni.createSelectorQuery().in(this).select('.product-list').node(res => {
        if (res && res.node && res.node.scrollTo) {
          console.log('开始滚动到位置:', scrollTop);
          
          // 设置较短的滚动动画时间，使滚动更快速响应
          res.node.scrollTo({
            top: scrollTop,
            duration: 300  // 减少滚动动画时间，提高响应速度
          });
        } else {
          console.error('无法获取scroll-view节点或scrollTo方法不可用');
        }
      }).exec();
    },
    // 获取分类及其商品列表
    async getCategoryList () {
      const products = []
      try {
        const categories = await GetAllCategoryListRequest()
        for (const category of categories) {
          products.push(...category.products)
        }
        this.categories = categories
        this.products = products
      } catch (error) {
        console.error(error)
      }
    },
    // 跳转至商品规格选择页面
    goToSpec (id) {
      uni.navigateTo({
        url: `/subpkg/goods_spec/goods_spec?id=${id}`
      })
    },
    // 跳转至搜索页面
    goToSearch() {
      uni.navigateTo({
        url: '/subpkg/search/search'
      })
    }
  }
}
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #F8F8F8;
}

/* 状态栏样式 */
.status-bar {
  width: 100%;
  background-color: #FFFFFF;
}

/* 顶部导航栏样式 */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15rpx 20rpx;
  background-color: #FFFFFF;
  border-bottom: 1px solid #f0f0f0;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.03);
  
  .delivery-options {
    display: flex;
    
    .option {
      padding: 6rpx 20rpx;
      margin-right: 10rpx;
      font-size: 28rpx;
      border-radius: 30rpx;
      
      &.active {
        color: #fff;
        background-color: #5677FC;
      }
    }
  }
  
  .search-box {
    display: flex;
    align-items: center;
    flex: 1;
    width: 475rpx;
    height: 60rpx;
    margin: 0 20rpx;
    padding: 0 20rpx;
    background-color: #F5F5F5;
    border-radius: 30rpx;
    transition: all 0.3s ease;
    
    .placeholder {
      margin-left: 10rpx;
      font-size: 26rpx;
      color: #999;
    }
  }
}

/* 店铺信息样式 */
.shop-info {
  padding: 20rpx;
  background-color: #fff;
  margin-bottom: 20rpx;
  
  .shop-location {
    display: flex;
    align-items: center;
    margin-bottom: 10rpx;
    
    .shop-name {
      margin: 0 10rpx;
      font-size: 28rpx;
      font-weight: bold;
    }
  }
  
  .shop-notice {
    display: flex;
    align-items: center;
    
    .notice-text {
      margin-left: 10rpx;
      font-size: 26rpx;
      color: #666;
    }
  }
}

/* 菜单内容区样式 */
.menu-container {
  display: flex;
  flex: 1;
  overflow: hidden;
  margin-top: 10rpx;
  
  .category-list {
    width: 170rpx;
    background-color: #F5F5F5;
    height: 100%;
    border-radius: 0 20rpx 0 0;
    
    .category-item {
      padding: 30rpx 10rpx;
      font-size: 26rpx;
      text-align: center;
      position: relative;
      color: #666666;
      margin-bottom: 10rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: all 0.3s ease;
      
      .category-content {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6rpx;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      &.active {
        background-color: #FFFFFF;
        color: #8B5A2B;
        font-weight: bold;
        
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 30%;
          height: 40%;
          width: 6rpx;
          background-color: #8B5A2B;
          border-radius: 0 3rpx 3rpx 0;
        }
      }
    }
  }
  
  .product-list {
    flex: 1;
    background-color: #F8F8F8;
    padding: 10rpx 20rpx;
    height: 100%;
    border-radius: 20rpx 0 0 0;
    
    .category-section {
      margin-bottom: 25rpx;
      background-color: #FFFFFF;
      border-radius: 15rpx;
      padding: 15rpx;
      box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.08);
    }
    
    .category-title {
      padding: 20rpx 0;
      font-size: 32rpx;
      font-weight: bold;
      color: #8B5A2B;
      display: flex;
      align-items: center;
      position: relative;
      padding-left: 20rpx;
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 8rpx;
        height: 30rpx;
        background-color: #8B5A2B;
        border-radius: 4rpx;
      }
      
      &::after {
        content: '';
        flex: 1;
        height: 1px;
        background-color: #F0F0F0;
        margin-left: 20rpx;
      }
    }
    
    .product-container {
      .product-item {
        display: flex;
        padding: 20rpx 0;
        border-bottom: 1px solid #F5F5F5;
        position: relative;
        transition: all 0.3s ease;
        
        .product-image {
          width: 160rpx;
          height: 160rpx;
          border-radius: 15rpx;
          margin-right: 20rpx;
          box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.08);
          transition: transform 0.3s ease;
        }
        
        .product-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          
          .product-name {
            font-size: 30rpx;
            font-weight: bold;
            margin-bottom: 10rpx;
            color: #333333;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .product-desc {
            font-size: 24rpx;
            color: #999999;
            margin-bottom: 20rpx;
            line-height: 1.4;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          
          .product-price-box {
            display: flex;
            align-items: center;
            
            .price {
              font-size: 32rpx;
              color: #E57373;
              font-weight: bold;
            }
            
            .original-price {
              font-size: 24rpx;
              color: #999999;
              text-decoration: line-through;
              margin-left: 10rpx;
            }
          }
        }
        
        .add-btn {
          position: absolute;
          right: 10rpx;
          bottom: 20rpx;
          width: 50rpx;
          height: 50rpx;
          border-radius: 50%;
          background-color: #8B5A2B;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2rpx 10rpx rgba(139, 90, 43, 0.3);
          transition: all 0.3s ease;
        }
        
        .add-btn:active {
          transform: scale(0.9);
          background-color: #7A4A1D;
        }
      }
    }
  }
}

/* 底部购物车样式 */
.cart-bar {
  display: flex;
  height: 100rpx;
  background-color: #333333;
  box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.1);
  border-radius: 30rpx 30rpx 0 0;
  
  .cart-info {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    
    .cart-icon {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      background-color: #8B5A2B;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20rpx;
      box-shadow: 0 4rpx 10rpx rgba(139, 90, 43, 0.3);
      position: relative;
      top: -15rpx;
    }
    
    .price-info {
      .total-price {
        color: #fff;
        font-size: 36rpx;
        font-weight: bold;
      }
    }
  }
  
  .checkout-btn {
    width: 200rpx;
    background-color: #E57373;
    border-radius: 0 0 30rpx 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 30rpx;
    font-weight: bold;
  }
}
</style>