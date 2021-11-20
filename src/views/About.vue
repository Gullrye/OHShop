<template>
  <div class="about">
    <s-header :name="'关于我们'"></s-header>
    <div class="map-wrapper">
      <h2 class="title map-title">联系地址</h2>
      <!-- <p>position: [{{ lng }}, {{ lat }}]</p> -->
      <p class="address-detail">地址: {{ address }}</p>
      <div class="vue-map">
        <el-amap
          vid="amapDemo"
          :center="center"
          :zoom="zoom"
          class="amap-demo"
          :events="events"
        >
          <el-amap-marker
            vid="component-marker"
            :position="position"
            :draggable="true"
            :events="events"
          ></el-amap-marker>
        </el-amap>
      </div>
    </div>
    <div class="msg-wrapper">
      <h2 class="title">关于我们</h2>
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
  </div>
</template>

<script>
import Vue from 'vue'
import sHeader from '../components/SimpleHeader.vue'
import VueAMap from 'vue-amap'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'cde7aa4cab0681d34ddb6916431125b2',
  plugin: [
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'Geocoder'
  ],
  v: '1.4.4'
})

export default {
  components: {
    sHeader
  },
  data() {
    let self = this

    return {
      zoom: 12,
      center: [116.391377, 23.04888],
      address: '广东省汕头市百花山风景区',
      lng: 116.391377,
      lat: 23.04888,
      // position: [116.391377, 23.04888],
      // position: [this.lng, this.lat],
      events: {
        click(e) {
          let { lng, lat } = e.lnglat
          self.lng = lng
          self.lat = lat

          // 这里通过高德 SDK 完成。
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all'
          })
          geocoder.getAddress([lng, lat], function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.regeocode) {
                self.address = result.regeocode.formattedAddress
                self.$nextTick()
              }
            }
          })
        },
        dragend(e) {
          self.events.click(e)
        }
      }
    }
  },
  computed: {
    position() {
      return [this.lng, this.lat]
    }
  }
}
</script>

<style lang="less" scoped>
.about {
  color: #1baeae;
  text-align: center;
  .title {
    display: inline-block;
    width: 50%;
    margin-top: 50px;
    padding: 10px 0;
    border-bottom: 1px dashed #1baeae;
    text-align: center;
  }
  .intro {
    font-size: 20px;
    padding-bottom: 100px;
  }
  .vue-map {
    width: 95%;
    height: 400px;
    margin: 0 auto;
    .el-vue-amap-container {
      border: 2px dashed #1baeae;
    }
  }
  .address-detail {
    text-align: center;
    font-size: 15px;
  }
}
</style>
