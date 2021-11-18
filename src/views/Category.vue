<template>
  <div class="category">
    <div class="category-header">
      <i class="iconfont icon-back" @click="goHome"></i>
      <div class="header-search">
        <i class="iconfont icon-search"></i>
        <router-link to="./product-list?from=category">
          <span class="search-title">忙趁东风放纸鸢</span>
        </router-link>
      </div>
      <i class="iconfont icon-menu"></i>
    </div>
    <div class="category-content">
      <!-- 可水平滚动的导航栏 -->
      <!-- <list-scroll class="category-nav-wrapper" :scrollX="true" :probeType='3' ref='scrollWrapper'>
        <ul class="category-nav">
          <li v-for="(item, index) in categoryData" :key='item.categoryId' :class='{ active: beActive(index) }' @click='handleLiClick(index)'>
            {{ item.categoryName }}
          </li>
        </ul>
      </list-scroll> -->
      <!-- 和导航栏绑定，可进行拖动切换的分类页面 -->
      <!-- <van-swipe @change="onChange" :loop='false' ref='categorySwipe' :show-indicators='false'>
        <van-swipe-item v-for="item in categoryData" :key='item.categoryId'>
          <div class="product-item" v-for='it in item.secondList' :key='it.categoryId' @click='selectProduct(it)'>
            <div class="product-img">
              <img src="//s.weituibao.com/1583585285461/cs.png" alt=""></div>
            <span class="product-title">{{ it.categoryName }}</span>
          </div>
        </van-swipe-item>
      </van-swipe> -->

      <!-- 使用 vant tabs 中的标签栏滚动、切换动画、滑动切换来重写上边注释代码 -->
      <van-tabs v-model="active" swipeable animated>
        <van-tab
          v-for="item in categoryData"
          :key="item.categoryId"
          :title="item.categoryName"
        >
          <div
            class="product-item"
            v-for="it in item.secondList"
            :key="it.categoryId"
            @click="selectProduct(it)"
          >
            <div class="product-img">
              <img src="//s.weituibao.com/1583585285461/cs.png" alt="" />
            </div>

            <span class="product-title">{{ it.categoryName }}</span>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
// import ListScroll from '../components/ListScroll.vue'
import { getCategory } from '../service/good'
export default {
  name: 'Category',
  data() {
    return {
      categoryData: [],
      active: 0
      // activeIndex: 0,
      // isMove: false
    }
  },
  components: {
    // ListScroll
  },
  methods: {
    goHome() {
      this.$router.push({ path: 'home' })
    },
    // 重构分类页面，处理 categories 接口数据
    dealCategoryData(data) {
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
      // console.log(newData)
      return newData
    },
    // swipe 做切换页面时使用的函数，改用 vant tabs 后用不到了
    // onChange (pageIndex) {
    //   // 让导航栏跟着分类页面的拖动进行合理的位置切换
    //   // console.log(this.$refs.scrollWrapper) // 可知实例为 scroll
    //   const navScroll = this.$refs.scrollWrapper.scroll
    //   // console.log(navScroll.maxScrollX)
    //   // navScroll.on('scroll', () => {
    //   //   console.log(navScroll.x)
    //   // })
    //   if (pageIndex >= 4 && pageIndex <= 8) {
    //     navScroll.scrollTo(-60 * (pageIndex - 2), 0)
    //   } else if (pageIndex > 8) {
    //     navScroll.scrollTo(navScroll.maxScrollX, 0)
    //   } else {
    //     navScroll.scrollTo(navScroll.minScrollX, 0)
    //   }
    //   this.activeIndex = pageIndex
    // },
    // beActive (navLiIndex) {
    //   return navLiIndex === this.activeIndex
    // },
    // handleLiClick (clickIndex) {
    //   this.activeIndex = clickIndex
    //   this.$refs.categorySwipe.swipeTo(clickIndex)
    // },
    selectProduct(it) {
      this.$router.push({ path: `product-list?categoryId=${it.categoryId}` })
    }
  },
  async mounted() {
    const { data } = await getCategory()
    this.categoryData = this.dealCategoryData(data)
  }
}

// 此页面实际上可以用 Vant 的 Tab 标签页进行制作
</script>

<style lang="less" scoped>
@import '../common/style/mixin';
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
    //   .category-nav-wrapper {
    //     white-space: nowrap;
    //     .category-nav {
    //       display: inline-block;
    //       li {
    //         display: inline-block;
    //         height: 30px;
    //         line-height: 30px;
    //         margin: 10px 8px;
    //         padding: 0 15px;
    //         text-align: center;
    //         font-size: 14px;
    //         &.active {
    //           color: @primary;
    //         }
    //       }
    //     }
    //   }
    // }
    // .van-swipe {
    //   padding-bottom: 50px;
    //   .van-swipe-item {
    //     display: flex;
    //     flex-wrap: wrap;
    //     .product-item {
    //       display: flex;
    //       flex-direction: column;
    //       align-items: center;
    //       width: 33%;
    //       height: 90px;
    //       font-size: 14px;
    //       .product-img img {
    //         width: 50px;
    //         padding: 5px 0;
    //         color: @primary;
    //       }
    //       .product-title {
    //         text-align: center;
    //         color: @primary;
    //       }
    //     }
    // }
    ::v-deep .van-tabs {
      .van-tab {
        width: 20%;
      }
      .van-tabs__line {
        background-color: @primary;
      }
      .van-tabs__wrap {
        position: fixed;
        left: 0;
        right: 0;
        z-index: 999;
      }
      .van-tab__pane-wrapper {
        min-height: 90vh;
        margin-top: 50px;
        padding-bottom: 50px;
      }
      .van-tab__pane {
        display: flex;
        flex-wrap: wrap;
        .product-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 33%;
          height: 90px;
          font-size: 14px;
          .product-img img {
            width: 50px;
            padding: 5px 0;
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
}
</style>
