<template>
  <el-row class="tool-bar" v-show="btnList.length > 0">
    <el-button v-for="(btn, index) in btnList" v-bind:key="index.toString()"
               :type="btn.type || 'primary'"
               size="mini"
               @click="btn.click"
    ><i v-if="btn.icon" :class="btn.icon"></i>{{btn.title}}
    </el-button>
  </el-row>
</template>

<script>
export default {
  name: 'DscToolBar',
  props: {
    cfg: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      btnList: []
    }
  },
  created () {
    this.calcBtnList()
  },
  methods: {
    calcBtnList () {
      if (this.cfg.needAcl === false) {
        this.btnList = this.cfg.btnList
      } else {
        const permissionBtnList = this.$router.currentRoute.meta.btnList
        permissionBtnList.forEach(btn => {
          const item = this.cfg.btnList.find(item => btn.code === item.code)
          if (item) {
            this.btnList.push({
              ...btn,
              click: item.click
            })
          }
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
