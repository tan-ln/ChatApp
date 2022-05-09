<template>
  <div class="group-members">
    <!-- mine -->
    <div class="mine">
      <img class="mine-img" :src="__self.avatar" :alt="__self.email">
      <p class="mine-info">mine</p>
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
        >
          <img
            :src="item.avatar"
            :alt="item.email"
            :class="idx === member6.length - 1 && num > 7 ? 'last-img' : 'clean-src'"
          />
        </li>
      </ul>
      <div class="members-more" title="show more members" v-if="member6.length > 6">
        <i class="iconfont">&#xe635;</i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupMembers',
  props: ['__self', 'member6', 'num']
}
</script>

<style lang="scss">
@import "@/assets/styles/valiable.scss";
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
      border-radius: 50%;
    }
    .mine-info {
      font-size: .14rem;
      font-weight: 600;
      left: 0.2rem;
      line-height: 0.2rem;
      vertical-align: middle;
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
      justify-content: flex-start;
      .member-item {
        display: inline-block;
        border-radius: 50%;
        margin-right: .11rem;
        width: .28rem;
        height: .28rem;
        cursor: pointer;
        position: relative;

        &.item-less {
          width: 0.5rem;
          height: 0.5rem;
        }

        img {
          width: 100%;
          height: 100%;
        }
        //  空 img
        img.clean-src[src=""], img.clean-src:not([src]) {
          opacity: 0;
        }
        .last-img {
          border-radius: 50%;
          background-color: rgb(0, 0, 0);
          opacity: .5;
        }
        &.show_num:last-child::after {
          content: "+10";
          height: 0.12rem;
          font-size: .12rem;
          position: absolute;
          top: 0.06rem;
          left: 50%;
          transform: translate(-50%);
          color: $border_color;
        }
      }

      &.list-more {
        align-content: space-between;
      }
      &.list-less {
        align-content: center;
      }
    }

    .members-more {
      width: 100%;
      margin-top: .1rem;
      display: flex;
      justify-content: space-around;
      left: 0.2rem;
      line-height: 0.2rem;
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
