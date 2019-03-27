 <template>
     <div>
          <!--工具条-->
         <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
             <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.username" placeholder="姓名"></el-input>
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
            <el-table-column prop="firstName" label="FirstName" width="180">
            </el-table-column>
             <el-table-column prop="lastName" label="LastName" width="180">
            </el-table-column>
             <el-table-column prop="username" label="登录名" width="180">
            </el-table-column>
             <el-table-column prop="password" label="密码" width="180">
            </el-table-column>
             <el-table-column prop="email" label="Email" width="180">
            </el-table-column>
            <el-table-column prop="state" label="状态">
            </el-table-column>
             <!--第二步  开始进行修改和查询操作-->
             <el-table-column label="操作" align="center" min-width="100">
 
                <template slot-scope="scope">
 
                     <el-button type="text" @click="checkDetail(scope.row)">查看详情</el-button>
 
                     <el-button type="text" @click="modifyUser(scope.row)">修改</el-button>
  
                     <el-button type="text" @click="deleteUser(scope.row)">删除</el-button>
                  </template>
             </el-table-column>
             <!--编辑与增加的页面-->
         </el-table>
          <!--新增界面-->
         <el-dialog title="记录" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false">
             <el-form :model="addFormData" :rules="rules2" ref="addFormData" label-width="0px" class="demo-ruleForm login-container">
                  <el-form-item prop="firstName">
                    <el-input type="text" v-model="addFormData.firstName" auto-complete="off" placeholder="FirstName"></el-input>
                  </el-form-item>
                   <el-form-item prop="lastName">
                    <el-input type="text" v-model="addFormData.lastName" auto-complete="off" placeholder="LastName"></el-input>
                  </el-form-item>
                   <el-form-item prop="username">
                    <el-input type="text" v-model="addFormData.username" auto-complete="off" placeholder="登录名"></el-input>
                  </el-form-item>
                   <el-form-item prop="password">
                    <el-input type="password" v-model="addFormData.password" auto-complete="off" placeholder="密码"></el-input>
                  </el-form-item>
                   <el-form-item prop="email">
                    <el-input type="text" v-model="addFormData.email" auto-complete="off" placeholder="Email"></el-input>
                  </el-form-item>
                <el-form-item prop="state">
                     <el-input type="text" v-model="addFormData.state" auto-complete="off" placeholder="状态"></el-input>
                  </el-form-item>
             </el-form>
             <span slot="footer" class="dialog-footer">
                 <el-button @click.native="dialogVisible = false,addFormData={id:'',firstName:'',lastName:'',username:'',password:'',email:'',state:''}">取 消</el-button>
                 <el-button v-if="isView" type="primary" @click.native="addSubmit">确 定</el-button>
             </span>
          </el-dialog>
     </div>
  </template>
  
  <script>
    import axios from '../../../util/http'
    import qs from 'qs'
    export default {
      name: 'home',
      data() {
        return {
          userInfoList: [],
          addFormReadOnly: true,
          dialogVisible: false,
          isView: true,
          addFormData: {
            id: '',
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            email: '',
            state: ''
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
            name: ''
          }
        }
      },
  mounted: function () {
        this.loadData()
      },
      methods: {
        loadData() {
          let param = {filter: this.filters.name}
          axios.post('/custom/ctUser/selectCtUserList', qs.stringify(param)).then((res) => {
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
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            email: '',
            state: ''
          }
          this.isView = true
          this.dialogVisible = true
          // this.addFormReadOnly = false;
        },
        checkDetail(rowData) {
          this.addFormData = Object.assign({}, rowData)
          this.isView = false
          this.dialogVisible = true
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
                ctUserId: rowData.id
              }
              axios.post('/custom/ctUser/deleteCtUser', qs.stringify(params)).then((res) => {
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
                axios.post('/custom/ctUser/updateCtUser', qs.stringify(result)).then((res) => {
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
                axios.post('/custom/ctUser/insertCtUser', qs.stringify(result)).then((res) => {
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