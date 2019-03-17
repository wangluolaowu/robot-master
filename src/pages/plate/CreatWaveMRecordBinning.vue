<template>
   <!--  <el-row id="mainCon">
       <el-button type="primary" :disabled = "openIsDisabled"   @click="restReceive('1')">恢复接收任务</el-button>
       <el-button type="primary" :disabled = "closeIsDisabled"  @click="restReceive('0')">停止接收任务</el-button>
     </el-row>-->
  <!--新-->
  <div id="mainContainer">
    <el-row :span="24" style="margin-bottom: 20px;">
      <el-col :span="12">
        <div class="block">
          <span class="demonstration">初始日期</span>
          <el-date-picker
            v-model="startTimes"
            type="date"
            placeholder="选择开始日期">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="block">
          <span class="demonstration">结束日期</span>
          <el-date-picker
            v-model="endTimes"
            type="date"
            placeholder="选择结束日期">
          </el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row :span="24">
      <el-col style="margin-left: 30px;" :span="10">
        <el-col :span="5">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col style="margin: 0 20px;" :span="5">
          <el-select v-model="value3" placeholder="请选择">
            <el-option
              v-for="item in optionsMid"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select v-model="value4" placeholder="请选择">
            <el-option
              v-for="item in optionsRight"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-col>
      <el-col   :span="10">
        <el-col :span="5">
          <el-select v-model="groupValue1" placeholder="请选择">
            <el-option
              v-for="item in groupOpt"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col style="margin: 0 20px;" :span="5">
          <el-select v-model="groupValue2" placeholder="请选择">
            <el-option
              v-for="item in groupOptMid"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select v-model="groupValue3" placeholder="请选择">
            <el-option
              v-for="item in groupOptRight"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="researchBtn()" style="display: inline-block;width:80px;">查找</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%;margin: 50px auto 40px;border: 1px solid #ccc;" id="tabs" >
      <el-table-column prop="num" label="序号"></el-table-column>
      <el-table-column prop="countRow" label="任务波次订单行总数"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from '../../util/http'
export default {
  data () {
    return {
      axios,
      closeIsDisabled: false,
      openIsDisabled: false,
      tableData: [{
        num: '01',
        countRow: '50',
      }, {
        num: '02',
        countRow: '100',
      }],
      options: [{
        value: '选项1',
        label: '0'
      }, {
        value: '选项2',
        label: '1'
      }, {
        value: '选项3',
        label: '2'
      }, {
        value: '选项4',
        label: '3'
      }, {
        value: '选项5',
        label: '4'
      }],
      optionsMid: [{
        value: '选项1',
        label: '0'
      }, {
        value: '选项2',
        label: '1'
      }, {
        value: '选项3',
        label: '2'
      }, {
        value: '选项4',
        label: '3'
      }, {
        value: '选项5',
        label: '4'
      }],
      optionsRight: [{
        value: '选项1',
        label: '0'
      }, {
        value: '选项2',
        label: '1'
      }, {
        value: '选项3',
        label: '2'
      }, {
        value: '选项4',
        label: '3'
      }, {
        value: '选项5',
        label: '4'
      }],
      groupOpt:[{
        value: '选项1',
        label: '1'
      },{
        value: '选项2',
        label: '2'
      },{
        value: '选项3',
        label: '3'
      }],
      groupOptRight:[{
        value: '选项1',
        label: '1'
      },{
        value: '选项2',
        label: '2'
      }],
      groupOptMid:[{
        value: '选项1',
        label: '1'
      },{
        value: '选项2',
        label: '2'
      },{
        value: '选项3',
        label: '3'
      }],
      value: '',
      startTimes:'',
      endTimes:'',
      value3:'',
      value4:'',
      groupValue1:'',
      groupValue2:'',
      groupValue3:'',
    }
  },
  mounted () {
    this.getReceiveStatus()
  },
  methods: {
    restReceive (flag) {
      let that = this
      this.axios.get('pickManage/pickInfo/updateStopRestReceiveStatus', {
        params: {
          receiveStatus: flag
        }
      }).then((res) => { // console.log(res);
        if (res.errCode === 'S') {
          if (flag === 1) { // 恢复任务
            that.openIsDisabled = true
            that.closeIsDisabled = false
          }
          if (flag === 0) { // 停止任务
            that.openIsDisabled = false
            that.closeIsDisabled = true
          }
        }
      })
    }, // 刚进入页面，获取当前任务状态
    getReceiveStatus () {
      let that = this
      this.axios.get('pickManage/pickInfo/selectStopRestReceiveStatus', {}).then((res) => {
        // console.log(res);
        if (res.errCode === 'S') {
          if (res.data.result === true) {
            that.openIsDisabled = true
            that.closeIsDisabled = false
          } else {
            that.openIsDisabled = false
            that.closeIsDisabled = true
          }
        }
      })
    },
    researchBtn(){//点查找按钮
      let that = this;
      let startTime = that.startTimes;
      let endTime = that.endTimes;
      let selectGroup1 = that.value;
      let selectGroup2 = that.value3;
      let selectGroup3 = that.value4;
      let selectGroupTwo = that.groupValue1;
      let selectGroupTwo2 = that.groupValue2;
      let selectGroupTwo3 = that.groupValue3;
      //判断时间
      if(startTime > endTime){
        return false;
      }
      console.log('选择开始时间：：： '+startTime);
      console.log('结束时间：：：'+endTime)
      //需要的话把每组数的值拼接，传递给后台
      console.log('选择框中的第一组下拉框内容：：'+selectGroup1+';第一组第二个选择内容:'+selectGroup2+';第一组第三个选择内容'+selectGroup3);
      console.log('选择框中的第二组下拉框第一个内容：：'+selectGroupTwo+';第二组第二个选择内容:'+selectGroupTwo2+';第二组第三个选择内容'+selectGroupTwo3);

      //   this.getReceiveStatus(data);//请求数据时，执行的函数,并传递参数
    },

  }
}
</script>
<style>
.activated{
color: dimgrey;
}
#mainContainer{
margin: 40px 0 50px;
}

</style>
<style>
html{
  color: #333333;
  font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC';
}
.el-table .cell{
  text-align: center!important;
  font-size: 15px;
}
.el-col .title{
  font-size: 24px;
  font-weight: bolder;
}
.el-breadcrumb__item .el-breadcrumb__inner,.el-breadcrumb__separator{
  font-size: 18px;
}
.el-table__empty-block .el-table__empty-text{
  font-size: 15px;
}
#topTitle .el-tabs__item{
  font-size: 15px;
  font-weight: bold;
}
.el-picker-panel{
  top: 195px;
}
#tabs .has-gutter >tr >th >.cell{
  color: #999;
}
</style>
