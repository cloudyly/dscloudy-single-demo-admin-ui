<template>
  <div class="sidebar">
    <el-menu default-active="0" class="el-menu-vertical-demo" :collapse="menuCollapse"
             :class="{'menu-collapse': menuCollapse}">
      <div class="global-nav">
        <i class="ds-shousuo-zhankai" @click="toggleMenuCollapse"></i>
        <span>全局导航</span>
      </div>
      <div class="divider"></div>

      <layout-sidebar-item v-for="(item, index) in menuList" :key="index" :item="item"></layout-sidebar-item>
    </el-menu>
  </div>
</template>

<script>
import LayoutSidebarItem from '@/modules/core/components/layout-sidebar-item'

export default {
  name: 'layout-sidebar',
  components: { LayoutSidebarItem },
  data () {
    return {
    }
  },
  mounted () {
    console.log(this.menuList)
  },
  methods: {
    toggleMenuCollapse () {
      this.$store.commit('setMenuCollapse', !this.menuCollapse)
    }
  },
  computed: {
    menuCollapse () {
      return this.$store.state.ui.menu.collapse
    },
    menuList () {
      return this.$store.state.user.addRoutes
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/config.scss";

  .sidebar {
    background-color: $color5;
    height: 100%;
    width: 100%;
    box-shadow: inset -1px 0 0 0 $color7;

    .global-nav {
      height: 50px;
      line-height: 50px;

      i {
        color: $color4;
        font-size: $fontG;
        margin: 0 14px 0 20px;
        cursor: pointer;
      }

      span {
        color: $color3;
        font-size: $fontF;
      }
    }

    .divider {
      margin: 0 10px;
      height: 1px;
      border-bottom: 1px solid $color8;
    }

    .el-menu {
      background-color: transparent;
      border-right: none;

      .el-submenu__title,
      .el-menu-item {
        color: red !important;
      }
    }
  }
</style>
