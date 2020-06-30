<template>
  <div class="search-suggestion">
    <van-cell
      :key="index"
      v-for="(item, index) in suggestions"
      icon="search"
      @click="$emit('search', item)"
    >
      <div slot="title" v-html="highLight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  watch: {
    searchText: {
      // 当数据发生变化时调用
      handler: debounce(function(value) {
        this.loadSearchSuggestions(value)
      }, 200),
      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  },
  methods: {
    async loadSearchSuggestions(value) {
      try {
        const { data: res } = await getSearchSuggestions(value)
        this.suggestions = res.data.options
      } catch (err) {
        this.$toast('获取搜索建议失败')
      }
    },
    highLight(text) {
      const str = `<span style="color: #3296fa">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, str)
    }
  },
  created() {}
}
</script>

<style lang="less" scoped></style>
