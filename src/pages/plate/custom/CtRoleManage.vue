 <template>
     <div>
          <!--工具条-->
         <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
             <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.role" placeholder="角色"></el-input>
                   </el-form-item>
                   <el-form-item>
                     <el-button type="primary" v-on:click="getUsers">查询</el-button>
                  </el-form-item>
                 <el-form-item>
                     <el-button type="info" @click="addUser">新增</el-button>
                  </el-form-item>
            </el-form>
       </el-col>


         <el-table :data="userInfoList" style="width: 100%" border>
            <!--<el-table-column prop="id" label="id" >
            </el-table-column>-->
             <el-table-column prop="role" label="角色" width="180">
            </el-table-column>
             <el-table-column prop="description" label="描述" width="180">
            </el-table-column>
            <el-table-column prop="available"> 
              <template slot-scope="scope">
              <el-select placeholder="请设置状态" v-model="scope.row.available" :disabled="true">
              <el-option
                v-for="item in openStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value" 
              > 
              </el-option>
            </el-select>
            </template>
            </el-table-column>
             <!--第二步  开始进行修改和查询操作-->
             <el-table-column label="操作" align="center" min-width="100">
 
                <template slot-scope="scope">
 
                     <el-button type="text" @click="checkDetail(scope.row)">成员管理</el-button>
 
                     <el-button type="text" @click="modifyUser(scope.row)">修改</el-button>
  
                     <el-button type="text" @click="deleteUser(scope.row)">删除</el-button>
                  </template>
             </el-table-column>
             <!--编辑与增加的页面-->
         </el-table>
          <!--新增界面-->
         <el-dialog title="记录" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false">
             <el-form :model="addFormData" :rules="rules2" ref="addFormData" label-width="0px" class="demo-ruleForm login-container">
                  <el-form-item prop="role">
                    <el-input type="text" v-model="addFormData.role" auto-complete="off" placeholder="角色"></el-input>
                  </el-form-item>
                   <el-form-item prop="description">
                    <el-input type="text" v-model="addFormData.description" auto-complete="off" placeholder="描述"></el-input>
                  </el-form-item>
                  <el-form-item prop="available"> 
                  <el-select placeholder="请设置状态" v-model="addFormData.available">
                  <el-option
                    v-for="item in openStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </el-form-item>
             </el-form>
             <span slot="footer" class="dialog-footer">
                 <el-button @click.native="dialogVisible = false,addFormData={id:'',role:'',description:'',available:''}">取 消</el-button>
                 <el-button v-if="isView" type="primary" @click.native="addSubmit">确 定</el-button>
             </span>
          </el-dialog>
           <el-dialog title="角色-用户" :visible.sync="roleUserdialogVisible" width="50%" :close-on-click-modal="false">
              <el-transfer
                filterable
                :filter-method="filterMethod"
                filter-placeholder="请输入用户名称"
                v-model="value2"
                :titles="['可选用户','已选用户']"
                :data="data2" 
                >
              </el-transfer>
               <el-button class="transfer-footer" slot="right-footer" size="small" @click="createRoleUser">保存</el-button>
           </el-dialog>  
     </div>
  </template>
  
  <script>
    import axios from '../../../util/http'
    import EnumSelect from '../../../util/enum'
    import qs from 'qs'
    export default {
      name: 'home',
      data() {
        return {
          data2: [],
          value2: [],
          pinyin: [],
          userInfoList: [],
          openStatus: [],
          addFormReadOnly: true,
          dialogVisible: false,
          roleUserdialogVisible: true,
          isView: true,
          addFormData: {
            id: '',
            role: '',
            description: '',
            available: ''
          },
          rules2: {
            username: [{
              required: true,
              message: '用户名不能为空',
              trigger: 'blur'
            }],
            password: [{
              required: true,
              message: '密码不能为空',
              trigger: 'blur'
            }]
          },
          filters: {
            role: ''
          }
        }
      },
  mounted: function () {
        this.loadData()
        // this.generateData2()
        this.getSelectValues()
      },
      methods: {
        getSelectValues() {
          let Enum = EnumSelect()
          this.openStatus = Enum.openStatus
        },
        generateData2 () {
          let that = this
          that.data2 = []
          axios.post('custom/ctUser/selectCtUserList', {}).then((res) => {
            if (res.errCode === 'S') {
              res.data.result.forEach(function(c, index) {
                that.pinyin.push(c.username)
                that.data2.push({
                  key: c.id,
                  label: c.username,
                  pinyin: that.pinyin[index]
                })       
              })  
            }
          })
        },
        createRoleUser(val) {
          console.log('val=====' + val)
          console.log('value2===' + this.value2)
        },
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1
        },
        loadData() {
          let param = {filter: this.filters.role}
          axios.post('custom/ctRole/selectCtRoleList', qs.stringify(param)).then((res) => {
            var _data = res.data.result
            this.userInfoList = _data
          })
        },
        getUsers() {
          this.loadData()
        },
        addUser() {
          this.addFormData = {
            id: '',
            role: '',
            description: '',
            available: ''
          }
          this.isView = true
          this.dialogVisible = true
          // this.addFormReadOnly = false;
        },
        checkDetail(rowData) {
          this.addFormData = Object.assign({}, rowData)
          this.roleUserdialogVisible = true
          //  this.addFormReadOnly = true;
        },
        modifyUser(rowData) {
          this.addFormData = Object.assign({}, rowData)
          this.isView = true
          this.dialogVisible = true
          // this.addFormReadOnly = false;
        },
        deleteUser(rowData) {
          this.$alert('是否删除这条记录', '信息删除', {
            confirmButtonText: '确定',
            callback: action => {
              var params = {
                ctRoleId: rowData.id
              }
              axios.post('/custom/ctRole/deleteCtRole', qs.stringify(params)).then((res) => {
                console.info(res)
                if (res.errCode === 'S') {
                  this.$message({
                    type: 'info',
                    message: `已删除`
                  })
                } else {
                  this.$message({
                    type: 'info',
                    message: `删除失败`
                  })
                }
                this.loadData()
              })
            }
          })
        }, // 增加一条记录
        addSubmit() {
        // 先判断表单是否通过了判断
          this.$refs.addFormData.validate((valid) => {
            // 代表通过验证 ,将参数传回后台
            if (valid) {
              let param = Object.assign({}, this.addFormData)
              let result = {}
              result.result = JSON.stringify(param)
              if (param.id) {
                axios.post('/custom/ctRole/updateCtRole', qs.stringify(result)).then((res) => {
                  if (res.errCode === 'S') {
                    this.$message({
                      type: 'info',
                      message: '修改成功'
                    })
                    this.loadData()
                  } else {
                    this.$message({
                      type: 'info',
                      message: '修改失败'
                    })
                  }
                  this.dialogVisible = false
                })
              } else {
                axios.post('/custom/ctRole/insertCtRole', qs.stringify(result)).then((res) => {
                  if (res.errCode === 'S') {
                    this.$message({
                      type: 'info',
                      message: '添加成功'
                    })
                    this.loadData()
                  } else {
                    this.$message({
                      type: 'info',
                      message: '添加失败'
                    })
                  }
                  this.dialogVisible = false
                })
              }
            }
          })
        }
      }
    }
 </script>
 
 <style>
     body {
         background: #DFE9FB;
     }
 </style>