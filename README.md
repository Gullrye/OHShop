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
  - ...

- 已注册账号
  - 账号                    密码
  - 13600000009    111111
  - 13606865391    111111
  - 13612345608    13612345678
