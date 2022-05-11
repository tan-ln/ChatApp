import { post } from '@/api/request.js'

const state = {
  // 正在聊天的消息队列
  curMsgQueue: [],
  // 所有消息队列
  msgQueue: {},
  // 最近/新消息 列表
  lastMsgQueue: []
}

const mutations = {
  // 消息列表
  getMsgList (state, payload) {
    state.msgList = payload
  },
  // 聊天消息管理
  setConversations (state, payload) {
    const { rootGroup, groups, __target, data } = payload
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
        avatar = data.group === 'root' ? rootGroup.gavatar : (groups.map(item => item.gname === data.group)[0])
      } else {
        // 私聊
        JSON.parse(rootGroup.gmember).map(item => {
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
      // 在聊天列表中
      lastQueue.forEach((item, idx) => {
        if (item.msg.group === data.group || item.msg.from === data.from) {
          if (item.msg.group === __target.gname || item.msg.from === __target.gname) {
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
  }
}

const getters = {}

const actions = {
  reqMessages: async ({ commit, rootState }) => {
    const res = await post(`/api/chat`)
    res.code === 200 ? commit('getMsgList', res.msgList) : commit('showModal', { title: 'Get Messages Error', msg: res.message }, { root: true })
  },
  // 当前聊天对象
  setCurrentChating: ({ commit, rootState }, payload) => {
    const { group, from } = payload
    // 当前聊天
    commit('auth/saveTarget', {
      group,
      from,
      rootGroup: rootState.contact.rootGroup
    }, { root: true })

    state.curMsgQueue = state.msgQueue[rootState.auth.__target.gname || rootState.auth.__target.email].list
    // 从 user 获取 info
    // 清零 未读
    const resetUnReadNum = function () {
      const lastMsgQueue = state.lastMsgQueue
      const target = rootState.auth.__target
      lastMsgQueue.forEach(item => {
        if (item.msg.group === target.gname || item.msg.from === target.email) {
          item.unreadNum = 0
        }
      })
      sessionStorage.setItem('lastMsgQueue', JSON.stringify(state.lastMsgQueue))
    }
    resetUnReadNum()
  },
  // 聊天消息管理
  setConversations ({ commit, rootState }, payload) {
    const { data } = payload
    const { __target } = rootState.auth
    const { rootGroup, groups } = rootState.contact
    commit('setConversations', {
      rootGroup, groups, __target, data
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
