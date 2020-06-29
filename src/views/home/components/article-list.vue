<template>
  <div class="article-list-container">
    <van-pull-refresh
      v-model="reFreshLoading"
      @refresh="onRefresh"
      :success-text="successText"
      :success-duration="1000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <van-cell
          v-for="article in list"
          :key="article.art_id"
          :title="article.title"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      reFreshLoading: false,
      successText: '刷新成功'
    }
  },
  methods: {
    async onLoad() {
      try {
        const { data: res } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        // console.log(res, '文章列表')
        const { results, pre_timestamp: preTimestamp } = res.data
        this.list.push(...results)
        this.loading = false
        // 判断数据是否加载完毕
        if (results.length) {
          this.timestamp = preTimestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh() {
      try {
        const { data: res } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        const { results } = res.data
        this.list.unshift(...results)
        this.reFreshLoading = false
      } catch (err) {
        console.log(err)
        this.successText = '刷新失败'
      }
      this.reFreshLoading = false
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
.article-list-container {
  height: 79vh;
  overflow-y: auto;
}
</style>
