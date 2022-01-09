import { post } from '@/api/request.js'

export const reqSignIn = async ({ commit }, payload) => {
  const { path, email, password } = payload
  const res = await post(`/api/user/${path}`, { email, password })
  res.code === 200 ? commit('signInState', res.userInfo) : commit('errorHandler', res.message)
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
