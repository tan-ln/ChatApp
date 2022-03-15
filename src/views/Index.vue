<template>
  <div id="index">
    <NavBar />
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
  sockets: {
    // rootgroup
    getRootGroup (res) {
      this.$store.commit('saveGroups', res)
    },
    // messages
    callAllMsg (data) {
      this.$store.commit('setConversations', data)
    }
  }
}
</script>

<style lang="scss">
#index {
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  width: 10rem;
  height: 6.8rem;
}
</style>
