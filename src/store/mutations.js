export default {
  changeNavbarActiveId (state, idx = 0) {
    state.navbar.activeId = idx
  },
  // 登录成功后，本地保存登录信息
  signInState (state, payload) {
    sessionStorage.isSignIn = true
    sessionStorage.setItem('userInfo', JSON.stringify(payload))
    state.__self.isSignIn = true
    state.__self.userInfo = payload
  },
  // sessionStorage 中获取用户信息
  getUserInfo (state) {
    const isSignIn = sessionStorage.getItem('isSignIn') ? sessionStorage.getItem('isSignIn') : false
    const userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {}
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
    // const msgQueue = sessionStorage.getItem('isSignIn') ? JSON.parse(sessionStorage.getItem('isSignIn')) : false
  },
  // set groups
  saveGroups (state, payload) {
    console.log(payload)
    // sessionStorage.setItem('groups', JSON.stringify(payload))
    if (state.groups[0].gname === 'root') {
      state.groups[0] = payload
    } else {
      state.groups.pop(payload)
    }
  },
  // current conversation
  setConversations (state, payload) {
    const { data } = payload
    console.log(data)
    // const arr = sessionStorage.getItem(data.from) ? sessionStorage.getItem(data.from) : []
    // const cvs = state.conversations || {}
    // for (let key in cvs) {
    //   if (key == data.from) {
    //     cvs[key].pop(data)
    //   }
    // }
    // arr.POP(data)
    // sessionStorage.setItem(data.from, data)
    // if (cvs) {
    //   const newCvs = JSON.parse(cvs).pop(payload)
    //   state.conversations = 'newCvs'
    //   sessionStorage.setItem('conversations', JSON.stringify(newCvs))
    // } else {
    //   sessionStorage.setItem('conversations', JSON.stringify([payload]))
    //   state.conversations.pop(payload)
    // }
  }
}
