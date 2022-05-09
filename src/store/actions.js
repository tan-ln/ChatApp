import { get, post } from '@/api/request.js'

export const reqSignIn = async ({ commit }, payload) => {
  const { path, email, password } = payload
  const res = await post(`/api/user/${path}`, { email, password })
  res.code === 200 ? commit('signInState', res.userInfo) : commit('showModal', { title: 'Sign In Error', msg: res.message })
}

export const reqMessages = async ({ commit }) => {
  // const { email } = rootState.__self.userInfo
  const res = await post(`/api/chat`)
  res.code === 200 ? commit('getMsgList', res.msgList) : commit('showModal', { title: 'Get Messages Error', msg: res.message })
}

export const reqRootGroup = async ({ commit }) => {
  const res = await get(`/api/group/root`)
  res.code === 200 ? commit('saveGroups', { group: 'root', data: res.data }) : commit('showModal', { title: res.code, msg: res.message })
}

export const reqSourceFiles = async ({ commit }, payload) => {
  const res = await get(`/api/group/source-files`)
  if (res.code === 200) {
    commit('saveSourceFiles', res.data)
  }
}

// 联系人列表
export const reqContacts = async ({ commit }) => {
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
      commit('showModal', { title: res.code, msg: res.message })
    }
  }
}

// export const requestSendMsg = ({ commit }, payload) => {
//   // commit(types.SEND_MESSAGE_SUCCESS, payload)
//   console.log(...payload)
//   axios.post('/api/sendMsg', {
//     ...payload
//   }).then(res => {
//     if (res) {
//       // commit(types.SEND_MESSAGE_SUCCESS, payload)
//     }
//   })
// }

// export const search = async ({ commit }, username) => {
//   await axios.get('/api/search', {
//     params: {
//       username
//     }
//   }).then(res => {
//     if (res.data.code === 0) {
//       let userInfo = res.data.userInfo
//       console.log(userInfo)
//     } else {
//       console.log(res.data.msg)
//     }
//   })
// }
