<template>
  <div id="navbar" class="navbar__wrapper">
    <div class="navbar__top">
      <img class="user__avatar" :src="require('@/assets/images/yong.jpg')" alt="someone" />
    </div>
    <nav class="navbar__center menu__list">
      <router-link replace :to="item.to" class="menu__list__item" :class="{ 'active__item' : item.name === $route.name }" v-for="(item, idx) in tabList" :key="item.title" :title="item.title">
        <div class="menu__list__item--icon" @click="handleNavClick(idx)">
          <i class="icon__btn iconfont" v-html="item.fontCode"></i>
        </div>
      </router-link>
    </nav>
    <div class="navbar__bottom">
      <a class="menu__list__item" title="Setting">
        <div class="menu__list__item--icon">
          <i class="icon__btn iconfont">&#xe8b8;</i>
        </div>
      </a>
      <a class="menu__list__item" title="Dark Mode">
        <div class="menu__list__item--icon">
          <i class="icon__btn iconfont">&#xe664;</i>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      activeId: 0,
      tabList: [
        {
          title: 'Home',
          name: 'home',
          fontCode: '&#xe690;',
          to: '/'
        },
        {
          title: 'Messages',
          name: 'messages',
          fontCode: '&#xe601;',
          to: '/messages'
        },
        {
          title: 'Contacts',
          name: 'contacts',
          fontCode: '&#xe61f;',
          to: 'contacts'
        },
        {
          title: 'Folders',
          name: 'folders',
          fontCode: '&#xeac5;',
          to: 'folders'
        },
        {
          title: 'Collections',
          name: 'collections',
          fontCode: '&#xeac6;',
          to: 'collections'
        }
      ]
    }
  },
  methods: {
    handleNavClick (idx) {
      this.activeId = idx
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
  height: 6.52rem;
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
      box-shadow: 0rem 0rem .04rem $shadow_color;
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

      i.iconfont {
        font-size: 0.18rem;
      }
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
