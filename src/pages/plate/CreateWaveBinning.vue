<template>
<div class="">
    <el-row>
        <el-col :span="23" class="main">
            <div class="grid-content bg-purple-dark">
               
                <!-- 搜索区域 -->
                <el-form :inline="true" class="demo-form-inline">
                 
                    <el-form-item>
                        <el-button type="primary"  :disabled = "cancelDisabled" @click="cancel">取消</el-button>
                    </el-form-item>
                     <el-form-item>
                     <el-checkbox v-model="search.submitAll"  @change="handleCheckAllChange">提交全部</el-checkbox>
                    </el-form-item>
                     <el-form-item>
                     <el-button type="primary" :disabled = "submitIsDisabled" @click="submit">提交</el-button>
                    </el-form-item>
                </el-form>
                <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border @selection-change="handleSelectionChange" v-loading="tableLoading">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="binGrn" label="GRN" width="150">
                    </el-table-column>
                    <el-table-column prop="skuNum" label="零件编码" width="150">
                    </el-table-column>
                    <el-table-column prop="binPartDesc" label="零件描述" width="200">
                    </el-table-column>
                    <el-table-column prop="binWip" label="WIP号" width="100">
                    </el-table-column>
                    <el-table-column prop="binWipLine" label="WIP订单行" width="100">
                    </el-table-column>
                    <el-table-column prop="binOrdNo" label="订单号">
                    </el-table-column>
                    <el-table-column prop="binOrdLine" label="订单行">
                    </el-table-column>
                    <el-table-column prop="binQty" label="数量">
                    </el-table-column>
                    <el-table-column prop="locNum" label="货架位">
                    </el-table-column>
                    <el-table-column prop="binTicketNum" label="上货标签号" width="200">
                    </el-table-column>
                    <el-table-column prop="creationDate" label="上货标签打印时间" width="200">
                       <template slot-scope="scope">
                            {{getDate(scope.row.creationDate,true)}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="creationDate" label="导入时间" width="200">
                       <template slot-scope="scope">
                            {{getDate(scope.row.creationDate,true)}}
                      </template>
                    </el-table-column>
                </el-table>
                <el-pagination v-if="totalRows>0" class="pagination" background @current-change="handleCurrentChange" :current-page.sync="search.currentPage" :page-size="pageSize" :page-sizes="[pageSize]" layout="total, sizes, prev, pager, next, jumper" :total="totalRows">
                </el-pagination>
            </div>
        </el-col>
    </el-row>
    <!-- 弹层start -->
    <el-dialog title="任务分配" :visible.sync="isShowDialog" width="90%" @close="closeConfirmReject">
        <!-- 搜索区域 -->
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="订单总数">
                <span>{{dialog.systemReason}}</span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="showConfirmDialog">取消</el-button>
                <el-button type="primary" @click="confirmAssign">任务分配</el-button>
            </el-form-item>
        </el-form>
        </el-dialog>
        <el-dialog width="30%" title="提示" :visible.sync="isShowInnerConfirmDialog" append-to-body>
            <p class="dialog-text">确认全部取消么？</p>
            <el-button @click="isShowInnerConfirmDialog = false">取 消</el-button>
            <el-button type="primary" @click="confirmReject">确认</el-button>
        </el-dialog>
        <el-dialog width="30%" title="已提交完成" :visible.sync="isShowOkDialog" append-to-body @close="confirmShowOkDialog">
            <p class="dialog-text">调配任务已完成</p>
            <el-button type="primary" @click="confirmShowOkDialog"> OK</el-button>
        </el-dialog>
    <!-- 弹层end -->
</div>
</template>

<script>
// 接口数据
import axios from '../../util/http'
import draggable from 'vuedraggable'
import dateFormat from '../../util/date'
export default {
  data () {
    return {
      axios,
      dateFormat,
      draggable,
      drag: false,
      search: { // 查询参数
        orderType: 'S',
        ispDealer: '',
        ictDealer: '',
        currentPage: 1,
        submitAll: false
      },
      cancelDisabled: true,
      submitIsDisabled: true,
      isShowDialog: false,
      tableLoading: false,
      totalRows: -1,
      pageSize: -1,
      tableData: [],
      dialogTableData: [],
      dialogTableDataExit: [],
      multipleSelection: [],
      dialog: {
        systemReason: '',
        manualReason: ''
      },
      id: '', // 点提交后服务器分配的id
      isShowInnerConfirmDialog: false,
      isShowOkDialog: false,
      updateOk: false,
      deleteOk: false,
      scope: [],
      sendStr: ''
    }
  },
  created: function () {
    this.getTableData()
  },
  methods: {
    getDate(data, flag) {
      return this.dateFormat(data, flag)
    },
    handleSelectionChange (val) {
      let arr = []
      val.map(item => {
        arr.push(item.binTicketNum)
      })
      this.sendStr = arr.join(',')
      if (arr.length > 0 || this.submitAll) {
        this.submitIsDisabled = false
        this.cancelDisabled = false
      } else {
        this.submitIsDisabled = true
        this.cancelDisabled = true
      }
      console.log(this.sendStr)
    }, // 点击是否全部提交
    handleCheckAllChange (e) {
      this.search.submitAll = e
      if (e || this.sendStr.length > 0) {
        this.submitIsDisabled = false
        this.cancelDisabled = false
      } else {
        this.submitIsDisabled = true
        this.cancelDisabled = true
      }
    }, // 关闭弹层
    closeConfirmReject () {
      if (!this.deleteOk && !this.updateOk) {
        this.confirmReject()
        this.deleteOk = false
        this.updateOk = false
      }
    }, // 弹层上操作
    showConfirmDialog: function () {
      this.isShowInnerConfirmDialog = true
    }, // 全部打回
    confirmReject: function () {
      this.axios.get('binningManage/binningInfo/deleteDmlBinkReviewV', {
        params: {
          orderWaveId: this.id
        }
      }).then((res) => {
        if (res.errCode === 'S') {
          console.log(res.data.result)
          // 弹出
          this.deleteOk = true
          this.isShowInnerConfirmDialog = false
          this.isShowDialog = false
          this.getTableData()
        }
      })
    }, // 确认分配ok
    confirmShowOkDialog () {
      this.updateOk = true
      this.isShowOkDialog = false
      this.isShowDialog = false
      this.getTableData()
    },
    confirmAssign () {
      this.axios.get('binningManage/binningInfo/updateDmlBinReviewV', {
        params: {
          orderWaveId: this.id
        }
      }).then(res => {
        if (res.errCode === 'S') {
          console.log(res.data.result)
          this.isShowOkDialog = true // 弹出层 分配成功
        }
      })
    }, // 确认创建波次
    submitSelect () {
      this.axios.get('binningManage/binningInfo/selectDmlBinReviewVList', {
        params: {
          orderWaveId: this.id
        }
      }).then((res) => {
        if (res.errCode === 'S') {
          this.dialog.systemReason = res.data.result
          this.deleteOk = false
          this.updateOk = false
          this.isShowDialog = true
        }
        this.handleCheckAllChange(false)
        this.tableLoading = false
      })
    },
    submit () {
      this.submitIsDisabled = true
      this.tableLoading = true
      this.axios.get('binningManage/binningInfo/createDmlBinReviewId', {
        params: {
          idList: this.sendStr,
          submitAll: this.search.submitAll
        }
      }).then((res) => {
        if (res.errCode === 'S') {
          this.id = res.data.result
          this.submitSelect()
        } else {
          this.submitIsDisabled = false
          this.tableLoading = false
        }
      })
    },
    confirm: function () {
      this.search.currentPage = 1
      this.getTableData()
    },
    cancel: function () {
      this.$refs.multipleTable.clearSelection()
      this.handleCheckAllChange(false)
    },
    handleTabClick: function (tab, event) {
      this.initParams()
      this.getTableData()
    },
    initParams () {
      this.search.ispDealer = ''
      this.search.ictDealer = ''
      this.search.currentPage = 1
    },
    getTableData () { // 创建波次查询列表
      this.tableLoading = true
      let that = this
      this.axios.get('binningManage/binningInfo/selectDmlBinCreateWaveInfo', {
        params: that.search
      }).then((res) => {
        if (res.errCode === 'S') {
          that.tableData = res.data.result
          that.totalRows = res.data.totalRows
          that.pageSize = res.data.pageSize
        }
        this.tableLoading = false
      })
    },
    handleCurrentChange (val) {
      this.search.currentPage = val
      this.getTableData()
    }
  }
}
</script>

<style>
  .drag-item {border:1px solid #ddd ; background: #f9f9f9; padding: 10px; margin-top: 10px; cursor: pointer;}
  .gray {background: #026780; color: #ffffff;}
</style>

