<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" :border="false" fixed>
      <van-button
        class="search-btn"
        slot="title"
        size="small"
        round
        icon="search"
      >
        搜索
      </van-button>
    </van-nav-bar>

    <!-- 导航标签栏 -->
    <van-tabs class="nav-tabs" v-model="active" animated swipeable>
      <van-tab
        :key="channel.id"
        v-for="channel in channelsList"
        :title="channel.name"
      >
        <article-list :channel="channel" />
      </van-tab>
      <div class="placeholder" slot="nav-right"></div>
      <div class="burger-btn" slot="nav-right" @click="onBurgerBtn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 编辑频道弹层 -->
    <van-popup
      v-model="showEditChannel"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    />
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'

export default {
  name: 'HomeIndex',
  data() {
    return {
      active: 0,
      channelsList: [],
      showEditChannel: false
    }
  },
  components: {
    ArticleList
  },
  created() {
    this.loadChannelsList()
  },
  methods: {
    onBurgerBtn() {
      this.showEditChannel = true
    },
    async loadChannelsList() {
      try {
        const { data: res } = await getUserChannels()
        this.channelsList = res.data.channels
      } catch (err) {
        this.$toast('获取用户频道列表失败，请稍后再试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 180px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }

  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    color: #fff;
    font-size: 28px;
    .van-icon {
      color: #fff;
      font-size: 32px;
    }
  }

  /deep/.nav-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      right: 0;
      left: 0;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__line {
      width: 31px !important;
      background-color: #3296fa;
      bottom: 8px;
    }
    .van-tabs__nav--line {
      padding-bottom: 0;
    }
    .burger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      .toutiao {
        font-size: 33px;
      }
      &::after {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 66px;
        background: url('~@/assets/gradient-gray-line.png');
      }
    }
    .placeholder {
      width: 66px;
      height: 82px;
      flex-shrink: 0;
    }
  }
}
</style>
