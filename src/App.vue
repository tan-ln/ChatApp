<template>
  <div id="app">
    <div class="root_page"
      :class="getFlipAni ? '' : 'animate__animated animate__fadeInDownBig'"
      :style="{ width: getExtendStatus ? '12rem' : '9.58rem' }"
    >
      <transition
        name="index"
        :duration="800"
        enter-active-class="animate__animated animate__fadeIn"
      >
        <!-- index page -->
        <Index v-if="getAuthState && mainPage" />
      </transition>
      <!-- signin/signup page -->
      <router-view name="default" />
    </div>

    <!-- modal 弹窗 -->
    <Modal v-if="getModalState.show" />
  </div>
</template>

<script>
import Index from '@/views/Index'
import Modal from '@/components/modal/Modal'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: { Index, Modal },
  computed: {
    ...mapGetters(['getAuthState', 'getFlipAni', 'getModalState', 'getExtendStatus']),
    mainPage () {
      return this.$route.name !== 'signin' && this.$route.name !== 'signup'
    }
  },
  created () {
    this.$store.commit('syncStorage')
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

.root_page {
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  width: 9.58rem;
  height: 6.8rem;
  position: relative;
  margin: 0 auto;
  margin-top: 0.3rem;
  border-radius: .12rem;
  box-shadow: 0 .03rem .01rem -.2rem rgba(0,0,0,.2), 0 .06rem .2rem .02rem rgba(0,0,0,.14), 0 .06rem .06rem 0 rgba(0,0,0,.12);
  border-width: thin;
  z-index: 9;
  transition: all .25s;
}

.actived__content {
  // background-color: $actived__bg__color;
  background: linear-gradient(to right, $actived__bg__color, $bg_color);
}

.test__btn {
  width: 1rem;
  height: 1rem;
  background-color: rgb(199, 2, 2);
  color: antiquewhite;
  z-index: 9999;
  position: absolute;
  left: 50%;
  bottom: 50%;
}

</style>
