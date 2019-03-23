<template>
<div class="">
    <el-row>
        <el-col :span="23" class="main">
            <div class="grid-content bg-purple-dark">
            <el-form  :inline="true" class="demo-form-inline">
              <el-form-item :span="20">
                    <el-tooltip class="item" effect="dark" content="下载数据集模板" placement="bottom">
                        <el-button icon="yx-download3" @click="SetDownloadFunc">下载excel模板 </el-button>
                    </el-tooltip>
              </el-form-item>
              <el-form-item :span="20">
             <el-upload
                class="upload-demo"
                action=""
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :before-upload="beforeUpload"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传xls,xlsx文件，且不超过500kb</div>
              </el-upload>
              </el-form-item>
                 <el-form-item label="货位号" >
                 <el-input v-model="search.attribute03"></el-input>
                </el-form-item>
                 <el-form-item label="盘点次数" >
                 <el-input v-model="search.attribute03"></el-input>
                </el-form-item>
                 <el-form-item label="零件编码" >
                 <el-input v-model="search.attribute03"></el-input>
                </el-form-item>
                 <el-form-item label="用户ID" >
                 <el-input v-model="search.attribute03"></el-input>
                </el-form-item>
                 <el-form-item label="任务页" >
                 <el-input v-model="search.attribute03"></el-input>
                </el-form-item>
                 <el-col :span="8">
           <el-form-item label="初始日期" >
              <el-date-picker
                v-model="search.startTime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择完成日期"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="截止日期" >
              <el-date-picker
                v-model="search.endTime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择完成日期"
              ></el-date-picker>
            </el-form-item>
            </el-col>
                <el-form-item>
                      <el-button type="primary" :disabled = "submitIsDisabled" @click="submit">提交</el-button>
                      <el-button type="primary" :disabled = "cancelIsDisabled" @click="cancel">取消</el-button>
                </el-form-item>
               </el-form>
                <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border @selection-change="handleSelectionChange" v-loading="tableLoading">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="locNum" label="货位号">
                    </el-table-column>
                    <el-table-column prop="skuNum" label="零件编码">
                    </el-table-column>
                    <el-table-column prop="skuName" label="任务页">
                    </el-table-column>
                    <el-table-column prop="skuQty" label="盘点数量">
                    </el-table-column>
                    <el-table-column prop="skuQty" label="盘点次数">
                    </el-table-column>
                     <el-table-column prop="skuQty" label="盘点用户">
                    </el-table-column>
                     <el-table-column prop="rfdcUserId" label="用户ID">
                    </el-table-column>
                     <el-table-column prop="creationDate" label="创建时间">
                    </el-table-column>
                    <el-table-column prop="creationDate" label="导入时间">
                    </el-table-column>
                </el-table>
                <el-pagination v-if="totalRows>0" class="pagination" background @current-change="handleCurrentChange" :current-page.sync="search.currentPage" :page-size="pageSize" :page-sizes="[pageSize]" layout="total, sizes, prev, pager, next, jumper" :total="totalRows">
                </el-pagination>
            </div>
        </el-col>
    </el-row>
    <!-- 弹层start -->
    <el-dialog title="任务分配" :visible.sync="isShowDialog" width="90%" @close='closeConfirmReject'>
        <!-- 搜索区域 -->
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-button type="primary" @click="showConfirmDialog">确认打回</el-button>
                <el-button type="primary" @click="confirmAssign">任务分配</el-button>
            </el-form-item>
        </el-form>
        <el-row >
             <el-table ref="multipleTableDialog" :data="tableDataDialog" tooltip-effect="dark" style="width: 100%" border>
                    <el-table-column prop="locNum" label="用户名">
                    </el-table-column>
                    <el-table-column prop="skuNum" label="配件编号数量">
                    </el-table-column>
                    <el-table-column prop="skuName" label="配件数量">
                    </el-table-column>
                    <el-table-column prop="skuQty" label="任务页数量">
                    </el-table-column>
                </el-table>
                <el-pagination v-if="totalRowsDialog>0" class="pagination" background @current-change="handleCurrentChangeDialog" :current-page.sync="currentPageDialog" :page-size="pageSizeDialog" :page-sizes="[pageSizeDialog]" layout="total, sizes, prev, pager, next, jumper" :total="totalRowsDialog">
                </el-pagination>
        </el-row>
        </el-dialog>
        <el-dialog width="30%" title="提示" :visible.sync="isShowInnerConfirmDialog"  append-to-body>
            <p class="dialog-text">确认全部取消么？</p>
            <el-button @click="isShowInnerConfirmDialog = false">取 消</el-button>
            <el-button type="primary" @click="confirmReject">确认</el-button>
        </el-dialog>
        <el-dialog width="30%" title="已提交完成" :visible.sync="isShowOkDialog" append-to-body>
            <p class="dialog-text">调配任务已完成</p>
            <el-button type="primary" @click="confirmShowOkDialog"> OK</el-button>
        </el-dialog>
    <!-- 弹层end -->
</div>
</template>

<script>
// 接口数据
import axios from '../../../util/http'
import draggable from 'vuedraggable'
import qs from 'qs'

export default {
  data () {
    return {
      axios,
      draggable,
      drag: false,
      search: { // 查询参数
        orderType: 'RELOC',
        ispDealer: '',
        ictDealer: '',
        currentPage: 1,
        submitAll: true
      },
      tableLoading: false,
      tableLoadingDialog: false,
      isShowDialog: false,
      submitIsDisabled: true,
      cancelIsDisabled: true,
      totalRows: -1,
      pageSize: -1,
      currentPageDialog: 1,
      totalRowsDialog: -1,
      pageSizeDialog: -1,
      tableData: [],
      tableDataDialog: [],
      multipleSelection: [],
      id: '', // 点提交后服务器分配的id
      isShowInnerConfirmDialog: false,
      isShowOkDialog: false,
      scope: [],
      sendStr: [],
      updateOk: false,
      deleteOk: false,
      fileList: []
    }
  },
  created: function () {
    this.getTableData()
  },
  methods: { // 下载excel模板
    SetDownloadFunc () {
      this.axios.postD('stock/createWave/downloadExcelTemplate', {}).then(res => {
        const content = res
        const blob = new Blob([content], {type: 'application/vnd.ms-excel'})
        const fileName = '测试表格123.xlsx'
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else { // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
      })
    },
    beforeUpload (file, fileList) {
      this.tableLoading = true
      let fd = new FormData()
      fd.append('file', file)
      this.axios.post('stock/createWave/reportExcelTemplate', fd).then(res => {
        if (res.errCode === 'S') {
          this.search.currentPage = 1
          this.getTableData()
          this.$message.warning('文件导入成功')
        } else {
          this.$message.warning('文件导入失败')
        }
        this.tableLoading = false
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleSelectionChange (val) {
      let arr = []
      val.map(item => {
        arr.push(item)
      })
      this.sendStr = arr
      console.log(this.sendStr)
      if (arr.length > 0) {
        this.cancelIsDisabled = false
        this.submitIsDisabled = false
      } else {
        this.cancelIsDisabled = true
        this.submitIsDisabled = true
      }
    }, // 关闭弹层
    closeConfirmReject () {
      if (!this.deleteOk && !this.updateOk) {
        this.confirmReject()
        this.deleteOk = false
        this.updateOk = false
      }
    },
    // 弹层上操作
    showConfirmDialog: function () {
      this.isShowInnerConfirmDialog = true
    }, // 全部打回
    confirmReject: function () {
      this.axios.get('stock/createWave/deleteStockInfoList', {
        params: {
          orderWaveId: this.id
        }
      }).then((res) => {
        if (res.errCode === 'S') {
          console.log(res.data.result)
          // 弹出层
          this.deleteOk = true
          this.isShowInnerConfirmDialog = false
          this.isShowDialog = false
          this.search.currentPage = 1
          this.getTableData()
        }
      })
    }, // 确认分配ok
    confirmShowOkDialog () {
      this.updateOk = true
      this.isShowOkDialog = false
      this.isShowDialog = false
      this.search.currentPage = 1
      this.getTableData()
    },
    confirmAssign () {
      let dataResult = {}
      dataResult.orderWaveId = this.id
      this.axios.post('stock/createWave/updateStockInfoList', qs.stringify(dataResult)).then(res => {
        if (res.errCode === 'S') {
          console.log(res.data.result)
          this.isShowOkDialog = true // 弹出层 分配成功
        }
      })
    }, // 确认创建波次
    submitSelect () {
      this.axios.get('stock/createWave/selectStockInfoList', {
        params: {
          orderWaveId: this.id,
          orderType: this.search.orderType
        }
      }).then((res) => {
        if (res.errCode === 'S') {
          this.tableDataDialog = res.data.result
          this.deleteOk = false
          this.updateOk = false
          this.isShowDialog = true
        }
        this.submitIsDisabled = false
        this.tableLoading = false
      })
    },
    submit () {
      this.submitIsDisabled = true
      this.tableLoading = true
      let dataResult = {}
      console.log('JSON.stringify(this.sendStr)==========' + JSON.stringify(this.sendStr))
      dataResult.result = JSON.stringify(this.sendStr)
      dataResult.submitAll = this.search.submitAll
      dataResult.idList = ''
      this.axios.post('stock/createWave/createWaveId', qs.stringify(dataResult)).then((res) => {
        if (res.errCode === 'S') {
          this.id = res.data.result
          this.submitSelect()
        } else {
          this.submitIsDisabled = false
          this.tableLoading = false
          this.$message.warning('提交失败')
        }
      })
    }, // 点击是否全部提交
    handleCheckAllChange (e) {
      this.search.submitAll = e
    },
    confirm: function () {
      this.search.currentPage = 1
      this.getTableData()
    },
    cancel: function () {
      this.$refs.multipleTable.clearSelection()
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
      let that = this
      this.axios.get('stock/createWave/selectMainStockInfoList', {
        params: that.search
      }).then((res) => {
        if (res.errCode === 'S') {
          that.tableData = res.data.result
          that.totalRows = res.data.totalRows
          that.pageSize = res.data.pageSize
        }
      })
    },
    getTableDataDialog () { // 创建波次查询列表
      let that = this
      this.axios.get('stock/createWave/selectStockInfoList', {
        params: {
          currentPage: that.search.currentPage,
          orderWaveId: this.id
        }
      }).then((res) => {
        if (res.errCode === 'S') {
          that.tableDataDialog = res.data.result
          that.totalRowsDialog = res.data.totalRows
          that.pageSizeDialog = res.data.pageSize
        }
      })
    },
    handleCurrentChange (val) {
      this.search.currentPage = val
      this.getTableData()
    },
    handleCurrentChangeDialog (val) {
      this.search.currentPage = val
      this.getTableDataDialog()
    }
  }
}
</script>


<style>
  .drag-item {border:1px solid #ddd ; background: #f9f9f9; padding: 10px; margin-top: 10px; cursor: pointer;}
  .gray {background: #026780; color: #ffffff;}
</style>

