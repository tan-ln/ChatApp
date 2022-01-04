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
      console.log('submit')
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
  textarea {
    width: 100%;
    height: 100%;
    font-family: 'Comic Sans MS', PingFang SC;
    font-size: 0.12rem;
    color: $deep_font_color;
    letter-spacing: .006rem;
    &::placeholder {
      font-size: 0.12rem;
      color: $light_font_color;
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
    width: 24%;
    background: $msg_bg_color linear-gradient(to right, rgba(255, 240, 191, 0), $selection_color);
  }
  &::after {
    content: '';
    position: absolute;
    left: auto;
    top: auto;
    bottom: .01rem;
    right: 0;
    height: .02rem;
    width: 40%;
    background: $selection_color linear-gradient(to right, rgba(255, 255, 255, 0), $msg_bg_color);
  }
}
// focus 背景色
#input__wrapper.focus__bg {
  background-color: $bg_color;
}
</style>
