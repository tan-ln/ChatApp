import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'

Vue.use(Vuex)

const state = {
  // 当前用户
  __self: { isSignIn: false, userInfo: {} },
  // 当前聊天对象
  __target: {},
  curMsgQueue: [],
  // 导航栏
  navbar: {
    activeId: 0,
    // 导航列表
    navList: [
      { title: 'Home', name: 'home', fontCode: '&#xe690;', to: '/' },
      { title: 'Messages', name: 'messages', fontCode: '&#xe601;', to: '/messages' },
      { title: 'Contacts', name: 'contacts', fontCode: '&#xe61f;', to: '/contacts' },
      { title: 'Folders', name: 'folders', fontCode: '&#xeac5;', to: '/folders' },
      { title: 'Collections', name: 'collections', fontCode: '&#xeac6;', to: '/collections' }
    ],
    // 底部操作栏 设置 | 深色模式
    setting: { title: 'Setting', name: 'setting', fontCode: '&#xe8b8;' },
    darkMode: { title: 'Collections', name: 'collections', fontCode: '&#xe664;' }
  },
  msgQueue: {},
  // 最近消息列表
  lastMsgQueue: [],
  contactsBook: [],
  groups: [],
  errorno: {},
  // 过场动画反转
  flipAni: false,
  // modal 弹窗
  modal: { show: false, title: '', msg: '' },
  showExtends: false
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
