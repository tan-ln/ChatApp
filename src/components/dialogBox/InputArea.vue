<template>
  <div id="input__wrapper" :class="focus ? 'focus__bg' : ''">
    <textarea
      name="inputArea"
      id="inputArea"
      placeholder="Enter to send message / Ctrl + Enter to add new line"
      v-model="textContent"
      @keydown.exact.enter="handleEnterSubmit($event)"
      @keydown.ctrl.enter="handleLineFeed"
      @focus="handleFocusEvent"
      @blur.prevent="handleBlurEvent"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: 'InputArea',
  data () {
    return {
      textContent: '',
      focus: false
    }
  },
  methods: {
    handleEnterSubmit (e) {
      e.preventDefault()
      if (this.textContent === '') return
      this.$emit('handleMsgSend', this.textContent.trim())
      this.textContent = ''
      this.focus = false
    },
    handleLineFeed () {
      // Ctrl + Enter 换行
      this.textContent += '\n'
    },
    handleFocusEvent () {
      this.focus = true
    },
    handleBlurEvent () {
      this.focus = false
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/valiable.scss";
@import "@/assets/styles/scrollbar.scss";
#input__wrapper {
  height: 1.2rem;
  padding: 0.1rem 0;
  position: relative;
  display: flex;
  textarea {
    flex: 1;
    font-size: 0.13rem;
    color: $dark_font_color;
    letter-spacing: .01rem;

    &::placeholder {
      font-size: 0.12rem;
      color: $light_font_color;
    }
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
  &::before {
    content: '';
    position: absolute;
    left: auto;
    top: 0;
    bottom: auto;
    right: auto;
    height: .02rem;
    width: 26%;
    transform: scaleY(.6);
    background: $card_active_border_color linear-gradient(to left, rgba(255, 255, 255, 0), $msg_bg_color);
  }
  &::after {
    content: '';
    position: absolute;
    left: auto;
    top: auto;
    bottom: 0;
    right: 0;
    height: .02rem;
    width: 40%;
    transform: scaleY(.6);
    background: $card_active_border_color linear-gradient(to right, rgba(255, 255, 255, 0), $msg_bg_color);
  }
}
// focus 背景色
#input__wrapper.focus__bg {
  background-color: $bg_color;
  border-radius: .1rem;
}
</style>
