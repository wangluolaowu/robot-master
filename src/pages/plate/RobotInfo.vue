<template>
  <div class="robotInfo">
    <div class="tabOne">
      <h4 class="h2">故障机器人清单</h4>
      <el-table :data='tableData.list' highlight-current-row v-loading="tableLoading" style="width: 100%" border>
        <el-table-column prop="kidId" label="机器人编码">
        </el-table-column>
        <el-table-column prop="batteryFaultCode" label="错误类型">
        </el-table-column>
        <el-table-column prop="posX" label="X轴位置">
        </el-table-column>
        <el-table-column prop="posY" label="Y轴位置">
        </el-table-column>
        <el-table-column prop="kidStatus" label="状态">
        </el-table-column>
        <el-table-column prop="kidTaskId" label="任务编码">
        </el-table-column>
        <el-table-column prop="holderId" label="货架编码">
        </el-table-column>
        <el-table-column prop="batteryPower" label="电量（%）">
        </el-table-column>
        <el-table-column prop="lastUpdateDate" label="最后更新日期" width="130">
        </el-table-column>
      </el-table>
      <el-pagination v-if="listSearch.totalRows>0" class="pagination" background @current-change="listSearchHandleCurrentChange"
                        :current-page.sync="listSearch.currentPage" :page-size="listSearch.pageSize" :page-sizes="[listSearch.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                        :total="listSearch.totalRows">
    </el-pagination>
    </div>
    <div class="tabOne tabTwo">
      <h4 class="h2">疑似异常机器人任务（执行时间超过3分钟）</h4>
      <el-table :data='tableData.list1' highlight-current-row v-loading="tableLoading" style="width: 100%" border>
        <el-table-column prop="kidIncharge" label="机器人编码" width="100">
        </el-table-column>
        <el-table-column prop="taskId" label="任务编码" width="100">
        </el-table-column>
        <el-table-column prop="tasktType" label="任务类型" width="100">
        </el-table-column>
        <el-table-column prop="taskStatus" label="任务状态" width="100">
        </el-table-column>
        <el-table-column prop="srcPosX" label="初始位置X" width="100">
        </el-table-column>
        <el-table-column prop="srcPosY" label="初始位置Y" width="100">
        </el-table-column>
        <el-table-column prop="posX" label="实时位置X" width="100">
        </el-table-column>
        <el-table-column prop="posY" label="实时位置Y" width="100">
        </el-table-column>
        <el-table-column prop="destPosX" label="目标位置X" width="100">
        </el-table-column>
        <el-table-column prop="destPosY" label="目标位置Y" width="100">
        </el-table-column>
        <el-table-column prop="object_Id" label="货架编码" width="100">
        </el-table-column>
        <el-table-column prop="wsId" label="工作站编码" width="100">
        </el-table-column>
        <el-table-column prop="creationDate" label="创建日期" width="130">
        </el-table-column>
        <el-table-column prop="lastUpdateDate" label="最后更新日期" width="130">
        </el-table-column>
      </el-table>
      <el-pagination v-if="list1Search.totalRows>0" class="pagination" background @current-change="list1SearchHandleCurrentChange"
                        :current-page.sync="list1Search.currentPage" :page-size="list1Search.pageSize" :page-sizes="[list1Search.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                        :total="list1Search.totalRows">
    </el-pagination>
    </div>
    <div class="tabOne tabTwo">
      <h4 class="h2">载货机器人疑似故障信息</h4>
      <el-table :data='tableData.list2' highlight-current-row v-loading="tableLoading" style="width: 100%" border>
        <el-table-column prop="kidIncharge" label="机器人编码" width="100">
        </el-table-column>
        <el-table-column prop="taskId" label="任务编码" width="85">
        </el-table-column>
        <el-table-column prop="taskType" label="任务类型" width="85">
        </el-table-column>
        <el-table-column prop="taskStatus" label="任务状态" width="85">
        </el-table-column>
        <el-table-column prop="srcPosX" label="初始位置X" width="100">
        </el-table-column>
        <el-table-column prop="srcPosY" label="初始位置Y" width="100">
        </el-table-column>
        <el-table-column prop="posX" label="实时位置X" width="100">
        </el-table-column>
        <el-table-column prop="posY" label="实时位置Y" width="100">
        </el-table-column>
        <el-table-column prop="destPosX" label="目标位置X" width="100">
        </el-table-column>
        <el-table-column prop="destPosY" label="目标位置Y" width="100">
        </el-table-column>
        <el-table-column prop="destObjectSide" label="到达目的地后货架边" width="160">
        </el-table-column>
        <el-table-column prop="destObjectDirection" label="到达目的地后货架方向" width="175">
        </el-table-column>
        <el-table-column prop="objectGrossWeight" label="货架总重量" width="100">
        </el-table-column>
        <el-table-column prop="objectId" label="货架编码" width="100">
        </el-table-column>
        <el-table-column prop="releaseLoadFlag" label="是否举升" width="100">
        </el-table-column>
        <el-table-column prop="chargePointId" label="充电桩编码" width="100">
        </el-table-column>
        <el-table-column prop="wsId" label="工作站编码" width="100">
        </el-table-column>
        <el-table-column prop="creationDate" label="创建日期" width="100">
        </el-table-column>
        <el-table-column prop="lastUpdateDate" label="最后更新日期" width="150">
        </el-table-column>
      </el-table>
      <el-pagination v-if="list2Search.totalRows>0" class="pagination" background @current-change="list2SearchHandleCurrentChange"
                        :current-page.sync="list2Search.currentPage" :page-size="list2Search.pageSize" :page-sizes="[list2Search.pageSize]" layout="total, sizes, prev, pager, next, jumper"
                        :total="list2Search.totalRows">
    </el-pagination>
    </div>
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
        list: [],
        list1: [],
        list2: []
      },
      listSearch: {
        totalRows: -1,
        pageSize: -1,
        currentPage: 1
      },
      list1Search: {
        totalRows: -1,
        pageSize: -1,
        currentPage: 1
      },
      list2Search: {
        totalRows: -1,
        pageSize: -1,
        currentPage: 1
      }

    }
  },
  mounted () {
    this.getPostOne()
    this.getPostTwo()
    this.getPostThree()
  },
  methods: {
    getPostOne () {
      let that = this
      this.axios.get('kanban/kidInfoV/selectKidInfoVList', {
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
    },
    listSearchHandleCurrentChange (val) {
      this.listSearch.currentPage = val
      this.getPostOne()
    },
    getPostTwo () {
      let that = this
      this.axios.get('kanban/kidInfoV/selectKidTaskAbnormalVList', {
        params: that.list1Search
      }).then((res) => {
        // console.log(res);
        if (res.errCode === 'S') {
          console.log(res.data.result)
          that.tableData.list1 = res.data.result
          that.list1Search.totalRows = res.data.totalRows
          that.list1Search.pageSize = res.data.pageSize
        }
      })
    },
    list1SearchHandleCurrentChange (val) {
      this.list1Search.currentPage = val
      this.getPostTwo()
    },
    getPostThree () {
      let that = this
      this.axios.get('kanban/kidInfoV/selectKidTaskDestOccupiedVList', {
        params: that.list2Search
      }).then((res) => {
        // console.log(res);
        if (res.errCode === 'S') {
          console.log(res.data.result)
          that.tableData.list2 = res.data.result
          that.list2Search.totalRows = res.data.totalRows
          that.list2Search.pageSize = res.data.pageSize
        }
      })
    },
    list2SearchHandleCurrentChange (val) {
      this.list2Search.currentPage = val
      this.getPostThree()
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
  .tabTwo{
    margin-top: 50px;
  }
  .tabOne >.h2{
    font-size: 18px;
    margin: 10px 0;
    font-weight: bold;
  }
</style>

