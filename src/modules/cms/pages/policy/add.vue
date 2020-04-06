<template>
  <dsc-page-panel :border="true">
    <dsc-form-header title="发布新内容"></dsc-form-header>

    <el-form ref="form" :model="form" class="common-form" label-width="80px" label-position="top">
      <div class="form-wrap">
        <el-row :gutter="10">
          <el-col :span="12">
            <!-- 文章标题 -->
            <el-form-item label="文章标题">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">

            <!-- 文章子栏目 -->
            <el-form-item label="文章子栏目">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="正文内容">
          <quill-editor class="editor" :options="editorOptions"></quill-editor>
          <div style="height: 48px">&nbsp;</div>
        </el-form-item>
      </div>

      <div class="form-footer">
        <el-button type="primary">立即发布</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="primary" plain>效果预览</el-button>

        <div class="right">
          <el-checkbox plain v-model="form.onlySave">仅保存至后台，暂不可见</el-checkbox>
        </div>
      </div>
    </el-form>
  </dsc-page-panel>
</template>

<script>
export default {
  name: 'PolicyAdd',
  data () {
    return {
      form: {
        onlySave: false
      },
      editorOptions: {
        placeholder: '请输入正文内容…'
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/config.scss";
  @import "~@/assets/scss/form.scss";
  .common-form {
    .form-footer {
      .right {
        top: 5px;
      }
    }
  }
</style>
