<template>
  <div class="about">
    <s-header :name="关于我们"></s-header>
    <h1>关于我们</h1>
    <div class="intro">
      1......<br />
      2......<br />
      3......<br />
      4......<br />
      5......<br />
      6......<br />
      7......
    </div>
  </div>
</template>

<script>
import sHeader from '../components/SimpleHeader.vue'
export default {
  components: {
    sHeader
  }
}
</script>

<style lang="less" scoped>
.about {
  color: #1baeae;
  text-align: center;
  h1 {
    display: inline-block;
    width: 50%;
    margin-top: 50px;
    padding: 10px 0;
    border-bottom: 1px dashed #1baeae;
    text-align: center;
  }
  .intro {
    font-size: 30px;
  }
}
</style>
