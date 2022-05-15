<template>
  <div id="ID__card">
    <div class="id__card--wrapper">
      <div class="right__avatar">
        <img :src="userInfo.avatar" :alt="userInfo.email">
      </div>
      <div class="card__top__wrapper">
        <div class="left__content">
          <div class="left__content__title">
            <h3 class="card-username">{{ userInfo.username }}</h3>
            <i class="iconfont gender-icon">&#xe61a;</i>
          </div>
          <p class="left__content__sign">又菜又爱玩的游戏玩家~</p>
        </div>
      </div>
      <div class="card__center__wrapper">
        <p class="card__marks">
          <span class="title">备注</span>
          <span class="desc">点击添加备注</span>
        </p>
        <p class="card__marks">
          <span class="title">地区</span>
          <span class="desc">电信一区</span>
        </p>
        <p class="card__marks">
          <span class="title">账号</span>
          <span class="desc">{{ userInfo.email }}</span>
        </p>
        <p class="card__marks">
          <span class="title">备注</span>
          <span class="desc">点击添加备注</span>
        </p>
      </div>
      <div class="card__bottom__wrapper">
        <div class="btn send-btn" v-if="isFriends" @click="handleSendMessage">send message</div>
        <div class="btn add-btn" v-else @click="handleAddFriends">subsribe</div>
      </div>
      <!-- close btn -->
      <div class="close-btn" title="close" @click="handleCloseIDCard">
        <svg t="1652177853040" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13123" width=".24rem" height=".24rem"><path d="M512 451.6608 403.3536 343.0144a42.606933 42.606933 0 0 0-60.305067 0.034133 42.666667 42.666667 0 0 0-0.034133 60.305067L451.6608 512 343.0144 620.6464a42.606933 42.606933 0 0 0 0.034133 60.305067 42.666667 42.666667 0 0 0 60.305067 0.034133L512 572.3392l108.6464 108.6464a42.606933 42.606933 0 0 0 60.305067-0.034133 42.666667 42.666667 0 0 0 0.034133-60.305067L572.3392 512l108.6464-108.6464a42.606933 42.606933 0 0 0-0.034133-60.305067 42.666667 42.666667 0 0 0-60.305067-0.034133L512 451.6608zM512 1024C229.666133 1024 0 794.333867 0 512S229.666133 0 512 0s512 229.666133 512 512-229.666133 512-512 512zm0-938.666667c-235.264 0-426.666667 191.402667-426.666667 426.666667s191.402667 426.666667 426.666667 426.666667 426.666667-191.402667 426.666667-426.666667-191.402667-426.666667-426.666667-426.666667z" fill="#2ad3d3" p-id="13124"></path></svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'IDCard',
  props: ['userInfo'],
  computed: {
    ...mapState({
      self: state => state.auth.__self.userInfo,
      contactsBook: state => state.contact.contactsBook,
      lastMsgQueue: state => state.chat.lastMsgQueue
    }),
    ...mapGetters('contact', ['getAvatar']),
    isFriends () {
      let bool = false
      const contactsBook = this.contactsBook
      for (let key in contactsBook) {
        contactsBook[key].forEach(item => {
          if (item.email === this.userInfo.email) {
            bool = true
          }
        })
      }
      return bool
    }
  },
  methods: {
    handleCloseIDCard () {
      this.$store.commit('contact/showIDCard', false)
    },
    // 添加到聊天队列
    handleSendMessage () {
      const data = { group: null, from: this.userInfo.email }
      // 关闭群组扩展面板
      this.$store.commit('contact/showExtends', false)

      const avatar = this.getAvatar(data)
      // 刷新最近聊天列表
      this.$store.dispatch('chat/setConversations', { data, avatar })
      // 设置 当前聊天对象
      this.$store.dispatch('chat/setCurrentChating', data)
      // 关闭并跳转到聊天页面
      this.$store.commit('contact/showIDCard', false)
      if (this.$route.name !== 'messages') {
        this.$router.push({ path: '/messages' })
      }
    },
    // 加好友
    handleAddFriends () {
      const data = {
        self: this.self.email,
        target: this.userInfo.email
      }
      this.$socket.emit('contact:req-subscribe', data)
      // 本地消息处理
      this.$store.dispatch('chat/setConversations', {
        type: 'subscribe',
        data: {
          from: this.self.email,
          to: this.userInfo.email,
          content: '你已发送添加好友申请',
          timestamp: Date.now(),
          type: 'system'
        }
      })
      this.$store.commit('contact/showIDCard', false)
      this.$store.commit('contact/showExtends', false)
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/valiable.scss";
@import "@/assets/styles/mixins.scss";
#ID__card {
  position: absolute;
  top: 0;
  right: -.16rem;
  bottom: 0;
  left: -.16rem;
  background-color: rgba(255, 255, 255, .5);
  .id__card--wrapper {
    width: 3rem;
    height: 4rem;
    margin: 1.34rem auto;
    background-color: $bg_color;
    padding: 0.5rem;
    border-radius: .2rem;
    position: relative;
    box-shadow: -.12rem .16rem .06rem -.1rem $border_color, 0 .12rem .12rem -.12rem $border_color, .12rem .16rem .06rem -.1rem $border_color;

    .right__avatar {
      position: absolute;
      top: -0.33rem;
      left: 50%;
      margin-left: -.33rem;
      img {
        width: .66rem;
        height: .66rem;
        border-radius: 50%;
      }
    }

    .card__top__wrapper {
      display: flex;
      flex-direction: row;
      height: 1rem;

      .left__content {
        flex: 1;
        &__title {
          height: .24rem;
          line-height: 0.24rem;
          vertical-align: middle;
          .card-username {
            font-size: 0.16rem;
            font-weight: bold;
            color: $heavy_font_color;
            max-width: 2.98rem;
            float: left;
            @include ellipse__2;
          }
          .gender-icon {
            display: inline-block;
            padding: 0 .04rem;
            font-size: .12rem;
            color: rgb(255, 57, 116);
          }
        }
        &__sign {
          font-size: 0.12rem;
          letter-spacing: .016rem;
          color: $light_font_color;
          @include ellipse__2;
          margin-top: .06rem;
        }
      }
    }

    .card__center__wrapper {
      border-top: .01rem solid $border_color;
      border-bottom: .01rem solid $border_color;
      padding: 0.1rem 0;
      .card__marks {
        padding: 0.06rem 0;
        .title {
          margin-right: .1rem;
          color: $light_font_color;
        }
        .desc {
          color: $heavy_font_color;
        }
      }
    }

    .card__bottom__wrapper {
      width: 100%;
      text-align: center;
      position: absolute;
      bottom: .16rem;
      left: 50%;
      margin-left: -50%;
      .btn {
        display: inline-block;
        width: 60%;
        text-align: center;
        color: #fff;
        font-size: 0.12rem;
        letter-spacing: .01rem;
        border-radius: .2rem;
        background-color: $msg_bg_color;
        cursor: pointer;
        white-space: nowrap;
        padding: 0.06rem 0;
        margin: .04rem 0;
      }
    }
    .close-btn {
      position: absolute;
      right: .16rem;
      top: .16rem;
      cursor: pointer;
    }
  }
}
</style>
