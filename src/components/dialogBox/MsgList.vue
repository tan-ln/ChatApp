<template>
  <div id="dialog__list" class="dialog__list__wrapper" ref="dialog__list__wrapper">
    <!-- <div class="sys_time">{{ getSysTime() }}</div> -->
    <div class="dialog__item"
      :class="{
        'flexEnd': item.from === __self.email,
        'animate__animated animate__fadeInUp': cleanSide && idx === getCurMsgQueue.length - 1
      }"
      v-for="(item, idx) in getCurMsgQueue"
      :key="item.timestamp + item.content"
      ref="msgRef"
    >
      <div class="dialog__item--info" v-if="showAvatar(item.from, item.type)" @click="handleClickAvatar(item)">
        <img class="avatar" :src="getInfo(item, 'avatar')" :alt="item.from" />
      </div>
      <Message :data="item" :msg="item.content" :username="getInfo(item, 'username')" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Message from './Message.vue'
export default {
  name: 'MsgList',
  props: ['mainHeight'],
  components: { Message },
  data () {
    return {
      cleanSide: true
    }
  },
  computed: {
    ...mapState({
      __self: state => state.auth.__self.userInfo,
      __target: state => state.auth.__target,
      rootGroup: state => state.contact.rootGroup,
      getCurMsgQueue: state => state.chat.curMsgQueue,
      getLastMsgQueue: state => state.chat.lastMsgQueue
    })
  },
  methods: {
    getSysTime () {
      return new Date().toLocaleString()
    },
    getInfo (data, attr, all) {
      const { from } = data
      let res = null
      JSON.parse(this.rootGroup.gmember).forEach(item => {
        if (item.email === from) {
          res = all ? item : item[attr]
        }
      })
      return res
    },
    showAvatar (from, type) {
      let bool = false
      if (type !== 'system' && from !== 'app') {
        bool = true
      }
      return bool
    },
    handleScroll () {
      const ele = this.$refs.dialog__list__wrapper
      // console.log(ele.clientHeight)
      if (this.mainHeight < ele.clientHeight) {
        this.cleanSide = false
        const msgEl = this.$refs.msgRef
        const lastEl = msgEl[msgEl.length - 1]
        lastEl.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'})
      }
    },
    handleClickAvatar (item) {
      const data = this.getInfo(item, '', true)
      if (!this.__target.gname || this.__self.email === item.from) return
      this.$store.commit('contact/showIDCard', data)
    }
  },
  watch: {
    getCurMsgQueue: 'handleScroll'
  },
  mounted () {
    this.$emit('attachScroll')
  },
  updated () {
    this.$nextTick(() => {
      this.handleScroll()
    })
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
