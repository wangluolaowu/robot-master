<template>
<div class="">
    <el-row>
        <el-col :span="23" class="main">
            <div class="grid-content bg-purple-dark">
                <el-tabs id="topTitle" v-model="search.orderType" @tab-click="handleTabClick">
                    <el-tab-pane label="订单类型S" name="S"></el-tab-pane>
                    <el-tab-pane label="订单类型V" name="V"></el-tab-pane>
                </el-tabs>
                <!-- 搜索区域 -->
                <el-form :inline="true" class="demo-form-inline selectedCont clears">
                    <el-form-item class="fl" label="ISP dealer：">
                        <el-select placeholder="所属平台" v-model="search.ispDealer">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="是" value="Y"></el-option>
                            <el-option label="否" value="N"></el-option>
                            <!-- <el-option :label="item.platformName" :key="item.clientType" :value="item.clientType" v-for="item in platformTypeList"></el-option> -->
                        </el-select>
                    </el-form-item>
                    <el-form-item class="fl" label="ICT dealer：">
                        <el-select placeholder="所属平台" v-model="search.ictDealer">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="是" value="Y"></el-option>
                            <el-option label="否" value="N"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="fl" id="groupBtn">
                        <el-button type="primary" @click="confirm">确认</el-button>
                        <el-button type="primary" :disabled = "cancelDisabled" @click="cancel">取消</el-button>
                    </el-form-item>
                    <el-form-item>
                     <el-checkbox v-model="search.submitAll"  @change="handleCheckAllChange">提交全部</el-checkbox>
                    </el-form-item>
                    <el-form-item>
                       <el-button type="primary" @click="submit" :disabled = "submitIsDisabled" >提交</el-button>
                    </el-form-item>
                </el-form>

                <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border @selection-change="handleSelectionChange" v-loading="tableLoading">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="dealerAccount" label="客户编码" width="100">
                    </el-table-column>
                    <el-table-column prop="custName" label="客户名称" width="200">
                    </el-table-column>
                    <el-table-column prop="wip" label="WIP号" width="100">
                    </el-table-column>
                    <el-table-column prop="wipLine" label="WIP订单行" width="100">
                    </el-table-column>
                    <el-table-column prop="pickTicketNum" label="备货标签" width="200">
                    </el-table-column>
                    <el-table-column prop="route" label="路线" width="100">
                    </el-table-column>
                     <el-table-column prop="subRoute" label="子路线" width="100">
                    </el-table-column>
                    <el-table-column prop="orderType" label="订单类型" width="100">
                    </el-table-column>
                    <el-table-column prop="locNum" label="货架位" width="100">
                    </el-table-column>
                    <el-table-column prop="skuNum" label="零件号码" width="200">
                    </el-table-column>
                    <el-table-column prop="skuName" label="零件描述" width="200">
                    </el-table-column>
                    <el-table-column prop="qty" label="数量" width="100">
                    </el-table-column>
                    <el-table-column  prop="ispDealer"  label="ISP经销商" width="200">
                      <template slot-scope="scope" width="100%">
                        <el-select placeholder="工作状态" v-model="scope.row.ispDealer" :disabled="true">
                        <el-option
                          v-for="item in Y_N_STATUS"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value" 
                        > 
                       </el-option>
                       </el-select>
                    </template>
                    </el-table-column>
                    <el-table-column prop="ictDealer" label="ICT经销商" width="200">
                       <template slot-scope="scope" width="100%">
                        <el-select placeholder="工作状态" v-model="scope.row.ictDealer" :disabled="true">
                        <el-option
                          v-for="item in Y_N_STATUS"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value" 
                        > 
                       </el-option>
                       </el-select>
                    </template>
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
            <el-form-item label="系统预分配原因">
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="dialog.systemReason">
                </el-input>
            </el-form-item>
            <el-form-item label="手工分配原因">
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="dialog.manualReason">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="showConfirmDialog">取消</el-button>
                <el-button type="primary" @click="confirmAssign">任务分配</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10">
          <el-col :span="4" v-for="(item, i) in this.dialogTableData" :key="i">
            <el-card style="min-height: 520px">
              <ul class="station-info">
                  <li>
                      <label for="">工作站</label><span>{{item.wsid}}</span>
                  </li>
                  <li>
                      <label for="">订单总行数</label><span>{{item.orderListCount}}</span>
                  </li>
                  <li>
                      <label for="">路线总数</label><span>{{item.routeListCount}}</span>
                  </li>
                  <li>
                      <label for="">播种墙</label><span>{{item.forecastWallCount}}</span>
                  </li>
              </ul>
              <transition-group>            
                <draggable v-model="item.result" :options="{group:'people', animation: 300}" @start="startItem" @end="endItem" @change="changeItem" :key="i">
                    <el-row
                      class="drag-item"
                      :class="{gray: element.isChange}"
                      v-for="(element, index) in item.result"
                      :key="index">
                      <el-col :span="6"> <div style="margin-top:3px">{{index + 1}}、</div></el-col>
                      <el-col :span="18" style="line-height:1.7">
                        <div>{{ 'route: ' + (element.route  || '') }}</div>
                        <div>{{ 'dealer: ' + (element.dealerCou  || '') }}</div>
                        <div>{{ '订单行: ' + (element.lineCou || '') }}</div>                        
                      </el-col>
                    </el-row>
                </draggable>
              </transition-group>
            </el-card>        
          </el-col>
        </el-row>
        </el-dialog>
        <el-dialog width="30%" title="提示" :visible.sync="isShowInnerConfirmDialog"  append-to-body>
            <p class="dialog-text">确认全部取消么？</p>
            <el-button @click="isShowInnerConfirmDialog = false">取 消</el-button>
            <el-button type="primary" @click="confirmReject">确认</el-button>
        </el-dialog>
        <el-dialog width="30%" title="已提交完成" :visible.sync="isShowOkDialog" append-to-body @close='confirmShowOkDialog'>
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
import qs from 'qs'
import EnumSelect from '../../util/enum'
export default {
  data () {
    return {
      axios,
      EnumSelect,
      draggable,
      drag: false,
      search: { // 查询参数
        orderType: 'S',
        ispDealer: '',
        ictDealer: '',
        currentPage: 1,
        // locNum: 'RA080511',
        submitAll: false
      },
      isShowDialog: false,
      tableLoading: false,
      submitIsDisabled: true,
      cancelDisabled: true,
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
      sendStr: [],
      Y_N_STATUS: []
    }
  },
  created: function () {
    this.getTableData()
    this.getSelectValues()
  },
  methods: {
    getSelectValues() {
      let Enum = EnumSelect()
      this.Y_N_STATUS = Enum.Y_N_STATUS
    },
    handleSelectionChange (val) {
      let arr = []
      val.map(item => {
        arr.push(item)
      })
      this.sendStr = arr
      if (arr.length > 0 || this.submitAll) {
        this.submitIsDisabled = false
        this.cancelDisabled = false
      } else {
        this.submitIsDisabled = true
        this.cancelDisabled = true
      }
      console.log(this.sendStr)
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
      this.axios.get('reloc/createWave/deleteRelocInfoList', {
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
      let dataResult = {}
      let result = []
      this.dialogTableData.map((list, i) => {
        let wsid = list.wsid
        let newWsid = list.newWsid
        let newList = list.result.map((item, j) => {
          item.wsId = wsid
          item.newWsId = newWsid
          item.priorityNum = j + 1
          return item
        })
        result = result.concat(newList)
      })
      console.log('result===========' + JSON.stringify(this.dialogTableData))
      dataResult.result = JSON.stringify(result)
      dataResult.reason = JSON.stringify(this.dialog)
      dataResult.orderWaveId = this.id
      this.axios.post('reloc/createWave/updateRelocInfoList', qs.stringify(dataResult)).then(res => {
        if (res.errCode === 'S') {
          this.isShowOkDialog = true // 弹出层 分配成功
        }
      })
    }, // 确认创建波次
    submitSelect () {
      this.axios.get('reloc/createWave/selectRelocInfoList', {
        params: {
          orderWaveId: this.id,
          orderType: this.search.orderType
        }
      }).then((res) => {
        if (res.errCode === 'S') {
          this.dialogTableData = res.data.result.map(item => {
            if (!item.result) {
              item.result = []
            }
            return item
          })
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
      let dataResult = {}
      dataResult.idList = this.sendStr
      dataResult.submitAll = this.search.submitAll
      dataResult.orderType = this.search.orderType
      dataResult.result = JSON.stringify(this.sendStr)
      dataResult.search = JSON.stringify(this.search)
      this.axios.post('reloc/createWave/createWaveId', qs.stringify(dataResult)).then((res) => {
        if (res.errCode === 'S') {
          this.id = res.data.result
          this.submitSelect()
        } else {
          this.submitIsDisabled = false
          this.tableLoading = false
        }
      })
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
      this.axios.get('/reloc/createWave/selectDmlPickCreateWaveVList', {
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
    },
    changeItem (val) {
      if (val.added) {
        this.$set(val.added.element, 'isChange', true)
      }
      if (val.moved) {
        this.$set(val.moved.element, 'isChange', true)
      }
    },
    startItem (val) {
      this.drag = true
    },
    endItem (val) {
      this.drag = false
      this.dialogTableData.map((list, i) => {
        let orderCount = 0
        list.result.map((item, j) => {
          orderCount = Number(item.lineCou) + Number(orderCount)
          return item
        })
        list.orderListCount = Number(orderCount)
        list.routeListCount = list.result.length
      })
    }
  },
  mounted () {
    document.body.ondrop = function (event) {
      event.preventDefault()
      event.stopPropagation()
    }
  },
  components: {
    draggable
  }
}
</script>


<style>
  #topTitle {
    margin-bottom: 30px;
  }
  .selectedCont .el-form-item{
    margin-right:30px;
  }
  .selectedCont{
    margin-bottom: 30px;
  }
  #groupBtn .el-button{
    width: 85px;
    height: 40px;
    letter-spacing: 2px;
    font-size: 15px;
    margin-top: -10px;
    margin-left: 20px;
  }
  .drag-item {
    border:1px solid #ddd ;
    background: #f9f9f9;
    padding: 10px;
    margin-top: 10px;
    cursor: pointer;
  }
  .clears:after{
    display: block;
    content: '';
    clear: both;
    height: 0;
    overflow: hidden;
    visibility:hidden;
  }
  .fl{
    float: left;
  }
  .fr{
    float:right;
  }
  .gray {
    background: #026780;
    color: #ffffff;
  }
</style>

