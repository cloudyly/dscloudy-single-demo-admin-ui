<template>
  <div class="data-list">
    <div class="header" v-if="cfg.title || (cfg.toolbar && cfg.toolbar.btnList)">
      <div class="title">{{cfg.title}}</div>
      <div class="opt-btn-group">
        <dsc-tool-bar :cfg="cfg.toolbar"></dsc-tool-bar>
      </div>
    </div>

    <div class="data-list-wrap">
      <el-table class="table" :data="dataList" header-cell-class-name="table-header" cell-class-name="table-cell" height="100%"
                :default-sort = "{prop: 'date', order: 'descending'}" stripe align="center" @selection-change="handleSelectionChange">
        <!-- 每一行第一列复选框 -->
        <el-table-column v-if="cfg.selection" type="selection" :key="'cb'" width="50" align="center" fixed="left"></el-table-column>

        <el-table-column v-if="cfg.showIndex" label="No" width="50" align="center">
          <template slot-scope="scope"><span>{{scope.$index + 1}} </span></template>
        </el-table-column>
        <el-table-column v-if="cfg.radio" label="No" width="50" align="center">
          <template slot-scope="scope">
            <el-radio v-model="radioM" :label="scope.$index + 1" @change="getRadioData(scope.$index)"><span style="display: none">{{scope.$index + 1}} </span></el-radio>
          </template>
        </el-table-column>

        <template v-for="(column, index) in cfg.itemList">
          <!-- 操作按钮列 -->
          <el-table-column v-if="column.btnList && !column.hidden"
                           :fixed="column.fixed || false"
                           :key="index" :prop="column.prop" v-show="column.isShow" :label="column.label" :align="column.align || 'center'" :min-width="column.width">
            <template slot-scope="scope">
              <span style="display: none">{{ rowBtnList = calcRowBtnList(scope.row) }}</span>
              <div v-if="rowBtnList.length < 3">
                <el-button v-for="(btn, i) in rowBtnList" :key="i" size="small" type="text" class="data-list-btn" @click="btn.func(scope.row)">
                  <i v-if="btn.icon" :class="btn.icon"></i>{{btn.label}}</el-button>
              </div>
              <div v-else style="text-align: center">
                <el-button size="small" type="text" @click="rowBtnList[0].func(scope.row)" class="data-list-btn">
                  <i v-if="rowBtnList[0].icon" :class="rowBtnList[0].icon"></i>{{rowBtnList[0].label}}
                </el-button>
                <el-dropdown size="mini" trigger="click">
                  <el-button type="text" style="text-align: center; font-size: 12px; margin: 3px 10px;">更多 <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i></el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(btn, i) in rowBtnList.slice(1)" :key="i">
                      <template>
                        <el-button style="text-align: center; width: 100%" size="small" type="text" class="data-list-btn" @click="btn.func(scope.row)">
                          <i v-if="btn.icon" :class="btn.icon"></i>{{btn.label}}</el-button>
                      </template>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </template>
          </el-table-column>

          <!-- 格式化数据的列 -->
          <el-table-column v-else-if="column.formatter"
                           :key="index" :prop="column.prop" :label="column.label" :align="column.align || 'center'" :min-width="column.width" :sortable="column.hasSort"
                           :formatter="column.formatter"></el-table-column>

          <!-- 枚举值 -->
          <el-table-column v-else-if="column.map && !column.hidden"
                           :key="index" :prop="column.prop" :label="column.label" :align="column.align || 'center'" :min-width="column.width">
            <template slot-scope="scope">
            <span v-for="(mapKey, mapValue) in column.map" :key="mapValue" size="small" type="danger">
              <div v-if="mapValue == scope.row[column.prop]" v-html="mapKey"></div>
            </span>
            </template>
          </el-table-column>

          <!-- 输入框 -->
          <el-table-column v-else-if="column.input && !column.hidden"
                           :key="index" :prop="column.prop" :label="column.label" :align="column.align || 'center'" :min-width="column.width">
            <template slot-scope="scope">
              <el-input @input="onInput" v-model="scope.row[column.prop]" :type="column.inputType || 'text'" size="mini" :disabled="column.readonly || false" :maxlength="column.inputMax || 10">
                <template slot="suffix">{{column.suffix}}</template>
              </el-input>
            </template>
          </el-table-column>

          <!-- 条件显示为按钮 -->
          <el-table-column v-else-if="column.clickable && !column.hidden"
                           :key="index" :prop="column.prop" :label="column.label" :align="column.align || 'center'" :min-width="column.width">
            <template slot-scope="scope">
              <div class="div-btn" v-if="calcBtnShow(column.showClick, scope.row)" @click="column.func(scope.row)">{{scope.row[column.prop]}}</div>
              <!--            <el-button v-if="calcBtnShow(column.showClick, scope.row)" type="text" size="mini" @click="column.func(scope.row)">{{scope.row[column.prop]}}</el-button>-->
              <span v-else>{{scope.row[column.prop]}}</span>
            </template>
          </el-table-column>

          <!-- 条件显示为按钮 with map -->
          <el-table-column v-else-if="column.clickablemap && !column.hidden"
                           :key="index" :prop="column.prop" :label="column.label" :align="column.align || 'center'" :min-width="column.width">
            <template slot-scope="scope">
              <el-button v-if="calcBtnShow(column.showClick, scope.row)" type="text" size="mini" @click="column.func(scope.row)">
               <span v-for="(mapKey, mapValue) in column.textMap" :key="mapKey" size="small" type="danger">
                  <div v-if="mapValue == scope.row[column.prop]" v-html="mapKey"></div>
                </span>
              </el-button>
              <span v-else>
              <span v-for="(mapKey, mapValue) in column.textMap" :key="mapKey" size="small" type="danger">
                <div v-if="mapValue == scope.row[column.prop]" v-html="mapKey"></div>
              </span>
            </span>
            </template>
          </el-table-column>

          <!-- 条件显示为按钮 with formatter -->
          <el-table-column v-else-if="column.clickableFormatter && !column.hidden"
                           :key="index" :prop="column.prop" :label="column.label" :align="column.align || 'center'" :min-width="column.width">
            <template slot-scope="scope">
              <el-button v-if="calcBtnShow(column.showClick, scope.row)" type="text" size="mini" @click="column.func(scope.row)">
                <span>{{ column.formatterFn(scope.row) }}</span>
              </el-button>
              <span v-else>
              <span>{{ column.formatterFn(scope.row) }}</span>
            </span>
            </template>
          </el-table-column>

          <!-- popover -->
          <el-table-column v-else-if="column.tip && !column.hidden"
                           :key="index" :prop="column.prop" :label="column.label" :align="column.align || 'center'" :min-width="column.width">
            <template slot-scope="scope">
              <el-tooltip v-if="calcBtnShow(column.showTip, scope.row)" :content="column.func(scope.row)">
                <el-button type="text" size="mini">{{scope.row[column.prop]}}</el-button>
              </el-tooltip>
              <span v-else>{{scope.row[column.prop]}}</span>
            </template>
          </el-table-column>

          <!-- popover with map  -->
          <el-table-column v-else-if="column.tipmap && !column.hidden"
                           :key="index" :prop="column.prop" :label="column.label" :align="column.align || 'center'" :min-width="column.width">
            <template slot-scope="scope">
              <el-tooltip v-if="calcBtnShow(column.showTip, scope.row)" :content="column.func(scope.row)">
                <el-button type="text" size="mini">
                <span v-for="(mapKey, mapValue) in column.textMap" :key="mapKey" size="small" type="danger">
                  <div v-if="mapValue == scope.row[column.prop]" v-html="mapKey"></div>
                </span>
                </el-button>
              </el-tooltip>
              <span v-else>
              <span v-for="(mapKey, mapValue) in column.textMap" :key="mapKey" size="small" type="danger">
                <div v-if="mapValue == scope.row[column.prop]" v-html="mapKey"></div>
              </span>
            </span>
            </template>
          </el-table-column>

          <!-- 其他 -->
          <el-table-column v-else-if="column.prop"
                           :key="index" :prop="column.prop" :show-overflow-tooltip="column.overflow" :label="column.label"
                           :align="column.align || 'center'" :min-width="column.width" :sortable="column.hasSort"></el-table-column>
        </template>
      </el-table>
    </div>

    <!-- v-show="(needPage !== false) && (totalRecords > pageSize)"
    v-show="(!autoPage && (needPage !== false)) || (autoPage && (needPage !== false) && (totalRecords > pageSize)) || true"
    -->
    <div class="footer">
      <div class="footer-btns" v-show="multipleSelection && multipleSelection.length > 0 && footerBtnList.length > 0">
        <el-button type="primary" plain v-for="(btn, index) in footerBtnList" :key="index" @click="btn.func">{{btn.label}}</el-button>
      </div>
      <div class="footer-page">
        <el-pagination align="right"
                       :background="true"
                       layout="prev, pager, next, sizes, total"
                       :page-sizes="pageSizeArray"
                       :page-size="pageSize"
                       @size-change="onSizeChange"
                       @current-change="onPageChange"
                       :current-page="pageNum"
                       :total="totalRecords">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
import { post } from '@/base/axios'

export default {
  name: 'DscDataList',
  props: {
    cfg: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      dataList: [], // 数据列表
      totalRecords: 0, // 总记录数
      needPage: this.cfg.needPage,
      autoPage: this.cfg.autoPage || false,
      searchEntity: this.cfg.searchEntity ? this.cfg.searchEntity : {}, // 查询条件实体
      pageSize: this.cfg.pageSize ? this.cfg.pageSize : 20,
      pageSizeArray: this.cfg.pageSizeArray ? this.cfg.pageSizeArray : [10, 20, 50],
      pageNum: this.cfg.pageNum ? this.cfg.pageNum : 1,
      deletePopVisibleList: [],
      multipleSelection: [],
      radioM: '',
      btnList: [],
      rowBtnFunc: null,
      needAcl: false,
      cfgChange: true,
      footerBtnList: []
    }
  },
  created () {
    if (this.cfg.dataList) {
      this.dataList = this.cfg.dataList
      this.needPage = false
    } else if (this.cfg.lazyLoad !== true) {
      this.getDataList(this.searchEntity, 1, 10)
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      if (this.cfg.itemList && this.cfg.itemList.length > 0) {
        for (let i = 0; i < this.cfg.itemList.length; i++) {
          if (this.cfg.itemList[i].btnList) {
            this.calcBtnList(this.cfg.itemList[i])
            break
          }
        }
      }
      this.calcFooterBtnList(this.cfg.selectedBtnList)
      console.log(this.footerBtnList)
    },
    calcBtnList (col) {
      this.btnList = []
      if (col.needAcl) {
        this.needAcl = true
        const permissionBtnList = this.$router.currentRoute.meta.btnList
        permissionBtnList.forEach(btn => {
          const item = col.btnList.find(item => btn.code === item.code)
          if (item) {
            this.btnList.push({
              ...btn,
              label: btn.title,
              func: item.func
            })
          }
        })
      } else {
        this.btnList = col.btns
      }
      this.rowBtnFunc = col.func
    },
    calcFooterBtnList (footerBtnList) {
      if (!footerBtnList || footerBtnList.length <= 0) {
        this.footerBtnList = []
        return
      }
      const permissionBtnList = this.$router.currentRoute.meta.btnList
      footerBtnList.forEach(btn => {
        const item = permissionBtnList.find(pBtn => btn.code === pBtn.code)
        if (item) {
          this.footerBtnList.push({
            ...item,
            label: item.title,
            func: btn.func
          })
        }
      })
    },
    calcRowBtnList (data) {
      if (this.rowBtnFunc) {
        const rowBtnList = []
        const result = this.rowBtnFunc(data)
        this.btnList.forEach(btn => {
          if (result[btn.code] === undefined ||
              result[btn.code] === 'undefined' ||
              result[btn.code] === true) {
            rowBtnList.push(btn)
          }
        })
        return rowBtnList
      } else {
        return this.btnList
      }
    },
    // calcBtnLabel (param, row) {
    //   if (typeof param === 'function') {
    //     return param(row)
    //   }
    //   return param
    // },
    calcBtnShow (param, row) {
      if (typeof param === 'undefined') {
        return true
      }
      if (typeof param === 'function') {
        return param(row)
      }
      return true
    },
    getDataList () {
      const params = Object.assign({}, this.searchEntity)
      if (this.cfg.paramType === 'pageRequest') {
        params.pageRequest = {
          currentPage: this.pageNum,
          pageSize: this.pageSize
        }
      } else {
        params.currentPage = this.pageNum
        params.pageSize = this.pageSize
      }

      post(this.cfg.url, params).then(response => {
        console.log(response)
        if (!response) {
          this.dataList = []
          return
        }
        if (this.cfg.needPage === false) {
          this.dataList = response
        } else {
          this.dataList = response.records
          if (response.total !== undefined) {
            this.totalRecords = response.total
          } else if (response.totalNum) {
            this.totalRecords = response.totalNum
          }
          // this.totalRecords = response.total || response.totalNum
        }
        this.deletePopVisibleList = []
        for (let i = 0; i < this.dataList.length; i++) {
          this.deletePopVisibleList.push({ visible: false })
        }
        document.getElementsByClassName('el-table__body-wrapper')[0].scrollTop = 0
        this.radioM = ''
      }).catch(error => {
        console.log('DataList failure ---- error: ')
        console.log(error)
        this.dataList = []
      })
    },
    onSizeChange (size) {
      this.pageSize = size
      this.getDataList()
    },
    onPageChange (pageNum) {
      this.pageNum = pageNum
      this.getDataList()
    },
    getRadioData (index) {
      this.multipleSelection = []
      this.multipleSelection.push(this.dataList[index])
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    reload (searchEntity, cfgChange) {
      this.searchEntity = searchEntity
      if (cfgChange === 'notChange') {
        this.cfgChange = false
      }
      this.pageNum = 1
      this.getDataList()
    },
    getSelection () {
      return this.multipleSelection
    },
    setDataList (dataList) {
      this.deletePopVisibleList = []
      this.dataList = dataList
    },
    onInput () {
      this.$emit('dataListInput')
      this.$forceUpdate()
    },
    refresh () {
      this.initData()
    }
  },
  watch: {
    cfg: {
      handler (newValue, oldValue) {
        if (this.cfgChange) {
          this.searchEntity = newValue.searchEntity
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/config.scss";
  @import "~@/assets/scss/mixin.scss";

  .data-list {
    @include container();
    flex: 1;
    overflow: hidden;
    margin-top: 12px;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;

    .header {
      @include flex();

      .title {
        font-size: $fontE;
        margin-bottom: 8px;
      }

      .opt-btn-group {
        margin-bottom: 8px;
      }
    }

    .data-list-wrap {
      flex: 1;
      overflow-y: hidden;

      .el-table {
        border: 1px solid $color7;

        ::v-deep .el-table__row--striped td {
          background-color: rgba($color9, 0.03);
        }

        ::v-deep td {
          border-bottom: none !important;
          border-top: 1px solid $color7;
        }

        ::v-deep th.is-leaf {
          border-bottom: none;
        }

        &::before {
          background-color: transparent;
        }
      }
    }

    .footer {
      margin-top: 10px;
      display: flex;

      .footer-btns {
        margin-left: 20px;
      }

      .footer-page {
        flex: 1;
      }
    }
  }

  .data-list-btn {
    i {
      margin-right: 5px;
      font-size: $fontF !important;
    }
  }
</style>
