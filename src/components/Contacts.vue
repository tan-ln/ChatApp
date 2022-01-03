<template>
  <div class="contact__list__wrapper">
    <div class="wrapper__header">
      <div class="wrapper__header--left">
        <h2 class="wrapper__header--title">Messages</h2>
        <div class="wrapper__header--icon">
          <Bubble num="99+" />
        </div>
      </div>
      <div class="wrapper__header--right">
        <div class="search__input" @mouseover="mouseOver" @mouseleave="mouseLeave">
          <input class="search__input__content" type="search" ref="inputRef" v-model="keywords" />
          <i class="opts__icon iconfont" v-html="keywords ? '&#xe60f;' : '&#xe782;'" @click="handleClickClean"></i>
        </div>
      </div>
    </div>
    <div class="warpper__content">
      <template v-for="item in 14" >
        <ContactCard :contact="msgs[0]" :idx="item" :key="item" />
      </template>
    </div>
  </div>
</template>

<script>
import ContactCard from './ContactCard.vue'
import Bubble from './Bubble.vue'

export default {
  name: 'Contacts',
  components: {
    ContactCard,
    Bubble
  },
  data () {
    return {
      active: '',
      keywords: '',
      msgs: [
        {
          contact: '庸の锌小子',
          avatarUrl: 'xin.jpg',
          timeStamp: '10:23',
          content: '来杯芦荟汁儿，干净又卫生啊兄弟们!!!!',
          top: true,
          mute: true
        }
      ]
    }
  },
  methods: {
    mouseOver () {
      console.log('over')
      const inputRef = this.$refs.inputRef
      inputRef.style.width = '2.4rem'
    },
    mouseLeave () {
      if (this.keywords) return
      const inputRef = this.$refs.inputRef
      inputRef.style.width = '.28rem'
    },
    handleClickClean () {
      this.keywords = ''
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/valiable.scss";
@import "@/assets/styles/mixins.scss";
.contact__list__wrapper {
  @include no_select;
  width: 2.6rem;
  height: 100%;
  background-color: $bg_color;

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
      font-weight: 600;
      color: $deep_font_color;
      font-family: 'Comic Sans MS';
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
          font-family: 'Comic Sans MS', PingFang SC;
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
  }

  .warpper__content {
    height: 5.86rem;
    box-sizing: border-box;
    overflow-y: scroll;
  }
}
</style>
