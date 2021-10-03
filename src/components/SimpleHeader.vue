<template>
  <div class="simple-header">
    <i @click='goBack' class="iconfont icon-back"></i>
    <div class="simple-header-name">{{ name }}</div>
    <i class="iconfont icon-menu"></i>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    back: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 点击头部组件右侧返回按钮，让路由往回切一页
    goBack () {
      if (!this.back) {
        this.$router.go(-1)
      } else {
        this.$router.push({ path: this.back })
      }
      this.$emit('callback')
    }
  }
}
</script>

<style lang='less' scoped>
 @import '../common/style/mixin';
  .simple-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    .fj();
    .wh(100%, 44px);
    line-height: 44px;
    padding: 0 10px;
    .boxSizing();
    color: #252525;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
    .simple-header-name {
      font-size: 14px;
    }
  }
</style>
