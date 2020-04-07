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
        <layout-tags class="layout-tags"></layout-tags>
        <div class="layout-main">
          <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cachedViews">
              <router-view :key="key" />
            </keep-alive>
          </transition>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import LayoutHeader from '@/modules/core/components/layout-header'
import scssConfig from '@/assets/scss/config.scss'
import LayoutSidebar from '@/modules/core/components/layout-sidebar'
import LayoutTags from '@/modules/core/components/layout-tags'

export default {
  name: 'layout',
  components: { LayoutTags, LayoutSidebar, LayoutHeader },
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
    },
    cachedViews () {
      console.log(this.$store.state.tagsView.cachedViews)
      return this.$store.state.tagsView.cachedViews
    },
    key () {
      return this.$route.path
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/config.scss";
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
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: row;

        .layout-tags {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
        }

        .layout-main {
          width: 100%;
          flex: 1;
          margin-top: 35px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
</style>
