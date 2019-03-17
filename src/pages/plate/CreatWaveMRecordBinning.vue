<template>
     <el-row>
       <el-button type="primary" :disabled = "openIsDisabled"   @click="restReceive('1')">恢复接收任务</el-button>
       <el-button type="primary" :disabled = "closeIsDisabled"  @click="restReceive('0')">停止接收任务</el-button>
     </el-row>
</template>
<script>

import axios from '../../util/http'
export default {
  data () {
    return {
      axios,
      closeIsDisabled: false,
      openIsDisabled: false
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
    }

  }
}
</script>
<style lang="less" scoped>
.activated{
 color: dimgrey;
}
</style>
