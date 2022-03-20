<template>
  <div id="modal">
    <div class="modal__mask"></div>
    <div class="modal__container" :class="getModalState.show ? 'animate__animated animate__zoomIn animate__faster' : ''">
      <div class="modal__container--title">
        <h3>{{getModalState.title}}</h3>
      </div>
      <div class="modal__container--content">
        <div class="cate__warn">
          <svg t="1641956339591" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4134" width=".28rem" height=".28rem"><path d="M599.04 640m-281.6 0a281.6 281.6 0 1 0 563.2 0 281.6 281.6 0 1 0-563.2 0Z" fill="#FED847" p-id="4135"></path><path d="M373.25824 572.416a82.432 82.432 0 0 1-82.71872-81.99168h41.35936a41.3696 41.3696 0 0 0 82.7392 0h41.35936a82.45248 82.45248 0 0 1-82.7392 81.99168z m124.08832 0a82.432 82.432 0 0 1-82.71872-81.99168h41.35936a41.3696 41.3696 0 0 0 82.71872 0h41.37984a82.45248 82.45248 0 0 1-82.7392 81.99168z m124.09856 0a82.45248 82.45248 0 0 1-82.7392-81.99168h41.37984a41.3696 41.3696 0 0 0 82.71872 0h41.35936a82.46272 82.46272 0 0 1-82.71872 81.99168z m-100.68992 276.62336L355.328 562.1248l35.91168-20.33664 165.44768 286.95552-35.93216 20.29568z m-46.81728 0l-35.90144-20.33664 165.44768-286.94528 35.90144 20.3264-165.44768 286.95552z m168.17152 133.30432H352.58368V879.89248h41.35936v61.4912h206.848v-61.4912h41.35936v102.49216l-0.04096-0.04096z m0-102.48192H352.58368V763.55584a101.7856 101.7856 0 0 0-48.128-84.45952 345.63072 345.63072 0 0 1-158.52544-300.7488c7.04512-194.06848 170.09664-345.68192 364.16512-338.6368 187.89376 6.83008 337.17248 160.24576 338.8416 348.2624a346.37824 346.37824 0 0 1-161.42336 292.864 99.4304 99.4304 0 0 0-45.39392 84.59264v114.46272l-0.01024-0.03072z m-248.1664-40.96h206.848v-73.44128a140.20608 140.20608 0 0 1 64.3584-119.06048 305.664 305.664 0 0 0 142.44864-258.42688c-1.7408-171.34592-142.05952-308.8384-313.40544-307.10784-165.59104 1.6896-300.68736 133.10976-306.90304 298.5984a305.03936 305.03936 0 0 0 139.90912 265.37984 142.57152 142.57152 0 0 1 66.78528 118.72256v75.33568h-0.04096zM518.03136 551.936H476.672V408.4736h41.35936V551.936zM290.53952 387.97312h-41.35936c-0.1536-127.98976 98.05824-234.61888 225.62816-244.96128l3.71712 40.83712c-106.30144 8.62208-188.12928 97.47456-187.98592 204.12416z" fill="" p-id="4136"></path></svg>
          <span>{{ getModalState.msg }}</span>
        </div>
      </div>
      <div class="modal__container--options"
        @click="handleClickOpt($event)"
      >
        <div class="opt__cancel"
          @mouseover="handleMouseOver($event)"
          @mouseleave="handleMouseLeave($event)"
        >cancel</div>
        <div class="opt__confirm"
          @mouseover="handleMouseOver($event)"
          @mouseleave="handleMouseLeave($event)"
        >confirm</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Modal',
  computed: {
    ...mapGetters(['getModalState'])
  },
  methods: {
    handleMouseOver (e) {
      const target = e.target
      target.className = 'hoverBg'
    },
    handleMouseLeave (e) {
      const target = e.target
      target.className = ''
    },
    handleClickOpt () {
      // const target = e.target
      this.$store.commit('hideModal')
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/valiable.scss";
#modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  vertical-align: middle;
  justify-content: center;
  border-radius: .12rem;
  box-shadow: .02rem .02rem .2rem $modal__border__color;
  .modal__mask {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    background-color: $modal__border__color;
    backdrop-filter: blur(.036rem);              // 磨砂玻璃效果，兼容性不好 特别是 安卓移动端
  }
  .modal__container {
    width: 4rem;
    height: 2.8rem;
    background-color: #fff;
    // border: .01rem solid $modal__border__color;
    border-radius: .1rem;
    filter: opacity(.9);
    box-shadow: 0 0 .2rem $modal__border__color;
    display: flex;
    flex-direction: column;

    &--title {
      border-top-left-radius: .1rem;
      border-top-right-radius: .1rem;
      height: .52rem;
      line-height: 0.52rem;
      background-color: $modal__title__color;
      padding: 0 0.2rem;
      h3 {
        font-size: 0.16rem;
        font-weight: 600;
        font-family: 'Comic Sans MS', PingFang SC;
        color: $nav_bg_color;
      }
    }
    &--content {
      padding: .12rem 0.2rem;
      flex: 1;
      font-size: 0.14rem;
      overflow-y: scroll;
      .cate__warn {
        height: 0.28rem;
        line-height: 0.28rem;
        position: relative;
        svg {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
        span {
          font-size: 0.16rem;
          line-height: 0.28rem;
          margin-left: .36rem;
        }
      }
    }
    &--options {
      text-align: center;
      height: 0.46rem;
      line-height: 0.46rem;
      display: flex;
      flex-direction: row;
      vertical-align: middle;
      align-items: center;
      border-top: .01rem solid $modal__title__color;
      font-family: 'Comic Sans MS', PingFang SC;
      font-weight: 500;
      cursor: pointer;
      color: $nav_bg_color;
      div {
        flex: 1;
        font-size: 0.16rem;
        &:first-child {
          border-bottom-left-radius: .1rem;
        }
        &:last-child {
          border-bottom-right-radius: .1rem;
        }
      }
      .hoverBg {
        background-color: $modal__title__color;
        color: $url_font_color;
      }
    }
  }
}
</style>
