<template>
  <div class="product-list-wrap">
    <div class="product-list-content">
      <header class="category-header">
        <i class="iconfont icon-back" @click="goBack"></i>
        <div class="header-search">
          <i class="iconfont icon-search"></i>
          <input
            type="text"
            class="search-title"
            v-model="keyword"
            @keyup.enter="getSearch"
          />
        </div>
        <span class="search-btn" @click="getSearch">搜索</span>
      </header>
      <van-tabs type="card" color="#1baeae" @click="changeTab">
        <van-tab title="推荐" name=""></van-tab>
        <van-tab title="新品" name="new"></van-tab>
        <van-tab title="价格" name="price"></van-tab>
      </van-tabs>
    </div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      class="product-list-refresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :offset="300"
      >
        <div
          class="product-item"
          v-for="(item, index) in productList"
          :key="index"
          @click="productDetail(item)"
        >
          <img :src="getRealImg(item.goodsCoverImg)" />
          <div class="product-info">
            <p class="name">{{ item.goodsName }}</p>
            <p class="subtitle">{{ item.goodsIntro }}</p>
            <span class="price">￥ {{ item.sellingPrice }}</span>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// import { getQueryString } from '@/common/js/utils'
import { search } from '../service/good'
export default {
  data() {
    return {
      keyword: '',
      searchBtn: false,
      seclectActive: false,
      refreshing: false,
      loading: false,
      finished: false,
      productList: [],
      totalPage: 0,
      page: 1,
      orderBy: ''
    }
  },
  mounted() {
    // 若 Vuex 中存在 keyword，则表示我们已经在搜索框中输入过了关键字。当我们从商品详情页返回时，可以回到之前输入过了关键字的商品展示列表的页面
    if (this.$store.state.keyword) {
      this.keyword = this.$store.state.keyword
      this.getSearch()
    }
  },
  methods: {
    async init() {
      const { categoryId } = this.$route.query
      if (!categoryId && !this.keyword) {
        this.finished = true
        this.loading = false
        return
      }
      // data: { list } 获取 data 中的 list
      const {
        data,
        data: { list }
      } = await search({
        pageNumber: this.page,
        goodsCategoryId: categoryId,
        keyword: this.keyword,
        orderBy: this.orderBy
      })
      this.productList = this.productList.concat(list)
      this.totalPage = data.totalPage
      this.loading = false
      if (this.page >= data.totalPage) this.finished = true
    },
    goBack() {
      this.$store.commit('changeKeyword', { keyword: '' })
      this.$router.go(-1)
    },
    productDetail(item) {
      this.$router.push({ path: `product/${item.goodsId}` })
    },
    getSearch() {
      if (!this.keyword) {
        this.$toast.fail('请输入关键词')
      } else {
        // 将 keyword 存进 Vuex
        let xx = this.keyword
        this.$store.commit('changeKeyword', { keyword: xx })
      }
      this.onRefresh()
    },
    onLoad() {
      if (!this.refreshing && this.page < this.totalPage) {
        this.page = this.page + 1
      }
      if (this.refreshing) {
        this.productList = []
        this.refreshing = false
      }
      this.init()
    },
    onRefresh() {
      this.refreshing = true
      this.finished = false
      this.loading = true
      this.page = 1
      this.onLoad()
    },
    changeTab(name) {
      this.orderBy = name
      this.onRefresh()
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';
.product-list-content {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: #fff;
  .category-header {
    .fj();
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    .boxSizing();
    font-size: 15px;
    color: #656771;
    z-index: 10000;
    &.active {
      background: @primary;
    }
    .header-search {
      display: flex;
      width: 76%;
      height: 20px;
      line-height: 20px;
      margin: 10px 0;
      padding: 5px 0;
      color: #232326;
      background: #f7f7f7;
      .borderRadius(20px);
      .icon-search {
        padding: 0 5px 0 15px;
        font-size: 20px;
      }
      .search-title {
        font-size: 12px;
        color: #666;
        background: #f7f7f7;
      }
    }
    .search-btn {
      height: 28px;
      margin: 8px 0;
      line-height: 28px;
      padding: 0 5px;
      color: #fff;
      background: @primary;
      .borderRadius(5px);
      margin-top: 10px;
    }
  }
}
.product-list-refresh {
  margin-top: 78px;
  .product-item {
    .fj();
    width: 100%;
    height: 120px;
    padding: 10px 0;
    border-bottom: 1px solid #dcdcdc;
    img {
      width: 140px;
      height: 120px;
      padding: 0 10px;
      .boxSizing();
    }
    .product-info {
      width: 56%;
      height: 120px;
      padding: 5px;
      text-align: left;
      .boxSizing();
      p {
        margin: 0;
      }
      .name {
        width: 100%;
        max-height: 40px;
        line-height: 20px;
        font-size: 15px;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .subtitle {
        width: 100%;
        max-height: 20px;
        padding: 10px 0;
        line-height: 25px;
        font-size: 13px;
        color: #999;
        overflow: hidden;
      }
      .price {
        color: @primary;
        font-size: 16px;
      }
    }
  }
}
</style>
