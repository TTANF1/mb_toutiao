<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="`${comment.reply_count}条评论`"
      left-text="返回"
      left-arrow
      @click-left="$emit('close')"
    >
      <van-icon slot="left" name="cross" />
    </van-nav-bar>

    <div class="scroll-wrap">
      <!-- 当前评论 -->
      <comment-item :comment="this.comment" />
      <!-- /当前评论 -->

      <van-cell title="全部评论" />
      <!-- 回复列表 -->
      <comment-list :list="commentList" :source="comment.com_id" type="c" />
      <!-- /回复列表 -->
    </div>

    <div class="post-wrap">
      <van-button size="small" round @click="isPopupShow = true">
        写评论
      </van-button>
    </div>

    <van-popup v-model="isPopupShow" position="bottom">
      <comment-post :target="comment.com_id" @post-success="onPostSuccess" />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import CommentList from './comment-list.vue'
import CommentPost from './comment-post.vue'

export default {
  name: 'CommentReply',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  data() {
    return {
      isPopupShow: false,
      commentList: []
    }
  },
  methods: {
    onPostSuccess(res) {
      this.comment.reply_count++
      this.isPopupShow = false
      this.commentList.unshift(res.data.new_obj)
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .van-button {
    width: 60%;
  }
}
</style>
