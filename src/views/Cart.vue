<template>
  <div class="cart-box">
    <s-header :name="'购物袋'"></s-header>
    <div class="cart-body">
      <van-checkbox-group
        v-model="result"
        ref="checkboxGroup"
        @change="groupChange"
      >
        <div class="good-item" v-for="(item, index) in list" :key="index">
          <van-swipe-cell>
            <template #right>
              <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
                @click="deleteGood(item.cartItemId)"
              />
            </template>
            <van-checkbox :name="item.cartItemId"></van-checkbox>
            <div class="good-img">
              <img :src="getRealImg(item.goodsCoverImg)" alt="" />
            </div>
            <div class="good-desc">
              <div class="good-title">
                <span>{{ item.goodsName }}</span>
                <span>x{{ item.goodsCount }}</span>
              </div>
              <div class="good-btn">
                <div class="price">¥{{ item.sellingPrice }}</div>
                <van-stepper
                  integer
                  :min="1"
                  :value="item.goodsCount"
                  :name="item.cartItemId"
                  async-change
                  @change="onChange"
                />
              </div>
            </div>
          </van-swipe-cell>
        </div>
      </van-checkbox-group>
    </div>

    <van-submit-bar
      :price="totalPrice"
      button-text="提交订单"
      @submit="onSubmit"
      v-if="list.length"
    >
      <van-checkbox v-model="checkAll" @click="allCheck">全选</van-checkbox>
    </van-submit-bar>
    <div class="empty" v-if="!list.length">
      <i class="iconfont icon-smile"></i>
      <div class="title">购物袋空空空如也</div>
      <van-button color="#1baeae" type="primary" @click="goTo" block
        >前往首页</van-button
      >
    </div>
  </div>
</template>

<script>
import sHeader from '../components/SimpleHeader.vue'
import { deleteCartItem, getCart, modifyCart } from '../service/cart'
export default {
  name: 'Cart',
  data() {
    return {
      list: [], // 购物袋商品列表
      result: [], // 选择的购物袋商品 id 数组
      checkAll: true
    }
  },
  computed: {
    totalPrice() {
      let totalPrice = 0
      const _list = this.list.filter(item =>
        this.result.includes(item.cartItemId)
      )
      _list.forEach(item => {
        totalPrice += item.goodsCount * item.sellingPrice
      })
      return totalPrice * 100
    }
  },
  components: {
    sHeader
  },
  methods: {
    async init() {
      // 加载中禁止点击
      this.$toast.loading({ message: '加载中...', forbidClick: true })
      const { data } = await getCart({ pageNumber: 1 })
      this.list = data
      this.result = data.map(item => item.cartItemId)
      this.$toast.clear()
    },
    // 单项购买数量变化回调，value, detail 为 vant Stepper 组件 change 事件的回调参数
    async onChange(value, detail) {
      if (
        this.list.filter(item => item.cartItemId === detail.name)[0]
          .goodsCount === value
      ) {
        return
      }
      this.$toast.loading({ message: '修改中...', forbidClick: true })
      const params = {
        cartItemId: detail.name,
        goodsCount: value
      }
      await modifyCart(params)
      this.list.forEach(item => {
        if (item.cartItemId === detail.name) {
          item.goodsCount = value
        }
      })
      this.$toast.clear()
    },
    // 多选变化，是整组的回调
    groupChange(result) {
      if (result.length === this.list.length) {
        this.checkAll = true
      } else {
        this.checkAll = false
      }
      this.result = result
    },
    // 判断 checkAll，如果已是全选状态，checkAll 将变为 false，所以清空 result 内的变量，价格变为 0
    // 如果是非全选状态checkAll 将变为 true，直接将 list 下的 id 塞进 result 变量里，total 会自动变为相应的价格
    allCheck() {
      if (!this.checkAll) {
        this.result = this.list.map(item => item.cartItemId)
      } else {
        this.result = []
      }
      this.$refs.checkboxGroup.toggleAll()
    },
    async deleteGood(id) {
      await deleteCartItem(id)
      this.$store.dispatch('updateCart')
      this.init()
    },
    goTo() {
      this.$router.push({ path: 'home' })
    },
    onSubmit() {
      if (!this.result.length === 0) {
        this.$toast.fail('请选择商品进行结算')
        return
      }
      const params = JSON.stringify(this.result)
      this.$router.push({ path: `create-order?cartItemIds=${params}` })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';
.cart-body {
  margin-top: 50px;
}
.cart-box {
  .cart-body {
    margin-top: 60px;
    padding-left: 10px;
    // chrome 和 edge 浏览器上，此处的 margin-bottom 显示无效
    // margin-bottom: 100px;
    padding-bottom: 100px;
    .good-item {
      ::v-deep .van-swipe-cell__wrapper {
        display: flex;
        flex-direction: row;
        .good-img {
          img {
            .wh(100px, 100px);
          }
        }
        .good-desc {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          padding: 20px;
          .good-title {
            display: flex;
            justify-content: space-between;
          }
          .good-btn {
            display: flex;
            justify-content: space-between;
            .price {
              font-size: 16px;
              color: red;
              line-height: 28px;
            }
          }
        }
      }
    }
    .delete-button {
      width: 50px;
      white-space: nowrap;
      height: 100%;
    }
  }
  .empty {
    width: 50%;
    margin: 20px auto;
    text-align: center;
    .icon-smile {
      display: block;
      font-size: 50px;
      transform: rotate(-45deg);
    }
    .title {
      font-size: 16px;
      margin: 20px auto;
    }
  }
  .van-submit-bar {
    bottom: 50px;
    .van-checkbox {
      margin-left: 10px;
    }
    .van-submit-bar__text {
      margin-right: 10px;
    }
    .van-submit-bar__button {
      background: @primary;
    }
  }
  ::v-deep .van-checkbox__icon--checked .van-icon {
    background-color: @primary;
    border-color: @primary;
  }
}
</style>
