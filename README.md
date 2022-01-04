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