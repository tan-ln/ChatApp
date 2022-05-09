<template>
  <div class="contact__card__wrapper" :class="{ 'actived__content' : entry.msg.group === target.gname || entry.msg.from === target.email }">
    <div class="wrapper__left__avatars">
      <img :src="entry.avatar || rootGroup.gavatar" :alt="entry.msg.group || entry.msg.from">
      <div class="wrapper__side--bubble" v-if="entry.unreadNum">
        <Bubble :num="entry.unreadNum" />
      </div>
    </div>
    <div class="wrapper__right__content">
      <div class="content__hd">
        <h3 class="content__hd--title">{{entry.msg.group || entry.msg.from}}</h3>
        <span class="content__hd--timeStamp">{{formatTime(entry.msg.timestamp)}}</span>
      </div>
      <div class="content__main">
        <p class="content__main--msg">{{entry.msg.content}}</p>
      </div>
    </div>
    <div class="wrapper__side--icon" v-if="entry.top || entry.mute">
      <i class="iconfont opt__icons" v-html="entry.mute ? '&#xe6ba;' : '&#xe770;'"></i>
    </div>
  </div>
</template>

<script>
import Bubble from '../Bubble.vue'
export default {
  name: 'MsgEntry',
  props: ['entry', 'target', 'rootGroup'],
  components: {
    Bubble
  },
  methods: {
    formatTime: timeStamp => new Date(timeStamp).toString().split(' ')[4].substr(0, 5)
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/mixins.scss";
@import "@/assets/styles/valiable.scss";
.contact__card__wrapper {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: .06rem .1rem;
  width: 2.42rem;
  font-size: 0.12rem;
  position: relative;
  cursor: pointer;
  .wrapper__left__avatars {
    width: .48rem;
    height: .48rem;
    margin-right: .12rem;
    position: relative;
    img {
      display: block;
      width: .4rem;
      height: 0.4rem;
      border: .01rem  solid $bg_color;
      border-radius: 50%;
      margin: 0.04rem auto;
    }
  }
  .wrapper__right__content {
    height: .48rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .content__hd {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      &--title {
        font-size: 0.14rem;
        display: inline-block;
        transform: scale(.92);
        transform-origin: left center;
      }
      &--timeStamp {
        font-size: 0.12rem;
        color: $light_font_color;
        transform: scale(.86);
        transform-origin: bottom;
      }
    }
    .content__main {
      font-size: 0.12rem;
      color: $middle_font_color;
      width: 1.5rem;
      line-height: 0.2rem;
      &--msg {
        @include ellipse;
        transform: scale(.9);
        transform-origin: left center;
      }
    }
  }
  .wrapper__side--bubble {
    position: absolute;
    font-size: 0.12rem;
    // right: .3rem;
    // bottom: .26rem;
    right: .16rem;
    top: .02rem;
  }
  .wrapper__side--icon {
    position: absolute;
    right: .14rem;
    bottom: .1rem;
    .opt__icons {
      font-size: 0.12rem;
      color: $light_font_color;
    }
  }
  &::after {
    content: "";
    width: 1.8rem;
    position: absolute;
    right: .1rem;
    bottom: -.01rem;
    border-bottom: .01rem solid $border_color;
  }
}
</style>
