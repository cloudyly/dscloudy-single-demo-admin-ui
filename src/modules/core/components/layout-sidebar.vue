<template>
  <div class="sidebar">
    <div class="global-nav">
      <i class="ds-shousuo-zhankai"></i>
      <span>全局导航</span>
    </div>
    <div class="divider"></div>

    <el-menu default-active="0" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      <el-menu-item index="0">
        <i class="el-icon-menu"></i>
        <span slot="title">工作台</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>补贴业务管理</span>
        </template>
      </el-submenu>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据分析服务</span>
        </template>
      </el-submenu>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>业务审核管理</span>
        </template>
      </el-submenu>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>通知公告发布</span>
        </template>
      </el-submenu>

      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>基础数据管理</span>
        </template>
      </el-submenu>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>业务流程配置</span>
        </template>
      </el-submenu>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>系统管理</span>
        </template>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'layout-sidebar'
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
