<template>
  <div id="index">
    <NavBar @click.native="handleHideExtends" />
    <SubPage @click.native="handleHideExtends" />
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
      this.$store.commit('setConversations', data)
      if (data.type === 'signup') {
        this.$store.dispatch('reqRootGroup')
      }
    }
  },
  methods: {
    handleHideExtends () {
      this.$store.commit('showExtends', false)
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
