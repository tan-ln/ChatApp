<template>
  <div id="sign__up__page">
    <SignUp />
    <Swiper />
  </div>
</template>

<script>
import SignUp from '@/components/signUp/SignUp'
import Swiper from '@/components/Swiper'
export default {
  name: 'SignUpPage',
  components: {
    SignUp,
    Swiper
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/valiable.scss";
#sign__up__page {
  display: flex;
  flex-direction: row;
}
</style>
