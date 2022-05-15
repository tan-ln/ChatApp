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

## room
1. join
```js
socket.join("some room")
```
2. leave
断开连接后，socket 会自动 leave 它们所属的所有通道

## 服务端消息发送
```js
//给本次链接自己发送消息
socket.emit()
//给某个房间内所有人发消息（包括自己）
io.in(room).emit()
//除本连接自己之外，给某个房间内所有人发消息（不包括自己）
socket.to(room).emit()
//除本连接外，给所有人发消息（不包括自己的整个个站点其他人）
socket.broadcast.emit()
```

## 客户端处理消息
1. 服务端发送action命令 客户端监听action之后调用相应方法
```js
S：socket.emit('action');
C：socket.on('action', function(){

};
```

2. 带有data数据
```js
S：socket.emit('action', data);
C：socket.on('action', function(data){

});
```

3. 带有多个数据
```js
S：socket.emit('action', arg1, arg2);
C：socket.on('action', function(arg1, arg2){

});
```

4. 含回调函数
```js
S：socket.emit('action', data, function(arg1, arg2){...});
C：socket.on('action', function(data, fn){fn('a', 'b');});
```


