<template>
  <div class="workStation">
    <h4 class="h2">工作站信息</h4>
    <el-table :data='tableData.list' highlight-current-row v-loading="tableLoading" style="width: 100%" border>
      <el-table-column prop="entityWorkstationId" label="工作站编码">
      </el-table-column>
      <el-table-column prop="wallCount" label="播种墙数量">
      </el-table-column>
      <el-table-column prop="userNum" v-model="isShow" label="是否在线">
      </el-table-column>
      <el-table-column prop="workstationStatus" label="工位状态">
        <template slot-scope="scope" width="100%">
              <el-select placeholder="工作状态" v-model="scope.row.workstationStatus" :disabled="false">
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
      <el-table-column prop="workstationType" label="工作类型">
         <template slot-scope="scope" width="100%">
              <el-select placeholder="工作类型" v-model="scope.row.workstationType" :disabled="false">
              <el-option
                v-for="item in WS_TYPE"
                :key="item.value"
                :label="item.label"
                :value="item.value" 
              > 
              </el-option>
            </el-select>
         </template>
      </el-table-column>
      <el-table-column prop="lastUpdateDate" label="最后更新日期">
         <template slot-scope="scope">
                {{getDate(scope.row.lastUpdateDate,true)}}
            </template>
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
import dateFormat from '../../util/date'
export default {
  data () {
    return {
      axios,
      dateFormat,
      tableLoading: false,
      WS_STATUS: [],
      WS_TYPE: [],
      tableData: {
        list: []
      },
      listSearch: {
        totalRows: -1,
        pageSize: -1,
        currentPage: 1
      },
      isShow: ''
    }
  },
  mounted () {
    this.getEnumSelectValues()
  },
  methods: {
    getDate(data, flag) {
      return this.dateFormat(data, flag)
    },
    getEnumSelectValues() {
      this.tableLoading = true
      let that = this
      this.axios.get('common/enum/selectEnumList', {
        params: 'test'
      }).then((res) => {
        if (res.errCode === 'S') {
          that.tableData.list = res.data.result
          res.data.result.map(item => {
            if (item.lookupType === 'WS_STATUS') {
              item.value = item.lookupValueNum
              item.label = item.lookupValueCode
              this.WS_STATUS.push(item)
            }
            if (item.lookupType === 'WS_TYPE') {
              item.value = item.lookupValueNum
              item.label = item.lookupValueCode
              this.WS_TYPE.push(item)
            }
            return item
          })
        }
        this.getPostReq()
      })
    },
    getPostReq () {
      let that = this
      this.axios.get('kanban/wsWorkstationInfo/selectWsWorkStationInfoVList', {
        params: that.listSearch
      }).then((res) => {
        if (res.errCode === 'S') {
          that.tableData.list = res.data.result.map(item => {
            if (item.userNum) {
              item.userNum = '在线'
            } else {
              item.userNum = '离线'
            }
            return item
          })
          that.listSearch.totalRows = res.data.totalRows
          that.listSearch.pageSize = res.data.pageSize
        }
        this.tableLoading = false
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
<style>
 .el-table__row td .cell,.has-gutter tr th .cell{
    text-align: center!important;
    color: #000!important;
  }
  .pagination{
    text-align: right;
  }
</style>
