# wechat

* `runtime-compiler`
    * `template -> ast 树 -> render -> vnode -> DOM`
```js
new Vue({
  el: '#app',
  components: { App },
  template: `<App />`
})
```
* `runtime-only`
    * `render -> vnode -> DOM`
    * 性能更高，代码量更少
    * vue-template-compiler 处理 .vue 文件中的 template
```js
new Vue({
  el: '#app',
  render: h => h(App)
})
```

## favicon.ico
```html
<!-- index.html -->
<link rel="shortcut icon" type="image/x-icon" href="favicon64.ico" color="#FFF">
<link rel="mask-icon" href="favicon64.ico">
<link rel="apple-touch-icon-precomposed" href="favicon64.ico">
```
```js
// webpack.dev.conf.js
new HtmlWebpackPlugin({
  filename: 'index.html',
  template: 'index.html',
  inject: true,
  favicon: 'favicon64.ico'        // 文件在项目根路径，其他路径报错 找不到文件
})
```

