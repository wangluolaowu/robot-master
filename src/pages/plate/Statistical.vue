
<template>
  <div class="robotInfo">
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
import {formatDate} from '../../util/date.js' // 注意路径
import axios from '../../util/http'
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
      }
    }
  },
  mounted () {
    this.getPostOne()
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
        }
      })
    }, // 单分页
    listSearchHandleCurrentChange (val) {
      this.listSearch.currentPage = val
      this.getPostOne()
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
</style>
