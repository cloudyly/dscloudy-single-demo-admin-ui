<template>
  <div>
    <dsc-search-area :cfg="searchAreaCfg"></dsc-search-area>
  </div>
</template>

<script>
export default {
  name: 'demo-index',
  data () {
    return {
      searchAreaCfg: {
        itemList: [
          { type: 'text', model: 'title' }
        ]
      }
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
