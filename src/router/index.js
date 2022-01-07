import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 使用 require 的形式，而非 import
// 不是一次性加载所有组件，而是 按需加载

const router = new Router({
  mode: 'history',
  base: '/wechat/',
  // linkExactActiveClass: '',
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        'subPage': resolve => require(['@/components/msgCollection/MsgCollection'], resolve),
        'mainPage': resolve => require(['@/components/dialogBox/DialogBox'], resolve)
      }
    },
    {
      path: '/messages',
      name: 'messages',
      components: {
        'subPage': resolve => require(['@/components/msgCollection/MsgCollection'], resolve),
        'mainPage': resolve => require(['@/components/dialogBox/DialogBox'], resolve)
      }
    },
    {
      path: '/contacts',
      name: 'contacts',
      components: {
        'subPage': resolve => require(['@/components/contacts/ContactsBook'], resolve),
        'mainPage': resolve => require(['@/components/contacts/ContactInfo'], resolve)
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: resolve => require(['@/views/SignUpPage'], resolve),
      // 访问 signup 之前
      beforeEnter (to, from, next) {
        const { isSignIn } = localStorage
        isSignIn ? next({ name: 'home' }) : next()
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: resolve => require(['@/views/SignUpPage'], resolve),
      // 访问 signin 之前
      beforeEnter (to, from, next) {
        const { isSignIn } = localStorage
        isSignIn ? next({ name: 'home' }) : next()
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { isSignIn } = localStorage
  const { name } = to
  const isSignInOrRegister = (name === 'signup' || name === 'signin')
  if (isSignIn || isSignInOrRegister) {
    next()
  } else {
    next({
      path: '/signin',
      query: {
        redirect: to.fullPath
      }
    })
  }
})
export default router
