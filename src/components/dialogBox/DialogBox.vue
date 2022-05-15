<template>
  <div class="dialog__box__wrapper" v-if="__target.gname || __target.email">
    <v-header :title="__target.gname || __target.username || __target.email" simple fold />
    <!-- 消息列表 -->
    <main class="wrapper__content" :class="hideScroll ? 'hide_scroll' : ''" ref="mainRef">
      <MsgList :mainHeight="mainHeight" :attachScroll="attachScroll()" />
    </main>
    <!-- 输入框 -->
    <div class="wrapper__footer" v-if="isFriends">
      <!-- textArea 上方工具栏 -->
      <div class="tool__list">
        <i title="emoji" class="iconfont">&#xe610;</i>
        <i title="album" class="iconfont">&#xec7f;</i>
        <i title="files" class="iconfont">&#xe63b;</i>
        <i title="cut" class="iconfont">&#xe676;</i>
        <i title="clipboard" class="iconfont">&#xe645;</i>
      </div>
      <InputArea @handleMsgSend="handleMsgSend" />
    </div>
    <!-- 右侧扩展栏 -->
    <ExtendsBar v-if="showExtends" :__self="__self" :target="__target" :member6="member6" />
    <!-- ID Card -->
    <transition
      enter-active-class="animate__animated animate__fadeIn"
    >
      <ID-Card v-if="showIDCard" :userInfo="IDCard" />
    </transition>
  </div>
</template>

<script>
import InputArea from './InputArea.vue'
import MsgList from './MsgList.vue'
import ExtendsBar from './ExtendsBar/index.vue'
import VHeader from '../VHeader.vue'
import { mapState } from 'vuex'
import IDCard from '../IDCard/index.vue'

export default {
  name: 'Dialog',
  components: {
    MsgList,
    InputArea,
    'v-header': VHeader,
    ExtendsBar,
    IDCard
  },
  data () {
    return {
      hideScroll: true,
      mainHeight: 0
    }
  },
  computed: {
    ...mapState({
      showIDCard: state => state.contact.showIDCard,
      IDCard: state => state.contact.IDCard,
      __self: state => state.auth.__self.userInfo,
      __target: state => state.auth.__target,
      showExtends: state => state.contact.showExtends,
      contactsBook: state => state.contact.contactsBook
    }),
    member6 () {
      if (!this.__target.gmember) return
      // total num
      const arr = JSON.parse(this.__target.gmember)
      // except me
      const list = arr.filter(item => item.email !== this.__self.email)
      // add icon btn
      const addImg = {
        msg: 'add Friends',
        avatar: 'http://127.0.0.1:5000/images/add.png'
      }
      // list max length 6
      return {
        num: arr.length,
        list: [...list.slice(0, 5), addImg]
      }
    },
    isFriends () {
      if (this.__target.gname) return true
      let bool = false
      const contactsBook = this.contactsBook
      for (let key in contactsBook) {
        contactsBook[key].forEach(item => {
          if (item.email === this.__target.email) {
            bool = true
          }
        })
      }
      return bool
    }
  },
  methods: {
    attachScroll () {
      this.$nextTick(() => {
        this.mainHeight = this.$refs.mainRef.scrollHeight
        // this.$refs.mainRef.addEventListener('scroll', () => {
        //   clearTimeout(this.timer)
        //   this.hideScroll = false
        //   this.timer = setTimeout(() => {
        //     this.hideScroll = true
        //   }, 600)
        // })
      })
    },
    handleMsgSend (content) {
      const msg = {
        from: this.__self.email,
        to: this.__target.gname ? 'all' : this.__target.email,
        group: this.__target.gname || null,
        content,
        type: 'text',
        timestamp: Date.now()
      }
      // 本地消息处理
      this.$store.dispatch('chat/setConversations', {
        type: 'plain_msg',
        data: msg
      })
      // 消息发送
      this.$socket.emit('msg:dispatch', {
        type: 'plain_msg',
        data: msg
      })
    }
  },
  mounted () {
    if (this.$refs.mainRef) {
      this.$refs.mainRef.scrollTop = this.$refs.mainRef.scrollHeight
    }
  },
  beforeDestroy () {
    // this.$refs.mainRef.removeEventListener('scroll', () => {
    //   clearTimeout(this.timer)
    // })
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/valiable.scss";
@import "@/assets/styles/scrollbar.scss";
.dialog__box__wrapper {
  box-sizing: border-box;
  flex: 1;
  width: 6.06rem;
  height: 6.8rem;
  display: flex;
  flex-direction: column;
  position: relative;

  .wrapper__content {
    flex: 1;
    // width: 6.06rem;
    overflow-y: scroll;
    margin-bottom: 0.14rem;
    padding: 0 .1rem;
    transition: all .5s ease-out;
  }

  .wrapper__footer {
    margin: 0.14rem .1rem;
    // width: 5.86rem;

    .tool__list {
      background-color: #FFF;
      i.iconfont {
        color: #444;
        font-size: 0.16rem;
        display: inline-block;
        width: .28rem;
        cursor: pointer;
      }
    }
  }
  // 动态隐藏滚动条
  .hide_scroll::-webkit-scrollbar-thumb, .hide_scroll::-webkit-scrollbar-track {
    background: none;
  }
}
</style>
