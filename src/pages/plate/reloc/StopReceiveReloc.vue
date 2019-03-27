<template>
     <el-form :inline="true" class="demo-form-inline">
       <el-form-item label="工作站编号：">
         <el-select v-model="search.entityWorkstationId" @change="getReceiveStatus" v-loading.fullscreen.lock="fullscreenLoading">
                <el-option
                v-for="item in WS_ENTITY_WORKSTATION"
                :key="item.value"
                :label="item.lable"
                :value="item.value" 
                > 
              </el-option>
          </el-select>
        </el-form-item>    
        <el-form-item>
             <el-button type="primary" :disabled = "openIsDisabled"   @click="restReceive(1)">恢复接收任务</el-button>
             <el-button type="primary" :disabled = "closeIsDisabled"  @click="restReceive(0)">停止接收任务</el-button>
        </el-form-item>
     </el-form>
</template>
<script>
  import axios from '../../../util/http'
  export default {
    data () {
      return {
        axios,
        fullscreenLoading: false,
        closeIsDisabled: false,
        openIsDisabled: false,
        search: {
          entityWorkstationId: '1',
          extWorkstationType: 'RELOC',
          activeType: '',
          workstationType: 5
        },
        WS_ENTITY_WORKSTATION: []
      }
    },
    mounted () {
      this.getReceiveStatus()
      this.getSelectValues()
    },
    methods: {
      getSelectValues() {
        this.axios.get('pickManage/pickInfo/selectWsEntityWorkstation', {
          params: this.search
        }).then((res) => {
          if (res.errCode === 'S') {
            this.WS_ENTITY_WORKSTATION = res.data.result.map(item => {
              item.value = item.entityWorkstationId
              item.lable = item.entityWorkstationId
              return item
            })
          }
        })
      },
      restReceive (status) {
        let that = this
        this.search.activeType = status
        this.fullscreenLoading = true
        this.axios.get('pickManage/pickInfo/updateStopRestReceiveStatus', {
          params: this.search
        }).then((res) => {
          // console.log(res);
          if (res.errCode === 'S') {
            if (status === 1) { // 恢复任务
              that.openIsDisabled = true
              that.closeIsDisabled = false
            }
            if (status === 0) { // 停止任务
              that.openIsDisabled = false
              that.closeIsDisabled = true
            }
          }
        })
        this.fullscreenLoading = false
      }, // 刚进入页面，获取当前任务状态
      getReceiveStatus () {
        let that = this
        this.fullscreenLoading = true
        this.axios.get('pickManage/pickInfo/selectStopRestReceiveStatus', {
          params: this.search
        }).then((res) => {
          // console.log(res);
          if (res.errCode === 'S') {
            if (res.data.result === 20) {
              that.openIsDisabled = true
              that.closeIsDisabled = false
            } else {
              that.openIsDisabled = false
              that.closeIsDisabled = true
            }
          }
        })
        this.fullscreenLoading = false
      }

    }
}
</script>
<style lang="less" scoped>
.activated{
 color: dimgrey;
}
</style>
