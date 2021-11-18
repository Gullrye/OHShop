<template>
  <div class="address-edit-box">
    <s-header :name="`${type == 'add' ? '新增地址' : '编辑地址'}`"></s-header>
    <van-address-edit
      :area-list="areaList"
      :show-postal="false"
      :show-delete="type == 'edit'"
      :address-info="addressInfo"
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import { areaList } from '@vant/area-data'
import sHeader from '../components/SimpleHeader.vue'
import {
  addAddress,
  deleteAddress,
  editAddress,
  getAddressDetail
} from '../service/address'
export default {
  data() {
    return {
      areaList,
      searchResult: [],
      type: 'add',
      addressId: '',
      addressInfo: {}
    }
  },
  components: {
    sHeader
  },
  methods: {
    async onSave(content) {
      const params = {
        userName: content.name,
        userPhone: content.tel,
        provinceName: content.province,
        cityName: content.city,
        regionName: content.county,
        detailAddress: content.addressDetail,
        defaultFlag: content.isDefault ? 1 : 0
      }
      if (this.type === 'edit') {
        params.addressId = this.addressId
      }
      ;(await this.type) === 'add' ? addAddress(params) : editAddress(params)
      this.$toast('保存成功')
      setTimeout(() => {
        this.$router.push({ path: 'address' })
      }, 1000)
    },
    async onDelete() {
      await deleteAddress(this.addressId)
      this.$toast('删除成功')
      setTimeout(() => {
        this.$router.push({ path: 'address' })
      }, 1000)
    }
  },
  async mounted() {
    // console.log(areaList)
    const { addressId, type } = this.$route.query
    this.addressId = addressId
    this.type = type
    if (type === 'edit') {
      let _areaCode = ''
      const province = Object.entries(this.areaList.province_list)
      const { data: addressDetail } = await getAddressDetail(addressId)
      // Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组
      Object.entries(this.areaList.county_list).forEach(([id, text]) => {
        // 遍历区，找到和地址详情接口的 regionName 相同的区。然后找到该区对应的省和市，然后判断：区对应的省和市 === 地址详情接口的省和市？是就将该区的 id 赋值给 _areaCode
        // xx 区
        if (text === addressDetail.regionName) {
          // 区对应的多个省份
          const provinceIndex = province.findIndex(item => {
            return item[0].substr(0, 2) === id.substr(0, 2)
          })
          // 区对应的多个市
          const cityItem = Object.entries(this.areaList.city_list).filter(
            item => item[0].substr(0, 4) === id.substr(0, 4)
          )[0]
          // 对比找到的省份和接口返回的省份是否相等，因为有些区可能重名
          if (
            province[provinceIndex][1] === addressDetail.provinceName &&
            cityItem[1] === addressDetail.cityName
          ) {
            _areaCode = id
          }
        }
      })
      this.addressInfo = {
        id: addressDetail.addressId,
        name: addressDetail.userName,
        tel: addressDetail.userPhone,
        province: addressDetail.provinceName,
        city: addressDetail.cityName,
        county: addressDetail.regionName,
        addressDetail: addressDetail.detailAddress,
        areaCode: _areaCode,
        isDefault: !!addressDetail.defaultFlag
      }
    }
    // console.log(this.addressInfo)
  }
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';
.address-edit-box {
  margin-top: 50px;
  ::v-deep .van-button--danger,
  ::v-deep .van-switch--on {
    background-color: @primary;
    border-color: @primary;
  }
}
</style>
