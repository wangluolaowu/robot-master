<template>
  <div id="mainCon">
    <el-row class="groupBtn">
      <el-button type="primary" size="medium" @click="cancelBtn">取消</el-button>
      <el-button type="primary" size="medium" @click="deleteBtn">删除</el-button>
      <el-button type="primary" size="medium" @click="addBtn">增加</el-button>
      <el-button type="primary" size="medium" @click="tureBtn">确认</el-button>
    </el-row>
    <el-table class="tabSelect" :data="tableData" highlight-current-row v-loading="tableLoading" style="width: 100%"
              border @select="tableSelectChange">
      <el-table-column type="selection" width="55" >
      </el-table-column>
      <el-table-column prop="objsz.orderWaveId" label="规则ID" >
      </el-table-column>
      <el-table-column prop="objsz.createdBy" label="规则描述" width="200">
        <template slot-scope="scope">
          <div v-if="scope.row.objsz.onOff === '1'">
            <input type="textarea" rows="10" v-model="scope.row.objsz.createdBy">
          </div>
          <div v-else-if="scope.row.objsz.onOff === '0'">
            <span>{{scope.row.objsz.createdBy}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="订单类型">
        <template slot-scope="scope">
          <div v-if="scope.row.objsz.onOff === '1'">
            <el-select placeholder="请选择" v-model="scope.row.objsz.itfSentFlag" @change="xxx(scope)">
              <el-option
                v-for="item in scope.row.list.list_num3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div v-else-if="scope.row.objsz.onOff === '0'">
            <span v-if="scope.row.objsz.itfSentFlag === 'S'">S</span>
            <span v-else-if="scope.row.objsz.itfSentFlag === 'V'">V</span>
             <span v-else> {{scope.row.objsz.itfSentFlag}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="ISP dealer">
        <template slot-scope="scope">
          <div v-if="scope.row.objsz.onOff === '1'">
            <el-select placeholder="请选择" v-model="scope.row.objsz.orderWaveNum" @change="xxx(scope)">
              <el-option
                v-for="item in scope.row.list.list_num4"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div v-else-if="scope.row.objsz.onOff === '0'">
            <span v-if="scope.row.objsz.orderWaveNum === '0'">否</span>
            <span v-else-if="scope.row.objsz.orderWaveNum === '1'">是</span>
            <span v-else> {{scope.row.objsz.orderWaveNum}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="list_num5" label="ICT Dealer">
        <template slot-scope="scope">
          <div v-if="scope.row.objsz.onOff === '1'">
            <el-select placeholder="请选择" v-model="scope.row.objsz.orderWaveStatus">
              <el-option
                v-for="item in scope.row.list.list_num5"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div v-else-if="scope.row.objsz.onOff === '0'">
            <span v-if="scope.row.objsz.orderWaveStatus === '0'">否</span>
            <span v-else-if="scope.row.objsz.orderWaveStatus === '1'">是</span>
             <span v-else> {{scope.row.objsz.orderWaveStatus}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="list_num6" label="工作站模式">
        <template slot-scope="scope">
          <div v-if="scope.row.objsz.onOff === '1'">
            <el-select placeholder="请选择" v-model="scope.row.objsz.workstation">
              <el-option
                v-for="item in scope.row.list.list_num6"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div v-else-if="scope.row.objsz.onOff === '0'">
            <span v-if="scope.row.objsz.workstation === '20'">大</span>
            <span v-else-if="scope.row.objsz.workstation === '10'">小</span>
             <span v-else> {{scope.row.objsz.workstation}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="list_num7" label="算法">
        <template slot-scope="scope">
          <div v-if="scope.row.objsz.onOff === '1'">
            <el-select placeholder="请选择" v-model="scope.row.objsz.merchantId">
              <el-option
                v-for="item in scope.row.list.list_num7"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div v-else-if="scope.row.objsz.onOff === '0'">
            <span v-if="scope.row.objsz.merchantId === '10'">MD5</span>
            <span v-else-if="scope.row.objsz.merchantId === '20'">SHAR</span>
            <span v-else-if="scope.row.objsz.merchantId === '30'">DIAG</span>
            <span v-else> {{scope.row.objsz.merchantId}}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from '../../util/http'
import Class from './class'
import qs from 'qs'
export default {
  data () {
    return {
      axios,
      tableLoading: false,
      tableDataResult: [],
      tableData1: null,
      tableData: null,
      sendStr: ''
    }
  },
  mounted () {
    this.getTableData()
  },
  methods: {
    xxx (value) {
      console.log(value)
      console.log(this.tableData)
    }, // 刚进入页面，获取当前任务状态
    getTableData () {
      this.axios.get('binningManage/taskRules/selectTaskRulesList', {
        params: {
          data: 'test'
        }
      }).then((res) => {
        console.log('res.data.result===========' + JSON.stringify(res.data.result))
        if (res.errCode === 'S') {
          if (res.data.result === undefined) {
            this.tableData = []
            this.tableData1 = []
          } else {
            this.tableData = res.data.result.map(item => {
              if (!item.onOff) {
                item.onOff = '0'
              }
              let addrow = Class()
              addrow.objsz = item
              addrow.cn = item
              return addrow
            })

            this.tableData1 = res.data.resultExit.map(item => {
              if (!item.onOff) {
                item.onOff = '0'
              }
              let addrow = Class()
              addrow.objsz = item
              addrow.cn = item
              return addrow
            })
          }
          console.log('this.tableData===========' + JSON.stringify(this.tableData))
        }
      })
    }, // 确认新增或者修改
    cancelBtn () { // 取消执行的事件
      this.getTableData()
    },
    deleteBtn () {
      this.axios.get('binningManage/taskRules/deleteTaskRulesList', {
        params: {
          idList: this.sendStr
        }
      }).then((res) => {
        if (res.errCode === 'S') {
          this.getTableData()
        }
      })
    },
    addBtn () {
      let addrow = Class()
      console.log(addrow)
      this.tableData.push(addrow)
    },
    tureBtn () { // 确定按钮执行的事件
      let result = this.tableData.map(item => {
        if (item.objsz.orderWaveId === null) {
          item.objsz.orderWaveId = 0
        }
        return item.objsz
      })
      let dataResult = {}
      dataResult.result = JSON.stringify(result)
      this.axios.post('binningManage/taskRules/updateTaskRulesList', qs.stringify(dataResult)).then(res => {
        if (res.errCode === 'S') {
          this.getTableData()
        }
      })
    }, // 选中勾选id
    tableSelectChange(selection, row) {
      this.tableData.forEach((ele, index, arr) => {
        if (ele === row && row.objsz.orderWaveId !== null) {
          if (ele.objsz.onOff === '0') {
            ele.objsz.onOff = '1'
          } else {
            this.tableData[index] = JSON.parse(JSON.stringify(this.tableData1[index]))
          }
        } else if (ele === row && row.objsz.orderWaveId === null) {
          if (ele.objsz.onOff === '0') {
            ele.objsz.onOff = '1'
          } else {
            ele.objsz.onOff = '0'
          }
        }
      })
      let sendStr = []
      selection.map(item => {
        sendStr.push(item.objsz.orderWaveId)
      })
      this.sendStr = sendStr.join(',')
      console.log('this.sendStr===========' + this.sendStr)
    }
  }
}
</script>
<style lang="less" scoped>
  .activated{
    color: dimgrey;
  }
  .tabSelect{
    margin: 40px 0;
  }
  #mainCon{
    margin: 40px 0 50px;
  }
  #mainCon .groupBtn .el-button{
    width: 180px;
    height: 40px;
    letter-spacing: 2px;
    font-size: 15px;
    margin-right: 20px;
  }
</style>
