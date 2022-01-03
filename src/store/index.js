import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'

Vue.use(Vuex)

const state = {
  // 本机号主
  self: {
    _id: null,
    username: null,
    avatar: null
  },
  // 头部标题
  pageName: sessionStorage.getItem('pageName') || 'WeChat',
  // 更多按钮
  showMore: false,
  // 当前聊天对象
  currentFrom: null,
  // 对话 收集
  sessions: {
    'giao': {
      _id: '5d96cc97972fd52070d0c07d',
      chatWith: 'giao',
      avatar: 'public/images/ico_bug.png',
      messages: [
        {
          id: 46546455,
          from: 'tang',
          to: 'giao',
          content: 'legends never die',
          timestamp: 1570005338485
        },
        {
          id: 12313131,
          from: 'giao',
          to: 'tang',
          content: 'yes',
          timestamp: 1570005340788
        }
      ],
      unreadNum: 10
    },
    'jj': {
      _id: '5d96cc86972fd52070d0c07c',
      chatWith: 'jj',
      avatar: 'public/images/ico_game.png',
      messages: [
        {
          id: 456464,
          from: 'jj',
          to: 'tang',
          content: '猴子哈哈',
          timestamp: 1570005340788
        }
      ],
      unreadNum: 0
    }
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
