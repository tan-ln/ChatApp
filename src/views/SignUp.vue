<template>
  <div id="signup__page">
    <div id="signup__wrapper">
      input
    </div>
    <div class="display">
      display
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUp'
}
</script>

<style lang="scss">
#signup__page {
  display: flex;
  flex-direction: row;
  #signup__wrapper {
    width: 5rem;
    height: 6.8rem;
    background-color: rgb(218, 218, 218);
  }
  .display {
    width: 5rem;
    height: 6.8rem;
    background-color: rgb(185, 77, 77);
  }
}
</style>
