<template>
  <div class="mainOrder">
    <div id="mainTabCon">
      <div class="tabCon tabConOther">
        <h4 class="h2">拣货V单汇总</h4>
        <el-table :data='tableData.Vlist' highlight-current-row v-loading="tableLoadingVDT" style="width: 100%" border>
          <el-table-column prop="inC" label="系统当天接收订单行总数" width="200"></el-table-column>
          <el-table-column prop="waveC" label="当天已创建波次订单行" width="200"></el-table-column>
          <el-table-column prop="complC" label="当天已完成订单行" width="150"></el-table-column>
          <el-table-column prop="uncomplC" label="当天未完成订单行" width="150"></el-table-column>
          <el-table-column prop="comingC" label="正在进行中订单行"  width="200"></el-table-column>
          <el-table-column prop="instantRaion" label="瞬时平均效率（行/人/分钟）" width="220"></el-table-column>
          <!--新添加字段-->
           <el-table-column prop="complPercent" label="完成百分比" width="200"></el-table-column>
          <el-table-column prop="forecastComplDate"  label="预计完成时间" width="200">
            <template slot-scope="scope">
                {{getDate(scope.row.forecastComplDate,true)}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tabConOther">
        <h4 class="h2">拣货-V单</h4>
        <el-table :data='tableData.VOrderList' highlight-current-row v-loading="tableLoadingVD" style="width: 100%" border>
          <el-table-column prop="entityWorkstationId" label="工作站编号" width="100"></el-table-column>
          <el-table-column prop="forecastWallCount" label="播种墙数量" width="100"></el-table-column>
          <el-table-column prop="workstationStatus" label="工作状态" width="200">
            <template slot-scope="scope" width="100%">
              <el-select placeholder="工作状态" v-model="scope.row.workstationStatus" :disabled="true">
              <el-option
                v-for="item in WS_STATUS"
                :key="item.value"
                :label="item.label"
                :value="item.value" 
              > 
              </el-option>
            </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="complC" label="当天已完成订单行总数" width="180"></el-table-column>
          <el-table-column prop="uncomplC" label="已分配且未完成的订单行数量" width="220" ></el-table-column>
          <el-table-column prop="comingC" label="正在进行订单行数量" width="160"></el-table-column>
          <el-table-column prop="instantRaion" label="瞬时平均效率（行/人/分钟）" width="220"></el-table-column>
          <!--新添加字段-->
          <el-table-column prop="complPercent" label="完成百分比" width="100"></el-table-column>
          <el-table-column prop="forecastComplDate" label="预计完成时间" width="200">
             <template slot-scope="scope">
                {{getDate(scope.row.forecastComplDate,true)}}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-if="VOrderListSearch.totalRows>0" class="pagination" background @current-change="VOrderListSearchHandleCurrentChange"
                       :current-page.sync="VOrderListSearch.currentPage" :page-size="VOrderListSearch.pageSize" :page-sizes="[VOrderListSearch.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                       :total="VOrderListSearch.totalRows">
        </el-pagination>
      </div>

      <div class="tabConOther">
        <h4 class="h2">拣货-S单汇总</h4>
        <el-table :data='tableData.SList' highlight-current-row v-loading="tableLoadingSDT" style="width: 100%" border>
          <el-table-column prop="inC" label="系统当天接收订单行总数" width="190"></el-table-column>
          <el-table-column prop="waveC" label="当天已创建波次订单行" width="200"></el-table-column>
          <el-table-column prop="complC" label="当天已完成订单行" width="150"></el-table-column>

          <el-table-column prop="uncomplC" label="当天未完成订单行" width="150"></el-table-column>
          <el-table-column prop="comingC" label="正在进行中订单行" width="150"></el-table-column>
          <el-table-column prop="instantRaion" label="瞬时平均效率（行/人/分钟）" width="220"></el-table-column>
          <!--新添加字段-->
           <el-table-column prop="complPercent" label="完成百分比" width="100"></el-table-column>
          <el-table-column prop="forecastComplDate" label="预计完成时间" width="200">
             <template slot-scope="scope">
                {{getDate(scope.row.forecastComplDate,true)}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tabConOther">
        <h4 class="h2">拣货-S单</h4>
        <el-table :data='tableData.SOrderList' highlight-current-row v-loading="tableLoadingSD" border>
          <el-table-column prop="entityWorkstationId" label="工作站编号" width="100"></el-table-column>
          <el-table-column prop="forecastWallCount" label="播种墙数量" width="100"></el-table-column>
          <el-table-column prop="workstationStatus" label="工作状态" width="200">
             <template slot-scope="scope" width="100%">
              <el-select placeholder="工作状态" v-model="scope.row.workstationStatus" :disabled="true">
              <el-option
                v-for="item in WS_STATUS"
                :key="item.value"
                :label="item.label"
                :value="item.value" 
              > 
              </el-option>
            </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="complC" label="当天已完成订单行总数" width="200"></el-table-column>

          <el-table-column prop="uncomplC" label="已分配且未完成的订单行数量" width="220"></el-table-column>
          <el-table-column prop="comingC" label="正在进行订单行数量" width="180"></el-table-column>
          <el-table-column prop="instantRaion" label="瞬时平均效率（行/人/分钟）" width="220"></el-table-column>
          <!--新添加字段-->
          <el-table-column prop="complPercent" label="完成百分比" width="100"></el-table-column>
          <el-table-column prop="forecastComplDate" label="预计完成时间" width="200">
             <template slot-scope="scope">
                {{getDate(scope.row.forecastComplDate,true)}}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-if="SOrderListSearch.totalRows>0" class="pagination" background @current-change="SOrderListHandleCurrentChange"
                       :current-page.sync="SOrderListSearch.currentPage" :page-size="SOrderListSearch.pageSize" :page-sizes="[SOrderListSearch.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                       :total="SOrderListSearch.totalRows">
        </el-pagination>
      </div>
      <div class="tabConOther">
        <h4 class="h2">上架订单汇总</h4>
        <el-table :data='tableData.PutawayAllList' highlight-current-row v-loading="tableLoadingSJT" style="width: 100%" border>
          <el-table-column prop="inC" label="系统当天接收订单行数量" width="200"></el-table-column>
          <el-table-column prop="whiteWaveC" label="当天已创建波次订单行" width="180"></el-table-column>
          <el-table-column prop="blueWaveC" label="蓝领已提交订单行数量" width="190"></el-table-column>
          <el-table-column prop="blueUncomplC" label="蓝领已提交未完成订单行" width="190"></el-table-column>
          <el-table-column prop="uncomplC" label="当前未完成订单数量" width="130"></el-table-column>
          <el-table-column prop="comingC" label="正在进行订单数量" width="145"></el-table-column>
          <el-table-column prop="complC" label="当天已完成订单数量" width="130"></el-table-column>
          <el-table-column prop="instantRaion" label="瞬时平均效率（行/人/分钟）"  width="220"></el-table-column>
          <!--新添加字段-->
          <el-table-column prop="complPercent" label="完成百分比" width="100"></el-table-column>
          <el-table-column prop="forecastComplDate" label="预计完成时间" width="200">
             <template slot-scope="scope">
                {{getDate(scope.row.forecastComplDate,true)}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tabConOther">
        <h4 class="h2">上架</h4>
        <el-table :data='tableData.PutawayList' highlight-current-row v-loading="tableLoadingSJ" style="width: 100%" border>
          <el-table-column prop="entityWorkstationId" label="工作站编号" width="100"></el-table-column>
          <el-table-column prop="workstationStatus" label="工作状态" width="200">
             <template slot-scope="scope" width="100%">
              <el-select placeholder="工作状态" v-model="scope.row.workstationStatus" :disabled="true">
              <el-option
                v-for="item in WS_STATUS"
                :key="item.value"
                :label="item.label"
                :value="item.value" 
              > 
              </el-option>
            </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="complC" label="当天已完成订单行总数" width="175"></el-table-column>
          <el-table-column prop="dayWaveC" label="当天已提交订单行总数" width="175"></el-table-column>
          <el-table-column prop="currWaveC" label="蓝领本次已提交订单行总数" width="175"></el-table-column>
          <el-table-column prop="whiteUncomplC" label="蓝领已提交且未完成的订单行数量" width="220"></el-table-column>
          <el-table-column prop="comingC" label="正在进行订单行数量" width="160"></el-table-column>
          <el-table-column prop="instantRaion" label="瞬时平均效率（行/人/分钟）" width="220"></el-table-column>
          <!--新添加字段-->
          <el-table-column prop="complPercent" label="完成百分比" width="100"></el-table-column>
          <el-table-column prop="forecastComplDate" label="预计完成时间" width="200">
             <template slot-scope="scope">
                {{getDate(scope.row.forecastComplDate,true)}}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-if="PutawayListSearch.totalRows>0" class="pagination" background @current-change="PutawayListSearchHandleCurrentChange"
                       :current-page.sync="PutawayListSearch.currentPage" :page-size="PutawayListSearch.pageSize" :page-sizes="[PutawayListSearch.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                       :total="PutawayListSearch.totalRows">
        </el-pagination>
      </div>
      <div class="tabConOther">
        <h4 class="h2">调仓-拣出订单汇总</h4>
        <!--新添加表格-->
        <el-table :data='tableData.TiaoCangAllList' highlight-current-row v-loading="tableLoadingTCT" style="width: 100%" border>
           <el-table-column prop="inC" label="系统当天接收订单行总数" width="190"></el-table-column>
          <el-table-column prop="waveC" label="当天已创建波次订单行" width="200"></el-table-column>
          <el-table-column prop="complC" label="当天已完成订单行" width="150"></el-table-column>

          <el-table-column prop="uncomplC" label="当天未完成订单行" width="150"></el-table-column>
          <el-table-column prop="comingC" label="正在进行中订单行" width="150"></el-table-column>
          <el-table-column prop="instantRaion" label="瞬时平均效率（行/人/分钟）" width="220"></el-table-column>
          <!--新添加字段-->
           <el-table-column prop="complPercent" label="完成百分比" width="100"></el-table-column>
          <el-table-column prop="forecastComplDate" label="预计完成时间" width="200">
             <template slot-scope="scope">
                {{getDate(scope.row.forecastComplDate,true)}}
            </template>
          </el-table-column>
        </el-table>
      </div>
       <div class="tabConOther">
        <h4 class="h2">调仓-拣出订单</h4>
        <el-table :data='tableData.TiaoCangLists' highlight-current-row v-loading="tableLoadingTC" border>
          <el-table-column prop="entityWorkstationId" label="工作站编号" width="100"></el-table-column>
          <el-table-column prop="forecastWallCount" label="播种墙数量" width="100"></el-table-column>
          <el-table-column prop="workstationStatus" label="工作状态" width="200">
             <template slot-scope="scope" width="100%">
              <el-select placeholder="工作状态" v-model="scope.row.workstationStatus" :disabled="true">
              <el-option
                v-for="item in WS_STATUS"
                :key="item.value"
                :label="item.label"
                :value="item.value" 
              > 
              </el-option>
            </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="complC" label="当天已完成订单行总数" width="200"></el-table-column>

          <el-table-column prop="uncomplC" label="已分配且未完成的订单行数量" width="220"></el-table-column>
          <el-table-column prop="comingC" label="正在进行订单行数量" width="180"></el-table-column>
          <el-table-column prop="instantRaion" label="瞬时平均效率（行/人/分钟）" width="220"></el-table-column>
          <!--新添加字段-->
          <el-table-column prop="complPercent" label="完成百分比" width="100"></el-table-column>
          <el-table-column prop="forecastComplDate" label="预计完成时间" width="200">
             <template slot-scope="scope">
                {{getDate(scope.row.forecastComplDate,true)}}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-if="SOrderListSearch.totalRows>0" class="pagination" background @current-change="SOrderListHandleCurrentChange"
                       :current-page.sync="SOrderListSearch.currentPage" :page-size="SOrderListSearch.pageSize" :page-sizes="[SOrderListSearch.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                       :total="SOrderListSearch.totalRows">
        </el-pagination>
      </div>
       <div class="tabConOther">
        <h4 class="h2">召唤货架汇总</h4>
        <!--新添加表格-->
        <el-table :data='tableData.TiaoCangAllList' highlight-current-row v-loading="tableLoading" style="width: 100%" border>
           <el-table-column prop="inC" label="系统当天录入订单行总数" width="190"></el-table-column>
          <el-table-column prop="complC" label="当天已完成订单行" width="150"></el-table-column>

          <el-table-column prop="uncomplC" label="当天未完成订单行" width="150"></el-table-column>
          <el-table-column prop="comingC" label="正在进行中订单行" width="150"></el-table-column>
          <el-table-column prop="instantRaion" label="瞬时平均效率（行/人/分钟）" width="220"></el-table-column>
          <!--新添加字段-->
           <el-table-column prop="complPercent" label="完成百分比" width="100"></el-table-column>
          <el-table-column prop="forecastComplDate" label="预计完成时间" width="200">
             <template slot-scope="scope">
                {{getDate(scope.row.forecastComplDate,true)}}
            </template>
          </el-table-column>
        </el-table>
      </div>
       <div class="tabConOther">
        <h4 class="h2">召唤货架</h4>
        <el-table :data='tableData.TiaoCangLists1' highlight-current-row v-loading="tableLoading" border>
          <el-table-column prop="entityWorkstationId" label="工作站编号" width="100"></el-table-column>
          <el-table-column prop="forecastWallCount" label="播种墙数量" width="100"></el-table-column>
          <el-table-column prop="workstationStatus" label="工作状态" width="200">
             <template slot-scope="scope" width="100%">
              <el-select placeholder="工作状态" v-model="scope.row.workstationStatus" :disabled="true">
              <el-option
                v-for="item in WS_STATUS"
                :key="item.value"
                :label="item.label"
                :value="item.value" 
              > 
              </el-option>
            </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="complC" label="当天已完成订单行总数" width="200"></el-table-column>

          <el-table-column prop="uncomplC" label="已分配且未完成的订单行数量" width="220"></el-table-column>
          <el-table-column prop="comingC" label="正在进行订单行数量" width="180"></el-table-column>
          <el-table-column prop="instantRaion" label="瞬时平均效率（行/人/分钟）" width="220"></el-table-column>
          <!--新添加字段-->
          <el-table-column prop="complPercent" label="完成百分比" width="100"></el-table-column>
          <el-table-column prop="forecastComplDate" label="预计完成时间" width="200">
             <template slot-scope="scope">
                {{getDate(scope.row.forecastComplDate,true)}}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-if="SOrderListSearch.totalRows>0" class="pagination" background @current-change="SOrderListHandleCurrentChange"
                       :current-page.sync="SOrderListSearch.currentPage" :page-size="SOrderListSearch.pageSize" :page-sizes="[SOrderListSearch.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                       :total="SOrderListSearch.totalRows">
        </el-pagination>
      </div>
       <div class="tabConOther">
        <h4 class="h2">盘点订单汇总</h4>
        <!--新添加表格-->
        <el-table :data='tableData.TiaoCangAllList2' highlight-current-row v-loading="tableLoading" style="width: 100%" border>
           <el-table-column prop="inC" label="系统当天接收订单行总数" width="190"></el-table-column>
          <el-table-column prop="waveC" label="当天已创建波次订单行" width="200"></el-table-column>
          <el-table-column prop="complC" label="当天已完成订单行" width="150"></el-table-column>

          <el-table-column prop="uncomplC" label="当天未完成订单行" width="150"></el-table-column>
          <el-table-column prop="comingC" label="正在进行中订单行" width="150"></el-table-column>
          <el-table-column prop="instantRaion" label="瞬时平均效率（行/人/分钟）" width="220"></el-table-column>
          <!--新添加字段-->
           <el-table-column prop="complPercent" label="完成百分比" width="100"></el-table-column>
          <el-table-column prop="forecastComplDate" label="预计完成时间" width="200">
             <template slot-scope="scope">
                {{getDate(scope.row.forecastComplDate,true)}}
            </template>
          </el-table-column>
        </el-table>
      </div>
       <div class="tabConOther">
        <h4 class="h2">盘点订单</h4>
        <el-table :data='tableData.TiaoCangLists2' highlight-current-row v-loading="tableLoading" border>
          <el-table-column prop="entityWorkstationId" label="工作站编号" width="100"></el-table-column>
          <el-table-column prop="forecastWallCount" label="播种墙数量" width="100"></el-table-column>
          <el-table-column prop="workstationStatus" label="工作状态" width="200">
             <template slot-scope="scope" width="100%">
              <el-select placeholder="工作状态" v-model="scope.row.workstationStatus" :disabled="true">
              <el-option
                v-for="item in WS_STATUS"
                :key="item.value"
                :label="item.label"
                :value="item.value" 
              > 
              </el-option>
            </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="complC" label="当天已完成订单行总数" width="200"></el-table-column>

          <el-table-column prop="uncomplC" label="已分配且未完成的订单行数量" width="220"></el-table-column>
          <el-table-column prop="comingC" label="正在进行订单行数量" width="180"></el-table-column>
          <el-table-column prop="instantRaion" label="瞬时平均效率（行/人/分钟）" width="220"></el-table-column>
          <!--新添加字段-->
          <el-table-column prop="complPercent" label="完成百分比" width="100"></el-table-column>
          <el-table-column prop="forecastComplDate" label="预计完成时间" width="200">
             <template slot-scope="scope">
                {{getDate(scope.row.forecastComplDate,true)}}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-if="SOrderListSearch.totalRows>0" class="pagination" background @current-change="SOrderListHandleCurrentChange"
                       :current-page.sync="SOrderListSearch.currentPage" :page-size="SOrderListSearch.pageSize" :page-sizes="[SOrderListSearch.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                       :total="SOrderListSearch.totalRows">
        </el-pagination>
      </div>
     </div> 
    <div class="tabConOther lineCon" id="tabContainer">
      <div class="grid-content bg-purple-dark">
        <el-tabs id="topTitle" v-model="search.orderType" >
          <!--@tab-click="handleTabClick"-->
          <el-tab-pane label="拣货S" name="S"></el-tab-pane>
          <el-tab-pane label="拣货V" name="V"></el-tab-pane>
          <el-tab-pane label="上架" name="S1"></el-tab-pane>
          <el-tab-pane label="调仓-拣出" name="RELOC"></el-tab-pane>
          <el-tab-pane label="调仓-召唤货架" name="S2"></el-tab-pane>
          <el-tab-pane label="盘点" name="S3"></el-tab-pane>
        </el-tabs>
        <div class="clears">
          <h4 class="h2 fl">24小时订单完成统计</h4>
          <span class="fr">2019-03-05</span>
        </div>
        <div id="myChart" style="width: 100%;height: 400px;"></div>
      </div>
    </div>

    </div>
</template>
<script>
// import qs from 'qs'
import axios from '../../util/http'
import dateFormat from '../../util/date'
import EnumSelect from '../../util/enum'
import echarts from 'echarts'
export default {
  name: 'Order',
  data () {
    return {
      axios,
      dateFormat,
      tableLoading: false,
      WS_STATUS: [],
      tableLoadingSDT: false,
      tableLoadingSD: false,
      tableLoadingVDT: false,
      tableLoadingVD: false,
      tableLoadingSJT: false,
      tableLoadingSJ: false,
      tableLoadingTCT: false,
      tableLoadingTC: false,
      timer: '',
      search: { // 查询参数
        orderType: 'S',
        ispDealer: '',
        ictDealer: '',
        currentPage: 1
      },
      tableData: {
        Vlist: [],
        VOrderList: [],
        SList: [],
        SOrderList: [],
        PutawayAllList: [],
        PutawayList: [],
        TiaoCangAllList: [],
        TiaoCangLists: [],
        PickOutOrdersList: [],
        ShelvesToalList: [],
        OrderSummaryList: [],
        SetPointList: []
      },
      VOrderListSearch: {
        totalRows: -1,
        pageSize: -1,
        currentPage: 1,
        extWorkstationType: 'V'
      },
      SOrderListSearch: {
        totalRows: -1,
        pageSize: -1,
        currentPage: 1,
        extWorkstationType: 'S'
      },
      PutawayListSearch: {
        totalRows: -1,
        pageSize: -1,
        currentPage: 1
      }

    }
  },
  // 页面加
  mounted () {
    this.getTimeOut()
    this.getSelectValues()
  },
  created () {
    // window.setInterval(() => {
    // setTimeout(this.getTimeOut(), 0)
    // }, 60000)
  },
  methods: {
    getDate(data, flag) {
      return this.dateFormat(data, flag)
    },
    getSelectValues() {
      let Enum = EnumSelect()
      this.WS_STATUS = Enum.WS_STATUS
    },
    getTimeOut() {
      this.getPutaway()
      this.getPutawayData()
      this.getSData()
      this.getVData()
      this.getVAllData()
      this.getSAllData()
      this.drawLine()
      this.getTiaoCangAllList()
      this.getTiaoCangLists()
    },
    getDayTime() {
    },
    getVAllData () { // 获取拣货V单汇总
      let that = this
      this.tableLoadingVDT = true
      this.axios.get('kanban/orderKanban/selectDmlPickDeliveryStatList', {
        params: {
          orderType: 'V'
        }
      }).then((res) => {
        if (res.errCode === 'S') {
          console.log(res)
          that.tableData.Vlist = res.data.result
        }
      })
      this.tableLoadingVDT = false
    },
    getVData () { // 获取拣货V单
      let that = this
      this.tableLoadingVD = true
      this.axios.get('kanban/orderKanban/selectDmlPickDeliveryWsStatList', {
        params: that.VOrderListSearch
      }).then((res) => {
        if (res.errCode === 'S') {
          console.log(res)
          that.tableData.VOrderList = res.data.result
        }
      })
      this.tableLoadingVD = false
    }, // V单分页
    VOrderListSearchHandleCurrentChange (val) {
      this.VOrderListSearch.currentPage = val
      this.getVData()
    },
    // 获取拣货S单汇总
    getSAllData () {
      let that = this
      this.tableLoadingSDT = true
      this.axios.get('kanban/orderKanban/selectDmlPickDeliveryStatList', {
        params: {
          orderType: 'S'
        }
      }).then((res) => {
        if (res.errCode === 'S') {
          console.log(res)
          that.tableData.SList = res.data.result
        }
      })
      this.tableLoadingSDT = false
    }, // S单分页
    SOrderListHandleCurrentChange (val) {
      this.SOrderListSearch.currentPage = val
      this.getSData()
    },
    // 获取拣货S单
    getSData () {
      let that = this
      this.tableLoadingSD = true
      this.axios.get('kanban/orderKanban/selectDmlPickDeliveryWsStatList', {
        params: that.SOrderListSearch
      }).then((res) => {
        if (res.errCode === 'S') {
          that.tableData.SOrderList = res.data.result
        }
      })
      this.tableLoadingSD = false
    }, // 获取拣货S单汇总
    getTiaoCangAllList() {
      this.tableLoadingTCT = true
      let that = this
      this.axios.get('kanban/orderKanban/selectDmlPickDeliveryStatList', {
        params: {
          orderType: 'RELOC'
        }
      }).then((res) => {
        if (res.errCode === 'S') {
          console.log(res)
          that.tableData.TiaoCangAllList = res.data.result
        }
      })
      this.tableLoadingTCT = false
    },
    getTiaoCangLists() {
      this.tableLoadingTC = true
      let that = this
      this.axios.get('kanban/orderKanban/selectDmlPickDeliveryWsStatList', {
        params: {
          extWorkstationType: 'RELOC'
        }
      }).then((res) => {
        if (res.errCode === 'S') {
          console.log(res)
          that.tableData.TiaoCangLists = res.data.result
        }
      })
      this.tableLoadingTC = false
    }, // 上架订单汇总
    getPutawayData () {
      this.tableLoadingSJT = true
      this.axios.get('kanban/orderKanban/selectDmlBinDeliveryStatList', {}).then((res) => {
        if (res.errCode === 'S') {
          let result = []
          result.push(res.data.result)
          this.tableData.PutawayAllList = result
        }
      })
      this.tableLoadingSJT = false
    },
    // 上架
    getPutaway () {
      let that = this
      this.tableLoadingSJ = true
      this.axios.get('kanban/orderKanban/selectDmlBinDeliveryWsStatList', {
        params: that.PutawayListSearch
      }).then((res) => {
        // console.log(res);
        if (res.errCode === 'S') {
          console.log(res.data.result)
          that.tableData.PutawayList = res.data.result
        }
      })
      this.tableLoadingSJ = false
    }, // 上架分页
    PutawayListSearchHandleCurrentChange (val) {
      this.PutawayListSearch.currentPage = val
      this.getPutaway()
    }, // 切换
    drawLine () { // 统计图
      let mychart = echarts.init(document.getElementById('myChart'))
      mychart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          top: 30,
          right: 50
        },
        dataZoom: [
          {
            type: 'inside',
            show: true,
            xAxisIndex: [0]
          }
        ],
        xAxis: {
          axisLabel: {
            interval: 0,
            rotate: 40 },

          data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
        },
        yAxis: {},
        series: [{
          name: '订单',
          type: 'bar',
          data: [4, 65, 79, 10, 90, 80, 62, 88, 100, 120, 230, 330, 160, 230, 350, 460, 880, 1000, 122, 580, 980, 440], // 需要填写的Y动态数据
          barWidth: 30
        }]
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .mainOrder{
    font-weight: 650;
    color: #333;
  }
  .mainOrder el-table{
    text-align: center!important;
  }
  .tabCon{
    margin-top: 25px;
  }
  .tabConOther{
    margin-bottom: 50px;
  }
  .tabConOther >.h2,.tabConLast>.h2{
    margin:10px 0;
    font-size: 18px;
    font-weight: bold;
  }
  #mainTabCon{
    margin: 40px auto 50px;
  }
  .lineCon,#mainTabCon{
    border: 1px solid #e6e6e6;
    padding: 0 5px 20px;
    box-sizing: border-box;
    -o-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .lineCon{
    padding: 10px 5px 30px;
  }
  .clears{
    width: 90%;
    margin: 25px auto 30px;
  }
  .clears .h2{
    font-size: 16px;
    font-weight: bold;
  }
  .clears:after{
    display: block;
    content: '';
    clear: both;
    height: 0;
    visibility:hidden;
    overflow: hidden;
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
</style>
<style>
  html{
    color: #333333;
    font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC';
  }
  .el-table th .cell{
    text-align: center!important;
    font-size: 15px;
    color: #000;
  }
  .el-table th>.cell{
    text-align: center!important;
    font-size: 15px;
  }
  .el-col .title{
    font-size: 24px;
    font-weight: bolder;
  }
  .el-breadcrumb__item .el-breadcrumb__inner,.el-breadcrumb__separator{
    font-size: 18px!important;
  }
  .el-table__empty-block .el-table__empty-text{
    font-size: 15px;
  }
  #tabContainer .el-tabs__nav-wrap {
    width: 90%;
    margin: 0 auto;
  }
  .mainOrder tbody .el-table__row td .cell{
    text-align: center;
  }
  .mainOrder .pagination{
    text-align: right;
  }
</style>
