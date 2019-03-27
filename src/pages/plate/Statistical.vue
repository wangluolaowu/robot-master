
<template>
  <div class="robotInfo">
    <div class="tabOne">
      <h4 class="h2">统计信息</h4>
      <div class="grid-content bg-purple-dark">
        <el-tabs id="topTitle" v-model="search.orderType" @tab-click="handleTabClick">
          <el-tab-pane label="拣货S" name="S"></el-tab-pane>
          <el-tab-pane label="拣货V" name=""></el-tab-pane>
          <el-tab-pane label="上架" name=""></el-tab-pane>
          <el-tab-pane label="调仓-拣出" name=""></el-tab-pane>
          <el-tab-pane label="调仓-召唤货架" name=""></el-tab-pane>
          <el-tab-pane label="盘点" name=""></el-tab-pane>
        </el-tabs>
        <div class="canvasOne">
          <div class="clears">
            <h4 class="h2 fl">30天订单完成统计</h4>
            <div class="fr">
              <span class="startTime">2019-03-05</span>
              <span >——</span>
              <span class="endTime">2019-04-05</span>
            </div>
          </div>
          <div id="myChart" style="width: 100%;height: 400px;"></div>
        </div>
        <div class="canvasOne">
          <div class="clears">
            <h4 class="h2 fl">30天订单完成统计</h4>
            <div class="fr">
              <span class="startTime">2019-03-05</span>
              <span >——</span>
              <span class="endTime">2019-04-05</span>
            </div>
          </div>
          <div id="myChart2" style="width: 100%;height: 400px;"></div>
        </div>
      </div>
    </div>
    <div class="tabOne">
      <h4 class="h2">订单流水</h4>
      <el-table :data='tableData.list' highlight-current-row v-loading="tableLoading" style="width: 100%" border>
        <el-table-column prop="attribute07" label="客户编码" width="100">
        </el-table-column>
        <el-table-column prop="attribute08" label="客户名称" width="100">
        </el-table-column>
        <el-table-column prop="attribute03" label="WIP号" width="80">
        </el-table-column>
        <el-table-column prop="attribute04" label="WIP订单行" width="100">
        </el-table-column>
        <el-table-column prop="attribute01" label="拣货记录" width="100">
        </el-table-column>
        <el-table-column prop="attribute10" label="路线">
        </el-table-column>
        <el-table-column prop="attribute09" label="订单类型" width="100">
        </el-table-column>
        <el-table-column prop="locNum" label="货位">
        </el-table-column>
        <el-table-column prop="skuNum" label="零件编码" width="100">
        </el-table-column>
        <el-table-column prop="orderInDate" label="下单日期" width="130">
        </el-table-column>
        <!--<el-table-column prop="orderInDate" :formatter="formatDate(orderInDate)" label="下单日期">
        </el-table-column>-->
        <el-table-column prop="orderInDate" label="打印时间" width="130">
        </el-table-column>
        <el-table-column prop="ipsDealer" label="ISP经销商" width="100">
        </el-table-column>
        <el-table-column prop="ipsDealer" label="ICP经销商" width="100">
        </el-table-column>
        <el-table-column prop="dmlOrderStatus" label="订单状态" width="100">
        </el-table-column>
        <el-table-column prop="orderInDate" label="导入时间" width="130">
        </el-table-column>
        <el-table-column prop="waveCreateDate" label="创建波次" width="100">
        </el-table-column>
        <el-table-column prop="lastUpdateDate" label="完成时间" width="130">
        </el-table-column>
      </el-table>
      <el-pagination v-if="listSearch.totalRows>0" class="pagination" background @current-change="listSearchHandleCurrentChange"
                        :current-page.sync="listSearch.currentPage" :page-size="listSearch.pageSize" :page-sizes="[listSearch.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                        :total="listSearch.totalRows">
    </el-pagination>
    </div>
  </div>
</template>
<script>
  import axios from '../../util/http'
  import echarts from 'echarts'
  export default {
    data () {
      return {
        axios,
        tableLoading: false,
        tableData: {
          list: []
        },
        listSearch: {
          totalRows: -1,
          pageSize: -1,
          currentPage: 1
        },
        search: { // 查询参数
          orderType: 'S',
          ispDealer: '',
          ictDealer: '',
          currentPage: 1
        },
      }
    },
    mounted () {
      this.getPostOne()
      this.drawLine()
      this.drawLineTwo()
    },
    methods: {
      getPostOne () {
        let that = this
        this.axios.get('kanban/orderSum/selectDmlPickDetailsVList', {
          params: that.listSearch
        }).then((res) => {
          // console.log(res);
          if (res.errCode === 'S') {
            console.log(res.data.result)
            that.tableData.list = res.data.result
            that.listSearch.totalRows = res.data.totalRows
            that.listSearch.pageSize = res.data.pageSize
          }
        })
      }, // 单分页
      listSearchHandleCurrentChange (val) {
        this.listSearch.currentPage = val
        this.getPostOne()
      },
      //切换
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
        this.axios.get('/pickManage/pickInfo/selectDmlPickCreateWaveVList', {
          params: that.search
        }).then((res) => {
          if (res.errCode === 'S') {
            that.tableData = res.data.result
            that.totalRows = res.data.totalRows
            that.pageSize = res.data.pageSize
          }
        })
      },
      //统计图
      drawLine () {
        let mychart = echarts.init(document.getElementById('myChart'))
        axios.get('kanban/orderKanban/selectDmlBinDeliveryStatList', {}).then((res) => {
          console.log(res)
          if (res.success) {
            var DataSource = res.data
            console.log(DataSource)
          }
        }).catch((err) => {
          console.log(err)
        })
        mychart.setOption({
          tooltip:{
            trigger:'axis',
            axisPointer:{
              type: 'cross'
            }
          },
          legend:{
            top:30,
            right:50
          },
          dataZoom:[
            {
              type:'inside',
              show:true,
              xAxisIndex:[0],
              start:5,
              end:20
            }
          ],
          xAxis:{
            axisLabel: {
              interval:0,
              rotate:40
            },
            //x轴的动态数据需要填写在则里面
            data:['0:00','1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00']
          },
          yAxis: {},
          series: [{
            name:"订单",
            type:'bar',
            data:[4,65,79,10,90,80,62,88,100,120,230,330,160,230,350,460,880,1000,122,580,980,440],//需要填写的Y动态数据
            barWidth:20
          }]
        })
      },
      drawLineTwo () {
        let mychartss = echarts.init(document.getElementById('myChart2'))
        axios.get('kanban/orderKanban/selectDmlBinDeliveryStatList', {}).then((res) => {
          console.log(res)
          if (res.success) {
            var DataSource = res.data
            console.log(DataSource)
          }
        }).catch((err) => {
          console.log(err)
        })
        mychartss.setOption({
          tooltip:{
            trigger:'axis',
            axisPointer:{
              type: 'cross'
            }
          },
          legend:{
            top:30,
            right:50
          },
          dataZoom:[
            {
              type:'inside',//inside,slider
              show:true,
              xAxisIndex:[0],
              start:5,
              end:20
            }
          ],
          xAxis:{
            axisLabel: {
              interval:0,
              rotate:40
            },
            //x轴的动态数据需要填写在则里面
            data:['0:00','1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00']
          },
          yAxis: {},
          series: [{
            name:"订单",
            type:'bar',
            data:[4,65,79,10,90,80,62,88,100,120,230,330,160,230,350,460,880,1000,122,580,980,440],//需要填写的Y动态数据
            barWidth:30
          }]
        })
      }
    },

    filters: {
      formatDate (time) {
        var date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    }
  }
</script>
<style scoped>
  .tabOne{
    border: 1px solid #e6e6e6;
    padding: 0 5px 40px 5px;
    box-sizing: border-box;
    -o-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    margin-top: 40px;
  }
  .tabOne >.h2{
    font-size: 18px;
    font-weight: bold;
    margin: 10px 0px;
  }
  .tabTwo{
    margin-top: 40px;
  }

  /*统计图*/
  .canvasOne{
    width: 90%;
    margin: 25px auto 30px;
  }
  .clears .h2,.canvasOne .fr span{
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
  .robotInfo .el-tabs__nav-wrap {
    width: 90%;
    margin: 0 auto;
  }
</style>
