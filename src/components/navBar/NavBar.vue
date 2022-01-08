<template>
  <div id="navbar" class="navbar__wrapper">
    <div class="navbar__top" :title="__self.userInfo.name">
      <img class="user__avatar" :src="__self.userInfo.avatarUrl" :alt="__self.userInfo.name" />
    </div>
    <nav class="navbar__center menu__list">
      <router-link replace :to="item.to"
        class="menu__list__item"
        v-for="(item, idx) in navbar.navList"
        :key="item.title"
        :title="item.title"
      >
        <div class="menu__list__item--icon" @click="handleNavClick(idx)">
          <i class="icon__btn iconfont" :style="{'opacity': item.name === $route.name ? 1 : 0.2}" v-html="item.fontCode"></i>
        </div>
        <div class="active__item" v-if="item.name === $route.name || 0"></div>
      </router-link>
    </nav>
    <div class="navbar__bottom">
      <a class="menu__list__item" title="Setting">
        <div class="menu__list__item--icon">
          <i class="icon__btn iconfont" v-html="navbar.setting.fontCode"></i>
        </div>
      </a>
      <a class="menu__list__item" title="Dark Mode">
        <div class="menu__list__item--icon">
          <i class="icon__btn iconfont" v-html="navbar.darkMode.fontCode"></i>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavBar',
  computed: {
    ...mapGetters({
      __self: '__self',
      navbar: 'navbar'
    })
  },
  methods: {
    handleNavClick (idx) {
      this.$store.commit('changeNavbarActiveId', idx)
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
      position: relative;

      i.iconfont {
        opacity: .2;
        font-size: 0.18rem;
      }
    }
    .active__item {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: .16;
      background-color: $nav_item_color;
      border-radius: .08rem;
      box-shadow: 0rem 0rem .2rem $nav_active_color;
    }
  }
  .navbar__bottom {
    height: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .menu__list__item {
      i.iconfont {
        opacity: .6;
        font-size: 0.18rem;
      }
    }
  }
  .menu__list__item {
    color: $nav_item_color;
    cursor: pointer;
  }
}
</style>
