<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchValue"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShowResult = false"
      />
    </form>

    <!-- 搜索结果 -->
    <search-result v-if="isShowResult" />
    <!-- 搜索建议 -->
    <search-suggestion
      v-else-if="searchValue"
      :search-text="searchValue"
      @search="onSearch"
    />
    <!-- 搜索历史 -->
    <search-history v-else />
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import SearchSuggestion from './components/search-suggestion'
export default {
  name: 'SearchIndex',
  data() {
    return {
      searchValue: '',
      isShowResult: false
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  methods: {
    onSearch(value) {
      this.searchValue = value
      this.isShowResult = true
    },
    onCancel() {
      this.$router.back()
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>
