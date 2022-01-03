<template>
  <div id="navbar" class="navbar__wrapper">
    <div class="navbar__top">
      <img class="user__avatar" :src="require('@/assets/images/yong.jpg')" alt="someone" />
    </div>
    <div class="navbar__center menu__list">
      <div class="menu__list__item" :class="{ 'active__item' : idx === 1 }" v-for="(item, idx) in tabList" :key="item.title">
        <div class="menu__list__item--icon">
          <i class="icon__btn iconfont" v-html="item.fontCode"></i>
        </div>
      </div>
    </div>
    <div class="navbar__bottom">
      <div class="menu__list__item">
        <div class="menu__list__item--icon">
          <i class="icon__btn iconfont">&#xe8b8;</i>
        </div>
      </div>
      <div class="menu__list__item">
        <div class="menu__list__item--icon">
          <i class="icon__btn iconfont">&#xe664;</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      tabList: [
        {
          title: 'Home',
          fontCode: '&#xe690;'
        },
        {
          title: 'Message',
          fontCode: '&#xe601;'
        },
        {
          title: 'Contacts',
          fontCode: '&#xe61f;'
        },
        {
          title: 'Folder',
          fontCode: '&#xeac5;'
        },
        {
          title: 'Collection',
          fontCode: '&#xeac6;'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/valiable.scss";
@import "@/assets/styles/mixins.scss";
.navbar__wrapper {
  @include no_select;
  box-sizing: border-box;
  margin: 0.14rem 0 .14rem .14rem;
  width: .64rem;
  overflow: hidden;
  color: #fff;
  background-color: $nav_bg_color;
  display: flex;
  flex-direction: column;
  text-align: center;
  border-radius: .14rem;
  .navbar__top {
    width: 0.64rem;
    height: 0.64rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .user__avatar {
      box-shadow: 0rem 0rem .04rem #FFF;
      cursor: pointer;
    }
  }
  .navbar__center {
    box-sizing: border-box;
    flex: 1;
    margin: 0.1rem;
    border-bottom: .01rem solid $light_font_color;
    display: flex;
    flex-direction: column;
    align-items: center;
    vertical-align: middle;

    .menu__list__item {
      margin: .1rem 0;
      width: 0.3rem;
      height: 0.3rem;
      line-height: 0.3rem;
    }
    .active__item {
      color: #fff;
      background-color: $nav_active_color;
      border-radius: .02rem;
      box-shadow: 0rem 0rem .04rem $nav_active_color;
    }
  }
  .navbar__bottom {
    height: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .menu__list__item {
    color: $nav_item_color;
    cursor: pointer;
    &--icon {
      font-size: 0.2re;
    }
  }

}
</style>
