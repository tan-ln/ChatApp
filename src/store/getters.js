export const __self = state => state.__self

export const navbar = state => state.navbar

export const getAuthState = state => state.__self.isSignIn && state.__self.userInfo.email

export const getFlipAni = state => state.flipAni
