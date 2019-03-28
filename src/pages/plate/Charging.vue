<template>
  <div class="charingCon">
    <h4 class="h2">充电桩信息</h4>
    <el-table :data='tableData.list' highlight-current-row v-loading="tableLoading" style="width: 100%" border>
      <el-table-column prop="chargePointId" label="充电桩编码">
      </el-table-column>
      <el-table-column prop="activeFlag" label="是否启用">
      </el-table-column>
      <el-table-column prop="connAliveFlag" label="是否在线">
      </el-table-column>
      <el-table-column prop="posX" label="X轴位置">
      </el-table-column>
      <el-table-column prop="posY" label="Y轴位置">
      </el-table-column>
      <el-table-column prop="offsetDirectioin" label="方向">
         <template slot-scope="scope" width="100%">
              <el-select placeholder="方向" v-model="scope.row.offsetDirectioin" :disabled="true">
              <el-option
                v-for="item in MD_MAP_DIRECTION_LIMIT"
                :key="item.value"
                :label="item.label"
                :value="item.value" 
              > 
              </el-option>
            </el-select>
         </template>
      </el-table-column>
      <el-table-column prop="externalDevice" label="充电信息">
      </el-table-column>

      <el-table-column prop="chargingKidId" label="正在充电机器人编码" width="200">
      </el-table-column>
      <el-table-column prop="lastUpdateDate" label="最后更新日期" width="200">
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
      MD_MAP_DIRECTION_LIMIT: [],
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
            if (item.lookupType === 'MD_MAP_DIRECTION_LIMIT') {
              item.value = item.lookupValueNum
              item.label = item.lookupValueCode
              this.MD_MAP_DIRECTION_LIMIT.push(item)
            }
            return item
          })
        }
        this.getPostReqs()
      })
    },
    getPostReqs () {
      let that = this
      this.axios.get('kanban/csChargePointInfoV/selectCsChargePointInfoVList', {
        params: that.listSearch
      }).then((res) => {
        // console.log(res);
        if (res.errCode === 'S') {
          console.log(res.data.result)
          that.tableData.list = res.data.result.map(item => {
            if (item.chargingKidId !== 0) {
              item.externalDevice = '正在充电'
            } else {
              item.externalDevice = '未充电'
            }
            if (item.activeFlag === 1) {
              item.activeFlag = '是'
            } else {
              item.activeFlag = '否'
            }
            if (item.connAliveFlag && item.connAliveFlag === 1) {
              item.connAliveFlag = '是'
            } else {
              item.connAliveFlag = '否'
            }
            return item
          })
          this.tableLoading = false
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
