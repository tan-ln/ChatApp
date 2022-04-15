<template>
  <div id="contact__list__wrapper">
    <!-- 首字母 -->
    <div class="initial__list" v-for="(val, key) in contactsBook" :key="key">
      <p class="first__word">{{key}}</p>
      <!-- contacts entry -->
      <div
        class="contacts__list"
        :class="{ 'actived__content': item.name == '坏东C' }"
        v-for="(item, idx) in val"
        :key="idx + item.name"
      >
        <!-- <i class="status" :class="{ 'online__status' : item.online }" :title="item.online ? 'online' : 'offline'"></i> -->
        <div class="avatar__box">
          <img :src="item.avatar" :alt="item.name">
        </div>
        <p class="contact__name">{{item.name}}</p>
      </div>
    </div>
    <!-- 字母索引 -->
    <ul class="charList">
      <li v-for="(char, key) in getEn()" :key="key">
        <i class="char">{{char}}</i>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ContactList',
  computed: {
    ...mapGetters(['contactsBook'])
  },
  methods: {
    getEn () {
      const arr = []
      for (let i = 65; i < 91; i++) {
        arr.push(String.fromCharCode(i))
      }
      return arr
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/valiable.scss";
@import "@/assets/styles/mixins.scss";
#contact__list__wrapper {
  box-sizing: border-box;
  height: 5.18rem;
  overflow-y: scroll;
  // padding: 0 .12rem;
  .initial__list {
    .first__word {
      font-size: .13rem;
      color: $deep_font_color;
      position: relative;
      margin: 0 .12rem;
    }

    .contacts__list {
      display: flex;
      font-display: row;
      justify-content: flex-start;
      align-content: center;
      height: 0.46rem;
      padding: 0 .12rem;
      position: relative;
      .avatar__box {
        position: relative;
        width: 0.5rem;
        height: 0.46rem;
        cursor: pointer;
        img {
          display: block;
          width: 0.32rem;
          height: 0.32rem;
          border-radius: .04rem;
          position: absolute;
          top: 50%;
          left: .1rem;
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
      // 圆点 在线状态
      // .status {
      //   width: 0.1rem;
      //   height: 0.1rem;
      //   border-radius: 50%;
      //   background-color: $offline__color;
      //   position: absolute;
      //   left: 0rem;
      //   top: 0.18rem;
      // }
      // .status.online__status {
      //   background-color: $online__color;
      // }
    }
  }

  // 索引
  .charList {
    position: fixed;
    left: 3.1rem;
    bottom: 1rem;
    li {
      font-size: 0.1rem;
      width: 0.14rem;
      height: 0.14rem;
      text-align: center;
      i.char {
        font-family: Arial, Helvetica, sans-serif;
        display: block;
        transform: scale(.6);
      }
    }
  }
}
</style>
