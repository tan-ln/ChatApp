<template>
  <div class="msg_collection__wrapper">
    <v-header title="Messages" bubble input />
    <div class="warpper__content">
      <template v-for="(item) of getLastMsgQueue">
        <MsgEntry :entry="item" :key="item.id" @click.native="handleClickMsgEntry(item.msg)" :target="getCurTarget" :rootGroup="rootGroup" />
      </template>
    </div>
  </div>
</template>

<script>
import MsgEntry from './MsgEntry.vue'
import VHeader from '../VHeader.vue'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'MsgCollection',
  components: {
    MsgEntry,
    'v-header': VHeader
  },
  computed: {
    ...mapGetters(['getLastMsgQueue', 'getCurTarget']),
    ...mapState(['rootGroup'])
  },
  methods: {
    handleClickMsgEntry (data) {
      // if (this.$route.params.target === this.getCurTarget.name) return
      // 设置聊天对象
      this.$store.commit('setCurrentChating', data)
      // this.$router.push({ name: 'messages', params: { target: obj } })
    }
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
