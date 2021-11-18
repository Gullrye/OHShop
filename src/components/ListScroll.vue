<template>
  <div ref="wrapper" class="scroll-wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    // probeType 为 1，仅仅当手指按在滚动区域上，每隔 momentumLimitTime 毫秒派发一次 scroll 事件
    // probeType 为 2，仅仅当手指按在滚动区域上，一直派发 scroll 事件
    // probeType 为 3，任何时候都派发 scroll 事件，包括调用 scrollTo 或者触发 momentum 滚动动画
    probeType: {
      type: Number,
      default: 1
    },
    // 点击列表是否派发click事件
    click: {
      type: Boolean,
      default: true
    },
    // 是否开启横向滚动
    scrollX: {
      type: Boolean,
      default: false
    },
    // 是否派发滚动事件
    listenScroll: {
      type: Boolean,
      default: false
    },
    // 列表的数据
    scrollData: {
      type: Array,
      default: null
    },
    // 是否派发滚动到底部的事件，用于上拉加载
    pullup: {
      type: Boolean,
      default: false
    },
    // 是否派发顶部下拉的事件，用于下拉刷新
    pulldown: {
      type: Boolean,
      default: false
    },
    // 是否派发列表滚动开始的事件
    beforeScroll: {
      type: Boolean,
      default: false
    },
    // 当数据更新后，刷新scroll的延时
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  methods: {
    initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      // better-scroll 初始化
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX
      })
      // 是否派发滚动事件
      if (this.listenScroll) {
        const self = this
        // on 是 betterscroll 上的方法，能够监听当前实例上的钩子函数 scroll
        this.scroll.on('scroll', position => {
          self.$emit('scroll', position)
        })
      }
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          // 滚动到底部
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            // 派发滚动到底部的事件
            this.$emit('scrollToEnd')
          }
        })
      }
      if (this.pulldown) {
        this.scroll.on('touchend', pos => {
          // 下拉动作
          if (pos.y > 50) {
            // 下拉刷新
            this.$emit('pulldown')
          }
        })
      }
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          // 列表滚动前触发
          this.$emit('beforeScroll')
        })
      }
    },
    disable() {
      // 代理 better-scroll 的 disable 方法
      this.scroll && this.scroll.disable()
    },
    enable() {
      // 代理 better-scroll 的 enable 方法
      this.scroll && this.scroll.enable()
    },
    refresh() {
      // 代理 better-scroll 的 refresh 方法
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      // 代理 better-scroll 的 scrollTo 方法
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      // 代理 better-scroll 的 scrollToElement 方法
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  },
  mounted() {
    // 在 DOM 渲染完毕后初始化 better-scroll
    this.$nextTick(() => {
      this.initScroll()
    })
  },
  updated() {
    this.scroll.refresh()
  }
}
</script>

<style lang="less" scoped>
.scroll-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  // overflow-y: scroll;
  // touch-action: pan-y;
}
</style>
