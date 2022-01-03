export const getPageNameFromState = (state) => {
  return state.pageName
}

export const self = (state) => {
  return state.self
}

export const sessions = state => state.sessions

export const currentSession = state => {
  return state.currentFrom ? state.sessions[state.currentFrom] : {}
}

export const lastMessage = (state) => {
  let arr = []
  for (const key in state.sessions) {
    let last = state.sessions[key].messages.slice().sort((a, b) => b.timestamp - a.timestamp)[0]
    arr.push({
      chatWith: key,
      avatar: state.sessions[key].avatar,
      message: last
    })
  }
  return arr
}
