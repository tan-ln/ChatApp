<template>
  <div id="contact__list__wrapper">
    <!-- 首字母 -->
    <div class="initial__list" v-for="(val, key) in list" :key="key">
      <p class="first__word">{{key}}</p>
      <!-- contacts entry -->
      <div class="contacts__list" v-for="(item, idx) in val" :key="idx + item.name">
        <div class="avatar__box">
          <img :src="require('@/assets/images/' + avatarUrl(item.avatar))" :alt="item.name">
        </div>
        <p class="contact__name">{{item.name}}</p>
        <i class="status" :class="{ 'online__status' : item.online }" :title="item.online ? 'online' : 'offline'"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactList',
  data () {
    return {
      list: {
        'A': [
          {
            name: '爱丽丝',
            avatar: 'lao.jpg',
            online: true
          },
          {
            name: '二愣子asd安师大换手机了卡三大纪律阿斯科利觉得',
            avatar: 'xin.jpg',
            online: true
          }
        ],
        'C': [
          {
            name: 'C酱',
            avatar: 'xin.jpg',
            online: false
          }
        ],
        'D': [
          {
            name: '董小姐',
            avatar: 'default.jpg',
            online: true
          }
        ],
        'T': [
          {
            name: 'Tango',
            avatar: 'default.jpg',
            online: false
          },
          {
            name: 'Tango',
            avatar: 'default.jpg',
            online: false
          },
          {
            name: 'Tango',
            avatar: 'default.jpg',
            online: false
          },
          {
            name: 'Tango',
            avatar: 'default.jpg',
            online: false
          },
          {
            name: 'Tango',
            avatar: 'default.jpg',
            online: false
          },
          {
            name: 'Tango',
            avatar: 'default.jpg',
            online: false
          },
          {
            name: 'Tango',
            avatar: 'default.jpg',
            online: false
          },
          {
            name: 'Tango',
            avatar: 'default.jpg',
            online: false
          }
        ]
      }
    }
  },
  methods: {
    avatarUrl: url => url || 'default.jpg'
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/valiable.scss";
@import "@/assets/styles/mixins.scss";
#contact__list__wrapper {
  box-sizing: border-box;
  height: 5.28rem;
  overflow-y: scroll;
  padding: .1rem;
  .initial__list {

    .first__word {
      font-size: .16rem;
      color: $deep_font_color;
      position: relative;

      // &::after {
      //   content: "";
      //   width: 90%;
      //   height: 0.01rem;
      //   transform: scaleY(.6);
      //   position: absolute;
      //   right: 0;
      //   bottom: 0;
      //   background-color: #ccc;
      // }
    }

    .contacts__list {
      display: flex;
      font-display: row;
      justify-content: flex-start;
      align-content: center;
      height: 0.46rem;
      position: relative;
      .avatar__box {
        position: relative;
        width: 0.6rem;
        height: 0.46rem;
        cursor: pointer;
        img {
          display: block;
          width: 0.32rem;
          height: 0.32rem;
          border-radius: .04rem;
          position: absolute;
          top: 50%;
          left: 0.2rem;
          transform: translateY(-50%);
        }
      }
      .contact__name {
        flex: 1;
        line-height: 0.46rem;
        height: 0.46rem;
        @include ellipse;
        cursor: pointer;
      }
      .status {
        width: 0.1rem;
        height: 0.1rem;
        border-radius: 50%;
        background-color: $offline__color;
        position: absolute;
        left: 0rem;
        top: 0.18rem;
      }
      .status.online__status {
        background-color: $online__color;
      }
    }
  }
}
</style>
