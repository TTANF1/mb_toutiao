<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form class="search-bar" action="/">
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
    <search-result v-if="isShowResult" :search-text="searchValue" />
    <!-- 搜索建议 -->
    <search-suggestion
      v-else-if="searchValue"
      :search-text="searchValue"
      @search="onSearch"
    />
    <!-- 搜索历史 -->
    <search-history
      v-else
      :search-histories="searchHistories"
      @search="searchHistories = []"
    />
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import SearchSuggestion from './components/search-suggestion'
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  data() {
    return {
      searchValue: '',
      isShowResult: false,
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || []
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  watch: {
    searchHistories(value) {
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    }
  },
  methods: {
    onSearch(value) {
      this.searchValue = value
      const index = this.searchHistories.indexOf(value)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(value)
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
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
