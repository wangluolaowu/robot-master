<template>
  <div class="mainCon">
    <!--滑块-->
   <!--<div class="slider-con" >
     <div class="block">
       <h1>暂停全部机器人</h1>
       <el-slider v-model="sliderVal"  @change="getVal()"></el-slider>
     </div>
   </div>-->
    <!--弹窗-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>是否全部暂停</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="cancleBtn()">取 消</el-button>
          <el-button type="primary" @click="succeBtn()">确 定</el-button>
         </span>
    </el-dialog>
     <!--弹窗-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisibleStart"
      width="30%"
    >
      <span>是否全部恢复</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="cancleBtnStart()">取 消</el-button>
          <el-button type="primary" @click="succeBtnStart()">确 定</el-button>
         </span>
    </el-dialog>

  <el-row :span="24" >
    <el-col :span="12" class="stopCon">
      <!--暂停部分机器人-->
      <template >
        <h1>暂停部分机器人</h1>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedStop" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="item in stopRobotName" :label="item" :key="item">{{item}}</el-checkbox>
        </el-checkbox-group>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-button class="submitBtn" type="primary" @click="submitBtn(0)">提交</el-button>
      </template>
    </el-col>
    <el-col :span="12" class="resumeCon">
      <!--恢复暂停机器人-->
      <template >
        <h1>恢复机器人</h1>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedResumeRobot" @change="handleCheckedRemoChange">
          <el-checkbox v-for="items in resumeName" :label="items" :key="items">{{items}}</el-checkbox>
        </el-checkbox-group>
        <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange2">全选</el-checkbox>
        <el-button class="submitBtn" type="primary" @click="submitBtn(1)">提交</el-button>
      </template>
    </el-col>
  </el-row>

<el-dialog width="30%" title="提示" :visible.sync="isShowInnerConfirmDialog" append-to-body >
            <p class="dialog-text">提交成功</p>
            <el-button type="primary" @click="confirmReject">确认</el-button>
        </el-dialog>

  </div>
</template>
<script>
import axios from '../../../util/http'
import qs from 'qs'
export default {
  data() {
    return {
      axios,
      sliderVal: 0,
      sliderValStart: 0,
      stopOptions: [],
      resumeOpt: [],
      dialogVisible: false,
      checkAll: false,
      checkAll2: false,
      checkedStop: [],
      checkedResumeRobot: [],
      stopRobotName: [],
      resumeName: [],
      isIndeterminate: true,
      isIndeterminate2: true,
      isShowInnerConfirmDialog: false,
      dialogVisibleStart: false
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData () {
      this.axios.get('robotManage/stopReceive/selectKidsInfoList', {
        params: 'test1'
      }).then((res) => {
        if (res.errCode === 'S') {
          this.stopOptions = res.data.result
          this.resumeOpt = res.data.result
          this.stopRobotName = res.data.result
          this.resumeName = res.data.result
          this.checkedResumeRobot = res.data.resultStart
          this.checkedStop = res.data.resultPause
        }
      })
    },
    submitBtn (arg) {
      let dataResult = {}
      dataResult.activeType = arg
      if (arg === 1) {
        dataResult.idList = JSON.stringify(this.checkedResumeRobot)
      } else {
        dataResult.idList = JSON.stringify(this.checkedStop)
      }

      if (this.checkAll || this.checkAll2) {
        dataResult.idList = JSON.stringify([0])
      }
      this.axios.post('robotManage/stopReceive/updateKidsInfoList', qs.stringify(dataResult)).then((res) => {
        if (res.errCode === 'S') {
          this.stopOptions = res.data.result
          this.resumeOpt = res.data.result
          this.stopRobotName = res.data.result
          this.resumeName = res.data.result
          this.checkedResumeRobot = res.data.resultStart
          this.checkedStop = res.data.resultPause
          this.isShowInnerConfirmDialog = true
        }
      })
    },
    confirmReject() {
      this.isShowInnerConfirmDialog = false
    },
    getVal: function () { //  打印当前滑块的值
      console.log('当前值' + this.sliderVal)
      if (this.sliderVal === 100) { // 如果值为100，表示滑块滑倒最右侧，弹出提示框
        this.dialogVisible = true
      }
    },
    getValStart: function () { //  打印当前滑块的值
      console.log('当前值' + this.sliderValStart)
      if (this.sliderValStart === 100) { // 如果值为100，表示滑块滑倒最右侧，弹出提示框
        this.dialogVisibleStart = true
      }
    },
    cancleBtn: function () {
      console.log('点击取消')
      this.sliderVal = 0
      this.dialogVisible = false
    },
    cancleBtnStart: function () {
      console.log('点击取消')
      this.sliderValStart = 0
      this.dialogVisibleStart = false
    },
    succeBtn: function() { // 弹窗中的点击确定执行的事件
      this.submitBtn(2)
      this.sliderVal = 0
      this.dialogVisible = false
    },
    succeBtnStart: function() { // 弹窗中的点击确定执行的事件
      this.submitBtn(3)
      this.sliderValStart = 0
      this.dialogVisibleStart = false
    },
    handleCheckAllChange(val) { // 暂停机器人
      this.checkedStop = val ? this.stopOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) { // 暂停机器人
      let checkedCount = value.length
      this.checkAll = checkedCount === this.stopRobotName.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.stopRobotName.length
    },
    handleCheckAllChange2(val) { // 恢复暂停机器人
      this.checkedResumeRobot = val ? this.resumeOpt : []
      this.isIndeterminate2 = false
    },
    handleCheckedRemoChange(value) { // 恢复暂停机器人
      let checkedCount = value.length
      this.checkAll2 = checkedCount === this.resumeName.length
      this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.resumeName.length
    }

  }
}
</script>

<style scoped>
.slider-con{
  width: 300px;
  margin-left: 30px;
}
</style>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
  .el-slider__bar{
    height: 20px;
  }
  .el-slider__runway{
    height: 20px;
    border: 1px solid #ccc;
    background-color: #fff;
  }
  .el-dialog__footer{
    text-align: center;
  }
 .mainCon  .el-form-item__content{
    text-align: left;
  }
  .mainCon .resumeCon .el-button, .mainCon .stopCon .el-button{
    width: 100px;
    display: block;
    margin: 10px auto;
  }
  .mainCon  .el-col-12{
    text-align: left;
    padding: 0 20px;
  }
  .mainCon .el-checkbox{
    margin-top: 10px;
  }
</style>