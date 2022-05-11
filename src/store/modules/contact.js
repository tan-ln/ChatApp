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
const getters = {}
const actions = {
  // 联系人列表
  reqContacts: async ({ commit, rootState }) => {
    const contactsBook = sessionStorage.getItem('contactsBook')
    if (contactsBook && contactsBook.length) {
      commit('setAllContacts', JSON.parse(contactsBook))
    } else {
      const res = await post(`/api/contact/all-contacts`)
      if (res.code === 200) {
        commit('setAllContacts', res.data.list)
        sessionStorage.setItem('contactsBook', JSON.stringify(res.data.list))
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
      // commit('auth/saveTarget', { group: 'root', data: res.data }, { root: true })
    } else {
      commit('showModal', { title: res.code, msg: res.message }, { root: true })
    }
  },
  reqSourceFiles: async ({ commit }, payload) => {
    const res = await get(`/api/group/source-files`)
    if (res.code === 200) {
      commit('saveSourceFiles', res.data)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
