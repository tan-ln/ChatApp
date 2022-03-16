export const __self = state => state.__self

export const navbar = state => state.navbar

export const getAuthState = state => state.__self.isSignIn && state.__self.userInfo.email

export const getFlipAni = state => state.flipAni

export const getModalState = state => state.modal

export const getMsgQueue = state => {
  // return state.msgQueue.map(item => {
  //   item.msg = {
  //     content: 'xxx 加入群聊',
  //     timestamp: '10:23'
  //   }
  //   item.top = true
  // })

  return [
    {
      id: 'id_xin',
      avatar: 'xin.jpg',
      name: '庸の锌小子',
      msg: {
        timestamp: '10:23',
        content: 'test http://www.baidu.com and m.bilibili.com 测试'
      },
      top: true,
      mute: false
    },
    {
      id: 'id_lao',
      avatar: 'lao.jpg',
      name: '铑小子',
      msg: {
        timestamp: '10:23',
        content: '干净又卫生啊庸'
      },
      top: false,
      mute: true
    }
  ]
}
