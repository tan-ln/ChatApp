export const __self = state => state.__self

export const navbar = state => state.navbar

export const getAuthState = state => state.__self.isSignIn && state.__self.userInfo.email

export const getFlipAni = state => state.flipAni

export const getModalState = state => state.modal

export const getLastMsgQueue = state => state.lastMsgQueue

// export const getCurMsgQueue = state => state.msgQueue[state.__target.gname || state.__target.email].list
export const getCurMsgQueue = state => state.curMsgQueue

export const contactsBook = state => state.contactsBook

export const getCurTarget = state => state.__target

export const getExtendStatus = state => state.showExtends
