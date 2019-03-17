<template>
  <div>
    <el-row>
      <el-col :span="23" class="main">
        <div class="grid-content bg-purple-dark">
          <el-tabs v-model="search.orderType" @tab-click="handleTabClick">
            <el-tab-pane label="订单类型S" name="S"></el-tab-pane>
            <el-tab-pane label="订单类型V" name="V"></el-tab-pane>
          </el-tabs>
          <!-- 搜索区域 -->
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="初始日期" prop>
              <el-date-picker
                v-model="search.startTime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择完成日期"
                @change="cc"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="截止日期日期" prop>
              <el-date-picker
                v-model="search.endTime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择完成日期"
              ></el-date-picker>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="confirm">查找</el-button>
              <el-button type="primary" @click="cancel">清空</el-button>
            </el-form-item>
          </el-form>


           <!-- 弹层start -->
    <div>
       <el-row v-for="(tableDataItem, j) in this.dialogTableData" :key="j" width="100%">
         <div><label><span></span></label></div>
        <el-row :gutter="10">
          <el-col :span="4" v-for="(item, i) in tableDataItem" :key="i">
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
                <draggable v-model="item.result" :options="{group:'people', animation: 300}"  :key="i">
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
       </el-row>
        </div>
    <!-- 弹层end -->
         <el-pagination v-if="search.totalRows>0" class="pagination" background @current-change="handleCurrentChange" :current-page.sync="search.currentPage" :page-size="search.pageSize" :page-sizes="[search.pageSize]" layout="total, sizes, prev, pager, next, jumper" :total="search.totalRows">
                </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from '../../util/http'

export default {
  data() {
    return {
      axios,
      closeIsDisabled: false,
      openIsDisabled: false,
      search: { // 查询参数
        orderType: 'S',
        startTime: '',
        endTime: '',
        currentPage: 1,
        totalRows: -1,
        pageSize: 5
      },
      dialogTableData: []
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    // 单分页
    handleCurrentChange (val) {
      this.search.currentPage = val
      this.getTableData()
    },
    confirm() {

    },
    cancel() {

    },
    handleTabClick: function (tab, event) {
      this.initParams()
      this.getTableData()
    },
    initParams() {
      this.search.endTime = ''
      this.search.startTime = ''
      this.search.currentPage = 1
    },
    getTableData() { // 获取波次号列表以及对应波次号信息
      let that = this
      this.axios.get('binningManage/pickRecord/selectPickRecordWavedIdList', {
        params: that.search
      }).then((res) => {
        if (res.errCode === 'S') {
          this.search.totalRows = res.data.totalRows
          this.dialogTableData = res.data.result
        }
      })
    },
    // 分页器
    currentchange(currentPage) {
      console.log(currentPage)
      this.search.currentPage = currentPage
      this.getTableData()
    },
    cc() {
      console.log(this.search.startTime)
    }
  }
}
</script>
<style lang="less" scoped>
.WorkstationBox {
  overflow:auto;
  white-space: nowrap;
}
.Workstation {
  box-shadow: 1px 1px 5px #888888;
  margin: 10px;
  width: 300px;
  display: inline-table;
  vertical-align: top;
}

.activated {
  color: dimgrey;
}

  .drag-item {border:1px solid #ddd ; background: #f9f9f9; padding: 10px; margin-top: 10px; cursor: pointer;}
  .gray {background: #026780; color: #ffffff;}
</style>
