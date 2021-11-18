<template>
  <van-swipe :autoplay="3000" class="my-swipe" indicator-color="#1baeae">
    <van-swipe-item v-for="(item, index) in list" :key="index">
      <img :src="item.carouselUrl" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
  img {
    width: 100%;
    height: auto;
  }
}
::v-deep .van-swipe__indicator {
  background-color: #000;
}
</style>
