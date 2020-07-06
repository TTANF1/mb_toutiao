<template>
  <div class="update-gender">
    <van-picker
      title="修改性别"
      show-toolbar
      :default-index="value"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      gender: this.value
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
        await updateUserProfile({
          // 后端问题 传0 服务端不返回成功数据 无法修改  传1 没问题
          gender: this.gender
        })
        this.$emit('input', this.gender)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    },
    onChange(picker, value, index) {
      this.gender = index
      console.log(this.gender)
    }
  },
  created() {}
}
</script>

<style lang="less" scoped></style>
