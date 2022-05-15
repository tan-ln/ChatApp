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
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'App',
  components: { Index, Modal },
  data () {
    return {
      beforeUnload_time: 0
    }
  },
  computed: {
    ...mapGetters('auth', ['getAuthState']),
    ...mapState({
      userInfo: state => state.auth.__self.userInfo,
      getFlipAni: state => state.flipAni,
      getModalState: state => state.modal,
      getExtendStatus: state => state.contact.showExtends
    }),
    mainPage () {
      return this.$route.name !== 'signin' && this.$route.name !== 'signup'
    }
  },
  methods: {
    beforeunloadHandler () {
      this.beforeUnload_time = new Date().getTime()
    },
    unloadHandler () {
      this._gap_time = new Date().getTime() - this.beforeUnload_time
      // 判断是窗口关闭
      if (this._gap_time <= 5) {
        this.$socket.emit('user:offLine', this.userInfo.email)
      }
    },
    loadHandler () {
      // 刷新，重新注册 socket
      if (this.getAuthState) {
        this.$socket.emit('user:flushBrow', this.userInfo.email)
      }
    }
  },
  created () {
    this.$store.commit('syncStorage')
    this.$store.commit('auth/getUserInfo')
    this.$store.commit('changeFlipAni', false)
  },
  mounted () {
    // 关闭聊天
    window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
    window.addEventListener('unload', e => this.unloadHandler(e))
    window.addEventListener('load', e => this.loadHandler(e))
  },
  destroyed () {
    window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
    window.removeEventListener('unload', e => this.unloadHandler(e))
    window.addEventListener('load', e => this.loadHandler(e))
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
