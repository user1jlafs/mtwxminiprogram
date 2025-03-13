<template>
  <view class="search-container">
    <!-- 搜索框 -->
    <view class="search-box">
      <uni-search-bar 
        v-model="searchValue" 
        placeholder="搜索你想喝的奶茶..." 
        @confirm="search" 
        @clear="clear"
        @cancel="goBack"
        cancelButton="always"
        bgColor="#ffffff"
        radius="6"
      ></uni-search-bar>
    </view>
    
    <!-- 搜索历史 -->
    <view class="search-history" v-if="historyList.length > 0 && !searchValue">
      <view class="history-header">
        <text class="title">搜索历史</text>
        <text class="clear" @tap="clearHistory">清除</text>
      </view>
      <view class="history-list">
        <view 
          class="history-item" 
          v-for="(item, index) in historyList" 
          :key="index"
          @tap="tapHistoryItem(item)"
        >
          <text>{{item}}</text>
        </view>
      </view>
    </view>
    
    <!-- 热门搜索 -->
    <view class="hot-search" v-if="!searchValue">
      <view class="hot-header">
        <text class="title">热门搜索</text>
      </view>
      <view class="hot-list">
        <view 
          class="hot-item" 
          v-for="(item, index) in hotList" 
          :key="index"
          @tap="tapHotItem(item.keyword)"
        >
          <text :class="{'hot-rank': index < 3}">{{item.keyword}}</text>
        </view>
      </view>
    </view>
    
    <!-- 搜索结果 -->
    <view class="search-result" v-if="searchValue && searchList.length > 0">
      <view 
        class="product-item" 
        v-for="(product, index) in searchList" 
        :key="index"
        @tap="goToDetail(product.id)"
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
      </view>
    </view>
    
    <!-- 无搜索结果 -->
    <view class="no-result" v-if="searchValue && searchList.length === 0 && isSearched">
      <image src="/static/no-result.png" mode="aspectFit"></image>
      <text>没有找到相关商品</text>
    </view>
  </view>
</template>

<script>
import { GetAllProductRequest, GetHotSearchRequest } from '@/api/ProductRequest'

export default {
  data() {
    return {
      searchValue: '',
      historyList: [],
      hotList: [],
      searchList: [],
      isSearched: false
    }
  },
  onLoad() {
    // 从本地存储获取搜索历史
    const history = uni.getStorageSync('searchHistory')
    this.getHotSearchList()
    if (history) {
      this.historyList = JSON.parse(history)
    }
  },
  methods: {
    // 搜索方法
    search() {
      if (!this.searchValue.trim()) return
      
      // 添加到搜索历史
      this.addToHistory(this.searchValue)
      
      // 调用搜索API
      this.getSearchResult(this.searchValue)
    },
    
    // 获取搜索结果
    async getSearchResult(keyword) {
      this.isSearched = true
      // 调用API获取商品列表
      try {
        const res = await GetAllProductRequest({
        keyword: keyword,
        categoryId: '',
        sort: '',
        page: 1,
        pageSize: 1000
        })
        this.searchList = res.products
        // this.getHotSearchList()
      } catch (error) {
        console.error('搜索失败', error)
        uni.showToast({
          title: '搜索失败',
          icon: 'none'
        })
      }
    },
    // 获取热门搜索词
    async getHotSearchList() {
      try {
        const res = await GetHotSearchRequest()
        console.log(res)
        this.hotList = res.data
      } catch (error) {
        console.error('获取热门搜索词失败', error)
      }
    },
     // 添加到搜索历史
    addToHistory(keyword) {
      // 如果已存在，先移除
      const index = this.historyList.findIndex(item => item === keyword)
      if (index !== -1) {
        this.historyList.splice(index, 1)
      }
      
      // 添加到历史记录开头
      this.historyList.unshift(keyword)
      
      // 限制历史记录数量
      if (this.historyList.length > 10) {
        this.historyList.pop()
      }
      
      // 保存到本地存储
      uni.setStorageSync('searchHistory', JSON.stringify(this.historyList))
    },
    
    // 清空搜索历史
    clearHistory() {
      uni.showModal({
        title: '提示',
        content: '确定要清空搜索历史吗？',
        success: res => {
          if (res.confirm) {
            this.historyList = []
            uni.removeStorageSync('searchHistory')
          }
        }
      })
    },
    
    // 点击历史记录项
    tapHistoryItem(keyword) {
      this.searchValue = keyword
      this.search()
    },
    
    // 点击热门搜索项
    tapHotItem(keyword) {
      this.searchValue = keyword
      this.search()
    },
    
    // 清除搜索
    clear() {
      this.searchValue = ''
      this.searchList = []
      this.isSearched = false
    },
    
    // 返回上一页
    goBack() {
      uni.navigateBack()
    },
    
    // 跳转到商品详情
    goToDetail(productId) {
      uni.navigateTo({
        url: `/subpkg/goods_spec/goods_spec?id=${productId}`
      })
    }
  }
}
</script>

<style lang="scss">
.search-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 20rpx;
}

.search-box {
  padding: 10rpx 0;
  background-color: #ffffff;
}

.search-history, .hot-search {
  margin: 20rpx;
  padding: 20rpx;
  background-color: #ffffff;
  border-radius: 12rpx;
}

.history-header, .hot-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.clear {
  font-size: 24rpx;
  color: #999;
}

.history-list, .hot-list {
  display: flex;
  flex-wrap: wrap;
}

.history-item, .hot-item {
  padding: 10rpx 20rpx;
  background-color: #f7f7f7;
  border-radius: 30rpx;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
  font-size: 24rpx;
  color: #666;
}

.hot-rank {
  color: #ff5500;
  font-weight: bold;
}

.search-result {
  padding: 0 20rpx;
}

.product-item {
  display: flex;
  padding: 20rpx;
  background-color: #ffffff;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
  position: relative;
}

.product-image {
  width: 160rpx;
  height: 160rpx;
  border-radius: 8rpx;
}

.product-info {
  flex: 1;
  padding-left: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.product-desc {
  font-size: 24rpx;
  color: #999;
  margin: 10rpx 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.product-price-box {
  display: flex;
  align-items: center;
}

.price {
  font-size: 32rpx;
  color: #ff5500;
  font-weight: bold;
}

.original-price {
  font-size: 24rpx;
  color: #999;
  text-decoration: line-through;
  margin-left: 10rpx;
}

.no-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 100rpx;
}

.no-result image {
  width: 200rpx;
  height: 200rpx;
  margin-bottom: 20rpx;
}

.no-result text {
  font-size: 28rpx;
  color: #999;
}
</style>