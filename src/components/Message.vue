<template>
  <div id="message__block" v-if="msg" :class="!sender ? 'toLeft' : 'toRight'">
    <span>{{msg}}</span>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: ['msg', 'sender']
}
</script>

<style lang="scss">
@import "@/assets/styles/valiable.scss";
#message__block {
  padding: .1rem .2rem;
  position: relative;
  border: .01rem solid $border_color;
  max-width: 4.8rem;
  box-shadow: 0 0 .1rem $shadow_color;
  font-family: 'Comic Sans MS', PingFang SC;

  span {
    display: inline-block;
    font-size: 0.12rem;
    color: $deep_font_color;
    letter-spacing: .01rem;
    cursor: text;

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

  // // 气泡框三角箭头
  // &::before {
  //   content: "";
  //   width: 0;
  //   height: 0;
  //   border: .1rem solid;
  //   border-color:  $bg_color transparent transparent;
  //   border-radius: .2rem;
  //   position: absolute;
  //   left: -.1rem;
  //   top: 0;
  // }
}
#message__block.toLeft {
  border-bottom-left-radius: .6rem;
  border-top-right-radius: .6rem;
  border-bottom-right-radius: .6rem;
  background-color: $bg_color;
  margin-left: .1rem;
}
#message__block.toRight {
  border-bottom-left-radius: .6rem;
  border-top-left-radius: .6rem;
  border-bottom-right-radius: .6rem;
  background-color: #7acca6;
  margin-right: .1rem;
}
</style>
