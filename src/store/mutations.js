export default {
  changeNavbarActiveId (state, idx = 0) {
    state.navbar.activeId = idx
  },
  // 登录成功后，本地保存登录信息
  signInState (state, payload) {
    localStorage.isSignIn = true
    localStorage.setItem('userInfo', JSON.stringify(payload))
    state.__self.userInfo = payload
    state.__self.isSignIn = true
  },
  // localstorage 中获取用户信息
  getUserInfo (state) {
    const isSignIn = localStorage.getItem('isSignIn') ? JSON.parse(localStorage.getItem('isSignIn')) : false
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
    if (isSignIn && userInfo.email) {
      state.__self.isSignIn = true
      state.__self.userInfo = userInfo
    }
  },
  // error handler
  errorHandler (state, payload) {
    state.errorno = payload
  },
  // 过场动画翻转
  changeFlipAni (state, payload) {
    state.flipAni = payload
  },
  // modal
  showModal (state, payload) {
    state.modal.show = true
    state.modal.title = payload.title
    state.modal.msg = payload.msg
  },
  hideModal (state) {
    state.modal.show = false
  },
  // 消息列表
  getMsgList (state, payload) {
    state.msgList = payload
  },
  getPastMsg (state) {
    // const msgQueue = localStorage.getItem('isSignIn') ? JSON.parse(localStorage.getItem('isSignIn')) : false
  }
}
