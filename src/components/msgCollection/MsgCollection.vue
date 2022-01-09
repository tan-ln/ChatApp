<template>
  <div class="msg_collection__wrapper">
    <v-header title="Messages" bubble input />
    <div class="warpper__content">
      <!-- <template v-for="item in 14" >
        <MsgEntry :entry="msgs[0]" :idx="item" :key="item" />
      </template> -->
    </div>
  </div>
</template>

<script>
import MsgEntry from './MsgEntry.vue'
import VHeader from '../VHeader.vue'

export default {
  name: 'MsgCollection',
  components: {
    MsgEntry,
    'v-header': VHeader
  },
  async created () {
    await this.$store.dispatch('reqMessages')
  }
}
</script>

<style lang="scss">
.msg_collection__wrapper {
  .warpper__content {
    height: 5.88rem;
    box-sizing: border-box;
    overflow-y: scroll;
  }
}
</style>
