# vue-socket.io

```js
const insSocketIO = new VueSocketIO({
  debug: false,
  // connection: SocketIO('127.0.0.1:1234') // if installed socket.io-client
  connection: 'http://localhost:1234'
})

insSocketIO.io.on('connect', () => {
  console.log('connect')
})

// 写法 2
// Vue.use(new VueSocketIO({ connection: 'http://localhost:1234' }))
```

## 方法

- 监听
```js
// 写法 1 配置项
sockets: {
  socketName () {},
}
```
```js
// 写法 2
// 订阅
this.sockets.subscribe('socketName', () => {})
// 解除订阅
this.sockets.unsubscribe('socketName')
```

- emit
```js
this.$socket.emit('socketName', params)
```
