
<template>
 <div>
  <el-form :inline="true" class="demo-form-inline">
          <el-col :span="8">
            <el-form-item label="订单状态">
                <el-select placeholder="完成" v-model="search.dmlOrderStatus">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未完成" value="5"></el-option>
                    <el-option label="完成" value="3"></el-option>
                    <el-option label="手工打印" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="路线" >
                <el-select placeholder="A" v-model="search.attribute10" >
                    <el-option label="A" value="A"></el-option>
                    <el-option label="E" value="E"></el-option>
                    <el-option label="C22" value="C22"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="订单类型">
                <el-select placeholder="S" v-model="search.attribute09">
                    <el-option label="S" value="S"></el-option>
                    <el-option label="V" value="V"></el-option>
                </el-select>
            </el-form-item>
            </el-col>
             <el-col :span="8">
              <el-form-item label="订单号" >
                 <el-input v-model="search.attribute03"></el-input>
            </el-form-item>
             </el-col>
              <el-col :span="8">
             <el-form-item label="客户">
                <el-select placeholder="请选择" v-model="search.attribute07">
                    <el-option label="A" value="A"></el-option>
                    <el-option label="B" value="B"></el-option>
                </el-select>
            </el-form-item>
            </el-col>
             <el-col :span="8">
            <el-form-item label="订单行" >
                 <el-input v-model="search.attribute04"></el-input>
            </el-form-item>
             </el-col>
            <el-col :span="8">
            <el-form-item label="货位">
                <el-input v-model="search.locNum"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="8">
             <el-form-item label="打印记录">
                <el-input v-model="search.pickTaskStatus"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="页面大小" >
                <el-select placeholder="10" v-model="search.ict4">
                    <el-option label="10" value="10"></el-option>
                    <el-option label="20" value="20"></el-option>
                    <el-option label="30" value="30"></el-option>
                    <el-option label="50" value="50"></el-option>
                    <el-option label="80" value="80"></el-option>
                    <el-option label="100" value="100"></el-option>
                </el-select>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="网络供应商">
                <el-select placeholder="没有" v-model="search.ict5">
                    <el-option label="没有" value="0"></el-option>
                    <el-option label="有" value="1"></el-option>
                </el-select>
            </el-form-item>
            </el-col>
            <el-col :span="8">
           <el-form-item label="初始日期" >
              <el-date-picker
                v-model="search.startTime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择完成日期"
                @change="handleChangeTime"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="截止日期" >
              <el-date-picker
                v-model="search.endTime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择完成日期"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span=12>
            <el-form-item >
                <el-button type="primary" @click="confirm">确认</el-button>
                <el-button type="primary" @click="cancel">取消</el-button>
            </el-form-item>
            </el-col>
            <el-col :span=12>
            <el-form-item>
              <el-checkbox v-model="search.printAll" @change="handleCheckAllChange">打印全部</el-checkbox>
            </el-form-item>
            <el-form-item label="选择打印工作站：" >
                <el-select placeholder="1" v-model="search.wsId">
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                    <el-option label="3" value="3"></el-option>
                    <el-option label="4" value="4"></el-option>
                    <el-option label="5" value="5"></el-option>
                    <el-option label="6" value="6"></el-option>
                </el-select>
             </el-form-item>
              <el-form-item >
                <el-button type="primary" @click="toDoPrint">打印</el-button>
            </el-form-item>
            </el-col>
        </el-form>

        <el-table ref="multipleTable" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" border>
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="attribute07" label="客户编码">
            </el-table-column>
            <el-table-column prop="attribute08" label="客户名称">
            </el-table-column>
            <el-table-column prop="attribute03" label="WIP号">
            </el-table-column>
            <el-table-column prop="attribute04" label="WIP订单行">
            </el-table-column>
            <el-table-column prop="attribute01" label="拣货记录">
            </el-table-column>
            <el-table-column prop="attribute10" label="路线">
            </el-table-column>
            <el-table-column prop="attribute09" label="订单类型">
            </el-table-column>
            <el-table-column prop="locNum" label="货位">
            </el-table-column>
            <el-table-column prop="skuNum" label="零件编码">
            </el-table-column>
            <el-table-column prop="orderInDate" label="下单时间">
            </el-table-column>
            <el-table-column prop="ipsDealery" label="ISP经销商">
            </el-table-column>
            <el-table-column prop="ipsDealery" label="ICT经销商">
            </el-table-column>
              <el-table-column prop="orderStatus" label="订单状态">
            </el-table-column>
             <el-table-column prop="ipsDealery" label="导入时间">
            </el-table-column>
             <el-table-column prop="waveCreateDate" label="创建波次时间">
            </el-table-column>
             <el-table-column prop="ipsDealery" label="打印时间">
            </el-table-column>
        </el-table>
         <el-pagination v-if="totalRows>0" class="pagination" background @current-change="handleCurrentChange"
                        :current-page.sync="search.currentPage" :page-size="pageSize" :page-sizes="[pageSize]" layout="total, sizes, prev, pager, next, jumper"
                        :total="totalRows">
          </el-pagination>
           <el-dialog width="30%" title="提示" :visible.sync="isShowInnerConfirmDialog" append-to-body>
            <p class="dialog-text">打印成功</p>
            <el-button type="primary" @click="confirmReject">确认</el-button>
        </el-dialog>
 </div>    
</template>
<script>
import axios from '../../util/http'
export default {
  data () {
    return {
      axios,
      // 查询参数
      search: {
        orderStatus: '',
        attribute10: '',
        attribute09: '',
        attribute03: '',
        attribute07: '',
        attribute04: '',
        locNum: '',
        pickTaskStatus: '',
        ict4: '',
        ict5: '',
        startTime: '',
        endTime: '',
        wsId: '',
        currentPage: 1,
        printAll: false
      },
      tableData: [],
      multipleSelection: [],
      totalRows: -1,
      pageSize: -1,
      sendStr: '',
      isShowInnerConfirmDialog: false
    }
  },
  created: function () {
    this.getTableData()
  },
  methods: {
    confirm () {
      this.search.currentPage = 1
      this.getTableData()
    },
    cancel () {
      this.$refs.multipleTable.clearSelection()
    },
    handleChangeTime() {},
    handleCurrentChange (val) {
      this.search.currentPage = val
      this.getTableData()
    }, // 点击是否全部提交
    handleCheckAllChange (e) {
      this.search.printAll = e
    },
    getTableData () {
      let that = this
      this.axios.get('pickManage/pickInfo/selectManualPrintList', {
        params: that.search
      }).then((res) => {
        if (res.errCode === 'S') {
          console.log(res)
          that.tableData = res.data.result
          that.totalRows = res.data.totalRows
          that.pageSize = res.data.pageSize
        }
      })
    }, // 执行打印
    toDoPrint () {
      this.axios.get('pickManage/pickInfo/toDoManualPrint', {
        params: this.search
      }).then((res) => {
        if (res.errCode === 'S') {
          this.isShowInnerConfirmDialog = true
          // console.log(res.data.result)
          // that.tableData = res.data.result;
          // that.totalRows = r.totalRows;
          // that.pageSize = r.pageSize;
        }
      })
    },
    confirmReject() {
      this.isShowInnerConfirmDialog = false
    },
    handleSelectionChange (val) {
      let arr = []
      val.map(item => {
        arr.push(item.pickTaskId)
      })
      this.sendStr = arr.join(',')
      console.log(this.sendStr)
    }
  }
}
</script>
<style scoped>
  .form .form-left {
    width:50%; padding-left:1rem; padding-right:1rem; padding-top:1rem;
  }
  .form .form-right {
    width:50%; padding-left:1rem; padding-right:1rem; padding-top:1rem;
  }
</style>
