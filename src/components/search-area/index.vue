<template>
  <div class="search-area" shadow="never" v-show="itemList && itemList.length > 0">
    <el-form ref="form" size="mini" :model="form" v-bind:label-width="labelWidth" :label-position="labelTextAlign" @submit.native.prevent>
      <div class="search-form">
        <el-row v-for="(rowArray, rowIndex) in newItemList" v-bind:key="rowIndex" :gutter="20">
          <el-col v-for="(item, colIndex) in rowArray" v-bind:key="colIndex"
                  justify="end"
                  :span="((rowIndex === newItemList.length - 1) && (colIndex === rowArray.length - 1)) ? lastSpanNum : spanNum">

            <!-- 普通的文本输入框 -->
            <el-form-item v-if="item && item.type && (item.type === 'text')" :label="item.label">
              <el-input v-model="form[item.model]" @keyup.enter.native="onSearchClick" :placeholder="getPlaceholder(item)"></el-input>
            </el-form-item>

            <!-- 下拉选 -->
            <el-form-item v-else-if="item && item.type && (item.type === 'select')" :label="item.label">
              <el-select v-model="form[item.model]" :placeholder="item.label" :clearable="true" :disabled="item.readonly">
                <el-option v-for="option in item.options" :label="option.label" :value="option.value" v-bind:key="option.value"></el-option>
              </el-select>
            </el-form-item>

            <!-- 带按钮的输入框 -->
            <el-form-item v-else-if="item && item.type && (item.type === 'textsearch')" :label="item.label">
              <el-input v-model="form[item.model]">
                <el-button slot="append" icon="el-icon-search" @click="item.onBtnClick"></el-button>
              </el-input>
            </el-form-item>

            <!-- 日期选择 -->
            <el-form-item v-else-if="item && item.type && (item.type === 'date')" :label="item.label">
              <el-date-picker type="date" :placeholder="item.label" v-model="form[item.model]" style="width: 100%;"></el-date-picker>
            </el-form-item>

            <!-- 日期区间 -->
            <el-form-item v-else-if="item && item.type && (item.type === 'daterange')" :label="item.label">
              <el-col :span="12" class="no-padding">
                <el-tooltip v-if="form[item.modelStart]" :content="form[item.modelStart]" placement="bottom" effect="light">
                  <el-date-picker type="date" placeholder="开始日期" v-model="form[item.modelStart]" style="width: 98%;" class="range-date" :clearable="false"
                                  :value-format="item.valueFormat || 'yyyy-MM-dd 00:00:00'"></el-date-picker>
                </el-tooltip>
                <el-date-picker v-else type="date" placeholder="开始日期" v-model="form[item.modelStart]" style="width: 98%;" class="range-date" :clearable="false"
                                :value-format="item.valueFormat || 'yyyy-MM-dd 00:00:00'"></el-date-picker>
              </el-col>
              <el-col :span="12" class="no-padding">
                <el-tooltip v-if="form[item.modelEnd]" :content="form[item.modelEnd]" placement="bottom" effect="light">
                  <el-date-picker type="date" placeholder="结束日期" v-model="form[item.modelEnd]" style="width: 100%;" class="range-date" :clearable="false"
                                  :value-format="item.valueFormat || 'yyyy-MM-dd 23:59:59'"></el-date-picker>
                </el-tooltip>
                <el-date-picker v-else type="date" placeholder="结束日期" v-model="form[item.modelEnd]" style="width: 100%;" class="range-date" :clearable="false"
                                :value-format="item.valueFormat || 'yyyy-MM-dd 23:59:59'"></el-date-picker>
              </el-col>
            </el-form-item>
            <!-- 日期时间区间 -->
            <el-form-item v-else-if="item && item.type && (item.type === 'datetimerange')" :label="item.label">
              <el-col :span="12" class="no-padding">
                <el-tooltip v-if="form[item.modelStart]" :content="form[item.modelStart]" placement="bottom" effect="light">
                  <el-date-picker type="datetime" placeholder="开始日期" v-model="form[item.modelStart]" style="width: 98%;" class="range-date" :clearable="false"
                                  :value-format="item.valueFormat || 'yyyy-MM-dd 00:00:00'"></el-date-picker>
                </el-tooltip>
                <el-date-picker v-else type="datetime" placeholder="开始日期" v-model="form[item.modelStart]" style="width: 98%;" class="range-date" :clearable="false"
                                :value-format="item.valueFormat || 'yyyy-MM-dd 00:00:00'"></el-date-picker>
              </el-col>
              <!--<el-col class="line" :span="2" style="text-align: center">-</el-col>-->
              <el-col :span="12" class="no-padding">
                <el-tooltip v-if="form[item.modelEnd]" :content="form[item.modelEnd]" placement="bottom" effect="light">
                  <el-date-picker type="datetime" placeholder="结束日期" v-model="form[item.modelEnd]" style="width: 100%;" class="range-date" :clearable="false"
                                  :value-format="item.valueFormat || 'yyyy-MM-dd 23:59:59'"></el-date-picker>
                </el-tooltip>
                <el-date-picker v-else type="datetime" placeholder="结束日期" v-model="form[item.modelEnd]" style="width: 100%;" class="range-date" :clearable="false"
                                :value-format="item.valueFormat || 'yyyy-MM-dd 23:59:59'"></el-date-picker>
              </el-col>
            </el-form-item>
            <!-- 时间区间 -->
            <el-form-item v-else-if="item && item.type && (item.type === 'timerange')" :label="item.label">
              <el-col :span="12" class="no-padding">
                <el-tooltip v-if="form[item.modelStart]" :content="form[item.modelStart]" placement="bottom" effect="light">
                  <el-time-select placeholder="起始时间" v-model="form[item.modelStart]" class="range-date" :picker-options="{ start: '00:00', step: '00:01', end: '23:59' }" style="width: 98%;"
                                  :clearable="false">
                  </el-time-select>
                </el-tooltip>
                <el-time-select v-else placeholder="起始时间" v-model="form[item.modelStart]" class="range-date" :picker-options="{ start: '00:00', step: '00:01', end: '23:59' }" style="width: 98%;"
                                :clearable="false">
                </el-time-select>
              </el-col>
              <el-col :span="12" class="no-padding">
                <el-tooltip v-if="form[item.modelStart]" :content="form[item.modelStart]" placement="bottom" effect="light">
                  <el-time-select placeholder="结束时间" v-model="form[item.modelEnd]" class="range-date" :picker-options="{ start: '00:00', step: '00:01', end: '23:59' }" style="width: 98%;"
                                  :clearable="false">
                  </el-time-select>
                </el-tooltip>
                <el-time-select v-else placeholder="结束时间" v-model="form[item.modelEnd]" class="range-date" :picker-options="{ start: '00:00', step: '00:01', end: '23:59' }" style="width: 98%;"
                                :clearable="false">
                </el-time-select>
              </el-col>
            </el-form-item>

            <!-- 文本区间 -->
            <el-form-item v-else-if="item && item.type && (item.type === 'textrange')" :label="item.label">
              <el-col :span="11" class="no-padding">
                <el-input v-model="form[item.modelStart]" @keyup.enter.native="onSearchClick"></el-input>
              </el-col>
              <el-col class="line" :span="2" style="text-align: center">-</el-col>
              <el-col :span="11" class="no-padding">
                <el-input v-model="form[item.modelEnd]" @keyup.enter.native="onSearchClick"></el-input>
              </el-col>
            </el-form-item>

            <!-- 选择品牌 -->
            <el-form-item v-else-if="item && item.type && (item.type === 'bu')" :label="item.label">
              <el-select v-model="form[item.model]" :placeholder="item.label" style="width: 100%" @change="onBuChange">
                <el-option v-for="option in brandList" :label="option.orgName" :value="option.orgCode" v-bind:key="option.orgCode"></el-option>
              </el-select>
            </el-form-item>

            <!-- 占位 -->
            <div v-else-if="item && item.type && (item.type === 'blank')" style="flex: 1">
              &nbsp;&nbsp;
            </div>

            <!-- 搜索按钮 -->
            <div v-else-if="item && item.type && (item.type === 'optbutton')" align="right" class="opt-btn-wrap" :class="(remainNum === 0) ? 'opt-btn-line' : ''">
              <el-button type="primary" size="mini" @click="onSearchClick">
                <i class="ds-Search"></i>立即搜索
              </el-button>
              <el-button type="primary" plain size="mini" @click="reset(cfg.defaultModel)">
                <i class="ds-zhongzhi"></i>重置条件
              </el-button>
            </div>
            <!-- -->
            <span v-else>&nbsp;</span>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'DscSearchArea',
  props: {
    cfg: {
      type: Object,
      require: true,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      form: {},
      cols: 4,
      itemList: [],
      labelWidth: '105px',
      labelTextAlign: 'top',
      newItemList: null,
      spanNum: 6,
      lastSpanNum: 6,
      remainNum: 0
    }
  },
  created () {
    this.itemList = (this.cfg && this.cfg.itemList) ? this.cfg.itemList : []
    this.labelWidth = (this.cfg && this.cfg.labelWidth) ? this.cfg.labelWidth : '105px'
    this.cols = (this.cfg && this.cfg.cols) ? this.cfg.cols : 4
    this.labelTextAlign = (this.cfg && this.cfg.labelTextAlign) ? this.cfg.labelTextAlign : 'top'

    this.spanNum = Number.parseInt((24 / this.cols) + '')
    this.initNewItemList()
  },
  mounted () {
    this.reset()
  },
  methods: {
    initNewItemList () {
      if (!this.itemList || this.itemList.length <= 0) {
        return
      }
      // 计算总共有多少行
      let totalRows = Number.parseInt(((this.itemList.length + 1) / this.cols).toString())
      this.remainNum = (this.itemList.length + 1) % this.cols
      if (this.remainNum > 0) {
        totalRows += 1

        // for (let i = 0; i < remainNumber; i++) {
        //   this.itemList.push({ type: 'blank' })
        // }
      }
      this.lastSpanNum = this.spanNum * (this.cols - this.remainNum + 1)
      console.log('remainNumber: ' + this.remainNum + ', this.lastSpanNum: ' + this.lastSpanNum)
      this.newItemList = new Array(totalRows)

      // 初始化 newItemList 为一个二维数组
      for (let i = 0; i < totalRows; i++) {
        this.newItemList[i] = new Array(this.cols)
      }

      // 将 itemList 数据填充到二维数组 newItemList 中
      for (let i = 0; i < this.itemList.length; i++) {
        const row = Number.parseInt(i / this.cols)
        const cols = i % this.cols
        this.newItemList[row][cols] = this.itemList[i]
      }

      // 最后将按钮放入二维数组 newItemList 中
      this.newItemList[totalRows - 1][this.cols - 1] = {
        type: 'optbutton'
      }
    },
    onSearchClick () {
      const formModel = this.getFormModel()
      this.cfg.onSearchClick(formModel)
    },
    reset () {
      if (this.cfg.defaultModel) {
        this.form = Object.assign({}, this.cfg.defaultModel)
      } else {
        this.form = {}
      }
      this.$emit('resetAllSearchForm')
    },
    setFormModel (formModel) {
      this.form = { ...formModel }
    },
    getFormModel () {
      for (const key in this.form) {
        if (typeof this.form[key] === 'string') {
          this.form[key] = this.form[key].trim()
        }
      }
      return { ...this.form }
    },
    getPlaceholder (item) {
      return (item.placeholder ? item.placeholder : item.label) || ''
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/config.scss";
  @import "~@/assets/scss/mixin.scss";

  .search-area {
    @include container();
    padding: 10px 20px;

    .el-row {
      margin-bottom: 8px;
    }

    .el-form-item {
      margin-bottom: 0;
    }

    .el-select {
      width: 100%;
    }

    ::v-deep .el-form--label-top .el-form-item__label {
      color: $color2;
      padding: 0;
    }

    .opt-btn-wrap {

      .el-button {
        font-size: 14px;
        font-weight: normal;

        i {
          font-size: 14px;
          margin-right: 3px;
        }
      }
    }

    .opt-btn-line {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
</style>
