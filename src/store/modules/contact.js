import { get, post } from '@/api/request.js'

const state = {
  // 联系人列表
  contactsBook: [],
  showIDCard: false,
  IDCard: {},
  groups: [],
  rootGroup: {},
  sourceFiles: [],
  showExtends: false
}

const mutations = {
  // show ID Card
  showIDCard (state, payload) {
    if (payload) {
      state.showIDCard = true
      state.IDCard = payload
    } else {
      state.showIDCard = payload
    }
  },
  setAllContacts (state, payload) {
    state.contactsBook = payload
    sessionStorage.setItem('contactsBook', JSON.stringify(state.contactsBook))
  },
  // set groups
  saveGroups (state, payload) {
    const { group, data } = payload
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
  // source files
  saveSourceFiles (state, payload) {
    state.sourceFiles = payload
  },
  // dialog extends
  showExtends (state, payload) {
    state.showExtends = typeof payload === 'undefined' ? !state.showExtends : payload
  }
}

const getters = {
  // 获取头像
  getAvatar: state => data => {
    let avatar = ''
    // 群聊
    if (data.group) {
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
}

const actions = {
  // 联系人列表
  reqContacts: async ({ commit, rootState }) => {
    const contactsBook = sessionStorage.getItem('contactsBook')
    if (contactsBook && contactsBook.length) {
      commit('setAllContacts', JSON.parse(contactsBook))
    } else {
      const { email } = rootState.auth.__self.userInfo
      const res = await post(`/api/contact/all-contacts`, { email })
      if (res.code === 200) {
        commit('setAllContacts', res.data)
      } else {
        sessionStorage.removeItem('isSignIn')
        commit('showModal', { title: res.code, msg: res.message }, { root: true })
      }
    }
  },
  reqRootGroup: async ({ commit, rootState }) => {
    const res = await get(`/api/group/root`)
    if (res.code === 200) {
      commit('saveGroups', { group: 'root', data: res.data })
    } else {
      commit('showModal', { title: res.code, msg: res.message }, { root: true })
    }
  },
  reqSourceFiles: async ({ commit }, payload) => {
    const res = await get(`/api/group/source-files`)
    if (res.code === 200) {
      commit('saveSourceFiles', res.data)
    }
  },
  // 添加好友
  reqAddFriends: async ({ commit, rootState }, payload) => {
    const { selfEmail, target } = payload
    const { avatar, email, username } = target
    const res = await post(`/api/contact/add-friends`, { selfEmail, target: { avatar, email, username } })
    res.code === 200
      ? commit('setAllContacts', res.data)
      : commit('showModal', { title: res.code, msg: res.message }, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
