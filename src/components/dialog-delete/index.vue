<template>
  <el-dialog title="提示" :visible.sync="dialogVisible" width="300px" class="dialog-container dialog-delete">
    <div slot="title" class="header">
      <i class="el-icon-delete"></i>
      删除
    </div>
    <div class="content">
      否确认删除此内容？
    </div>
    <div slot="footer" class="footer">
      <el-button type="primary" @click="onBtnConfirmClick">确 定</el-button>
      <el-button type="primary" plain @click="onBtnCancelClick">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import BaseDialog from '@/base/views/base-dialog'
export default {
  name: 'DscDialogDelete',
  extends: BaseDialog
}
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/dialog.scss";
  @import "~@/assets/scss/config.scss";

  .dialog-delete {
    .header {
      i {
        color: $colorM1;
      }
    }

    .content {
      text-align: center;
      font-size: $fontE;
      color: $color1;
    }
  }
</style>
