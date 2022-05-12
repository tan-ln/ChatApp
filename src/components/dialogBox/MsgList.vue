<template>
  <div id="dialog__list" class="dialog__list__wrapper" ref="dialog__list__wrapper">
    <!-- <div class="sys_time">{{ getSysTime() }}</div> -->
    <div class="dialog__item"
      :class="{
        'flexEnd': item.from === __self.userInfo.email,
        'animate__animated animate__fadeInUp': !cleanSide && idx === getCurMsgQueue.length - 1
      }"
      v-for="(item, idx) in getCurMsgQueue"
      :key="item.timestamp + item.content"
      ref="msgRef"
    >
      <div class="dialog__item--info" v-if="item.from !== 'app'">
        <img class="avatar" :src="getInfo(item.from, 'avatar')" :alt="item.from" >
      </div>
      <Message :msg="item.content" :sender="item.from" :username="getInfo(item.from, 'username')" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Message from './Message.vue'
export default {
  name: 'MsgList',
  props: ['mainHeight'],
  data () {
    return { cleanSide: true, direct: '' }
  },
  components: { Message },
  computed: {
    ...mapState({
      __self: state => state.auth.__self,
      __target: state => state.auth.__target,
      getCurMsgQueue: state => state.chat.curMsgQueue
    })
  },
  methods: {
    getSysTime () {
      const time = new Date().toLocaleString()
      return time
    },
    getInfo (email, attr) {
      let res = null
      // 群组消息
      if (this.__target.gname) {
        JSON.parse(this.__target.gmember).forEach(item => {
          if (item.email === email) {
            res = item[attr]
          }
        })
      } else {
        // 私聊消息
        res = this.__target[attr]
      }
      return res
    }
  },
  mounted () {
    this.$emit('attachScroll')
  },
  updated () {
    const ele = this.$refs.dialog__list__wrapper
    // console.log(ele.clientHeight)
    if (this.mainHeight < ele.clientHeight) {
      this.cleanSide = true
      const msgEl = this.$refs.msgRef
      const lastEl = msgEl.reverse()[0]
      lastEl.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'})
    } else {
      this.cleanSide = false
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/mixins.scss";
@import "@/assets/styles/valiable.scss";
.dialog__list__wrapper {
  .dialog__item {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 0 0 0.2rem 0;
    // position: relative;
    &.flexEnd {
      flex-direction: row-reverse;
    }
    &--info {
      height: 0.32rem;
      width: 0.32rem;
      position: relative;
      cursor: pointer;
      @include no_select;
      .avatar {
        position: absolute;
        top: 0;
        width: 0.32rem;
        height: 0.32rem;
        border-radius: 50%;
      }
    }
  }
  .sys_time {
    text-align: center;
    color: $middle_font_color;
  }
}
</style>
