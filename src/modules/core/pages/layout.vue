<template>
  <el-container class="layout">
    <el-header :height="headerHeight">
      <layout-header></layout-header>
    </el-header>

    <el-container class="layout-content">
      <el-aside :width="menuCollapse ? leftWidthMin: leftWidthMax" class="sidebar">
        <layout-sidebar></layout-sidebar>
      </el-aside>
      <el-main>
<!--        <demo-page></demo-page>-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import LayoutHeader from '@/modules/core/components/layout-header'
import scssConfig from '@/assets/scss/config.scss'
import LayoutSidebar from '@/modules/core/components/layout-sidebar'

export default {
  name: 'layout',
  components: { LayoutSidebar, LayoutHeader },
  data () {
    return {
      headerHeight: scssConfig.topNavHeight,
      leftWidthMax: scssConfig.leftWidthMax,
      leftWidthMin: scssConfig.leftWidthMin
    }
  },
  computed: {
    menuCollapse () {
      console.log('onchange: ' + this.$store.state.ui.menu.collapse)
      return this.$store.state.ui.menu.collapse
    }
  }
}
</script>

<style scoped lang="scss">
  .layout {
    height: 100%;

    .el-header {
      margin: 0;
      padding: 0;
      background-color: transparent;
    }

    .layout-content {
      height: 100%;
      overflow-y: hidden;

      .el-aside {
      }

      .el-main {
        padding: 0;
        overflow-y: auto;
      }
    }
  }
</style>
