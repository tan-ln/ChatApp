export default {
  // navbar
  changeNavbarActiveId (state, idx = 0) {
    state.navbar.activeId = idx
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
  // 本地存储
  syncStorage (state) {
    if (!sessionStorage.getItem('msgQueue')) return
    const msgQueue = JSON.parse(sessionStorage.getItem('msgQueue'))
    const lastMsgQueue = JSON.parse(sessionStorage.getItem('lastMsgQueue'))
    const target = sessionStorage.getItem('__target') ? JSON.parse(sessionStorage.getItem('__target')) : false
    const curMsgQueue = target ? msgQueue[target.gname || target.email].list : false
    state.chat.msgQueue = msgQueue
    state.chat.lastMsgQueue = lastMsgQueue
    state.auth.__target = target || {}
    state.chat.curMsgQueue = curMsgQueue || []
  },

  // error handler
  errorHandler (state, payload) {
    state.errorno = payload
  }
}
