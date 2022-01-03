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
