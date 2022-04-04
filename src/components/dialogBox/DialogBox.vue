<template>
  <div class="dialog__box__wrapper" v-if="getCurTarget.gname || getCurTarget.email" >
    <v-header :title="getCurTarget.gname || getCurTarget.email" simple />
    <main class="wrapper__content" :class="hideScroll ? 'hide_scroll' : ''" ref="mainRef">
      <MsgList :mainHeight="mainHeight" :attachScroll="attachScroll()" />
    </main>
    <div class="wrapper__footer">
      <!-- textArea 上方工具栏 -->
      <div class="tool__list">
        <i title="emoji" class="iconfont">&#xe610;</i>
        <i title="album" class="iconfont">&#xec7f;</i>
        <i title="files" class="iconfont">&#xe63b;</i>
        <i title="cut" class="iconfont">&#xe676;</i>
        <i title="clipboard" class="iconfont">&#xe645;</i>
      </div>
      <InputArea />
    </div>
  </div>
</template>

<script>
import InputArea from './InputArea.vue'
import MsgList from './MsgList.vue'
import VHeader from '../VHeader.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Dialog',
  components: {
    MsgList,
    InputArea,
    'v-header': VHeader
  },
  data () {
    return {
      hideScroll: true,
      mainHeight: 0
    }
  },
  computed: {
    ...mapGetters(['getCurTarget'])
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
  width: 6.4rem;
  height: 6.8rem;
  display: flex;
  flex-direction: column;

  .wrapper__content {
    flex: 1;
    overflow-y: scroll;
    margin-bottom: 0.14rem;
    padding: 0 .1rem;
    transition: all .5s ease-out;
  }

  .wrapper__footer {
    margin: 0.14rem .1rem;

    .tool__list {
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
