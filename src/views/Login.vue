<template>
  <div class="login">
    <s-header
      :name="type == 'login' ? '登录' : '注册'"
      :back="'/home'"
    ></s-header>
    <div class="logo">
      <i class="iconfont icon-erhaohaiou"></i>
      <h1>OH商城</h1>
    </div>
    <div v-if="type == 'login'" class="login-body login">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div class="verify">
          <Verify
            ref="loginVerifyRef"
            @error="error"
            :showButton="false"
            @success="success"
            :width="'100%'"
            :height="'40px'"
            :fontSize="'16px'"
            :type="2"
          ></Verify>
        </div>
        <div style="margin: 16px">
          <div class="link-register" @click="toggle('register')">立即注册</div>
          <van-button
            round
            block
            type="info"
            color="#1baeae"
            native-type="submit"
            >登录</van-button
          >
        </div>
      </van-form>
    </div>
    <div v-else class="login-body register">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username1"
          name="username1"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password1"
          type="password"
          name="password1"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div class="verify">
          <Verify
            ref="loginVerifyRef"
            @success="success"
            @error="error"
            :showButton="false"
            :width="'100%'"
            :height="'40px'"
            :fontSize="'16px'"
            :type="2"
          ></Verify>
        </div>
        <div style="margin: 16px">
          <div class="link-login" @click="toggle('login')">已有登录账号</div>
          <van-button
            round
            block
            type="info"
            color="#1baeae"
            native-type="submit"
            >注册</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import sHeader from '@/components/SimpleHeader'
import { login, register } from '../service/user'
import { setLocal } from '@/common/js/utils'
import Verify from 'vue2-verify'

export default {
  name: 'Login',
  data() {
    return {
      username: '13600000009',
      password: '111111',
      username1: '',
      password1: '',
      type: 'login',
      verify: false
    }
  },
  components: {
    sHeader,
    Verify
  },
  methods: {
    // Verify 组件验证成功的回调
    success(obj) {
      this.verify = true
      // 回调之后，刷新验证码
      obj.refresh()
    },
    error(obj) {
      this.verify = false
      // 回调之后，刷新验证码
      obj.refresh()
    },
    // 执行验证码
    dealTriVer() {
      this.$refs.loginVerifyRef.$refs.instance.checkCode()
    },
    toggle(v) {
      this.verify = false
      this.type = v
    },
    async onSubmit(values) {
      this.dealTriVer()
      if (!this.verify) {
        this.$toast.fail('验证码未填或填写错误!')
        return
      }
      if (this.type === 'login') {
        const { data } = await login({
          loginName: values.username,
          passwordMd5: this.$md5(values.password)
        })
        setLocal('token', data)
        // 设置 token 后刷新跳转
        window.location.href = './'
      } else {
        await register({
          loginName: values.username1,
          password: values.password1
        })
        this.$toast.success('注册成功')
        this.type = 'login'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  .logo {
    width: 150px;
    height: 150px;
    margin: 80px auto 0px;
    text-align: center;
    color: #1baeae;
    i {
      font-size: 80px;
    }
  }
  .login-body {
    padding: 0 20px;
  }
  .login {
    .link-register {
      display: inline-block;
      margin-bottom: 20px;
      font-size: 14px;
      color: #1989fa;
    }
  }
  .register {
    .link-login {
      display: inline-block;
      margin-bottom: 20px;
      font-size: 14px;
      color: #1989fa;
    }
  }
  ::v-deep .verify {
    > div {
      width: 100%;
    }
    display: flex;
    justify-content: center;
    .cerify-code-panel {
      margin-top: 16px;
    }
    .verify-code {
      float: left !important;
      width: 40% !important;
    }
    .verify-code-area {
      float: left !important;
      width: 54% !important;
      margin-left: 14px !important;
      .varify-input-code {
        width: 90px;
        height: 38px !important;
        padding-left: 10px;
        border: 1px solid #e9e9e9;
        font-size: 16px;
      }
      .verify-change-area {
        line-height: 44px;
      }
    }
  }
}
</style>
