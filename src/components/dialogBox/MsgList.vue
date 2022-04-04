<template>
  <div id="dialog__list" class="dialog__list__wrapper" ref="dialog__list__wrapper">
    <!-- <div class="sys_time">{{ getSysTime() }}</div> -->
    <div class="dialog__item"
      :class="{ 'flexEnd': item.from === __self.userInfo.email, 'animate__animated animate__slideInUp': !cleanSide && idx === getCurMsgQueue.length - 1 }"
      v-for="(item, idx) in getCurMsgQueue"
      :key="item.timestamp + item.content"
      ref="msgRef"
    >
      <div class="dialog__item--avatar" v-if="item.from !== 'root'">
        <img :src="getImgUrl(item.from)" :alt="item.from" >
      </div>
      <Message :msg="item.content" :sender="item.from"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Message from './Message.vue'
export default {
  name: 'MsgList',
  props: ['mainHeight'],
  data () {
    return { cleanSide: true }
  },
  components: { Message },
  computed: {
    ...mapGetters(['getCurMsgQueue', '__self'])
  },
  methods: {
    getSysTime () {
      const time = new Date().toLocaleString()
      return time
    },
    getImgUrl (email) {
      let url = null
      const all = JSON.parse(sessionStorage.getItem('root-group'))
      all.map(item => {
        if (item.email === email) {
          url = item.avatar
        }
      })
      return url
    }
  },
  mounted () {
    this.$emit('attachScroll')
  },
  updated () {
    const ele = this.$refs.dialog__list__wrapper
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
    padding: 0 0 0.4rem 0;
    &.flexEnd {
      flex-direction: row-reverse;
    }

    &--avatar {
      height: 0.32rem;
      width: 0.32rem;
      position: relative;
      cursor: pointer;
      @include no_select;
      img {
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
