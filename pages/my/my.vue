<template>
  <view class="container">
    <!-- 状态栏占位 -->
    <view class="status-bar" :style="{height: statusBarHeight + 'px'}"></view>
    <view class="container-box">
      <myLogin v-if="!token"></myLogin>
      <myUserInfo v-else></myUserInfo>
    </view>
  </view>
</template>
<script>
import myLogin from '@/components/myLogin.vue'
import myUserInfo from '@/components/myUserInfo.vue'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      statusBarHeight: 0
    }
  },
  components: {
    myLogin,
    myUserInfo
  },
  computed: {
    ...mapState('m_user', ['token'])
  },
  onLoad() {
    // 获取状态栏高度
    const systemInfo = uni.getSystemInfoSync()
    this.statusBarHeight = systemInfo.statusBarHeight
  }
}
</script>
<style lang="scss">
.container {
  width: 100%;
  height: 100%;
  background-color: #F8F8F8;
  box-sizing: border-box;
  overflow-x: hidden;
  
  /* 状态栏样式 */
  .status-bar {
    width: 100%;
    background-color: #8B5A2B;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
  }
  
  .container-box {
    width: 100%;
    padding-top: 0;
    margin-top: 0;
  }
}
</style>