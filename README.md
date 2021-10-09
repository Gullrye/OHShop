# OH 商城

- 编译代码的时候 px 自动转化成 rem
  - `$ npm install postcss postcss-pxtorem@5.1.1 --save-dev`，若装 6.0.0 版本会报错（报错信息：PostCSS plugin postcss-pxtorem requires PostCSS 8.）
  - 大写的 PX 就不会被转化为 rem

- 验证码组件需要
  - `npm install vue2-verify`
- 登录密码 md5 加密
  - `npm install js-md5`
