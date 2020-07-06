<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="头条"
      :border="false"
      @click-left="goBack"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <!-- 关注组件 -->
          <follow-user-btn
            class="follow-btn"
            v-model="article.is_followed"
            :article-id="article.aut_id"
          />
          <!-- /关注组件 -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="articleContent"
        ></div>
        <van-divider>正文结束</van-divider>

        <!-- 评论列表 -->
        <comment-list
          :source="article.art_id"
          :list="commentList"
          @onsuccess="totalCommentCount = $event.total_count"
          @reply-click="onReplyClick"
        />
        <!-- /评论列表 -->

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPopupShow = true"
          >
            写评论
          </van-button>
          <van-icon name="comment-o" :info="totalCommentCount" color="#777" />
          <!-- 收藏 -->
          <collect-article
            class="cursor"
            v-model="article.is_collected"
            :article-id="article.art_id"
          />
          <!-- /收藏 -->
          <!-- 点赞 -->
          <like-article
            class="cursor"
            v-model="article.attitude"
            :article-id="article.art_id"
          />
          <!-- /点赞 -->
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="this.errStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticleInfo"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->

      <!-- 评论弹出层 -->
      <van-popup v-model="isPopupShow" position="bottom">
        <comment-post :target="this.articleId" @post-success="onPostSuccess" />
      </van-popup>
      <!-- /评论弹出层 -->
    </div>

    <!-- 评论回复弹出层 -->
    <van-popup
      v-model="isReplyShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <comment-reply
        v-if="isReplyShow"
        :comment="currentComment"
        @close="isReplyShow = false"
      />
    </van-popup>
    <!-- /评论回复弹出层 -->
  </div>
</template>

<script>
import { getArticleInfoById } from '@/api/article'
import { ImagePreview } from 'vant'
import FollowUserBtn from '@/components/follow-user'
import CollectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'
import CommentList from './components/comment-list.vue'
import CommentPost from './components/comment-post.vue'
import CommentReply from './components/comment-reply.vue'

export default {
  name: 'ArticleIndex',
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  provide() {
    return {
      articleId: this.articleId
    }
  },
  components: {
    FollowUserBtn,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost,
    CommentReply
  },
  data() {
    return {
      article: {},
      loading: true,
      errStatus: 0,
      totalCommentCount: 0,
      isPopupShow: false,
      commentList: [],
      isReplyShow: false,
      currentComment: {}
    }
  },
  methods: {
    async loadArticleInfo() {
      this.loading = true
      try {
        const { data: res } = await getArticleInfoById(this.articleId)
        this.article = res.data
        setTimeout(() => {
          // console.log(this.$refs.articleContent)
          this.previewImages(this.$refs.articleContent)
        }, 0)
      } catch (err) {
        if (err.response && err.response.status === 404) this.errStatus = 404
      }
      this.loading = false
    },
    previewImages(articleContent) {
      const imgs = articleContent.querySelectorAll('img')
      // console.log(imgs)
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    onPostSuccess(result) {
      // console.log(result, 'result')
      this.isPopupShow = false
      this.commentList.unshift(result.data.new_obj)
    },
    onReplyClick(comment) {
      this.currentComment = comment
      this.isReplyShow = true
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  created() {
    this.loadArticleInfo()
  }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';

.article-container {
  .cursor {
    cursor: pointer;
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  /deep/.van-icon-arrow-left {
    color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
