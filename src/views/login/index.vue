<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" :border="false">
      <template #left>
        <van-icon name="cross" color="#fff" @click="$router.go(-1)" />
      </template>
    </van-nav-bar>

    <van-form ref="loginForm" @submit="onSubmit()">
      <van-field
        v-model="user.mobile"
        placeholder="请输入手机号"
        :rules="formRules.mobile"
        type="number"
        maxlength="11"
      >
        <template #left-icon>
          <i class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>
      <van-field
        v-model="user.code"
        placeholder="请输入验证码"
        :rules="formRules.code"
        type="number"
        maxlength="6"
      >
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 10"
            format="还剩 ss s"
            @finish="isCountDownShow = false"
          >
            <template #default="{ seconds }">
              {{ (seconds + 1 + '').padStart(2, '0') }} s
            </template>
          </van-count-down>
          <van-button
            v-else
            round
            class="send-sms-byn"
            size="small"
            type="primary"
            native-type="button"
            @click="onSendSmsBtn"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Login } from '@/api/user'

export default {
  name: 'Login',
  data() {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      formRules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号码格式不正确' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式不正确' }
        ]
      },
      isCountDownShow: false
    }
  },
  created() {},
  methods: {
    async onSubmit() {
      this.$toast.loading({
        message: '登录中...',
        // 禁用背景点击
        forbidClick: true
      })
      try {
        const { data } = await Login(this.user)
        console.log(data, '登录数据')
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        this.$router.push('/home')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号码不正确或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后再试')
        }
      }
    },
    async onSendSmsBtn() {
      this.isCountDownShow = true
      // try {
      //   await sendSms(this.user.mobile)
      //   this.$toast.success('发送成功')
      // } catch (err) {
      //   if (err.response.status === 429) {
      //     this.$toast.fail('发送过于频繁，请稍后再试')
      //   } else {
      //     this.$toast.fail('发送失败，请稍后再试')
      //   }
      // }
    }
  }
}
</script>

<style lang="less" scoped>
.toutiao {
  font-size: 37px;
}
.send-sms-byn {
  width: 152px;
  height: 46px;
  border: none;
  background-color: #ededed;
  .van-button__text {
    font-size: 22px;
    color: #666;
  }
}
.login-btn-wrap {
  margin: 53px 33px;
  .van-button {
    border-radius: 15px;
    background-color: #6db4fb;
    border: none;
    font-size: 30px;
  }
}
</style>
