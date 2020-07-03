<template>
  <van-button
    v-if="isFollowed"
    round
    size="small"
    @click="onFollow"
    :loading="followLoading"
  >
    已关注
  </van-button>
  <van-button
    v-else
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    :loading="followLoading"
  >
    关注
  </van-button>
</template>

<script>
import { addFollow, cancelFollow } from '@/api/article'
export default {
  name: 'FollowUserBtn',
  model: {
    prop: 'isFollowed',
    event: 'update-is-followed'
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      followLoading: false
    }
  },
  methods: {
    async onFollow() {
      this.followLoading = true
      try {
        if (this.isFollowed) {
          // 取消关注
          await cancelFollow(this.articleId)
        } else {
          // 关注
          await addFollow(this.articleId)
        }
        this.$emit('update-is-followed', !this.isFollowed)
      } catch (err) {
        console.log(err)
        let message = '操作失败，请重试！'
        if (err.response) {
          if (err.response.status === 401) {
            message = '请先完成登录！'
          } else if (err.response.status === 400) {
            message = '你不能关注你自己！'
          }
        }
        this.$toast(message)
      }
      this.followLoading = false
    }
  },
  created() {}
}
</script>

<style lang="less" scoped></style>
