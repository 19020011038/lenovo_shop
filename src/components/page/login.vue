<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">登录</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="请输入用户名">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="param.password"
            @keyup.enter.native="submitForm()"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
        <div class="register-btn">
          <el-button type="primary" @click="submitRegister()">注册</el-button>
        </div>
        <p class="login-tips">Tips : 用户名和密码随便填。</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url_path from "../../../config/url_path";

import cookie from "js-cookie"
//import cookie from '../../../static/js/cookie';

// import Vue from 'vue'
// import Vuex from 'vuex'
// import store from '../../../store/index.js'





export default {

  data: function () {
    return {
      param: {
        username: '',
        password: '',
      },
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
      },
    };
  },
  methods: {
    submitForm() {

      this.$refs.login.validate(valid => {
        if (valid) {
          //var that = this;

          axios.post(url_path + 'login/', {
            username: this.param.username,
            password: this.param.password,
          }).then((res) => {

            if (res.status === 200){


              // sessionStorage.setItem("token",res.data.token);
              // sessionStorage.setItem("userName",this.param.username);
              cookie.set("username", this.param.username, 7);
              cookie.set('token', res.data.token, 7);
              localStorage.setItem("token", res.data.token);

              // cookie.setCookie('username',this.param.username,7);
              // cookie.setCookie('token',res.data.token,7);



              //that.$store.commit('username',this.param.username);


              // store.commit('set_token', res.data.token)
              // console.log(store);
              //that.$store.commit('token',res.data.token);

              this.$message.success('登录成功');
              localStorage.setItem('username', this.param.username);
              this.$router.push('/');
            }


          }).catch(err => {
            this.$alert('输入信息有误！', '', {
              confirmButtonText: '确定',
            });
            console.log(err);
          })


        } else {
          this.$message.error('请输入账号和密码');
          console.log('error submit!!');
          return false;
        }
      });
    },

    submitRegister(){
      this.$router.push('/register');
    },
  },
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: 100%;
}

.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.ms-content {
  padding: 30px 30px;
}

.login-btn {
  text-align: center;
}

.register-btn{
  text-align: center;
}


.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}

.register-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}

.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
