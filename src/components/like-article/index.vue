<template>
  <van-icon
    :color="value === 1 ? '#ffa500' : '#777'"
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    @click="onCollect"
  />
</template>

<script>
import { likeArticle, cancelLike } from '@/api/article'

export default {
  name: 'LikeArticle',
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    async onCollect() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '加载中...',
        forbidClick: true
      })
      try {
        let status = -1
        if (this.value === 1) {
          // 取消点赞
          await cancelLike(this.articleId)
        } else {
          // 点赞
          await likeArticle(this.articleId)
          status = 1
        }
        this.$emit('input', status)
        // 这里刚将修改父组件值的事件触发，但还没有触发改变值 所以 value 还是旧的值
        this.$toast.success(this.value !== 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        this.$toast('操作失败，请稍后再试')
      }
    }
  },
  created() {}
}
</script>

<style lang="less" scoped></style>
