<template>
  <div id="app">
    <div class="wrap-top" :class="{'login-top':$route.name == 'login'}" v-if="$route.name != 'home'">
      <div class="head-box clear">
        <span class="title-p" @click="jumpHome">国美智投&nbsp;</span>
        <span class="title-p1" @click="jumpHome">金融机构的智能化赋能者</span>
        <el-button type="primary" size="mini" icon="el-icon-info"  @click="quickOut" v-if="$route.name != 'login'&&$route.name != 'generateMd5'">退出</el-button>
      </div>
    </div>
    <!-- 路由匹配到的组件将显示在这里 -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      loginPage: false,
      stopDbClick: true
    }
  },
  methods: {
    jumpHome() {
      // window.location = 'https://demo.moneyworks.cn'
    },
    quickOut() {
      if (this.stopDbClick) {
        this.stopDbClick = false
        window.sessionStorage.clear()
        this.stopDbClick = true
        this.$message.success('退出登录')
        this.$router.push('/login')
      }
    }
  }
}
</script>
<style lang="scss">
@import './style/common.css';
@import 'element-ui/lib/theme-chalk/index.css';
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
#app {
  font-family: Microsoft YaHei, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  .wrap-top {
    height: 97px;
    background: #296fce;
    .head-box {
      @include auto;
      padding-top: 44px;
      span {
        text-align: center;
        @include font(24px, 33px, #fff);
      }
      .title-p1 {
        @include font(20px, 28px, #fff);
      }
      .el-button {
        float: right;
        margin-right: 40px;
      }
    }
  }
  .title-p {
    cursor: pointer;
  }
  .login-top {
    background: rgba(44, 47, 53, 0.9) !important;
    p {
      text-align: center !important;
    }
  }
}
</style>
