# OH 商城

## 接口

[接口页面](http://47.99.134.126:28019/swagger-ui.html#/)

详情见 [newbee](https://github.com/newbee-ltd/newbee-mall-vue-app) 商城项目。

## npm

- 编译代码的时候 px 自动转化成 rem
  - `$ npm install postcss postcss-pxtorem@5.1.1 --save-dev`，若装 6.0.0 版本会报错（报错信息：`PostCSS plugin postcss-pxtorem requires PostCSS 8.`）
  - 大写的 `PX` 就不会被转化为 `rem`
- 验证码组件需要
  - `npm install vue2-verify`
- 登录密码 md5 加密
  - `npm install js-md5`
- ...

## 项目修改

- 首页导航栏修改
- 分类页重写
- 订单页和地址页返回跳转修改
- 未登录跳转修改
- 购物车逻辑重写
  - 添加商品时购物袋图标摇晃
  - 能够直接点击「加入购物车」按钮来多次添加同一商品
- 使用 Vant 的 Area 省市区选择及默认的省市区数据，实现地址管理
- Vuex 中设置 `keyword`，实现从 `ProductDetail.vue` 跳转到 `ProductList.vue` 时，保留搜索框关键字状态
- 地址管理链接 bug(`this.cartItemIds` 未赋值) 处理
- 使用 `keep-alive` 缓存首页等
- About.vue 中添加地图

  - `npm install -S vue-amap`
  - 在 `.eslintrc.js` 中配置

  ```js
  globals: {
    'AMap': false,
  }
  ```

  - 实现拖动和点击时改变地址
  - 官方文档网站案例代码显示不出来，可以查看 [issue](https://github.com/ElemeFE/vue-amap/issues/646) 中的回答，下载一份源码进行简单修改后，查看完整文档

  ```html
  // 将源码里 src/docs/index.html 下的
  <script src="//unpkg.com/docsify/lib/docsify.min.js"></script>
  // 修改为
  <script src="//unpkg.com/docsify@4.11.6/lib/docsify.min.js"></script>
  ```

- 问题

  - 解决报错：`NavigationDuplicated: Avoided redundant navigation to current location`

  ```js
  // src/router/index.js 文件中
  //获取原型对象上的 push 函数
  const originalPush = VueRouter.prototype.push
  //修改原型对象中的push方法
  VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
  }
  ```

  - `yarn build` 打包到 gitee pages 遇到的问题

  ```js
  // 静态资源路径默认为 '/'，导致找不到文件
  // 解决，在 vue.config.js 中设置如下
  module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/' // 部署应用包时的基本 URL
  }

  // Login.vue 中设置 token 后进行跳转使用 window.location.href = '/'，但是访问不到部署后的路径
  // 改为
  window.location.href = './'

  // 修改 public/index.hteml 中的阿里 iconfont css 链接，即加上 http:
  href = "http://at.alicdn.com/t/font_2846922_1288uo7so1wd.css"
  ```

- 已注册账号

  - 账号 密码
  - 13600000009 111111
  - 13606865391 111111
  - 13612345608 13612345678

- 展示图

![show](./img/GIF%202021-10-10%200-19-41.gif)
