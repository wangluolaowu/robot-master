<template>
<div class="">
    <el-row>
        <el-col :span="23" class="main">
            <div class="grid-content bg-purple-dark">
               
                <!-- 搜索区域 -->
                <el-form :inline="true" class="demo-form-inline">
                 
                    <el-form-item>
                        <el-button type="primary" @click="cancel">取消</el-button>
                        <el-button type="primary" @click="submit">提交</el-button>

                    </el-form-item>
                </el-form>

                <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="binGrn" label="GRN">
                    </el-table-column>
                    <el-table-column prop="skuNum" label="零件编码">
                    </el-table-column>
                    <el-table-column prop="binPartDesc" label="零件描述">
                    </el-table-column>
                    <el-table-column prop="binWip" label="WIP号">
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
                    <el-table-column prop="binTicketNum" label="上货标签号">
                    </el-table-column>
                    <el-table-column prop="" label="上货标签打印时间">
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
    <el-dialog title="任务分配" :visible.sync="isShowDialog" width="90%">
        <!-- 搜索区域 -->
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="订单总数">
                <el-input type="text" :rows="2" v-model="dialog.systemReason">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="showConfirmDialog">确认打回</el-button>
                <el-button type="primary" @click="confirmAssign">任务分配</el-button>
            </el-form-item>
        </el-form>
        <!-- 6个表格 -->
        <!--
        <section class="dialog-main">
            <el-card class="work-station" v-for="(station, i ) in dialogTableData" :key="i">
                <ul class="station-info">
                    <li>
                        <label for="">工作站</label><span>{{i + 1}}</span>
                    </li>
                    <li>
                        <label for="">订单总行数</label><span></span>
                    </li>
                    <li>
                        <label for="">播种墙</label><span></span>
                    </li>
                </ul>
                <ul class="station-list sortable" v-sort>
                    <li v-for="(item, j) in station.result" :data-from="i" :key="item.route" class="ui-state-default">
                        <label for="">{{j+1}}</label> <span>{{item.route}}</span></li>
                </ul>
            </el-card>
        </section>
        -->
        <!--<el-row :gutter="10">
          <el-col :span="4" v-for="(item, i) in this.dialogTableData" :key="i">
            <el-card style="min-height: 520px">
              <ul class="station-info">
                  <li>
                      <label for="">工作站</label><span>{{i + 1}}</span>
                  </li>
                  <li>
                      <label for="">订单总行数</label><span></span>
                  </li>
                  <li>
                      <label for="">播种墙</label><span></span>
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
        </el-row>-->
        </el-dialog>
        <el-dialog width="30%" title="提示" :visible.sync="isShowInnerConfirmDialog" append-to-body>
            <p class="dialog-text">确认全部打回么？</p>
            <el-button @click="isShowInnerConfirmDialog = false">取 消</el-button>
            <el-button type="primary" @click="confirmReject">确认</el-button>
        </el-dialog>
        <el-dialog width="30%" title="已提交完成" :visible.sync="isShowOkDialog" append-to-body>
            <p class="dialog-text">调配任务已完成</p>
            <el-button type="primary" @click="isShowOkDialog = false"> OK</el-button>
        </el-dialog>
    <!-- 弹层end -->
</div>
</template>

<script>
// 接口数据
import axios from '../../util/http'
import draggable from 'vuedraggable'
/*
let globalApi = {
  getTable: 'static/json/table.json',
  submit: 'static/json/submit.json',
  confirmReject: 'static/json/confirm-reject.json',
  confirmAssign: 'static/json/confirm-assign.json'
}
*/
export default {
  data () {
    return {
      axios,
      draggable,
      drag: false,
      search: { // 查询参数
        orderType: 'S',
        ispDealer: '',
        ictDealer: '',
        currentPage: 1
      },
      isShowDialog: false,
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
      scope: [],
      sendStr: ''
    }
  },
  created: function () {
    this.getTableData()
  },
  methods: {
    handleSelectionChange (val) {
      let arr = []
      val.map(item => {
        arr.push(item.binTicketNum)
      })
      this.sendStr = arr.join(',')
      console.log(this.sendStr)
    },
    // 弹层上操作
    showConfirmDialog: function () {
      this.isShowInnerConfirmDialog = true
    }, // 全部打回
    confirmReject: function () {
      this.axios.get('binningManage/binningInfo/deleteDmlPickReviewV', {
        params: {
          orderWaveId: this.id
        }
      }).then((res) => {
        if (res.errCode === 'S') {
          console.log(res.data.result)
          // 弹出
          this.isShowInnerConfirmDialog = false
        }
      })
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
          this.isShowDialog = true
        }
      })
    },
    submit () {
      if (!this.sendStr) {
        return false
      }
      this.axios.get('binningManage/binningInfo/createDmlBinReviewId', {
        params: {
          idList: this.sendStr
        }
      }).then((res) => {
        if (res.errCode === 'S') {
          this.id = res.data.result
          this.submitSelect()
        }
      })
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
      this.axios.get('binningManage/binningInfo/selectDmlBinCreateWaveInfo', {
        params: that.search
      }).then((res) => {
        if (res.errCode === 'S') {
          that.tableData = res.data.result
          that.totalRows = res.data.totalRows
          that.pageSize = res.data.pageSize
        }
      })
    },
    handleCurrentChange (val) {
      this.search.currentPage = val
      this.getTableData()
    },
    changeItem (val) {
      if (val.added) {
        let numberArr = val.added.element.$data.dialogTableData
        numberArr.forEach((item) => {
          item.result.forEach((childItem, index) => {
            childItem.priorityNum = index
            childItem.wsId = item.wsWorkStationInfo.entityWorkstationId
            this.dialogTableDataExit.push(childItem)
          })
        })
        this.$set(val.added.element, 'isChange', true)
        console.log(val.added)
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
  .drag-item {border:1px solid #ddd ; background: #f9f9f9; padding: 10px; margin-top: 10px; cursor: pointer;}
  .gray {background: #026780; color: #ffffff;}
</style>

