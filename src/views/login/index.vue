<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />

    <van-form @submit="onSubmit()">
      <van-field v-model="user.mobile" placeholder="请输入手机号">
        <template #left-icon>
          <i class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>
      <van-field v-model="user.code" placeholder="请输入验证码">
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>
        <template #button>
          <van-button round class="send-sms-byn" size="small" type="primary"
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
        mobile: '',
        code: ''
      }
    }
  },
  created() {},
  methods: {
    async onSubmit() {
      try {
        const res = await Login(this.user)
        console.log(res, '登录成功')
      } catch (err) {
        if (err.response.status === 400) {
          console.log('手机号码不正确或验证码错误')
        } else {
          console.log('登录失败，请稍后再试')
        }
      }
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
