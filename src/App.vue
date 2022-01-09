<template>
  <div id="app" :class="getFlipAni ? 'animate__animated animate__flipInY' : 'animate__animated animate__fadeInDownBig'">
    <template v-if="getAuthState && mainPage">
      <NavBar />
      <SubPage />
      <MainPage />
    </template>
    <!-- signin/signup page -->
    <router-view name="default" />
  </div>
</template>

<script>
import NavBar from '@/components/navBar/NavBar'
import SubPage from '@/views/SubPage'
import MainPage from '@/views/MainPage'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    NavBar,
    SubPage,
    MainPage
  },
  computed: {
    ...mapGetters(['getAuthState', 'getFlipAni']),
    mainPage () {
      return this.$route.name !== 'signin' && this.$route.name !== 'signup'
    }
  },
  created () {
    this.$store.commit('getUserInfo')
    this.$store.commit('changeFlipAni', false)
  }
}
</script>

<style lang="scss">
/*将公用的样式统一在此导入*/
@import "assets/styles/common.css";
@import "assets/styles/base.css";
/*阿里 fonticon*/
@import "assets/styles/lib/iconfont.css";

@import "@/assets/styles/valiable.scss";

#app {
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  width: 10rem;
  height: 6.8rem;
  position: relative;
  margin: 0 auto;
  margin-top: 0.3rem;
  background-color: $bg_color;
  border: .01rem solid $border_color;
  border-radius: .12rem;
  box-shadow: 0 .03rem .01rem -.02rem rgba(0,0,0,.2), 0 .02rem .02rem 0 rgba(0,0,0,.14), 0 .01rem .05rem 0 rgba(0,0,0,.12);
  border-width: thin;
  z-index: 999;
}
</style>
