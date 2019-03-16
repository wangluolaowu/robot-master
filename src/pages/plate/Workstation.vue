<template>
  <div class="workStation">
    <h4 class="h2">工作站信息</h4>
    <el-table :data='tableData.list' highlight-current-row v-loading="tableLoading" style="width: 100%" border>
      <el-table-column prop="curtWorkstationId" label="工作站编码">
      </el-table-column>
      <el-table-column prop="wallCount" label="播种墙数量">
      </el-table-column>
      <el-table-column prop="order_num3" label="是否在线">
      </el-table-column>
      <el-table-column prop="workstationStatus" label="工位状态">
      </el-table-column>
      <el-table-column prop="workstationType" label="工作类型">
      </el-table-column>
      <el-table-column prop="order_num5" label="最后更新日期">
      </el-table-column>
    </el-table>
    <el-pagination v-if="listSearch.totalRows>0" class="pagination" background @current-change="listSearchHandleCurrentChange"
                        :current-page.sync="listSearch.currentPage" :page-size="listSearch.pageSize" :page-sizes="[listSearch.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                        :total="listSearch.totalRows">
    </el-pagination>
  </div>
</template>
<script>
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
    this.getPostReq()
  },
  methods: {
    getPostReq () {
      let that = this
      this.axios.get('kanban/wsWorkstationInfo/selectWsWorkStationInfoVList', {
        params: that.listSearch
      }).then((res) => {
        if (res.errCode === 'S') {
          console.log(res.data.result)
          that.tableData.list = res.data.result
        }
      })
    },
    // 单分页
    listSearchHandleCurrentChange (val) {
      this.listSearch.currentPage = val
      this.getPostReq()
    }
  }
}
</script>
<style scoped>
  .workStation{
    margin: 40px 0 50px;
    border: 1px solid #e6e6e6;
    padding: 0 5px 40px 5px;
    box-sizing: border-box;
    -o-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .workStation >.h2{
    margin:10px 0;
    font-size: 18px;
    font-weight: bold;
  }
</style>
