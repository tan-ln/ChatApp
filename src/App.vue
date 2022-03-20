<template>
  <div id="app">
    <div id="root" :class="getFlipAni ? 'animate__animated animate__flipInY' : 'animate__animated animate__fadeInDownBig'">
      <!-- func page -->
      <Index v-if="getAuthState && mainPage" />

      <!-- signin/signup page -->
      <router-view name="default" />
    </div>
    <!-- modal 弹窗 -->
    <Modal v-if="getModalState.show" />
    <!-- <div class="test__btn" @click="handleClickTestBtn">button</div> -->
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
    ...mapGetters(['getAuthState', 'getFlipAni', 'getModalState']),
    mainPage () {
      return this.$route.name !== 'signin' && this.$route.name !== 'signup'
    }
  },
  created () {
    this.$store.commit('getUserInfo')
    this.$store.commit('changeFlipAni', false)
  },
  methods: {
    handleClickTestBtn () {
      this.$store.commit('showModal')
    }
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

#root {
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  width: 10rem;
  height: 6.8rem;
  position: relative;
  margin: 0 auto;
  margin-top: 0.3rem;
  border-radius: .12rem;
  box-shadow: 0 .03rem .01rem -.2rem rgba(0,0,0,.2), 0 .06rem .2rem .02rem rgba(0,0,0,.14), 0 .06rem .06rem 0 rgba(0,0,0,.12);
  border-width: thin;
  z-index: 9;
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
