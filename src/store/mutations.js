export default {
  changeNavbarActiveId (state, idx = 0) {
    state.navbar.activeId = idx
  },
  // 登录成功后，本地保存登录信息
  signInState (state, payload) {
    state.__self.userInfo = payload
    state.__self.isSignIn = true
    localStorage.setItem('isSignIn', true)
    localStorage.setItem('userInfo', JSON.stringify(payload))
  }
}
