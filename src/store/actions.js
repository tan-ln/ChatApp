import { post } from '@/api/request.js'

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
  // const { email } = rootState.__self.userInfo
  const res = await post(`/api/contact/root-group`)
  console.log(res)
  // res.code === 200 ? commit('getMsgList', res.msgList) : commit('showModal', { title: 'Get Messages Error', msg: res.message })
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
