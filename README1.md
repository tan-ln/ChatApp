# myChat

## 滚动条 不滚动时隐藏
```js
data () {
  return {
    hideScroll: true
  }
},
mounted () {
  this.$nextTick(() => {
    this.$refs.mainRef.addEventListener('scroll', () => {
      this.hideScroll = false
      setTimeout(() => {
        this.hideScroll = true
      }, 800)
    })
  })
},
beforeDestroy () {
  this.$refs.mainRef.removeEventListener('scroll')
}
```

## Enter 不换行，Ctrl + Enter 换行
```html
<textarea
  name="inputArea"
  id="inputArea"
  placeholder="Enter to send message / Ctrl + Enter to add new line"
  v-model="textContent"
  @keydown.exact.enter="handleEnterSubmit($event)"
  @keydown.ctrl.enter="handleLineFeed"
></textarea>
```
```js
methods: {
  handleEnterSubmit (e) {
    e.preventDefault()
    console.log('submit')
  },
  handleLineFeed () {
    // Ctrl + Enter 换行
    this.textContent += '\n'
  }
}
```

## 聊天气泡
```css
#message__block.toLeft {
  border-bottom-left-radius: .6rem;
  border-top-right-radius: .6rem;
  border-bottom-right-radius: .6rem;
  background-color: $bg_color;
  margin-left: .2rem;
  box-shadow: .02rem .04rem .06rem $shadow_color;
  /* 三角箭头 */
  &::before {
    content: "";
    position: absolute;
    left: -.16rem;
    top: 0;
    width: 0;
    height: 0;
    border: .14rem solid;
    border-color:  $bg_color transparent transparent;
  }
  /* 空元素 实现圆角 */
  div {
    position: absolute;
    top: 0;
    left: -.16rem;
    width: 0.14rem;
    height: 0.2rem;
    background-color: rgb(255, 255, 255);
    border-radius: 50%;
    z-index: 999;
    transform: rotate(-45deg);
  }
}
```

## 过滤 url
```js
export function isURL (str) {
  // 正则匹配 http/https... 返回匹配成功数组
  return str.match(/(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g)
}

res.forEach(item => {
  data = data.replace(item, `<a href="${item}" target="_blank">${item}</a>`)
})
```

## _self 的问题
使用 `_self` 当作属性，报错 `...was assigned to but it has no setter`

```js
const state = {
  // 当前用户
  __self: {
    userInfo: { name: 'tang', avatarUrl: require('@/assets/images/yong.jpg') }
  },
  // 聊天对象
  __target: {},
}
```

## inline-block 元素默认间距清除

其父元素 `font-size: 0;`

## transition/ ..-group && animate.css
> 钩子 触发条件 v-if / v-show 
```html
<transition-group
  :duration="400"
  v-on:before-enter="beforeAniEnter"
  v-on:after-leave="afterAniLeave"
>
</transition-group>
```
## cors
```js
// config/index.js
proxyTable: {
  '/api': {
    target: 'http://localhost:5000/',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/'
    }
  }
},
```

## vue img src 使用部分网络图片时 403 `Referrer Policy: no-referrer-when-downgrade`
1. 非动态属性 src
2. 无跨域问题

```html
<img class="user__avatar" src="http://xxxxx" :alt="__self.userInfo.username" />
```

解决办法：`index.html`
```html
<meta name="referrer" content="no-referrer">
```

## 使用 服务端 nodejs 静态资源图片
- 需要提供全部路径：协议 + 域名 + 端口 + dir
- http://localhost:5000/images/1.png
- http://127.0.0.1:5000/images/1.png


## rootState
actions 中使用 state，局部状态通过 `context.state`，根节点状态为 `context.rootState`

```js
actions: {
  someAction ({ state, commit, rootState }) {}
}
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

## 组件内样式图片路径使用 绝对路径
```css
div {
  /* 报错 This relative module was not found: ... */
  background-image: url('../../images/bg/aaa.png');
  background-image: url('~@/assets/images/bg/aaa.png');
}
```

## box-shadow
```css
div {
            /*  X 轴  Y 轴  模糊距离 阴影大小  颜色    */
  box-shadow: -.12rem .16rem .06rem -.1rem $border_color;
}
```
