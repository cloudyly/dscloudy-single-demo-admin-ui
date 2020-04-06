<template>
  <div class="title">{{ title }}</div>
</template>

<script>
export default {
  name: 'DscFormHeader',
  props: {
    title: {
      type: String,
      require: false,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/config.scss";
  .title {
    margin-top: 12px;
    padding: 10px 20px;
    font-size: $fontE;
    margin-bottom: 8px;
  }
</style>
