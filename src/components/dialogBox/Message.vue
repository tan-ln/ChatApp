<template>
  <div class="message__block" v-if="msg" :class="msgStyle()">
    <pre v-if="parseMsg" v-html="parseMsg"></pre>
    <pre v-else v-text="msg"></pre>
    <!-- 空元素 用于消息气泡 -->
    <div class="msg__bubble"></div>
  </div>
</template>

<script>
import { isURL } from '@/assets/js/reg.js'
import { mapState } from 'vuex'
export default {
  name: 'Message',
  props: ['msg', 'sender'],
  computed: {
    parseMsg () {
      let data = this.msg
      // 过滤 用户名
      if (this.sender !== 'app') {
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
      __self: state => state.auth.__self
    })
  },
  methods: {
    msgStyle () {
      if (this.sender === 'app') {
        return 'toCenter'
      } else if (this.sender === this.__self.userInfo.email) {
        return 'toRight'
      } else {
        return 'toLeft'
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/valiable.scss";
.message__block {
  padding: .1rem .2rem;
  position: relative;
  top: 0.04rem;
  // border: .01rem solid $border_color;
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
// 中间系统消息
.message__block.toCenter {
  margin: 0 auto;
  filter: opacity(.8);
  border-radius: .16rem;
  color: $heavy_font_color;
}
// 左侧消息
.message__block.toLeft {
  border-bottom-left-radius: .16rem;
  border-top-right-radius: .16rem;
  border-bottom-right-radius: .16rem;
  background-color: $bg_color;
  margin-left: .2rem;
  box-shadow: .02rem .04rem .06rem $shadow_color;
  &::before {
    content: "";
    position: absolute;
    left: -.16rem;
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
</style>
