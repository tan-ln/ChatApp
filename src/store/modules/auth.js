import { post } from '@/api/request.js'

const state = {
  // 当前用户
  __self: { isSignIn: false, userInfo: {} },
  // 当前聊天对象
  __target: {}
}

const mutations = {
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
  // 登出
  logout () {
    sessionStorage.clear()
  },
  saveTarget (state, payload) {
    const { group, master, rootGroup } = payload
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
      const data = JSON.parse(rootGroup.gmember).filter(item => item.email === master)
      state.__target = data[0]
    }
    sessionStorage.setItem('__target', JSON.stringify(state.__target))
  }
}

const getters = {
  getAuthState: state => state.__self.isSignIn && state.__self.userInfo.email
}

const actions = {
  reqSignIn: async ({ commit, rootState }, payload) => {
    const { path, email, password } = payload
    const res = await post(`/api/user/${path}`, { email, password })
    res.code === 200 ? commit('signInState', res.userInfo) : commit('showModal', { title: 'Sign In Error', msg: res.message }, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
