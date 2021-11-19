# OH 商城

- 后端接口见 [newbee](https://github.com/newbee-ltd/newbee-mall-vue-app) 商城项目

- npm

  - 编译代码的时候 px 自动转化成 rem
    - `$ npm install postcss postcss-pxtorem@5.1.1 --save-dev`，若装 6.0.0 版本会报错（报错信息：PostCSS plugin postcss-pxtorem requires PostCSS 8.）
    - 大写的 PX 就不会被转化为 rem
  - 验证码组件需要
    - `npm install vue2-verify`
  - 登录密码 md5 加密
    - `npm install js-md5`
  - ...

- 项目修改

  - 首页导航栏修改
  - 分类页重写
  - 订单页和地址页返回跳转修改
  - 未登录跳转修改
  - 购物车逻辑重写
    - 添加商品时购物袋图标摇晃
    - 能够直接点击「加入购物车」按钮来多次添加
  - 配置 Vant 的地址栏

- 问题
  - 解决报错：`NavigationDuplicated: Avoided redundant navigation to current location`

  ```js
  // src/router/index.js 文件中
  //获取原型对象上的push函数
  const originalPush = VueRouter.prototype.push
  //修改原型对象中的push方法
  VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
  }
  ```

- 已注册账号

  - 账号 密码
  - 13600000009 111111
  - 13606865391 111111
  - 13612345608 13612345678

- show

![show](./img/GIF%202021-10-10%200-19-41.gif)
