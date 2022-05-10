<template>
  <div class="wrapper__header">
    <div class="wrapper__header--left">
      <h2 class="wrapper__header--title" :class="simple !== undefined ? 'simpleStyle' : ''">{{title}}</h2>
      <div class="wrapper__header--icon" v-if="bubble !== undefined">
        <Bubble num="99+" />
      </div>
    </div>
    <div class="wrapper__header--right" v-if="input !== undefined">
      <div class="search__input" @mouseover="mouseOver" @mouseleave="mouseLeave">
        <input class="search__input__content" type="search" ref="inputRef" v-model="keywords" />
        <i class="opts__icon iconfont" v-html="keywords ? '&#xe60f;' : '&#xe782;'" @click="handleClickClean"></i>
      </div>
    </div>
    <div class="wrapper__header--right tool__btns" v-if="fold !== undefined" title="open details" @click="handleClickExtends">
      <i class="iconfont tool__btns--more">&#xe613;</i>
    </div>
  </div>
</template>

<script>
import Bubble from './Bubble.vue'
export default {
  name: 'VHeader',
  components: {
    Bubble
  },
  props: ['title', 'bubble', 'input', 'simple', 'fold'],
  data () {
    return {
      keywords: ''
    }
  },
  methods: {
    mouseOver () {
      const inputRef = this.$refs.inputRef
      inputRef.style.width = '2.24rem'
    },
    mouseLeave () {
      if (this.keywords) return
      const inputRef = this.$refs.inputRef
      inputRef.style.width = '.28rem'
    },
    handleClickClean () {
      this.keywords = ''
    },
    handleClickExtends () {
      this.$store.commit('showExtends', !this.$store.state.showExtends)
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/valiable.scss";
@import "@/assets/styles/mixins.scss";
.wrapper__header {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  height: .5rem;
  margin: 0.14rem .1rem;
  position: relative;
  &--left {
    position: relative;
  }
  &--title {
    font-size: 0.18rem;
    margin-right: .04rem;
    color: #333;
    font-weight: 600;
  }
  &--title.simpleStyle {
    font-weight: 400;
    font-size: 0.18rem;
  }
  &--icon {
    position: absolute;
    right: .04rem;
    top: 0;
  }
  &--right {
    position: absolute;
    right: 0;

    .search__input {
      line-height: 0.28rem;
      background-color: $border_color;
      border-radius: 2rem;
      input {
        width: .3rem;
        height: 0.28rem;
        padding: 0.02rem .2rem .02rem .1rem;
        border: .01rem solid $border_color;
        border-radius: 2rem;
        transition: .3s ease-in-out;
        font-size: 0.12rem;
      }
      .opts__icon {
        font-size: 0.12rem;
        color: $light_font_color;
        position: absolute;
        right: .1rem;
        top: 0;
      }
    }
  }
  &::after {
    content: "";
    width: 100%;
    position: absolute;
    bottom: -.06rem ;
    border-bottom: .01rem solid $border_color;
  }
  .tool__btns {
    cursor: pointer;
    color: $heavy_font_color;
    position: absolute;
    bottom: -.04rem;
    &--more {
      font-size: .18rem;
    }
  }
}
</style>
