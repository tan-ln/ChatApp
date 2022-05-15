// import { post } from '@/api/request.js'

const state = {
  // 正在聊天的消息队列
  curMsgQueue: [],
  // 所有消息队列
  msgQueue: {},
  // 最近/新消息 列表
  lastMsgQueue: []
}

const mutations = {
  // 更新最近聊天列表
  updateLastQueue (state, payload) {
    const { data, master } = payload
    // 最近聊天列表更新
    const lastQueue = state.lastMsgQueue
    if (lastQueue.length > 0) {
      let temp = false
      lastQueue.forEach((item, idx) => {
        // 群聊 || 私聊
        if ((data.group && item.msg.group === data.group) || (!data.group && !item.msg.group && item.master === master)) {
          // 在聊天列表中
          temp = true
          // 覆盖更新
          item.msg = data
        }
      })
      // 不在聊天列表中
      if (!temp) {
        const id = data.timestamp ? data.timestamp : Date.now()
        lastQueue.push({
          master,
          msg: data,
          id: id + master,
          unreadNum: 0,
          top: false,
          mute: false
        })
      }
    } else {
      // 聊天列表为空
      const id = data.timestamp ? data.timestamp : Date.now()
      lastQueue.push({
        master,
        msg: data,
        id: id + master,
        unreadNum: 0,
        top: false,
        mute: false
      })
    }
    sessionStorage.setItem('lastMsgQueue', JSON.stringify(state.lastMsgQueue))
  },
  // 聊天消息存储
  setConversations (state, payload) {
    const { data, master } = payload
    if (!data['content']) return
    // 所有在线消息存储
    // 在消息列表当中 push
    // const temp = state.msgQueue[data.group || (__target.email === data.from ? data.to : data.from)]
    const temp = state.msgQueue[data.group || master]
    if (temp && temp.list) {
      temp.list.push(data)
    } else {
      // create
      state.msgQueue[data.group || master] = { list: [data] }
    }
    sessionStorage.setItem('msgQueue', JSON.stringify(state.msgQueue))
  },
  // 加载当前对象聊天消息
  loadTargetMsg (state, payload) {
    const { group, master } = payload
    // 新的聊天 / 不在消息列表中
    if (!state.msgQueue[group || master] || !state.msgQueue[group || master]['list']) {
      // 创建一个空 list
      state.msgQueue[group || master] = { list: [] }
      state.curMsgQueue = state.msgQueue[group || master].list
    } else {
      // 已有聊天
      state.curMsgQueue = state.msgQueue[group || master].list
    }
    sessionStorage.setItem('msgQueue', JSON.stringify(state.msgQueue))
  },
  // 未读消息管理
  setUnReadNum (state, payload) {
    const { data, __target, master } = payload
    state.lastMsgQueue.forEach(item => {
      // 群聊消息
      if (data.group && item.msg.group === data.group) {
        // 是否当前在聊
        if (item.msg.group === __target.gname) {
          item.unreadNum = 0
        } else {
          // 其他对象
          item.unreadNum++
        }
      } else if (!data.group && item.master === master) {
        // 私聊消息
        // 是否当前在聊
        if (item.master === __target.email) {
          item.unreadNum = 0
        } else {
          // 其他对象
          item.unreadNum++
        }
      }
    })
    sessionStorage.setItem('lastMsgQueue', JSON.stringify(state.lastMsgQueue))
  },
  // 清空未读消息
  cleanUnReadNum (state, payload) {
    const { group, from } = payload
    state.lastMsgQueue.forEach(item => {
      if ((group && item.msg.group === group) || (!group && item.master === from)) {
        item.unreadNum = 0
      }
    })
    sessionStorage.setItem('lastMsgQueue', JSON.stringify(state.lastMsgQueue))
  }
}

const getters = {}

const actions = {
  // 当前聊天对象
  setCurrentChating: ({ commit, rootState }, payload) => {
    const { group, from, to } = payload
    const __self = rootState.auth.__self.userInfo
    let master = from
    // 判断私聊消息的发送方是否是自己
    if (!group && from === __self.email) {
      master = to
    }
    // 当前聊天
    commit('auth/saveTarget', {
      group,
      master,
      rootGroup: rootState.contact.rootGroup
    }, { root: true })

    // 加载当前对象聊天消息
    commit('loadTargetMsg', { group, master })
    // 清零 未读
    commit('cleanUnReadNum', payload)
  },
  // 聊天消息管理
  setConversations ({ commit, rootState }, payload) {
    const { data } = payload
    const __target = rootState.auth.__target
    const __self = rootState.auth.__self.userInfo
    let master = data.from
    // 判断私聊消息的发送方是否是自己
    if (!data.group && data.from === __self.email) {
      master = data.to
    }

    // 消息管理
    commit('setConversations', { data, master })
    // 最近聊天列表更新
    commit('updateLastQueue', { data, master })
    // 未读消息管理
    commit('setUnReadNum', { data, __target, master })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
