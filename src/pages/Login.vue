<template>
  <div id="loginCon" v-if="isShowDialog">
    <el-form  :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h2 class="title">DAIMLER Control Tower</h2>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import axios from '../util/http'
  import qs from 'qs'
  export default {
    name: 'login',
    data () {
      return {
        axios,
        qs,
        logining: false,
        ruleForm2: {
          account: 'alc1123',
          checkPass: '123',
          code: '123456'
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' }
            // { validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' }
            // { validator: validaePass2 }
          ]
        },
        checked: true,
        isShowDialog: false
      }
    },
    created () {
      this.checkUserStatus()
    },
    methods: {
      checkUserStatus () {
        this.axios.get('/user/status', {
        }).then((res) => {
          if (res.errCode === 'S') {
            sessionStorage.setItem('token', res.data.token)
            sessionStorage.setItem('user', res.data.user)
            this.$router.push({ path: '/' })
          } else {
            // window.location.href = 'https://bixi-test.cn.isn.corpintra.net/ct/login'
            this.isShowDialog = true
          }
        })
      },
      handleReset2 () {
        this.$refs.ruleForm2.resetFields()
      },
      handleSubmit2 (ev) {
        var loginParams = {
          username: this.ruleForm2.account,
          password: this.ruleForm2.checkPass,
          code: this.ruleForm2.code
        }
  
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = true
            // NProgress.start();
            /*
              var loginParams = {
                userName: this.ruleForm2.account,
                passWord: this.ruleForm2.checkPass,
                code: this.ruleForm2.code
              }
            */
            this.axios.get('verify', {
              params: loginParams
            }).then((res) => {
              if (res.code === 'S') {
                sessionStorage.setItem('token', res.token)
                sessionStorage.setItem('user', this.ruleForm2.account)
                this.$router.push({ path: '/' })
              }
            })
            // this.$router.push({ path: '/' })
            // console.log(datas.admin_token,'atas.admin_token')    
           
            // sessionStorage.setItem('id', datas.id)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 12px;
    border-radius: 12px;
    -moz-border-radius: 12px;
    -o-border-radius: 12px;
    -ms-border-radius: 12px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
  #loginCon{
    width: 100%;
    height: 100%;
    .title{
      font-size: 24px;
      margin: 0px auto 30px;
      text-align: center;
      color: #505458;
    }
    .el-button{
      height: 40px;
      font-size: 16px;
      letter-spacing: 4px;
    }
  }
  #loginCon{
    width: 100%;
    height: 100%;
    background: url("../assets/images/logo_bg.png") 0 0 repeat;
    background-size: 200px;
    position: fixed;
    top: 0;
  }
</style>
<style >
  #loginCon .el-input--small .el-input__inner{
    height: 40px;
    line-height: 40px;
  }
  html{
    color: #000;
  }
</style>
