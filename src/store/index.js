import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'

Vue.use(Vuex)

const state = {
  // 当前用户
  __self: {
    isSignIn: false,
    userInfo: {}
  },
  // 聊天对象(未从聊天列表删除)
  __target: {
    // 当前聊天对象
    curTarget: {
      userInfo: {
        id: 'xin',
        name: '庸の锌小子',
        avatarUrl: require('@/assets/images/xin.jpg')
      },
      // 未读消息条数
      unreadNum: 0,
      // 消息置顶
      top: true,
      // 消息免打扰
      mute: true
    },
    targetList: {
      xin: {
        userInfo: {
          id: 'xin',
          name: '庸の锌小子',
          avatarUrl: require('@/assets/images/xin.jpg')
        },
        // 未读消息条数
        unreadNum: 0,
        // 消息置顶
        top: true,
        // 消息免打扰
        mute: false
      },
      lao: {
        userInfo: {
          id: 'lao',
          name: '铑小子',
          avatarUrl: require('@/assets/images/lao.jpg')
        },
        // 未读消息条数
        unreadNum: 0,
        // 消息置顶
        top: false,
        // 消息免打扰
        mute: true
      }
    }
  },
  // 导航栏
  navbar: {
    activeId: 0,
    // 导航列表
    navList: [
      { title: 'Home', name: 'home', fontCode: '&#xe690;', to: '/' },
      { title: 'Messages', name: 'messages', fontCode: '&#xe601;', to: '/messages' },
      { title: 'Contacts', name: 'contacts', fontCode: '&#xe61f;', to: 'contacts' },
      { title: 'Folders', name: 'folders', fontCode: '&#xeac5;', to: 'folders' },
      { title: 'Collections', name: 'collections', fontCode: '&#xeac6;', to: 'collections' }
    ],
    // 底部操作栏 设置 | 深色模式
    setting: { title: 'Setting', name: 'setting', fontCode: '&#xe8b8;' },
    darkMode: { title: 'Collections', name: 'collections', fontCode: '&#xe664;' }
  },
  // 消息列表
  conversations: {
    /**
     * link_id: msgList[msg...]
     *
     * link_id: socket 连接id
     * msg: {
     *  from: '',       // sender id
     *  to: '',         // receiver id
     *  timeStamp: '',
     *  type: 'text',  // text | emoji | image | file | voice
     *  content: '',
     *  read: true     // read or unread => true/false
     * }
     */
    xin_tang: [
      { from: 'xin', to: 'tang', timeStamp: '10:23', type: 'text', content: '来杯芦荟汁儿，干净又卫生啊兄弟们!!!!', read: false },
      { from: 'xin', to: 'tang', timeStamp: '10:24', type: 'text', content: '谢谢 谢谢大家给我一个人点的赞  再点就是给up的了。', read: false },
      { from: 'tang', to: 'xin', timeStamp: '10:30', type: 'text', content: '郭德纲、于谦:《于谦的祖父于屁屁和他的四个屁儿子》', read: false }
    ],
    lao_tang: [{ from: 'lao', to: 'tang', timeStamp: '11:00', type: 'text', content: '本人毕业于布鲁弗莱大学，德云社挖掘机专业。', read: true }]
  },
  errorno: {},
  // 过场动画反转
  flipAni: false,
  // modal 弹窗
  modal: {
    show: false,
    title: '',
    msg: ''
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
