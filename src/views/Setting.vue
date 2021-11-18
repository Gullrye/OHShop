<template>
  <div class="setting-box">
    <s-header :name="'账号管理'"></s-header>
    <div class="input-item">
      <van-field v-model="nickName" type="number" label="昵称" />
      <van-field v-model="introduceSign" label="个性签名" />
      <van-field v-model="password" type="password" label="修改密码" />
    </div>
    <van-button
      class="save-btn"
      color="#1baeae"
      type="primary"
      @click="save"
      block
      >保存</van-button
    >
    <van-button
      class="save-btn"
      color="#1baeae"
      type="primary"
      @click="logout"
      block
      >退出登录</van-button
    >
  </div>
</template>

<script>
import sHeader from '../components/SimpleHeader.vue'
import { getUserInfo, editUserInfo, logout } from '../service/user'
import { setLocal } from '@/common/js/utils'
export default {
  components: {
    sHeader
  },
  data() {
    return {
      nickName: '',
      introduceSign: '',
      password: ''
    }
  },
  async mounted() {
    const { data } = await getUserInfo()
    this.nickName = data.nickName
    this.introduceSign = data.introduceSign
  },
  methods: {
    async save() {
      const params = {
        introduceSign: this.introduceSign,
        nickName: this.nickName,
        passwordMd5: this.$md5(this.password)
      }
      await editUserInfo(params)
      this.$toast('保存成功')
    },
    async logout() {
      const { resultCode } = await logout()
      if (resultCode === 200) {
        setLocal('token', '')
        window.location.href = '/'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.setting-box {
  .input-item {
    margin-top: 44px;
  }
  .save-btn {
    width: 80%;
    margin: 20px auto;
  }
}
</style>
