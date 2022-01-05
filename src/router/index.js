import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 使用 require 的形式，而非 import
// 不是一次性加载所有组件，而是 按需加载

const router = new Router({
  mode: 'history',
  base: '/wechat/',
  // linkExactActiveClass: 'weui-bar__item_on',
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
      component: resolve => require(['../views/SignUp.vue'], resolve)
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem('uid')) {
    next()
  } else {
    // 解 无限循环
    if (to.path === '/signup') {
      next()
    } else {
      next({
        path: '/signup',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }
})
export default router
