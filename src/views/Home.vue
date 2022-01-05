<template>
  <div class="home">
    <div class="home-header" :class="{ active: headerScroll }">
      <router-link to="/category">
        <i class="iconfont icon-caidan"></i>
      </router-link>
      <div class="header-search">
        <span class="app-name">OH 商城</span>
        <i class="iconfont icon-search"></i>
        <router-link to="./product-list?from=home">
          <span class="search-title">拂堤杨柳醉春烟</span>
        </router-link>
      </div>
      <router-link to="/login" class="login" v-if="!isLogin">
        <span>登录</span>
      </router-link>
      <router-link to="/user" class="login" v-else>
        <i class="iconfont icon-wo"></i>
      </router-link>
    </div>
    <swiper :list="swiperList"></swiper>
    <div class="category-list">
      <div v-for="item in categoryList" :key="item.categoryId">
        <img :src="item.imgUrl" />
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="good">
      <div class="good-header">新品上线</div>
      <div class="good-box">
        <div
          class="good-item"
          v-for="item in newGoodses"
          :key="item.goodsId"
          @click="goToDetail(item)"
        >
          <img :src="getRealImg(item.goodsCoverImg)" />
          <div class="good-desc">
            <div class="title">{{ item.goodsName }}</div>
            <div class="price">￥ {{ item.sellingPrice }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="good">
      <div class="good-header">热门商品</div>
      <div class="good-box">
        <div
          class="good-item"
          v-for="item in hots"
          :key="item.goodsId"
          @click="goToDetail(item)"
        >
          <img :src="getRealImg(item.goodsCoverImg)" />
          <div class="good-desc">
            <div class="title">{{ item.goodsName }}</div>
            <div class="price">￥ {{ item.sellingPrice }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="good">
      <div class="good-header">最新推荐</div>
      <div class="good-box">
        <div
          class="good-item"
          v-for="item in recommends"
          :key="item.goodsId"
          @click="goToDetail(item)"
        >
          <img :src="getRealImg(item.goodsCoverImg)" />
          <div class="good-desc">
            <div class="title">{{ item.goodsName }}</div>
            <div class="price">￥ {{ item.sellingPrice }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from '../components/Swiper.vue'
import { getHome } from '../service/home'
import { getLocal } from '../common/js/utils'
export default {
  name: 'Home',
  data() {
    return {
      isLogin: false,
      swiperList: [],
      categoryList: [
        {
          name: 'OH超市',
          imgUrl: '//s.weituibao.com/1583585285461/cs.png',
          categoryId: 100001
        },
        {
          name: 'OH服饰',
          imgUrl: '//s.weituibao.com/1583585285468/fs.png',
          categoryId: 100003
        },
        {
          name: '全球购',
          imgUrl: '//s.weituibao.com/1583585285470/qq.png',
          categoryId: 100002
        },
        {
          name: 'OH生鲜',
          imgUrl: '//s.weituibao.com/1583585285472/sx.png',
          categoryId: 100004
        },
        {
          name: 'OH到家',
          imgUrl: '//s.weituibao.com/1583585285467/dj.png',
          categoryId: 100005
        },
        {
          name: '充值缴费',
          imgUrl: '//s.weituibao.com/1583585285465/cz.png',
          categoryId: 100006
        },
        {
          name: '9.9元拼',
          imgUrl: '//s.weituibao.com/1583585285469/pt.png',
          categoryId: 100007
        },
        {
          name: '领劵',
          imgUrl: '//s.weituibao.com/1583585285468/juan.png',
          categoryId: 100008
        },
        {
          name: '省钱',
          imgUrl: '//s.weituibao.com/1583585285471/sq.png',
          categoryId: 100009
        },
        {
          name: '全部',
          imgUrl: '//s.weituibao.com/1583585285470/qb.png',
          categoryId: 100010
        }
      ],
      newGoodses: [],
      hots: [],
      recommends: [],
      headerScroll: false
    }
  },
  components: {
    Swiper
  },
  async mounted() {
    const token = getLocal('token')
    if (token) {
      this.isLogin = true
    }
    window.addEventListener('scroll', this.pageScroll)
    this.$toast.loading({
      // 展示加载提示
      message: '加载中...',
      forbidClick: true // 禁用背景点击
    })
    const { data } = await getHome()
    this.swiperList = data.carousels
    this.newGoodses = data.newGoodses

    this.hots = data.hotGoodses
    this.recommends = data.recommendGoodses
    this.$toast.clear()
  },
  methods: {
    pageScroll() {
      const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      scrollTop > 130 ? (this.headerScroll = true) : (this.headerScroll = false)
    },
    goToDetail(item) {
      this.$router.push({ path: `product/${item.goodsId}` })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';

.home-header {
  position: absolute;
  .fj();
  top: 0;
  left: 0;
  .wh(100%, 50px);
  line-height: 50px;
  padding: 0 15px;
  .boxSizing();
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 15px;
  z-index: 10000;
  background-color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  .icon-caidan {
    color: @primary;
  }
  &.active {
    position: fixed;
    border-bottom: 0;
    background-color: @primary;
    animation: slideDown 0.3s ease-in-out;
    @keyframes slideDown {
      0% {
        height: 0;
      }
      100% {
        height: 50px;
      }
    }
    .icon-caidan {
      color: #fff;
    }
    .login {
      color: #fff;
    }
    .header-search {
      border: 0;
      background-color: hsla(0, 0%, 100%, 0.7);
    }
  }
  .header-search {
    display: flex;
    .wh(76%, 20px);
    line-height: 20px;
    margin: 10px 0;
    padding: 5px 0;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    color: #232326;
    .app-name {
      padding: 0 10px;
      border-right: 1px solid #666;
      font-size: 20px;
      font-weight: bold;
      color: @primary;
    }
    .icon-search {
      padding: 0 4px;
      font-size: 17px;
    }
    .search-title {
      line-height: 21px;
      font-size: 12px;
      color: #666;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .login {
    color: @primary;
    line-height: 52px;
    i {
      font-size: 20px;
      vertical-align: -3px;
    }
  }
}
.my-swipe {
  margin-top: 50px;
}
.category-list {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  width: 100%;
  padding-bottom: 13px;
  div {
    display: flex;
    flex-direction: column;
    width: 20%;
    text-align: center;
    img {
      .wh(40px, 40px);
      margin: 13px auto 8px;
    }
  }
}
.good {
  .good-header {
    background: #f9f9f9;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: @primary;
    font-size: 16px;
    font-weight: 500;
  }
  .good-box {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    background: #fff;
    .good-item {
      box-sizing: border-box;
      width: 50%;
      padding: 10px 10px;
      border-bottom: 1px solid #e9e9e9;
      img {
        display: block;
        width: 120px;
        margin: 0 auto;
      }
      .good-desc {
        padding: 10px 0;
        text-align: center;
        font-size: 14px;
        .title {
          color: #222333;
        }
        .price {
          color: @primary;
        }
      }
      &:nth-child(2n + 1) {
        border-right: 1px solid #e9e9e9;
      }
    }
  }
  &:last-child {
    padding-bottom: 100px;
  }
}
</style>
