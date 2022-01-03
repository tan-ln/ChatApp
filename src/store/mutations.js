import Vue from 'vue'
import * as types from './mutation-types'
import { uuidv4 } from '../utils'

export default {
  [types.CREATE_SESSION] (state, { chatWith }) {
    createSession(state, chatWith)
  },

  [types.SET_PAGE_NAME] (state, title) {
    state.pageName = title
    sessionStorage.setItem('pageName', title)
  },

  [types.SET_CURRENT_SESSION] (state, chatWith) {
    state.currentFrom = chatWith
    if (!state.sessions[chatWith]) {
      createSession(state, chatWith)
    }
    // 清零未读
    if (state.sessions[chatWith].lastMessage) state.sessions.unreadNum = 0
  },

  [types.LOGIN] (state, data) {
    let status = data.msg
    state.login_status = status
    state.self = { ...data.userInfo }
  },

  [types.SEND_MESSAGE_SUCCESS] (state, payload) {
    let message = {
      id: 'm_' + uuidv4(),
      ...payload
    }
    state.sessions[payload.to].messages.push(message)
  },

  [types.UPDATE_SESSIONS] (state, payload) {
    console.log(payload)
  }
}

function createSession (state, chatWith) {
  Vue.set(state.sessions, chatWith, {
    chatWith,
    messages: [],
    unreadNum: 0
  })
}
