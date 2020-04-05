<template>
  <div class="login-container">
    <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="login-form" autoComplete="on" label-position="left" size="mini">
      <div class="title-container">
        <h3 class="title">{{config.info.title}}</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user"/>
        </span>
        <el-input name="username" maxlength="20" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户名"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input name="password" maxlength="32" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                  autoComplete="on" placeholder="密码"></el-input>
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
      </el-form-item>

      <!--
      <el-form-item prop="word">
        <span class="svg-container">
          <svg-icon icon-class="component"/>
        </span>
        <el-input name="word" @keyup.enter.native="handleLogin" v-model="loginForm.word" placeholder="验证码" maxlength="4"></el-input>
        <img v-if="this.key" :src="validCodeUrl" style="width: 75px; height: 25px;" @click="reloadImg" class="valid-img">
      </el-form-item>
      -->

      <el-button class="loginBtn" type="primary" :loading="loading" @click.native.prevent="handleLogin">登 录</el-button>
    </el-form>
  </div>
</template>

<script>
// import urls from '@/config/urls'
// import AseUtils from '@/common/ase-utils'
import config from '@/config'
// import { strongValidPassword } from '@/common/validate'

export default {
  name: 'login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value || value.length < 0) {
        callback(new Error('密码不能为空'))
      } else if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    // const validateWord = (rule, value, callback) => {
    //   if (!value || value.length !== 4) {
    //     callback(new Error('请输入四位验证码'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      // key: new Date().getTime(),
      // validCodeUrl: urls.auth.validCode + '?_t=' + new Date().getTime() + '&_k=' + this.key,
      config: config,
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
        // word: [
        //   { required: true, trigger: 'blur', validator: validateWord }
        // ]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false
    }
  },
  mounted () {
    // this.reloadImg()
  },
  methods: {
    // reloadImg () {
    //   this.key = new Date().getTime()
    //   this.validCodeUrl = urls.auth.validCode + '?_t=' + new Date().getTime() + '&_k=' + this.key
    // },
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin () {
      const self = this
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          // const timeStamp = new Date().getTime()
          // const pwd = AseUtils.encrypt(this.loginForm.password + timeStamp, config.aesKey)
          // console.log('strongValidPassword(this.loginForm.password): ' + strongValidPassword(this.loginForm.password))
          this.$store.dispatch('login', {
            mobile: this.loginForm.username,
            password: this.loginForm.password
            // timeStamp: timeStamp,
            // word: this.loginForm.word,
            // key: this.key,
            // isPwdSafe: strongValidPassword(this.loginForm.password)
          }).then(resp => {
            this.loading = false
            self.$router.push({ path: '/' }, (e) => { console.log(e) })
          }).catch(() => {
            // this.reloadImg()
            this.loading = false
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
  @import "../assets/scss/login";
  .login-container {
    background: url(../assets/img/login-bg.jpg) 100% 100% no-repeat;
  }
</style>
