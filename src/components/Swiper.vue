<template>
  <div id="swiper__container">
    <div class="swiper__list">
      <div class="swiper__list__item">
        <img :src="require('../assets/images/swiper/' + dataList[curIndex])" />
      </div>
    </div>
    <!-- 翻页按钮 -->
    <div class="swiper__flips" v-if="dataList.length > 0">
      <i v-for="(item, index) in dataList" :key="index" @click="gotoPage(index)" :class="{ 'current' : curIndex == index }" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Swiper',
  data () {
    return {
      dataList: [
        '01.jpg',
        '02.jpg',
        '03.jpg',
        '04.jpg',
        '05.jpg'
      ],
      curIndex: 0,
      timer: null
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      this.gotoPage(this.nextIndex)
    }, 3000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    gotoPage (index) {
      this.curIndex = index
    }
  },
  computed: {
    // 上一页
    prevIndex () {
      if (this.curIndex === 0) {
        return this.dataList.length - 1
      } else {
        return this.curIndex - 1
      }
    },
    // 下一页
    nextIndex () {
      if (this.curIndex === this.dataList.length - 1) {
        return 0
      } else {
        return this.curIndex + 1
      }
    }
  }
}
</script>

<style lang="scss">
#swiper__container {
  width: 6rem;
  height: 6.8rem;
  position: relative;
  .swiper__list {
    img {
      width: 6rem;
      height: 6.8rem;
      display: block;
      background-size: cover;
      object-fit: cover;
    }
  }
  .swiper__flips {
    position: absolute;
    width: 6rem;
    right: 0;
    bottom: 20%;
    text-align: center;
    i {
      display: inline-block;
      width: .06rem;
      height: .06rem;
      background-color: rgb(104, 104, 104);
      border-radius: 50%;
      margin: 0 .1rem;
      cursor: pointer;
    }
    i.current {
      background-color: #ff6700;
    }
  }
}
</style>
