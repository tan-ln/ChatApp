export const __self = state => state.__self

export const navbar = state => state.navbar

export const getAuthState = state => state.__self.isSignIn && state.__self.userInfo.email

export const getFlipAni = state => state.flipAni

// export const lastMessage = (state) => {
//   let arr = []
//   for (const key in state.sessions) {
//     let last = state.sessions[key].messages.slice().sort((a, b) => b.timestamp - a.timestamp)[0]
//     arr.push({
//       chatWith: key,
//       avatar: state.sessions[key].avatar,
//       message: last
//     })
//   }
//   return arr
// }
