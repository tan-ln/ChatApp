<template>
  <div class="group-members">
    <!-- mine -->
    <div class="mine">
      <img class="mine-img" :src="__self.avatar" :alt="__self.email">
      <p class="mine-info">mine</p>
      <p class="mine-name">{{ __self.username }}</p>
    </div>
    <!-- group members -->
    <div class="members-list-wrapper">
      <ul :class="['members-list', member6.length > 3 ? 'list-more' : 'list-less']">
        <li
          :class="[
            'member-item',
            member6.length > 2 ? '' : 'item-less',
            num > 7 ? 'show_num' : ''
          ]"
          v-for="(item, idx) in member6"
          :key="item.uid"
          :title="item.email"
          @click="() => handleClickMember(item)"
        >
          <img
            :src="item.avatar"
            :alt="item.email"
            :class="idx === member6.length - 1 ? 'last-img' : ''"
          />
        </li>
      </ul>
      <div class="members-more" title="show more members" v-if="num > 6">
        <span>共 {{ num }} 人 ></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupMembers',
  props: ['__self', 'member6', 'num'],
  methods: {
    handleClickMember (item) {
      if (!item.email) return
      this.$store.commit('contact/showIDCard', item)
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/valiable.scss";
@import "@/assets/styles/mixins.scss";
.group-members {
  width: 100%;
  padding: 0.2rem 0;
  border-bottom: .01rem solid $border_color;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  .mine {
    text-align: center;
    vertical-align: middle;
    width: .8rem;
    cursor: pointer;
    .mine-img {
      width: .64rem;
      height: .64rem;
      border: .01rem  solid #fff;
      border-radius: 50%;
      box-shadow: 0rem 0rem .08rem $shadow_middle_color;
    }
    .mine-info {
      font-size: .14rem;
      font-weight: 600;
      left: 0.2rem;
      line-height: 0.2rem;
      vertical-align: middle;
    }
    .mine-name {
      font-size: .12rem;
      color: $middle_font_color;
      @include ellipse;
    }
  }

  .members-list-wrapper {
    box-sizing: border-box;
    overflow: hidden;
    flex: 1;
    .members-list {
      width: 100%;
      height: 0.64rem;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .member-item {
        display: inline-block;
        border-radius: 50%;
        margin: 0 .04rem;
        width: .3rem;
        height: .3rem;
        cursor: pointer;
        position: relative;

        &.item-less {
          width: 0.5rem;
          height: 0.5rem;
        }

        img {
          width: 100%;
          height: 100%;
          border: .01rem  solid #fff;
          border-radius: 50%;
        }
        //  空 img
        img[src=""], img:not([src]) {
          opacity: 0;
        }
        img.last-img {
          border: none;
        }
      }

      &.list-more {
        justify-content: space-between;
        align-content: space-between;
      }
      &.list-less {
        align-content: center;
        justify-content: flex-start;
      }
    }

    .members-more {
      // width: 100%;
      // display: flex;
      // justify-content: space-around;
      // left: 0.2rem;
      transform: translateY(50%);
      text-align: center;
      cursor: pointer;
      i {
        font-size: 0.12rem;
        color: #333;
        background-color: transparent;
      }
    }
  }
}
</style>
