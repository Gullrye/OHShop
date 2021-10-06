<template>
  <div class="nav-bar">
    <ul class="nav-list">
      <router-link tag="li" class="nav-list-item active" to="home">
        <i class="iconfont icon-home"></i>
        <span>首页</span>
      </router-link>
      <router-link tag="li" class="nav-list-item" to="category">
        <i class="iconfont icon-fenlei"></i>
        <span>分类</span>
      </router-link>
      <router-link tag="li" class="nav-list-item" to="cart">
        <i class="iconfont icon-cart">
          <van-badge :content="count"> </van-badge>
        </i>
        <span>购物车</span>
      </router-link>
      <router-link tag="li" class="nav-list-item" to="user">
        <i class="iconfont icon-usertie"></i>
        <span>我的</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    count () {
      return this.$store.state.cartCount === 0 ? '' : this.$store.state.cartCount
    }
  },
  mounted () {
    this.$store.dispatch('updateCart')
  }
}
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.nav-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  padding: 5px 0;
  z-index: 1000;
  background-color: #fff;
  display: flex;
  align-items: center;
  .boxSizing();
  .nav-list {
    width: 100%;
    .fj();
    flex-direction: row;
    padding: 0;
    .nav-list-item {
      display: flex;
      flex: 1;
      flex-direction: column;
      text-align: center;
      color: #666;
      &.router-link-active {
        color: @primary;
      }
      i {
        text-align: center;
        font-size: 22px;
      }
      span {
        font-size: 12px;
      }
      .icon-cart {
        position: relative;
        margin: 0 auto;
        .van-badge {
          position: absolute;
          box-sizing: border-box;
          top: -20%;
          right: -50%;
        }
      }
    }
  }
}
</style>
