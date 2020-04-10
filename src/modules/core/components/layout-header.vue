<template>
  <div class="header">
    <div class="left">
      <div class="logo">
        <img src="../../../assets/img/logo.png">
      </div>
      <div class="title">
        <div class="zh">{{siteInfo.title}}</div>
        <div class="en">{{siteInfo.subtitle}}</div>
      </div>
    </div>
    <div class="center">
      &nbsp;
    </div>
    <div class="right">
      <el-button type="primary" icon="ds-user" circle class="btn-user"></el-button>
      <span class="username">用户名</span>
      <!--
      <el-button type="primary">财务部</el-button>
      -->
      <span class="divider">&nbsp;</span>
      <!--
      <span>当前：武当乡</span>
      -->
      <el-button type="primary" icon="ds-setting" class="settings"></el-button>
      <el-button type="primary"><i class="ds-exit" style="margin-right: 3px; vertical-align: middle"></i><span style="vertical-align: middle">退出</span></el-button>
    </div>
  </div>
</template>

<script>
import config from '@/config'
export default {
  name: 'layout-header',
  data () {
    return {
      siteInfo: config.info
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/config.scss";
  @import "~@/assets/scss/mixin.scss";
  .header {
    height: $topNavHeight;
    // line-height: $topNavHeight;
    background-color: $colorM2;
    box-sizing: border-box;
    padding: 0 20px;
    color: $color6;
    font-size: $fontG;
    @include flex();

    .left {
      display: flex;
      .logo {
        @include img(32px, 32px)
      }
      .title {
        margin-left: 12px;
        text-align:justify;

        div {
          text-align:justify;
          margin-bottom: -10px;

          &:after{
            content:"";
            display:inline-block;
            width:100%;
          }

          &.zh {
            font-size: $fontE;
          }
          &.en {
            font-size: $fontI;
            margin-top: -15px;
          }
        }
        /*vertical-align: middle;*/
      }
    }

    .center {
      flex: 1;
    }

    .right {
      .el-button--primary {
        color: $colorM3;
        background-color: $colorM2;
        border-color: $colorM4;
        vertical-align: middle;

        &:hover {
          background-color: $colorM4;
          color: $color6;
        }
      }
      .btn-user {
        // background-color: $colorM4;
        // color: $color6;
      }
      .username {
        margin: 0 12px;
        font-size: $fontF;
      }
      .divider {
        height: 26px;
        margin: 0 12px -10px 12px;
        width: 1px;
        border-right: 1px solid $colorM4;
        display: inline-block;
      }
      .settings {
        margin: 0 12px;
        padding: 7px;
      }
    }
  }
</style>
