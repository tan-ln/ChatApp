<template>
  <div id="bubble__wrapper" :class="num ? 'hasNum' : 'nan'">
    <span class="bubble__num" v-if="num">{{num}}</span>
  </div>
</template>

<script>
export default {
  name: 'Bubble',
  props: ['num']
}
</script>

<style lang="scss">
#bubble__wrapper {
  position: absolute;
  background-color: rgb(233, 60, 60);
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0rem 0rem .04rem rgb(233, 60, 60);
}
.hasNum {
  min-width: 0.12rem;
  height: 0.12rem;
  line-height: 0.12rem;
  color: aliceblue;
}
.nan {
  width: 0.08rem;
  height: 0.08rem;
}
.bubble__num {
  font-size: 0.12rem;
  display: inline-block;
  transform: scale(.7);
}
</style>
