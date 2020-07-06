<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
      :immediate-check="false"
    >
      <comment-item
        v-for="(item, index) in list"
        :key="index"
        :comment="item"
        @reply-click="$emit('reply-click', $event)"
      />
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/article'
import CommentItem from './comment-item'

export default {
  name: 'CommentList',
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      // 这里不允许直接设置 default: []
      default: () => []
    },
    type: {
      type: String,
      // 自定义验证函数
      validator(value) {
        return ['a', 'c'].includes(value)
      },
      // 简单数据类型可以直接设置
      default: 'a'
    }
  },
  components: {
    CommentItem
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false
    }
  },
  methods: {
    async onLoad() {
      try {
        const { data: res } = await getComments({
          type: this.type, // a-对文章(article)的评论，c-对评论(comment)的回复
          // axios的get方法中会将params参数对象转换为 key=value 的形式拼接到url上
          // 当id 为大数字时 会出现拼接错误  这里在数据传递给api之前 将数据手动转换为字符串 给axios进行拼接
          source: this.source.toString(), // 文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        })
        // console.log(res)
        const { results } = res.data
        this.$emit('onsuccess', res.data)
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.offset = res.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  },
  created() {
    this.loading = true
    this.onLoad()
  }
}
</script>

<style lang="less" scoped></style>
