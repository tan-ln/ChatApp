<template>
  <div id="main__page" :style="{ width: getExtendStatus ? '8.8rem' : '6.38rem' }">
    <router-view name="mainPage" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MainPage',
  computed: {
    ...mapState({
      getExtendStatus: state => state.contact.showExtends
    })
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/valiable.scss";
#main__page {
  box-sizing: border-box;
  height: 6.8rem;
  background-color: #FFF;
  border-left: .01rem solid $border_color;
  padding: 0 .16rem;
  transition: all .25s;
}
</style>
