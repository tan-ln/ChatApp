<template>
  <div id="main__page">
    <router-view name="mainPage" />
  </div>
</template>

<script>
export default {
  name: 'MainPage'
}
</script>

<style lang="scss">
@import "@/assets/styles/valiable.scss";
#main__page {
  width: 6.72rem;
  height: 6.8rem;
  background-color: #FFF;
  border-left: .01rem solid $border_color;
  padding: 0 .16rem;
}
</style>
