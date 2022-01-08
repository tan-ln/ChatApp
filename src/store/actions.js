import { post } from '@/api/request.js'

// 请求用户信息 userId | email
export const reqUserInfo = async ({ commit }, username) => {
  await post('/api/search', {
    params: {
      username
    }
  }).then(res => {
    if (res.data.code === 0) {
      let userInfo = res.data.userInfo
      console.log(userInfo)
    } else {
      console.log(res.data.msg)
    }
  })
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
