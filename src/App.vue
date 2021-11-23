<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive include="Home, Category">
        <router-view class="router-view" />
      </keep-alive>
    </transition>
    <nav-bar v-if="isShowNav"></nav-bar>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
export default {
  data() {
    return {
      transitionName: 'slide-left',
      isShowNav: true,
      showMenuList: ['/', '/home', '/category', '/cart', '/user'] // 需要导航栏
    }
  },
  components: {
    NavBar
  },
  watch: {
    $route(to, from) {
      if (this.showMenuList.includes(to.path)) {
        this.isShowNav = true
      } else {
        this.isShowNav = false
      }

      // 由主级到次级
      // to.meta 能取到 route 路由参数中的 meta 属性
      if (to.meta.index > from.meta.index) {
        // 通过改变变量名称控制左右滑动
        this.transitionName = 'slide-left' // 向左滑动
      } else if (to.meta.index < from.meta.index) {
        // 由次级到主级
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = '' // 同级无过渡效果
      }
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.router-view {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  -webkit-overflow-scrolling: touch; // 使用具有回弹效果的滚动, 当手指从触摸屏上移开，内容会继续保持一段时间的滚动效果。
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  position: absolute;
  height: 100%;
  // 为web开发者提供了一种告知浏览器该元素会有哪些变化的方法，这样浏览器可以在元素属性真正发生变化之前提前做好对应的优化准备工作。 这种优化可以将一部分复杂的计算工作提前准备好，使页面的反应更为快速灵敏。
  will-change: transform;
  transition: all 500ms;
  // 指定当元素背面朝向观察者时是否可见
  backface-visibility: hidden;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
