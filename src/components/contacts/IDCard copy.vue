<template>
  <div id="ID__card">
    <div class="card__top__wrapper">
        <div class="left__content">
        <div class="left__content__title">
          <span>C酱</span>
          <i class="iconfont">&#xe61a;</i>
        </div>
        <p class="left__content__sign">希望你能一直拥有温柔感受风的软海的凉清澈的理想</p>
      </div>
      <div class="right__avatar">
        <img src="http://127.0.0.1:5000/images/avatar/c.jpg" alt="C酱">
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
        <span class="desc">213</span>
      </p>
      <p class="card__marks">
        <span class="title">备注</span>
        <span class="desc">点击添加备注</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IDCard'
}
</script>

<style lang="scss">
@import "@/assets/styles/valiable.scss";
@import "@/assets/styles/mixins.scss";
#ID__card {
  width: 4rem;
  height: 3rem;
  margin: 1.34rem auto;

  .card__top__wrapper {
    display: flex;
    flex-direction: row;
    height: 1rem;
    margin-bottom: .2rem;

    .left__content {
      flex: 1;
      &__title {
        font-size: 0.18rem;
        color: $heavy_font_color;
        max-width: 2.98rem;
        display: inline-block;
        @include ellipse__2;

        i.iconfont {
          width: 0.36rem;
          font-size: .12rem;
          text-align: center;
          color: rgb(255, 57, 116);
        }
      }
      &__sign {
        font-size: 0.12rem;
        letter-spacing: .016rem;
        color: $light_font_color;
        @include ellipse__2;
        margin-top: .05rem;
      }
    }
    .right__avatar {
      img {
        width: .66rem;
        height: .66rem;
        border-radius: .1rem;
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
}
</style>
