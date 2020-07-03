<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div class="title-text" slot="title">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="small"
        @click="isEdit = !isEdit"
      >
        {{ isEdit ? '完成' : '编辑' }}
      </van-button>
    </van-cell>

    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="channel.id"
        @click="onMyChannelClick(channel, index)"
      >
        <van-icon
          v-if="isEdit && !fiexdChannels.includes(channel.id)"
          slot="icon"
          name="close"
        ></van-icon>
        <span :class="index === active ? 'text active' : 'text'" slot="text">
          {{ channel.name }}
        </span>
      </van-grid-item>
    </van-grid>

    <van-cell>
      <div class="title-text" slot="title">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="channel in recommendChannels"
        :key="channel.id"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannels,
  removeUserChannelsById
} from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [],
      isEdit: false,
      fiexdChannels: [0] // 固定的频道（不能删除）
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels() {
      return this.allChannels.filter(
        v => !this.myChannels.find(channel => v.id === channel.id)
      )
    }
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data: res } = await getAllChannels()
        // console.log(res, '获取所有频道列表')
        this.allChannels = res.data.channels
      } catch (err) {
        this.$toast('获取全部频道列表失败，请稍后再试')
      }
    },
    async onAddChannel(channel) {
      this.myChannels.push(channel)
      if (this.user) {
        // 已登录
        try {
          const { data: res } = await addUserChannels({
            id: channel.id,
            seq: this.myChannels.length
          })
          console.log(res, '添加用户频道')
        } catch (err) {}
      } else {
        // 未登录
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    onMyChannelClick(channel, index) {
      if (this.isEdit) {
        // 编辑状态
        if (this.fiexdChannels.includes(channel.id)) return
        // 删除频道
        this.myChannels.splice(index, 1)
        this.onDelChannel(channel)
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
      } else {
        // 非编辑状态
        this.$emit('update-active', index, false)
      }
    },
    async onDelChannel(channel) {
      try {
        if (this.user) {
          await removeUserChannelsById(channel.id)
        } else {
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (err) {
        this.$toast('删除频道失败')
      }
    }
  },
  created() {
    this.loadAllChannels()
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding-top: 100px;

  .title-text {
    font-size: 32px;
    color: #333;
  }
  /deep/.van-cell::after {
    border-bottom: none;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
    }
    .van-grid-item__text,
    .text {
      font-size: 28px;
      color: #222;
      margin-top: 0;
    }
    .active {
      color: red;
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-close {
        position: absolute;
        top: -10px;
        right: -10px;
        z-index: 2;
        font-size: 28px;
      }
    }
    .van-grid-item__icon-wrapper {
      position: unset;
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
      }
      .van-icon-plus {
        font-size: 28px;
        margin-right: 6px;
      }
    }
  }
}
</style>
