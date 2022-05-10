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
    this.$store.dispatch('reqRootGroup')
  },
  sockets: {
    // 广播消息
    __broadcast (data) {
      if (data.type === 'signup') {
        this.$store.dispatch('reqRootGroup')
      }
      this.$store.commit('setConversations', data)
    }
  },
  methods: {
    handleHide () {
      this.$store.commit('showExtends', false)
      this.$store.commit('showIDCard', false)
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
