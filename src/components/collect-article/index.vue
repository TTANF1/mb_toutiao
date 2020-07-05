<template>
  <van-icon
    :color="value ? '#ffa500' : '#777'"
    :name="value ? 'star' : 'star-o'"
    @click="onCollect"
  />
</template>

<script>
import { addCollect, cancelCollect } from '@/api/article'

export default {
  name: 'CollectArticle',
  props: {
    value: {
      type: Boolean,
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
        if (this.value) {
          // 取消收藏
          await cancelCollect(this.articleId)
        } else {
          // 收藏
          await addCollect(this.articleId)
        }
        this.$emit('input', !this.value)
        // 这里刚将修改父组件值的事件触发，但还没有触发改变值 所以 value 还是旧的值
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (err) {
        this.$toast('操作失败，请稍后再试')
      }
    }
  },
  created() {}
}
</script>

<style lang="less" scoped></style>
