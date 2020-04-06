<template>
  <el-dialog title="提示" :visible.sync="dialogVisible" width="300px" class="dialog-container">
    <slot name="header" slot="title"></slot>
    <slot name="content"></slot>
    <div slot="footer" class="footer">
      <el-button type="primary" @click="onBtnConfirmClick">确 定</el-button>
      <el-button type="primary" plain @click="onBtnCancelClick">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import BaseDialog from '@/base/views/base-dialog'
export default {
  name: 'DscDialog',
  extends: BaseDialog
}
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/dialog.scss";
</style>
