<template>
  <div class="profilelist">
    <!-- 第一个tab切换 -->
    <div class="profile-tab">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户概况" name="first">
          <!-- 今日新增用户表格 -->
          <div class="today-box">
            <ul class="today">
              <li>今日新增用户</li>
              <li>今日活跃用户</li>
              <li>近7日平均新增</li>
              <li>近7日平均活跃</li>
              <li>近7日总活跃</li>
              <li>累计用户数</li>
            </ul>
            <ul class="number">
              <li>23</li>
              <li>0</li>
              <li>0</li>
              <li>1</li>
              <li>24</li>
              <li>1215</li>
            </ul>
            <ul class="compare">
              <li>同比 +5.6%
                <img src="../../assets/image/up.png" alt="">
              </li>
              <li>同比 +5.6%
                <img src="../../assets/image/up.png" alt="">
              </li>
              <li>同比 +5.6%
                <img src="../../assets/image/up.png" alt="">
              </li>
              <li>同比 +5.6%
                <img src="../../assets/image/up.png" alt="">
              </li>
              <li>同比 +5.6%
                <img src="../../assets/image/up.png" alt="">
              </li>
            </ul>
          </div>
          <!-- 第一个tab切换中套用第二个tab切换1 -->
          <div class="adduser-tab">
            <!-- 新增用户 -->
            <el-tabs v-model="activeName2" style="marginLeft: 0px; marginRight: 0px;" type="card" @tab-click="handleClick2">
              <el-tab-pane label="新增用户" name="first">新增用户</el-tab-pane>
              <el-tab-pane label="活跃用户" name="second">活跃用户</el-tab-pane>
              <el-tab-pane label="累计用户" name="third">累计用户</el-tab-pane>
            </el-tabs>
          </div>
          <!-- 第一个tab切换中套用第二个tab切换2 -->
          <div class="day-tab">
            <!-- 新增用户 -->
            <el-tabs v-model="activeName3" style="marginLeft: 0px; marginRight: 0px;" type="card" @tab-click="handleClick3">
              <el-tab-pane label="日" name="first">日</el-tab-pane>
              <el-tab-pane label="周" name="second">周</el-tab-pane>
              <el-tab-pane label="月" name="third">月</el-tab-pane>
            </el-tabs>
          </div>
        </el-tab-pane>
        <el-tab-pane label="用户行为" name="second-action">
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first',
      activeName2: 'first',
      activeName3: 'first'
    }
  },
  methods: {
    //第一个大的tab
    handleClick(tab, event) {
      console.log(tab.index)
      // tab切换跳转路由
      if (tab.index == 1) {
        this.$router.push({
          name: 'userBehavior'
        })
      }
    },
    //小tab切换左
    handleClick2(){
    },
    //小tab切换右
    handleClick3(){
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
/*今日新增用户*/
.today-box {
  margin-top: 29px;
  margin-bottom: 30px;
  border: 1px solid #e9ecef;
  width: 936px;
  height: 149px;
  background-color: #fbfdff;
}
ul {
  width: 936px;
  text-align: center;
}
.today li {
  float: left;
  width: 156px;
  margin-top: 35px;
  font-size: 16px;
  color: #666666;
}
.number li {
  float: left;
  width: 156px;
  border-right: 1px solid #e9ecef;
  font-size: 26px;
  color: #333333;
  line-height: 38px;
}
.compare li {
  float: left;
  width: 156px;
  font-size: 12px;
  color: #999999;
}
/*新增用户：第一个tab切换中套用第二个tab切换*/
.adduser-tab {
  float: left;
}
.adduser-tab .el-tabs__nav .is-top {
  width: 90px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
}
.adduser-tab .el-tabs__header {
  height: 32px;
  line-height: 0;
}
.adduser-tab .el-tabs__nav-wrap {
  height: 32px;
}
.adduser-tab .el-tabs__nav-scroll .el-tabs__nav {
  height: 32px;
  border-radius: 6px;
}
.adduser-tab #tab-first {
  margin-left: 0px;
  margin-top: -20px;
}
/*日周月：第一个tab切换中套用第三个tab切换*/
.day-tab {
  float: right;
}
.day-tab .el-tabs__nav .is-top {
  width: 50px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
}
.day-tab .el-tabs__header {
  height: 32px;
  line-height: 0;
}
.day-tab .el-tabs__nav-wrap {
  height: 32px;
}
.day-tab .el-tabs__nav-scroll .el-tabs__nav {
  height: 32px;
  border-radius: 6px;
}
.day-tab #tab-first {
  margin-left: 0px;
  margin-top: -20px;
}
</style>

