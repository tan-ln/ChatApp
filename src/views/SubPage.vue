<template>
  <div id="sub__page">
    <router-view name="subPage" />
  </div>
</template>

<script>
export default {
  name: 'SubPage'
}
</script>

<style lang="scss">
@import "@/assets/styles/valiable.scss";
@import "@/assets/styles/mixins.scss";

#sub__page {
  @include no_select;
  width: 2.5rem;
  height: 6.8rem;
  box-sizing: border-box;
  background-color: $bg_color;
}
</style>
