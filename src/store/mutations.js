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
  // 获取用户信息
  getUserInfo (state) {
    const isSignIn = sessionStorage.getItem('isSignIn') ? sessionStorage.getItem('isSignIn') : false
    const userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {}
    if (isSignIn && userInfo.email) {
      state.__self.isSignIn = true
      state.__self.userInfo = userInfo
    }
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
  showExtends (state, payload) {
    state.showExtends = typeof payload === 'undefined' ? !state.showExtends : payload
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
    const { group, data } = payload
    // 更新 __target
    if (state.__target.gname && state.__target.gname === group) {
      state.__target = data
    }
    // root group 单独保存
    if (group === 'root') {
      state.rootGroup = data
      sessionStorage.setItem('root-group', JSON.stringify(state.rootGroup))
    } else {
      // 其他群组
      // if (state.groups.length) {
      //   state.groups.forEach(item => {})
      // }
    }
  },

  // 聊天消息管理
  setConversations (state, payload) {
    const { data } = payload
    // 所有在线消息存储
    // 在消息列表当中 push
    const temp = state.msgQueue[data.group || data.from]
    if (temp && temp.list) {
      temp.list.push(data)
    } else {
      // create
      state.msgQueue[data.group || data.from] = { list: [data] }
    }

    // 获取头像
    function getAvatar () {
      let avatar = ''
      if (data.group) {
        // 群聊
        avatar = data.group === 'root' ? state.rootGroup.gavatar : (state.groups.map(item => item.gname === data.group)[0])
      } else {
        // 私聊
        JSON.parse(state.rootGroup.gmember).map(item => {
          if (item.email === data.from) {
            avatar = item.avatar
          }
        })
      }
      return avatar
    }
    // 最近聊天列表更新
    const lastQueue = state.lastMsgQueue
    if (lastQueue.length > 0) {
      let temp = true
      const target = state.__target
      // 在聊天列表中
      lastQueue.forEach((item, idx) => {
        if (item.msg.group === data.group || item.msg.from === data.from) {
          if (item.msg.group === target.gname || item.msg.from === target.gname) {
            item.unreadNum = 0
          } else {
            item.unreadNum++
          }
          // 对象合并
          item.msg = data
          if (!item.avatar) {
            lastQueue[idx]['avatar'] = getAvatar()
          }
          temp = false
        }
      })
      // 不在聊天列表中
      if (temp) {
        lastQueue.push({
          msg: data,
          id: data.timestamp + data.from,
          unreadNum: 1,
          top: false,
          mute: false,
          avatar: getAvatar()
        })
      }
    } else {
      // 聊天列表为空
      lastQueue.push({
        msg: data,
        id: data.timestamp + data.from,
        unreadNum: 1,
        top: false,
        mute: false,
        avatar: getAvatar()
      })
    }
    sessionStorage.setItem('msgQueue', JSON.stringify(state.msgQueue))
    sessionStorage.setItem('lastMsgQueue', JSON.stringify(state.lastMsgQueue))
  },

  setAllContacts (state, payload) {
    state.contactsBook = payload
  },

  // 当前聊天对象
  setCurrentChating (state, payload) {
    const { group, from } = payload
    const rootGroup = state.rootGroup
    // 群组，从 rootGroup 或 groups 当中过滤
    if (group) {
      // root group
      if (group === 'root') {
        state.__target = rootGroup
      } else {
        // 其他群组从 groups 筛选信息
      }
    } else {
      // 好友信息，从 rootGroup 过滤
      const data = rootGroup.filter(item => item.email === from)
      state.__target = data[0]
    }
    state.curMsgQueue = state.msgQueue[state.__target.gname || state.__target.email].list
    // 从 user 获取 info
    sessionStorage.setItem('__target', JSON.stringify(state.__target))
    // 清零 未读
    const resetUnReadNum = function () {
      const lastMsgQueue = state.lastMsgQueue
      const target = state.__target
      lastMsgQueue.forEach(item => {
        if (item.msg.group === target.gname || item.msg.from === target.email) {
          item.unreadNum = 0
        }
      })
      sessionStorage.setItem('lastMsgQueue', JSON.stringify(state.lastMsgQueue))
    }
    resetUnReadNum()
  },

  // 本地存储
  syncStorage (state) {
    if (!sessionStorage.getItem('msgQueue')) return
    const msgQueue = JSON.parse(sessionStorage.getItem('msgQueue'))
    const lastMsgQueue = JSON.parse(sessionStorage.getItem('lastMsgQueue'))
    const target = sessionStorage.getItem('__target') ? JSON.parse(sessionStorage.getItem('__target')) : false
    const curMsgQueue = target ? msgQueue[target.gname || target.email].list : false
    state.msgQueue = msgQueue
    state.lastMsgQueue = lastMsgQueue
    state.__target = target || {}
    state.curMsgQueue = curMsgQueue || []
  },

  // source files
  saveSourceFiles (state, payload) {
    state.sourceFiles = payload
  },

  // error handler
  errorHandler (state, payload) {
    state.errorno = payload
  },
  // 登出
  logout () {
    sessionStorage.clear()
  }
}
