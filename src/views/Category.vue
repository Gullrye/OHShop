<template>
  <div class="category">
    <div class="category-header">
      <i class="iconfont icon-back" @click="goHome"></i>
      <div class="header-search">
        <i class="iconfont icon-search"></i>
        <span class="search-title">忙趁东风放纸鸢</span>
      </div>
      <i class="iconfont icon-menu"></i>
    </div>
    <div class="category-content">
      <!-- 可水平滚动的导航栏 -->
      <list-scroll class="category-nav-wrapper" :scrollX="true" :probeType='3' ref='scrollWrapper'>
        <ul class="category-nav">
          <li v-for="(item, index) in categoryData" :key='item.categoryId' :class='{ active: beActive(index) }' @click='handleLiClick(index)'>
            {{ item.categoryName }}
          </li>
        </ul>
      </list-scroll>
      <!-- 和导航栏绑定，可进行拖动切换的分类页面 -->
      <van-swipe @change="onChange" :loop='false' ref='categorySwipe' :show-indicators='false'>
        <van-swipe-item v-for="item in categoryData" :key='item.categoryId'>
          <div class="product-item" v-for='it in item.secondList' :key='it.categoryId'>
            <i class="product-img iconfont icon-erhaohaiou"></i>
            <span class="product-title">{{ it.categoryName }}</span>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import ListScroll from '../components/ListScroll.vue'
import { getCategory } from '../service/good'
export default {
  name: 'Category',
  data () {
    return {
      categoryData: [],
      activeIndex: 0,
      isMove: false
    }
  },
  components: {
    ListScroll
  },
  methods: {
    goHome () {},
    // 重构分类页面，处理 categories 接口数据
    dealCategoryData (data) {
      const newData = []
      let n = 0
      data.forEach(i => {
        i.secondLevelCategoryVOS.forEach(item => {
          newData[n] = {}
          newData[n].categoryName = item.categoryName
          newData[n].categoryId = item.categoryId
          newData[n].categoryLevel = 2
          newData[n].secondList = item.thirdLevelCategoryVOS
          n++
        })
      })
      console.log(newData)
      return newData
    },
    onChange (pageIndex) {
      // 让导航栏跟着分类页面的拖动进行合理的位置切换
      if (pageIndex >= 5) {
        // console.log(this.$refs.scrollWrapper) // 可知实例为 scroll
        this.$refs.scrollWrapper.scroll.scrollTo(this.$refs.scrollWrapper.scroll.maxScrollX, 0)
      } else {
        this.$refs.scrollWrapper.scroll.scrollTo(this.$refs.scrollWrapper.scroll.minScrollX, 0)
      }
      this.activeIndex = pageIndex
    },
    beActive (navLiIndex) {
      return navLiIndex === this.activeIndex
    },
    handleLiClick (clickIndex) {
      this.activeIndex = clickIndex
      this.$refs.categorySwipe.swipeTo(clickIndex)
    }
  },
  async mounted () {
    const { data } = await getCategory()
    this.categoryData = this.dealCategoryData(data)
  }
}
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.category {
  .category-header {
    position: fixed;
    left: 0;
    top: 0;
    .fj();
    .wh(100%, 50px);
    line-height: 50px;
    padding: 0 15px;
    font-size: 15px;
    box-sizing: border-box;
    z-index: 10000;
    border-bottom: 1px solid #dcdcdc;
    color: #656771;
    background: #fff;
    &.active {
      background: @primary;
    }
    .header-search {
      display: flex;
      width: 80%;
      height: 20px;
      line-height: 20px;
      margin: 10px 0;
      padding: 5px 0;
      border-radius: 20px;
      color: #232326;
      background: #f7f7f7;
      .icon-search {
        padding: 0 10px 0 20px;
        font-size: 17px;
      }
      .search-title {
        font-size: 12px;
        color: #666;
      }
    }
  }
  .category-content {
    margin-top: 50px;
    .category-nav-wrapper {
      white-space: nowrap;
      .category-nav {
        display: inline-block;
        li {
          display: inline-block;
          height: 30px;
          line-height: 30px;
          margin: 10px 8px;
          padding: 0 10px;
          text-align: center;
          font-size: 14px;
          &.active {
            color: @primary;
          }
        }
      }
    }
  }
  .van-swipe {
    padding-bottom: 50px;
    .van-swipe-item {
      display: flex;
      flex-wrap: wrap;
      .product-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 33%;
        height: 90px;
        font-size: 14px;
        .product-img {
          padding: 5px 0;
          font-size: 40px;
          color: @primary;
        }
        .product-title {
          text-align: center;
          color: @primary;
        }
      }
    }
  }
}
</style>
