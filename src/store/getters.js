export const __self = state => state.__self

export const navbar = state => state.navbar

export const getAuthState = state => state.__self.isSignIn && state.__self.userInfo.email

export const getFlipAni = state => state.flipAni

export const getModalState = state => state.modal

export const getMsgQueue = state => {
  return state.msgQueue.map(item => {
    item.msg = {
      content: 'xxx 加入群聊',
      timestamp: '10:23'
    }
    item.top = true
  })
}
