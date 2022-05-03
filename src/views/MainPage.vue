<template>
  <div id="main__page" :style="{ width: getExtendStatus ? '8.8rem' : '6.38rem' }">
    <router-view name="mainPage" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MainPage',
  computed: {
    ...mapGetters(['getAuthState', 'getFlipAni', 'getModalState', 'getExtendStatus'])
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/valiable.scss";
#main__page {
  box-sizing: border-box;
  // width: 5.8rem;
  // width: 6.8rem;
  height: 6.8rem;
  background-color: #FFF;
  border-left: .01rem solid $border_color;
  padding: 0 .16rem;
  transition: all .25s;
}
</style>
