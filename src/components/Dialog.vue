<template>
  <div class="dialog__box__wrapper">
    <div class="wrapper__header">
      <div class="wrapper__header--left">
        <h3 class="wrapper__header--title">庸の锌小子</h3>
      </div>
    </div>
    <div class="wrapper__content">
      <div class="dialog__list">
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
      </div>
    </div>
    <div class="wrapper__footer"></div>
  </div>
</template>

<script>
import Message from './Message.vue'

export default {
  name: 'Dialog',
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

<style lang="scss" scoped>
@import "@/assets/styles/valiable.scss";
.dialog__box__wrapper {
  box-sizing: border-box;
  width: 6.76rem;
  height: 100%;
  overflow: hidden;
  background-color: #FFF;
  border-left: .01rem solid $border_color;
  padding: 0 .16rem;
  display: flex;
  flex-direction: column;

  .wrapper__header {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    height: .5rem;
    margin: 0.14rem .1rem;
    position: relative;
    &--title {
      font-size: 0.16rem;
      color: $deep_font_color;
    }
    &::after {
      content: "";
      width: 100%;
      position: absolute;
      bottom: -.06rem ;
      border-bottom: .01rem solid $border_color;
    }
  }

  .wrapper__content {
    flex: 1;
    overflow-y: scroll;
    padding: 0.14rem .1rem;

    .dialog__item {
      width: 100%;
      display: flex;
      flex-direction: row;
      margin: 0 0 0.3rem 0;

      &--avatar {
        height: 0.32rem;
        width: 0.32rem;
        position: relative;
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

  .wrapper__footer {
    height: 1.2rem;
    // background-color: rgb(122, 204, 166);
    margin: 0.14rem .1rem;
  }
}
</style>
