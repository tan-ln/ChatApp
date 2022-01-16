<template>
  <div class="msg_collection__wrapper">
    <v-header title="Messages" bubble input />
    <div class="warpper__content">
      <template v-for="(item, index) in getMsgQueue" >
        <MsgEntry :entry="item" :idx="index" :key="item.id || item.gid" />
      </template>
    </div>
  </div>
</template>

<script>
import MsgEntry from './MsgEntry.vue'
import VHeader from '../VHeader.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'MsgCollection',
  components: {
    MsgEntry,
    'v-header': VHeader
  },
  computed: {
    ...mapGetters(['getMsgQueue'])
  },
  methods: {},
  mounted () {
    // await this.$store.dispatch('syncMessages')
    // this.$store.commit('getPastMsg')
    // this.$socket.emit('message', 'tang')
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
