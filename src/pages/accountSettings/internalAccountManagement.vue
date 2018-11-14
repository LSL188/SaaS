<template>
  <div class="changepassword">
    <!-- 第一个tab切换 -->
    <div class="profile-tab">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="修改密码" name="first"></el-tab-pane>
        <el-tab-pane label="权限设置" name="second"></el-tab-pane>
        <el-tab-pane label="内部账户管理" name="third">内部账户管理
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'third'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab.index)
      // tab切换跳转路由
      if (tab.index == 0) {
        this.$router.push({
          name: 'changePassword'
        })
      } else if (tab.index == 1) {
        this.$router.push({
          name: 'powerSettings'
        })
      } else {
        this.$router.push({
          name: 'internalAccountManagement'
        })
      }
    }
  }
}
</script>
<style>
/*tab切换标题部分*/
.el-tabs {
  margin-left: 40px;
  margin-right: 41px;
}
.el-tabs__header {
  margin: 0px;
  height: 59px;
  line-height: 59px;
}
.is-active {
  font-size: 18px;
  font-family: PingFangSC-Medium;
  color: #007bff;
  font-weight: 700;
}
.el-tabs__active-bar {
  width: 120px !important;
  height: 2px;
  color: #007bff;
}
.el-tabs__item {
  font-size: 18px;
  font-family: PingFangSC-Medium;
  color: #9a9a9a;
}
#tab-first {
  margin-left: 26px;
}
</style>