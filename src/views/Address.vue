<template>
  <div class="address-box">
    <s-header :name="'地址管理'" :back="from"></s-header>
    <div class="address-item">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="select"
      />
    </div>
  </div>
</template>

<script>
import sHeader from '../components/SimpleHeader.vue'
import { getAddressList } from '../service/address'
export default {
  components: {
    sHeader
  },
  data() {
    return {
      // from：从购物车页面进入订单详情时，点击返回到达 /cart；从个人主页进入订单详情时，点击返回到达 /user
      from: this.$route.query.from ? `/${this.$route.query.from}` : '',
      chosenAddressId: '1',
      list: []
    }
  },
  methods: {
    onAdd() {
      this.$router.push({ path: 'address-edit?type=add' })
    },
    onEdit(item, index) {
      this.$router.push({ path: `address-edit?type=edit&addressId=${item.id}` })
    },
    // 切换选中的地址时触发。item: 地址对象，index: 索引
    select(item, index) {
      this.$router.push({ path: `create-order?addressId=${item.id}` })
    }
  },
  async mounted() {
    const { data } = await getAddressList()
    this.list = data.map(item => {
      return {
        id: item.addressId,
        name: item.userName,
        tel: item.userPhone,
        address: `${item.provinceName} ${item.cityName} ${item.regionName} ${item.detailAddress}`,
        isDefault: !!item.defaultFlag
      }
    })
  }
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';
// ::v-deep .simple-header {
//   justify-content: center;
//   .icon-back, .icon-menu {
//     display: none;
//   }
// }
.address-item {
  margin-top: 50px;
  ::v-deep .van-radio__icon--checked .van-icon-success {
    background-color: @primary;
    border-color: @primary;
  }
  ::v-deep .van-radio__icon {
    display: none;
  }
  .van-button--danger,
  .van-tag--danger {
    background-color: @primary;
  }
}
</style>
