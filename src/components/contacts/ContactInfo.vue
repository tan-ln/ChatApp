<template>
  <div id="contact__info__wrapper">
    <v-header v-if="!showIDCard" title="new friends" simple/>
    <IDCard v-else :userInfo="IDCard" />
  </div>
</template>

<script>
import VHeader from '../VHeader'
import IDCard from '../IDCard/index'
import { mapState } from 'vuex'
export default {
  name: 'ContactInfo',
  components: {
    'v-header': VHeader,
    IDCard
  },
  computed: {
    ...mapState(['showIDCard', 'IDCard'])
  }
}
</script>

<style lang="scss">
#contact__info__wrapper {
  width: 100%;
  box-sizing: border-box;
  position: relative;
}
</style>
