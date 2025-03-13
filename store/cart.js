export default {
  namespaced: true,
  
  // 购物车的state数据
  state: () => ({
    // 购物车数组，用来存储购物车中每个商品的信息对象
    // 商品信息对象 { id, name, price, image, quantity, selected }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  
  // 模块的mutations方法
  mutations: {
    // 添加商品到购物车
    addToCart(state, goods) {
      // 生成规格字符串用于比较
      const specsStr = goods.specs ? JSON.stringify(goods.specs) : ''
      
      // 查询购物车中是否已有该商品（相同ID和相同规格）
      const findResult = state.cart.find(item => {
        const itemSpecsStr = item.specs ? JSON.stringify(item.specs) : ''
        return item.id === goods.id && itemSpecsStr === specsStr
      })
      
      if (!findResult) {
        // 如果购物车中没有这件商品（或相同商品但不同规格），则直接push
        // 默认新添加的商品是选中状态
        state.cart.push({
          ...goods,
          selected: true
        })
      } else {
        // 如果购物车中有这件商品（相同ID和相同规格），则只更新数量
        findResult.quantity += goods.quantity
      }
      
      // 将购物车数据持久化存储到本地
      this.commit('m_cart/saveToStorage')
    },
    
    // 更新购物车中商品的数量
    updateGoodsQuantity(state, goods) {
      // 根据id查询购物车中对应商品
      const findResult = state.cart.find(item => item.id === goods.id)
      
      if (findResult) {
        // 更新对应商品的数量
        findResult.quantity = goods.quantity
        // 持久化存储到本地
        this.commit('m_cart/saveToStorage')
      }
    },
    
    // 根据id删除对应的商品
    removeGoodsById(state, id) {
      // 过滤掉id对应的商品
      state.cart = state.cart.filter(item => item.id !== id)
      // 持久化存储到本地
      this.commit('m_cart/saveToStorage')
    },
    
    // 清空购物车
    clearCart(state) {
      // 清空购物车数组
      state.cart = []
      // 持久化存储到本地
      this.commit('m_cart/saveToStorage')
    },
    
    // 将购物车数据持久化存储到本地
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    
    // 更新商品的选中状态
    updateGoodsSelected(state, { id, selected }) {
      const findResult = state.cart.find(item => item.id === id)
      
      if (findResult) {
        findResult.selected = selected
        this.commit('m_cart/saveToStorage')
      }
    },
    
    // 更新所有商品的选中状态
    updateAllGoodsSelected(state, selected) {
      // 循环更新所有商品的选中状态
      state.cart.forEach(item => item.selected = selected)
      // 持久化存储到本地
      this.commit('m_cart/saveToStorage')
    },
    
    // 批量添加商品到购物车
    addMultiToCart(state, goodsList) {
      goodsList.forEach(goods => {
        // 查询购物车中是否已有该商品
        const findResult = state.cart.find(item => item.id === goods.id)
        
        if (!findResult) {
          // 如果购物车中没有这件商品，则直接push
          state.cart.push({
            ...goods,
            selected: true
          })
        } else {
          // 如果购物车中有这件商品，则只更新数量
          findResult.quantity += goods.quantity
        }
      })
      
      // 将购物车数据持久化存储到本地
      this.commit('m_cart/saveToStorage')
    },
    
    // 批量删除选中的商品
    removeSelectedGoods(state) {
      // 过滤掉选中的商品
      state.cart = state.cart.filter(item => !item.selected)
      // 持久化存储到本地
      this.commit('m_cart/saveToStorage')
    }
  },
  
  // 模块的getters属性
  getters: {
    // 购物车中商品的总数量
    totalCount(state) {
      return state.cart.reduce((total, item) => total + item.quantity, 0)
    },
    
    // 购物车中商品的总价格
    totalPrice(state) {
      return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
    },
    
    // 购物车中选中商品的总数量
    checkedCount(state) {
      // 先过滤出选中的商品，再计算总数量
      return state.cart.filter(item => item.selected)
        .reduce((total, item) => total + item.quantity, 0)
    },
    
    // 购物车中选中商品的总价格
    checkedPrice(state) {
      // 先过滤出选中的商品，再计算总价格
      return state.cart.filter(item => item.selected)
        .reduce((total, item) => total + (item.price * item.quantity), 0)
        .toFixed(2)
    },
    
    // 判断购物车是否为空
    isEmpty(state) {
      return state.cart.length === 0
    },
    
    // 判断是否全选
    isAllSelected(state) {
      // 空购物车默认返回false
      if (state.cart.length === 0) return false
      // 只要有一个商品没选中，就返回false
      return !state.cart.some(item => !item.selected)
    },
    
    // 获取购物车中指定商品的数量
    getGoodsQuantity: (state) => (id) => {
      const findResult = state.cart.find(item => item.id === id)
      return findResult ? findResult.quantity : 0
    },
    
    // 获取购物车中指定商品的选中状态
    getGoodsSelected: (state) => (id) => {
      const findResult = state.cart.find(item => item.id === id)
      return findResult ? findResult.selected : false
    },
    
    // 获取购物车中的商品列表
    cartList(state) {
      return state.cart
    },
    
    // 获取购物车中选中的商品列表
    selectedCartList(state) {
      return state.cart.filter(item => item.selected)
    }
  }
}