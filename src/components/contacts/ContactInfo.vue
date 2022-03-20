<template>
  <div id="contact__info__wrapper">
    <v-header v-if="false" title="new friends" simple/>
    <IDCard v-else />
  </div>
</template>

<script>
import VHeader from '../VHeader'
import IDCard from './IDCard'
export default {
  name: 'ContactInfo',
  components: {
    'v-header': VHeader,
    IDCard
  }
}
</script>

<style lang="scss">
#contact__info__wrapper {
  width: 100%;
  height: 6.8rem;
  box-sizing: border-box;
}
</style>
