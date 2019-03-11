<template>
  <div class="charingCon">
    <h4 class="h2">充电桩信息</h4>
    <el-table :data='tableData.list' highlight-current-row v-loading="tableLoading" style="width: 100%" border>
      <el-table-column prop="chargePointId" label="充电桩编码">
      </el-table-column>
      <el-table-column prop="activeFlag" label="是否启用">
      </el-table-column>
      <el-table-column prop="chargeStatus" label="是否在线">
      </el-table-column>
      <el-table-column prop="posX" label="X轴位置">
      </el-table-column>
      <el-table-column prop="posY" label="Y轴位置">
      </el-table-column>
      <el-table-column prop="offsetDirectioin" label="方向">
      </el-table-column>
      <el-table-column prop="externalDevice" label="充电信息">
      </el-table-column>

      <el-table-column prop="chargingKidId" label="正在充电机器人编码">
      </el-table-column>
      <el-table-column prop="creationDate" label="最后更新日期">
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
    this.getPostReqs()
  },
  methods: {
    getPostReqs () {
      let that = this
      this.axios.get('kanban/csChargePointInfoV/selectCsChargePointInfoVList', {
        params: that.listSearch
      }).then((res) => {
        // console.log(res);
        if (res.errCode === 'S') {
          console.log(res.data.result)
          that.tableData.list = res.data.result
          // that.listSearch.totalRows = res.data.totalRows
          // that.listSearch.pageSize = res.data.pageSize
        }
      })
    }, // 单分页
    listSearchHandleCurrentChange (val) {
      this.listSearch.currentPage = val
      this.getPostReqs()
    }
  }
}
</script>
<style scoped>
  .charingCon{
    margin: 40px 0 50px;
    border: 1px solid #e6e6e6;
    padding: 0 5px 40px 5px;
    box-sizing: border-box;
    -o-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .charingCon >.h2{
    font-size: 18px;
    font-weight: bold;
    margin:10px 0;
  }
</style>
