<template>
  <div id="sign__up__content" :class="changeTitle ? 'animate__animated animate__flipInY' : ''">
    <transition-group
      :duration="400"
      v-on:before-enter="beforeAniEnter"
      v-on:after-leave="afterAniLeave"
    >
      <div class="content__header" key="title">{{title}}</div>
      <div class="content__center" key="center">
        <!-- username -->
        <div class="content__center__username" :class="(illegal && email.length === 0) ? 'illegal' : ''">
          <div class="input__tips">
            <i class="iconfont">&#xe6af;</i>
          </div>
          <input type="email" :placeholder="(illegal && email.length === 0) ? 'Email can not be empty' : 'Email'" v-model="email" />
        </div>
        <!-- password -->
        <div class="content__center__password" :class="(illegal && password.length === 0) ? 'illegal' : ''">
          <div class="input__tips">
            <i class="iconfont">&#xe8a3;</i>
          </div>
          <input type="password" :placeholder="(illegal && password.length === 0) ? 'Password can not be empty' : 'Password'" v-model="password" @keypress.13="handleSubmit" />
        </div>
        <!-- submit -->
        <div class="content__center__submit" @click="handleSubmit">
          <input v-if="!loading" type="submit" :value="pageName === 'signin' ? 'Sign In' : 'Sign Up'" />
          <svg v-else t="1641981383737" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2365" width=".2rem" height=".2rem"><path d="M254.29333333 194.56C324.26666667 136.53333333 413.86666667 102.4 512 102.4c226.13333333 0 409.6 183.46666667 409.6 409.6h68.26666667c0-263.68-214.18666667-477.86666667-477.86666667-477.86666667-114.34666667 0-219.30666667 40.10666667-301.22666667 106.66666667l43.52 53.76z" fill="#ffffff" p-id="2366"></path></svg>
        </div>
      </div>
      <div class="content__bottom" v-show="pageName === 'signin'" key="signin">
        <span>Even have no account ? </span>
        <router-link replace to="/signup">Sign Up here</router-link>
      </div>
      <div class="content__bottom" v-show="pageName === 'signup'" key="signup">
        <span>Already have account ? </span>
        <router-link replace to="/signin">Sign In here</router-link>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SignUpContent',
  data () {
    return {
      changeTitle: false,
      email: '123@qq.com',
      password: '123',
      illegal: false,
      loading: false
    }
  },
  computed: {
    title () {
      return this.$route.name === 'signup' ? 'Create account' : 'Welcome'
    },
    pageName () {
      return this.$route.name
    },
    ...mapState({
      __self: state => state.auth.__self,
      modal: state => state.modal
    })
  },
  methods: {
    beforeAniEnter: function () {
      this.changeTitle = true
      this.email = this.password = ''
      this.illegal = false
    },
    afterAniLeave: function () {
      this.changeTitle = false
      this.email = this.password = ''
    },
    async handleSubmit () {
      if (this.email.length === 0 || this.password.length === 0) { this.illegal = true; return }
      this.loading = true
      const route = this.$route.name
      const payload = {
        path: route,
        email: this.email,
        password: this.password
      }
      await this.$store.dispatch('auth/reqSignIn', payload)
      if (this.modal.show) this.loading = false
      // 登录或注册后 路由跳转及动画状态修改
      if (this.__self.isSignIn) {
        this.loading = false
        this.$store.commit('changeFlipAni', true)
        this.$router.replace('/')
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/valiable.scss";
#sign__up__content {
  width: 3.2rem;
  height: 5.28rem;
  padding: .32rem .2rem;
  // font-family: 'Comic Sans MS', PingFang SC;
  letter-spacing: .01rem;
  position: relative;
  .content__header {
    font-size: 0.2rem;
    font-weight: bold;
    text-align: center;
    margin: 0.4rem 0;
  }
  .content__center {
    .illegal input::placeholder {
      color: $url_font_color;
    }
    .illegal input {
      border-color: $url_font_color;
    }
    &__username, &__password {
      padding-top: 0.3rem;
      line-height: 0.32rem;
      display: flex;
      flex-direction: row;
      .input__tips {
        display: inline-block;
        width: 0.4rem;
        text-align: center;
        background-color: $signUp_key_color;
        border-radius: .04rem;
        i.iconfont {
          font-size: 0.16rem;
          color: $dark_font_color;
        }
      }
      input {
        flex: 1;
        line-height: 0.32rem;
        font-size: 0.16rem;
        // font-family: Consolas, PingFang SC;
        border-bottom: .01rem solid $border_middle_color;
        padding: 0 .1rem 0 .2rem;
        letter-spacing: .01rem;

        &::placeholder {
          color: $light_font_color;
          font-size: 0.14rem;
          font-weight: 100;
          letter-spacing: .006rem;
        }
      }
    }
    &__submit {
      width: 100%;
      height: 0.32rem;
      line-height: 0.32rem;
      background-color: $nav_bg_color;
      border-radius: .2rem;
      text-align: center;
      margin: 0.4rem 0 0.2rem;
      position: relative;
      cursor: pointer;
      input {
        color: oldlace;
        font-size: 0.16re;
        letter-spacing: .02rem;
        cursor: pointer;
      }
      svg {
        animation: loadingRotate 2s infinite linear;
        position: absolute;
        left: 50%;
        margin-left: -.1rem;
        top: 0.06rem;
      }
    }
  }
  .content__bottom {
    font-size: 0.12rem;
    color: $light_font_color;
    position: absolute;
    width: 2.8rem;
    display: flex;
    justify-content: center;

    a {
      color: $url_font_color;
      margin-left: .06rem;
      font-weight: 600;
      cursor: pointer;
    }
  }
}

.v-enter, .v-leave-to {
  opacity: 0;
}
.v-enter-active, .v-leave-active {
  transition: opacity 2s;
}

@keyframes loadingRotate {
  0% {
    -webkit-transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
