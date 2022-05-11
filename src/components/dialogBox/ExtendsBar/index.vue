<template>
  <div class="extends__wrapper" v-if="!showLoading">
    <div class="extends__wrapper--header">
      <img class="group-img" :src="target.gavatar || target.avatar" :alt="target.gname || target.email">
    </div>
    <div class="extends__wrapper--content">
      <!-- group members -->
      <h2 class="extends--title">Group Members</h2>
      <Group-members :__self="__self" :member6="member6.list" :num="member6.num" />

      <!-- group source files -->
      <h2 class="files--title">Source Files</h2>
      <ul class="group-source-files">
        <li class="file-item" v-for="item in getSourceFiles" :key="item">
          <div class="file-img" v-html="getExt(item)"></div>
          <div class="file-content">
            <h4 class="file-title">{{ item }}</h4>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import GroupMembers from './GroupMembers.vue'
import ext2Svg from '@/assets/images/svg'
export default {
  name: 'ExtendsBar',
  props: ['target', '__self', 'member6'],
  components: {
    'Group-members': GroupMembers
  },
  data () {
    return {
      showLoading: true,
      timer: null
    }
  },
  computed: {
    ...mapState({
      getExtendStatus: state => state.contact.showExtends,
      getSourceFiles: state => state.contact.sourceFiles
    })
  },
  methods: {
    getExt (name) {
      const ext = name.split('.').reverse()[0]
      return ext2Svg(ext.toLocaleLowerCase())
    }
  },
  beforeMount () {
    // get source files
    this.$store.dispatch('contact/reqSourceFiles', this.target.gname)
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
  width: 2.26rem;
  position: absolute;
  top: 0.36rem;
  right: -.16rem;
  bottom: .14rem;
  z-index: 0;
  transform: translateX(100%);
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
