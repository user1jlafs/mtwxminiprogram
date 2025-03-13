export default {
  namespaced: true,
  state: () => ({
    token: uni.getStorageSync('token') || '',
    userInfo: JSON.parse(uni.getStorageSync('userInfo')) || ''
  }),
  mutations: {
    // 更新用户登录状态
    updateLoginState(state, token) {
      state.token = token
      uni.setStorageSync('token', token)
    },
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo
      uni.setStorageSync('userInfo', JSON.stringify(userInfo))
    },
    // 退出登录
    logout(state) {
      state.token = ''
      state.userInfo = null
      uni.removeStorageSync('token')
    }
  },
  actions: {
    // 登录操作
    login({ commit }, { token, userInfo } ) {
      commit('updateLoginState', token)
      commit('updateUserInfo', userInfo)
    },
    // 退出登录
    logout({ commit }) {
      commit('logout')
    }
  },
  getters: {
  }
}