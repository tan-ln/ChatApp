<template>
  <div id="app">
    <template v-if="false">
      <NavBar />
      <SubPage />
      <MainPage />
    </template>
    <router-view name="default" />
  </div>
</template>

<script>
import NavBar from '@/components/navBar/NavBar'
import SubPage from '@/views/SubPage'
import MainPage from '@/views/MainPage'
export default {
  name: 'App',
  components: {
    NavBar,
    SubPage,
    MainPage
  }
}
</script>

<style lang="scss">
/*将公用的样式统一在此导入*/
@import "assets/styles/common.css";
@import "assets/styles/base.css";
/*阿里 fonticon*/
@import "assets/styles/lib/iconfont.css";

@import "@/assets/styles/valiable.scss";

/* 背景 */
body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url('./assets/images/bg/1.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  position: relative;
}
 /* 毛玻璃 */
body .frosted__glass__wrapper {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: inherit;
  -webkit-filter: blur(.08rem);
  -moz-filter: blur(.08rem);
  -ms-filter: blur(.08rem);
  -o-filter: blur(.08rem);
  filter: blur(.08rem);
  filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=4, MakeShadow=false);
}
#app {
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  width: 10rem;
  height: 6.8rem;
  position: relative;
  margin: 0 auto;
  margin-top: 0.3rem;
  background-color: $bg_color;
  border: .01rem solid $border_color;
  border-radius: .12rem;
  box-shadow: 0 .03rem .01rem -.02rem rgba(0,0,0,.2), 0 .02rem .02rem 0 rgba(0,0,0,.14), 0 .01rem .05rem 0 rgba(0,0,0,.12);
  border-width: thin;
  z-index: 999;
}
</style>
