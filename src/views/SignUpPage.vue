<template>
  <div id="sign__up__page">
    <SignUp />
    <Swiper />
  </div>
</template>

<script>
import SignUp from '@/components/signUp/SignUp'
import Swiper from '@/components/Swiper'
import { mapState } from 'vuex'

export default {
  name: 'SignUpPage',
  components: {
    SignUp,
    Swiper
  },
  computed: {
    ...mapState({
      __self: state => state.auth.__self
    })
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'home') {
      const { userInfo } = this.__self
      // this.$store.dispatch('contact/reqRootGroup')
      this.$socket.emit('user:goOnLine', userInfo, from.name)
      this.sockets.subscribe('__broadcast', data => {
        this.$store.dispatch('chat/setConversations', data)
      })
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
