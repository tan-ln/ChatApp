<template>
  <div id="dialog__list" class="dialog__list__wrapper">
    <div class="dialog__item">
      <div class="dialog__item--avatar">
        <img :src="require('@/assets/images/yong.jpg')" alt="someone" >
      </div>
      <Message :msg="msg1" />
    </div>
    <div class="dialog__item">
      <div class="dialog__item--avatar">
        <img :src="require('@/assets/images/yong.jpg')" alt="someone" >
      </div>
      <Message :msg="msg2" />
    </div>
    <div class="dialog__item">
      <div class="dialog__item--avatar">
        <img :src="require('@/assets/images/yong.jpg')" alt="someone" >
      </div>
      <Message :msg="msg3" />
    </div>
    <div class="dialog__item" style="justify-content: flex-end;">
      <Message :msg="msg4" :sender="true" />
      <div class="dialog__item--avatar">
        <img :src="require('@/assets/images/yong.jpg')" alt="someone" >
      </div>
    </div>
    <div class="dialog__item" style="justify-content: flex-end;">
      <Message :msg="msg4" :sender="true" />
      <div class="dialog__item--avatar">
        <img :src="require('@/assets/images/yong.jpg')" alt="someone" >
      </div>
    </div>
    <div class="dialog__item" style="justify-content: flex-end;">
      <Message :msg="msg4" :sender="true" />
      <div class="dialog__item--avatar">
        <img :src="require('@/assets/images/yong.jpg')" alt="someone" >
      </div>
    </div>
  </div>
</template>

<script>
import Message from './Message.vue'
export default {
  name: 'MsgList',
  components: {
    Message
  },
  data () {
    return {
      msg1: 'In combination with float and position, determines the type of a box or boxes that are generated for an element.',
      msg2: '@font-face是CSS3中的一个模块，他主要是把自己定义的Web字体嵌入到你的网页中，随着@font-face模块的出现，我们在Web的开发中使用字体不怕只能使用Web安全字体。',
      msg3: '【IE9+,Firefox3.5+,Chrome6+,Safari3.6+,Opera11.1+】；',
      msg4: 'www.google.com'
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/mixins.scss";
.dialog__list__wrapper {
  .dialog__item {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin: 0 0 0.4rem 0;

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
}
</style>
