<template>
  <div class="msg_collection__wrapper">
    <v-header title="Messages" bubble input />
    <div class="warpper__content">
      <template v-for="(item) in getLastMsgQueue">
        <MsgEntry :entry="addInfo(item)" :key="item.id" @click.native="handleClickMsgEntry(item.msg)" :target="__target" :rootGroup="rootGroup" />
      </template>
    </div>
  </div>
</template>

<script>
import MsgEntry from './MsgEntry.vue'
import VHeader from '../VHeader.vue'
import { mapState } from 'vuex'

export default {
  name: 'MsgCollection',
  components: {
    MsgEntry,
    'v-header': VHeader
  },
  computed: {
    ...mapState({
      __target: state => state.auth.__target,
      rootGroup: state => state.contact.rootGroup,
      getLastMsgQueue: state => state.chat.lastMsgQueue
    })
  },
  methods: {
    handleClickMsgEntry (data) {
      // if (this.$route.params.target === this.__target.name) return
      // 设置聊天对象
      this.$store.dispatch('chat/setCurrentChating', data)
      // this.$router.push({ name: 'messages', params: { target: obj } })
      // 关闭群扩展面板
      this.$store.commit('contact/showExtends', false)
    },
    addInfo (item) {
      const list = this.rootGroup.gmember
      JSON.parse(list).map(user => {
        if (!item.msg.group && item.msg.from === user.email) {
          item.msg['avatar'] = user.avatar
          item.msg['username'] = user.username
        }
      })
      return item
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
