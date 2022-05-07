<template>
  <div class="extends__wrapper" v-if="!showLoading">
    <div class="extends__wrapper--header">
      <img class="group-img" src="" alt="">
    </div>
    <div class="extends__wrapper--content">
      <h2 class="extends--title">Group Members</h2>
      <div class="group-members">
        <div class="mine">
          <img class="mine-img" src="" alt="">
          <p class="mine-info">mine</p>
        </div>
        <div class="members-list-wrapper">
          <ul class="members-list">
            <li class="member-item" v-for="item in 6" :key="item">
              <img src="" alt="">
            </li>
          </ul>
          <div class="members-more" title="show more members">
            <i class="iconfont">&#xe635;</i>
          </div>
        </div>
      </div>
      <h2 class="files--title">Source Files</h2>
      <ul class="group-source-files">
        <li class="file-item" v-for="item in 10" :key="item">
          <div class="file-img" v-html="getExt('母猪的产后护理.txt')"></div>
          <div class="file-content">
            <h4 class="file-title">母猪的产后护理.txt</h4>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ext2Svg from '../../assets/images/svg'
export default {
  name: 'ExtendsBar',
  data () {
    return {
      showLoading: true,
      timer: null
    }
  },
  computed: {
    ...mapGetters(['getExtendStatus'])
  },
  methods: {
    getExt (name) {
      const ext = name.split('.').reverse()[0]
      return ext2Svg(ext.toLocaleLowerCase())
    }
  },
  mounted () {
    setTimeout(() => {
      this.showLoading = false
    }, 200)
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/valiable.scss";
@import "@/assets/styles/mixins.scss";
.extends__wrapper{
  box-sizing: border-box;
  width: 2.28rem;
  // height: 6.52rem;
  // height: 5.86rem;
  position: absolute;
  top: 0.36rem;
  right: .16rem;
  bottom: .14rem;
  z-index: 0;
  &--header {
    text-align: center;
    .group-img {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background-color: rgb(56, 165, 92);
      border-radius: 50%;
    }
  }
  &--content {
    margin-top: -.2rem;
    border-radius: .2rem;
    height: calc(100% - .36rem);
    background-color: $bg_color;
    padding: .3rem 0.12rem 0;
    display: flex;
    flex-direction: column;
    .extends--title {
      text-align: center;
      font-weight: bold;
      font-size: .14rem;
      margin: .03rem 0;
    }
    .group-members {
      width: 100%;
      padding: 0.2rem 0;
      border-bottom: .01rem solid $border_color;
      display: flex;
      flex-direction: row;
      .mine {
        text-align: center;
        vertical-align: middle;
        padding-left: .1rem;
        cursor: pointer;
        .mine-img {
          display: block;
          width: .64rem;
          height: .64rem;
          border-radius: 50%;
          background-color: rgb(212, 142, 62);
        }
        .mine-info {
          margin-top: .1rem;
          font-size: .14rem;
          font-weight: 600;
          left: 0.2rem;
          line-height: 0.2rem;
          vertical-align: middle;
        }
      }
      .members-list-wrapper {
        width: calc(100% - .64rem);
        .members-list {
          height: 0.64rem;
          .member-item {
            float: left;
            width: 0.28rem;
            height: 0.28rem;
            border-radius: 20%;
            background-color: rgb(101, 248, 82);
            margin-left: .11rem;
            margin-bottom: 0.08rem;
            cursor: pointer;
          }
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
    .files--title {
      text-align: left;
      font-size: .12rem;
      margin: 0.1rem 0;
      color: #333;
    }
    .group-source-files {
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      .file-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-bottom: .14rem;
        cursor: pointer;
        .file-img {
          width: 0.4rem;
          height: 0.4rem;
          border-radius: .12rem;
          margin-right: .1rem;
          .icon {
            width: .4rem;
            height: .4rem;
            vertical-align: -0.15em;
            fill: currentColor;
            overflow: hidden;
          }
        }
        .file-content {
          flex: 1;
          @include ellipse;
          .file-title {
            font-size: 0.12rem;
            font-weight: 600;
            color: #333;
          }
          .file-time {
            color: #333;
          }
        }
      }
    }
  }
}
</style>
