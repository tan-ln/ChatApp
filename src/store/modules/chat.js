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
    const { data } = payload
    // 最近聊天列表更新
    const lastQueue = state.lastMsgQueue
    if (lastQueue.length > 0) {
      let temp = false
      lastQueue.forEach((item, idx) => {
        // 群聊 || 私聊
        if ((data.group && item.msg.group === data.group) || (!data.group && !item.msg.group && item.msg.from === data.from)) {
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
          msg: data,
          id: id + data.from,
          unreadNum: 0,
          top: false,
          mute: false
        })
      }
    } else {
      // 聊天列表为空
      const id = data.timestamp ? data.timestamp : Date.now()
      lastQueue.push({
        msg: data,
        id: id + data.from,
        unreadNum: 0,
        top: false,
        mute: false
      })
    }
    sessionStorage.setItem('lastMsgQueue', JSON.stringify(state.lastMsgQueue))
  },
  // 聊天消息存储
  setConversations (state, payload) {
    const { data } = payload
    if (!data['content']) return
    // 所有在线消息存储
    // 在消息列表当中 push
    const temp = state.msgQueue[data.group || data.from]
    if (temp && temp.list) {
      temp.list.push(data)
    } else {
      // create
      state.msgQueue[data.group || data.from] = { list: [data] }
    }
    sessionStorage.setItem('msgQueue', JSON.stringify(state.msgQueue))
  },
  // 加载当前对象聊天消息
  loadTargetMsg (state, payload) {
    const { group, from } = payload
    // 新的聊天 / 不在消息列表中
    if (!state.msgQueue[group || from] || !state.msgQueue[group || from]['list']) {
      // 创建一个空 list
      state.msgQueue[group || from] = { list: [] }
      state.curMsgQueue = []
    } else {
      // 已有聊天
      state.curMsgQueue = state.msgQueue[group || from].list
    }
    sessionStorage.setItem('msgQueue', JSON.stringify(state.msgQueue))
  },
  // 未读消息管理
  setUnReadNum (state, payload) {
    const { data, __target } = payload
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
      } else if (!data.group && item.msg.from === data.from) {
        // 私聊消息
        // 是否当前在聊
        if (item.msg.from === __target.email) {
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
      if ((group && item.msg.group === group) || (!group && item.msg.from === from)) {
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
    const { group, from } = payload
    // 当前聊天
    commit('auth/saveTarget', {
      group,
      from,
      rootGroup: rootState.contact.rootGroup
    }, { root: true })

    // 加载当前对象聊天消息
    commit('loadTargetMsg', payload)
    // 清零 未读
    commit('cleanUnReadNum', payload)
  },
  // 聊天消息管理
  setConversations ({ commit, rootState }, payload) {
    const { data } = payload
    const __target = rootState.auth.__target
    // 消息管理
    commit('setConversations', payload)
    // 最近聊天列表更新
    commit('updateLastQueue', { data })
    // 未读消息管理
    commit('setUnReadNum', { data, __target })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
