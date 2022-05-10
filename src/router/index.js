import Vue from 'vue'
import Router from 'vue-router'
// import VueCookies from 'vue-cookies'

Vue.use(Router)
// Vue.use(VueCookies)

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
        'subPage': resolve => require(['@/components/home/Home'], resolve),
        'mainPage': resolve => require(['@/components/home/Sider'], resolve)
      }
    },
    {
      path: '/messages/:target?',
      name: 'messages',
      components: {
        'subPage': resolve => require(['@/components/msgCollection/MsgCollection'], resolve),
        'mainPage': resolve => require(['@/components/dialogBox/DialogBox'], resolve)
      }
      // ,
      // beforeEnter (to, from, next) {
      //   const target = to.params.target
      //   if (target) {
      //     sessionStorage.setItem('__target', JSON.stringify({ name: target, info: {} }))
      //   }
      //   next()
      // }
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
        const { isSignIn, userInfo } = sessionStorage;
        (isSignIn && userInfo && JSON.parse(userInfo).email) ? next({ name: 'home' }) : next()
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: resolve => require(['@/views/SignUpPage'], resolve),
      // 访问 signin 之前
      beforeEnter (to, from, next) {
        const { isSignIn, userInfo } = sessionStorage;
        (isSignIn && userInfo && JSON.parse(userInfo).email) ? next({ name: 'home' }) : next()
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { isSignIn, userInfo } = sessionStorage
  const { name } = to
  if (!isSignIn || !userInfo || !JSON.parse(userInfo).email) {
    (name === 'signin' || name === 'signup')
      ? next()
      : next({
        path: '/signin',
        query: {
          redirect: to.fullPath
        }
      })
    sessionStorage.clear()
  } else {
    next()
  }
})
export default router
