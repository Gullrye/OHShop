<template>
  <div class="product-detail">
    <s-header :name="'商品详情'"></s-header>
    <div class="detail-content">
      <div class="detail-swipe-wrap">
        <van-swipe class="my-swipe" indicator-color="#1baeae">
          <van-swipe-item v-for="(item, index) in detailSlideImgs" :key="index">
            <img :src="getRealImg(item)" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="product-info">
        <div class="product-title">
          {{ detailData.goodsName }}
        </div>
        <div class="product-desc">包邮 随机快递</div>
        <div class="product-price">
          <span>¥{{ detailData.sellingPrice }}</span>
        </div>
      </div>
      <div class="product-intro">
        <ul>
          <li>概述</li>
          <li>参数</li>
          <li>安装服务</li>
          <li>常见问题</li>
        </ul>
        <div
          class="product-content"
          v-html="detailData.goodsDetailContent"
        ></div>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon
        :icon-class="isAddingCart ? 'shake-icon' : ''"
        icon="bag-o"
        :badge="!count ? '' : count"
        @click="goTo()"
        text="购物袋"
      />
      <van-goods-action-button
        type="warning"
        @click="addToCart"
        text="加入购物袋"
      />
      <van-goods-action-button
        type="danger"
        @click="goToCart"
        text="立即购买"
      />
    </van-goods-action>
  </div>
</template>

<script>
import sHeader from '../components/SimpleHeader.vue'
import { addCart, getCart, modifyCart } from '../service/cart'
import { getDetail } from '../service/good'

export default {
  name: 'ProductDetail',
  data() {
    return {
      detailData: {},
      detailSlideImgs: [],
      isAddingCart: false,
      cartItemId: 0
    }
  },
  components: {
    sHeader
  },
  async mounted() {
    const { id } = this.$route.params
    const { data } = await getDetail(id)
    this.detailData = data
    this.detailSlideImgs = data.goodsCarouselList
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    goTo() {
      this.$router.push({ path: '/cart' })
    },
    async addToCart() {
      this.isAddingCart = true
      const goodsId = this.detailData.goodsId
      // 购物车数据
      const { data: cartList } = await getCart({ pageNumber: 1 })
      // console.log(cartList)
      // 获取当前详情页的商品，看是否在购物车内
      const nowGoodObj = cartList.filter(item => item.goodsId === goodsId)[0]
      // 若购物车无此商品，请求 addCart 这个只能添加同一个商品一次的接口
      if (!nowGoodObj) {
        const { resultCode } = await addCart({
          goodsCount: 1,
          goodsId: this.detailData.goodsId
        })
        if (resultCode === 200) this.$toast.success('添加成功')
      } else {
        // 购物车已经有此商品时，商品数量 + 1
        const params = {
          cartItemId: nowGoodObj.cartItemId,
          goodsCount: ++nowGoodObj.goodsCount
        }
        await modifyCart(params)
      }
      this.$store.dispatch('updateCart')
      setTimeout(() => {
        this.isAddingCart = false
      }, 400)
    },
    async goToCart() {
      await this.addToCart()
      this.$store.dispatch('updateCart')
      this.$router.push({ path: '/cart' })
    }
  },
  computed: {
    count() {
      return this.$store.state.cartCount
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';
.product-detail {
  .detail-content {
    margin-top: 44px;
    padding-bottom: 80px;
    .detail-swipe-wrap {
      .my-swipe .van-swipe-item {
        img {
          width: 100%;
          // height: 300px;
        }
      }
    }
    .product-info {
      padding: 0 10px;
      .product-title {
        font-size: 18px;
        text-align: left;
        color: #333;
      }
      .product-desc {
        font-size: 14px;
        text-align: left;
        color: #999;
        padding: 5px 0;
      }
      .product-price {
        .fj();
        span:nth-child(1) {
          color: #f63515;
          font-size: 22px;
        }
        span:nth-child(2) {
          color: #999;
          font-size: 16px;
        }
      }
    }
    .product-intro {
      width: 100%;
      ul {
        .fj();
        width: 100%;
        margin: 10px 0;
        li {
          flex: 1;
          padding: 5px 0;
          text-align: center;
          font-size: 15px;
          border-right: 1px solid #999;
          box-sizing: border-box;
          &:last-child {
            border-right: none;
          }
        }
      }
      ::v-deep .product-content {
        padding: 0 20px;
        img {
          width: 100% !important;
        }
      }
    }
  }
  .van-goods-action-button--warning {
    background: linear-gradient(to right, #6bd8d8, @primary);
  }
  .van-goods-action-button--danger {
    background: linear-gradient(to right, #0dc3c3, #098888);
  }
  ::v-deep .shake-icon {
    transition: all 0.4s;
    animation: shake 0.4s ease-in-out 1;
  }
  @keyframes shake {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(-15deg);
    }
    50% {
      transform: rotate(0deg);
    }
    75% {
      transform: rotate(10deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
}
</style>
