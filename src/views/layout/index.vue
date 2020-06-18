<template>
  <div class="layout-container">
    <router-view />
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/home">
        <template #icon>
          <i class="toutiao toutiao-shouye"></i>
        </template>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item icon="search" to="/question">
        <template #icon>
          <i class="toutiao toutiao-wenda"></i>
        </template>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/video">
        <template #icon>
          <i class="toutiao toutiao-shipin"></i>
        </template>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/my">
        <template #icon>
          <i class="toutiao toutiao-wode"></i>
        </template>
        <span class="text">我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.layout-container {
  .toutiao {
    font-size: 40px;
  }
  .text {
    font-size: 20px;
  }
}
</style>
