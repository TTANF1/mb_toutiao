<template>
  <div class="edit-name">
    <van-nav-bar
      title="昵称"
      left-text="取消"
      right-text="完成"
      :border="false"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />

    <div class="input-area">
      <van-field
        v-model="oldName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
  name: 'EditName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      oldName: this.value
    }
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '更新中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const oldName = this.oldName
        if (!oldName.length) {
          this.$toast('昵称不能为空！')
          return
        }
        await updateUserProfile({
          name: oldName
        })
        this.$emit('input', oldName)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
.edit-name {
  height: 100%;
  width: 100%;
  background-color: #f5f7f9;
  .input-area {
    padding: 20px;
  }
}
</style>
