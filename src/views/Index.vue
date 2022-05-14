<template>
  <div id="index">
    <NavBar @click.native="handleHide" />
    <SubPage />
    <MainPage />
  </div>
</template>

<script>
import SubPage from '@/views/SubPage'
import MainPage from '@/views/MainPage'
import NavBar from '@/components/navBar/NavBar'
export default {
  name: 'Index',
  components: { NavBar, SubPage, MainPage },
  mounted: function () {
    this.$store.dispatch('contact/reqRootGroup')
    this.$store.dispatch('contact/reqContacts')
  },
  sockets: {
    // 广播消息
    __broadcast (data) {
      this.$store.dispatch('chat/setConversations', data)
      if (data.type === 'signup') {
        this.$store.dispatch('contact/reqRootGroup')
      }
    },
    // private message
    __private (data) {
      console.log(data)
      // 订阅好友，保存联系人
      if (data.type === 'subscribe') {
        this.$store.commit('contact/setAllContacts', data.data.list)
      }
      this.$store.dispatch('chat/setConversations', data)
    }
  },
  methods: {
    handleHide () {
      this.$store.commit('contact/showExtends', false)
      this.$store.commit('contact/showIDCard', false)
    }
  }
}
</script>

<style lang="scss">
#index {
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
}
</style>
