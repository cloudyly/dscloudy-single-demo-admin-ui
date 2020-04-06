<template>
  <div class="page" :class="border ? 'border' : ''">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'DscPagePanel',
  props: {
    border: {
      type: Boolean,
      require: false,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/mixin.scss";
  .page {
    padding: 18px;
    /*width: 100%;*/
    box-sizing: border-box;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .border {
    @include container();
    margin: 18px !important;
    overflow-y: auto;
    padding: 0;
    flex: 1;
  }
</style>
