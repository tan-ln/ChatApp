<template>
  <div id="sign__up__page">
    <SignUp />
    <Swiper />
  </div>
</template>

<script>
import SignUp from '@/components/signUp/SignUp'
import Swiper from '@/components/Swiper'

export default {
  name: 'SignUpPage',
  components: {
    SignUp,
    Swiper
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'home') {
      const { userInfo } = this.$store.state.__self
      this.$socket.emit('user:goOnLine', userInfo, from.name)
      this.sockets.subscribe('__broadcast', data => {
        this.$store.commit('setConversations', data)
      })
      this.$store.dispatch('reqRootGroup')
    }
    next()
  },
  destroyed () {
    this.sockets.unsubscribe('__broadcast')
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/valiable.scss";
#sign__up__page {
  display: flex;
  flex-direction: row;
}
</style>
