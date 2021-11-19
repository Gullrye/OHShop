<template>
  <div class="nav-bar">
    <ul class="nav-list">
      <router-link
        v-slot="{ isActive, navigate }"
        custom
        class="nav-list-item active"
        to="home"
      >
        <li :class="isActive && 'router-link-active'" @click="navigate">
          <i class="iconfont icon-home"></i>
          <span>首页</span>
        </li>
      </router-link>
      <router-link
        v-slot="{ isActive, navigate }"
        custom
        class="nav-list-item"
        to="category"
      >
        <li :class="isActive && 'router-link-active'" @click="navigate">
          <i class="iconfont icon-fenlei"></i>
          <span>分类</span>
        </li>
      </router-link>
      <router-link
        v-slot="{ isActive, navigate }"
        custom
        class="nav-list-item"
        to="cart"
      >
        <li :class="isActive && 'router-link-active'" @click="navigate">
          <i class="iconfont icon-cart-bag">
            <van-badge :content="count"> </van-badge>
          </i>
          <span>购物袋</span>
        </li>
      </router-link>
      <router-link
        v-slot="{ isActive, navigate }"
        custom
        class="nav-list-item"
        to="user"
      >
        <li :class="isActive && 'router-link-active'" @click="navigate">
          <i class="iconfont icon-wo"></i>
          <span>我的</span>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    count() {
      return this.$store.state.cartCount === 0
        ? ''
        : this.$store.state.cartCount
    }
  },
  mounted() {
    this.$store.dispatch('updateCart')
  }
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';
.nav-bar {
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  padding: 5px 0;
  z-index: 1000;
  border-top: 1px solid rgba(226, 226, 226, 0.2);
  background-color: #fff;
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
      .icon-cart-bag {
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
