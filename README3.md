# Vuex

当前模块的 state 和 mutation 中是无法获取其它模块的 state ，actions 中可通过第一个参数中的 rootState 属性获取到其它模块 state

```js
export default new Vuex.Store({
  state,
  mutations,
  modules: {
    namespace: true,
    auth,
    chat,
    contact
  }
})
```

## 使用
```js
computed: {
  // (moduleName, [getters])
  ...mapGetters('auth', ['getAuthState']),
  ...mapState({
    getFlipAni: state => state.flipAni,
    getModalState: state => state.modal,
    getExtendStatus: state => state.contact.showExtends
  })
}
this.$store.commit('module/mutation', payload)
this.$store.dispatch('module/action', payload)
```

## action 中使用其他 module 的内容
1. 模块 B 的 actions 里, 须要用模块 A 的 state
```js
const actions = {
    async ['shop'](store, config = {}) {
        const { commit, dispatch, state, rootState } = store
        console.log(rootState) // 打印根 state
        console.log(rootState.vip) // 打印其余模块的 state
        try {
            const { data: { code, data } } = await api.post('shop/getShopBaseInfo', config)
            if (code === 1001) commit('receive', data)
        } catch(error) { console.log(error) }
    }
}
```
2. 模块 B 的 actions 里, 须要调用模块 A 的 actions
```js
const actions = {
    async ['shop'](store, config = {}) {
        const { commit, dispatch, state, rootState } = store
        try {
            const { data: { code, data } } = await api.post('shop/getShopBaseInfo', config, 'get')
            if (code === 1001) commit('receive', data) // 调用当前模块的 mutations
            dispatch('vip/get', {}, {root: true}) // 调用其余模块的 actions {root: true}
        } catch(error) { console.log(error) }
    }
}
```
3. 模块 B 的 actions 里, 须要调用模块 A 的 mutations
```js
const actions = {
    async ['shop'](store, config = {}) {
        const { commit, dispatch, state, rootState } = store
        try {
            const { data: { code, data } } = await api.post('shop/getShopBaseInfo', config)
            if (code === 1001) commit('receive', data) // 调用当前模块的 mutations
            commit('vip/receive', data, {root: true}) // 调用其余模块的 mutations {root: true}
        } catch(error) { console.log(error) }
    }
}
```
4. 模块 B 的 actions 里, 须要用模块 A 的 getters
```js
const actions = {
    async ['shop'](store, config = {}) {
        const { commit, dispatch, state, rootState, rootGetters } = store
        console.log(rootGetters['vip/get']) // 打印其余模块的 getters
        try {
            const { data: { code, data } } = await api.post('shop/getShopBaseInfo', config)
            if (code === 1001) commit('receive', data)
        } catch(error) { console.log(error) }
    }
}
```