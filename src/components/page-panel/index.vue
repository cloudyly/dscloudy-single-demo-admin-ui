<template>
  <div class="page">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'DscPagePanel'
}
</script>

<style scoped lang="scss">
  .page {
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
</style>
