<template>
  <div class="message__block--main" :class="msgStyle()">
    <!-- 系统消息/好友申请 -->
    <template v-if="data.type === 'system'">
      <div class="sys__msg" v-if="msg">
        <div class="sys__msg--header">
          <div class="left-avatar">
            <img :src="data.avatar" :alt="data.from">
          </div>
          <div class="right-info">
            <p class="username">{{ data.username }}</p>
            <p class="email">邮箱：{{ data.from }}</p>
          </div>
        </div>
        <div class="sys__msg--content">
          {{ data.content }}
        </div>
        <div class="sys__msg--footer">
          <div class="cancel-btn btn">拒绝</div>
          <div class="agree-btn btn" @click="handleUserSubscribe">同意</div>
        </div>
      </div>
    </template>
    <!-- 普通消息 -->
    <template v-else>
      <p class="username" v-if="username">{{ username }}</p>
      <div class="message__block" v-if="msg" :class="msgStyle()">
        <pre v-if="parseMsg" v-html="parseMsg"></pre>
        <pre v-else v-text="msg"></pre>
        <!-- 空元素 用于消息气泡 -->
        <div class="msg__bubble"></div>
      </div>
    </template>
  </div>

</template>
<script>
import { isURL } from '@/assets/js/reg.js'
import { mapState } from 'vuex'
export default {
  name: 'Message',
  props: ['data', 'msg', 'username'],
  computed: {
    parseMsg () {
      let data = this.msg
      // 过滤 用户名
      if (this.data.from !== 'app') {
        // 过滤信息
        const res = isURL(this.msg)
        if (res) {
          res.forEach(item => {
            data = data.replace(item, ` <a href="${item}" target="_blank">${item}</a> `)
          })
          return data
        }
      }
      return false
    },
    ...mapState({
      __self: state => state.auth.__self.userInfo
    })
  },
  methods: {
    msgStyle () {
      if (this.data.from === 'app' || this.data.type === 'system') {
        return 'toCenter'
      } else if (this.data.from === this.__self.email) {
        return 'toRight'
      } else {
        return 'toLeft'
      }
    },
    handleUserSubscribe () {
      // this.$store.dispatch('contact/reqAddFriends', { selfEmail: this.__self.email, target: this.data })
      this.$socket.emit('contact:user-subscribe', { self: this.__self.email, target: this.data.from })
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/valiable.scss";
.message__block--main {
  width: 100%;
  .username {
    color: $middle_font_color;
  }
}
// 中间系统消息
.toCenter {
  text-align: center;
  filter: opacity(.8);
  border-radius: .16rem;
  color: $heavy_font_color;
}
// 左侧用户名
.toLeft .username {
  text-align: left;
  margin-left: .2rem;
}
// 右侧用户名
.toRight .username {
  text-align: right;
  margin-right: .2rem;
}

.message__block {
  display: inline-block;
  padding: .1rem .2rem;
  position: relative;
  top: 0.04rem;
  max-width: 4.8rem;

  pre {
    display: inline-block;
    font-size: 0.12rem;
    // transform: scale(.96);
    letter-spacing: .008rem;
    // 识别换行
    white-space: pre-wrap;
    cursor: text;
  }
  a {
    color: $url_font_color;
    text-decoration: underline;
    cursor: pointer;
  }
  pre, a{
    /* 文字选中 */
    &::selection {
      background-color: $selection_color;
      color: white;
    }
    &::-moz-selection {
      background-color: $selection_color;
      color: white;
    }
    &::-webkit-selection {
      background-color: $selection_color;
      color: white
    }
  }
}
// 左侧消息
.message__block.toLeft {
  border-bottom-left-radius: .16rem;
  border-top-right-radius: .16rem;
  border-bottom-right-radius: .16rem;
  background-color: $bg_color;
  float: left;
  margin-left: .2rem;
  box-shadow: .02rem .04rem .06rem $shadow_color;
  &::before {
    content: "";
    position: absolute;
    left: -.12rem;
    top: 0;
    width: 0;
    height: 0;
    border: .14rem solid;
    border-color:  $bg_color transparent transparent;
  }
  .msg__bubble {
    position: absolute;
    top: 0;
    left: -.16rem;
    width: 0.14rem;
    height: 0.2rem;
    background-color: rgb(255, 255, 255);
    border-radius: 50%;
    z-index: 999;
    transform: rotate(-45deg);
  }
}
// 右侧消息
.message__block.toRight {
  border-bottom-left-radius: .16rem;
  border-top-left-radius: .16rem;
  border-bottom-right-radius: .16rem;
  background-color: $msg_bg_color;
  margin-right: .2rem;
  float: right;
  box-shadow: -.02rem .04rem .06rem $shadow_color;
  &::after {
    content: "";
    position: absolute;
    right: -.12rem;
    top: 0;
    width: 0;
    height: 0;
    border: .16rem solid;
    border-color:  $msg_bg_color transparent transparent;
  }

  pre {
    color: #fff;
  }
  a {
    color: $signUp_key_color;
  }

  .msg__bubble {
    position: absolute;
    top: -.01rem;
    right: -.16rem;
    width: 0.14rem;
    height: 0.2rem;
    background-color: #fff;
    border-radius: 50%;
    z-index: 999;
    transform: rotate(45deg);
  }
}
.sys__msg {
  margin: 0 auto;
  width: 50%;
  border-radius: .16rem;
  background-color: $bg_color;
  padding: .2rem;
  letter-spacing: .01rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: -.02rem .04rem .06rem $shadow_color;
  &--header {
    width: 100%;
    height: 1rem;
    display: flex;
    flex-direction: row;
    text-align: left;
    .left-avatar {
      height: 0.5rem;
      img {
        width: 0.5rem;
        height: .5rem;
        border: .02rem solid #fff;
      }
    }
    .right-info {
      width: auto;
      margin-left: .1rem;
      .username {
        height: 0.25rem;
        line-height: 0.25rem;
        font-size: 0.14rem;
        font-weight: bold;
        color: $dark_font_color;
      }
      .email {
        height: 0.25rem;
        line-height: 0.25rem;
        font-size: 0.12rem;
      }
    }
  }

  &--content {
    // height: 0.6rem;
    padding: 0.06rem 0;
    border-bottom: .01rem solid $border_light_color;
    border-radius: .08rem;
    color: #000;
  }

  &--footer {
    .btn {
      width: 45%;
      height: 0.3rem;
      line-height: 0.3rem;
      border-radius: .08rem;
      color: aliceblue;
      background-color: $msg_bg_color;
      margin-top: .2rem;
      cursor: pointer;
    }
    .cancel-btn {
      float: left;
    }
    .agree-btn {
      float: right;
    }
  }
}
</style>
