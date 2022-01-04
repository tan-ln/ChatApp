import store from '../store'
import { uuidv4 } from '../utils'

export default {
  // 创建 一条消息 实例
  creaeteMessage: ({content, session, data}, cb) => {
    const message = {
      // 唯一标识
      id: 'm_' + uuidv4(),
      from: store.getters.username,
      to: session.from,
      content,
      timestamp: Date.now(),
      data
    }

    cb(message)
  }
}