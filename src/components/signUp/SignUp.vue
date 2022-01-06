<template>
  <div id="sign__up__wrapper">
    <Logo />
    <SignUpContent />
  </div>
</template>

<script>
import Logo from './Logo.vue'
import SignUpContent from './SignUpContent.vue'
export default {
  name: 'SignUp',
  components: {
    Logo,
    SignUpContent
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/valiable.scss";
#sign__up__wrapper {
  width: 4rem;
  height: 6.8rem;
  background-color: $bg_color;
  border: .01rem solid $border_color;
  padding: .6rem .4rem;
}
</style>
