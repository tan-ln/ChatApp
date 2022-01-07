<template>
  <div id="sign__up__content" :class="changeTitle ? 'animate__animated animate__flipInY' : ''">
    <transition-group
      :duration="400"
      v-on:before-enter="beforeAniEnter"
      v-on:after-leave="afterAniLeave"
    >
      <div class="content__header" key="title">{{title}}</div>
      <div class="content__center" key="center">
        <div class="content__center__username">
          <div class="input__tips">
            <i class="iconfont">&#xe6af;</i>
          </div>
          <input type="email" placeholder="Email" v-model="email" />
        </div>
        <div class="content__center__password">
          <div class="input__tips">
            <i class="iconfont">&#xe8a3;</i>
          </div>
          <input type="password" placeholder="Password" v-model="password" />
        </div>
        <div class="content__center__submit">
          <input type="submit" :value="pageName === 'signin' ? 'Sign In' : 'Sign Up'" @click="handleSubmit" />
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
import { post } from '@/api/request.js'

export default {
  name: 'SignUpContent',
  data () {
    return {
      changeTitle: false,
      email: '',
      password: ''
    }
  },
  computed: {
    title () {
      return this.$route.name === 'signup' ? 'Create account' : 'Welcome'
    },
    pageName () {
      return this.$route.name
    }
  },
  methods: {
    beforeAniEnter: function () {
      this.changeTitle = true
      this.email = this.password = ''
    },
    afterAniLeave: function () {
      this.changeTitle = false
      this.email = this.password = ''
    },
    async handleSubmit () {
      let email = this.email
      let password = this.password
      const res = await post(`/api/user/${this.$route.name}`, { email, password })
      if (res.code === 200) {
        localStorage.setItem('isSignIn', true)
        this.$router.push('/')
      } else {
        alert(res.message)
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
  font-family: 'Comic Sans MS', PingFang SC;
  letter-spacing: .01rem;
  position: relative;
  .content__header {
    font-size: 0.2rem;
    font-weight: bold;
    text-align: center;
    margin: 0.4rem 0;
  }
  .content__center {
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
        font-family: Consolas, PingFang SC;
        border-bottom: .01rem solid $border_middle_color;
        padding: 0 .1rem 0 .2rem;
        letter-spacing: .01rem;

        &::placeholder {
          color: $light_font_color;
          font-size: 0.14rem;
          font-weight: 100;
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
      font-family: Consolas, PingFang SC;
      cursor: pointer;
      input {
        color: oldlace;
        font-size: 0.16re;
        letter-spacing: .02rem;
        cursor: pointer;
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
</style>
