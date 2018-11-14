<template>
    <div class="login-container">
       <div class="login login-text">
           <div class="text-box">
                <div class="text-head">
                   <img src="@/assets/image/login/icon.png" alt="">
                </div>
                <div class="text-body">
                    <p>
                        <el-input type="text" :class="{'error-border':accError}" placeholder="账号" v-model="loginAccount" maxlength="10"  onkeypress="if(event.keyCode==13){document.getElementById('pwd').blur()}" clearable></el-input>
                        <span class="error-tip" v-show="accError">{{accErrorTip}}</span>
                    </p>
                    <p>
                        <el-input type="password" id="pwd" :class="{'error-border':pwdError}" placeholder="密码" v-model="loginPassword" maxlength="30" @keyup.native="submit('input', $event)" clearable></el-input>
                        <span class="error-tip" v-show="pwdError">{{pwdErrorTip}}</span>
                    </p>
                    <el-button type="primary" class="login-btn" @click="submit('btn', $event)">登录</el-button>
               </div>
           </div>
       </div>
    </div>
</template>
<script>
import hexMd5 from '../tools/md5'

export default {
  data() {
    return {
      loginAccount: 'admin',
      loginPassword: '123456aa',
      company: 'moneyworks',
      accError: false,
      pwdError: false,
      accErrorTip: '',
      pwdErrorTip: '',
      stopDbClick: true,
      t: 'LiuRui_pingan'
    }
  },
  created() {
    // this.publicMethod.removeCookie('sign')
    // this.publicMethod.removeCookie('user_name')
  },
  watch: {
    loginAccount(val) {
      if (val !== '') {
        this.accError = false
      }
    },
    loginPassword(val) {
      if (val !== '') {
        this.pwdError = false
      }
    }
  },
  methods: {
    async submit(val, event) {
      if ((event.keyCode === 13 && val === 'input' && this.loginPassword !== '') || val === 'btn') {
        if (this.loginAccount === '') {
          this.accErrorTip = '账号不能为空'
          this.accError = true
        } else if (this.loginAccount.match(/\W/g)) {
          this.accErrorTip = '输入账号有误'
          this.accError = true
        }
        if (this.loginPassword === '') {
          this.pwdErrorTip = '密码不能为空'
          this.pwdError = true
        } else if (this.loginPassword.length < 1) {
          this.pwdErrorTip = '输入验证码有误'
          this.pwdError = true
        }
        if (this.pwdError || this.accError) {
          return false
        }
        if (this.stopDbClick) {
          this.stopDbClick = false
          let params = {
            username: this.loginAccount,
            // password: hexMd5.hex_md5(String(this.loginPassword)).toUpperCase()
            password: this.loginPassword,
            company: this.company
          }
          const { data: res } = await this.$http.post('login/', params)
          console.log(res)
          if (res.code !== 200) return this.$message.error('登录失败！')
          this.$message.success('登录成功！')
          window.sessionStorage.setItem('token', res.data.token)
          this.$router.push('/index')

        }
      }
    }
  }
}
</script>
<style lang="scss">
.login-container {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  text-align: center;
  background: url('../assets/image/login/login-bg.png') no-repeat top center;
  background-size: cover;
  position: relative;
  .login {
    width: 100%;
    height: 100%;
  }
  .login-text {
    .text-box {
      width: 400px;
      margin: 0 auto;
      background: #fff;
      border: 1px solid #dedede;
      text-align: center;
      @include center();
      .text-head {
        width: 100%;
        padding-top: 54px;
        overflow: hidden;
        img {
          @include wh(60px, 60px);
          display: inline-block;
        }
      }
      .text-body {
        padding-bottom: 50px;
        p {
          height: 46px;
          margin-top: 33px;
          padding: 0 26px;
          position: relative;
          input {
            width: 340px;
            height: 46px;
          }
          .error-tip {
            font-size: 10px;
            position: absolute;
            left: 28px;
            bottom: -19px;
            color: #e3111e;
          }
          .error-border {
            input {
              border: 1px solid #e3111e;
            }
          }
        }
        .login-btn {
          width: 340px;
          height: 46px;
          line-height: 45px;
          margin-top: 47px;
          padding: 0;
          @include font(22px, 30px, #fff);
        }
      }
    }
  }
}
</style>
