<template>
  <div class="profilelist">
    <!-- 第一个tab切换 -->
    <div class="profile-tab">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户概况" name="first">
          <!-- 今日新增用户表格 -->
          <!-- <div class="today-box">
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
          </div> -->
          <!-- 第一个tab切换中套用第二个tab切换 -->
          <!-- 新增用户 -->
          <!-- <div class="adduser-tab">
            <el-tabs class="adduser_tab" v-model="activeName2" style="marginLeft: 0px;" type="card" @tab-click="handleClick">
              <el-tab-pane label="新增用户" name="first">新增用户</el-tab-pane>
              <el-tab-pane label="活跃用户" name="second">活跃用户</el-tab-pane>
              <el-tab-pane label="累计用户" name="third">累计用户</el-tab-pane>
            </el-tabs>
          </div> -->
        </el-tab-pane>
        <el-tab-pane label="用户行为" name="second">
          <!-- 今日新增用户表格 -->
          <div class="risk-box">
            <ul class="risk">
              <li>风险评估</li>
              <li>查看智投组合</li>
              <li>新建组合</li>
              <li>组合调仓</li>
            </ul>
            <ul class="risk-number">
              <li>212</li>
              <li>40</li>
              <li>04</li>
              <li>41</li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'second'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab.index)
      // tab切换跳转路由
      if(tab.index==0){
        this.$router.push({
          name:'userProfileList'
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
/*今日新增用户*/
/* .today-box {
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
} */
/*新增用户：第一个tab切换中套用第二个tab切换*/
/* .adduser-tab {
  border-top: 1px solid #E9ECEF;
  padding-top: 28px;
  color: green;
}
.el-tabs__nav {
  font-size: 14px;
} */
/*用户行为*/
.risk-box {
  margin-top: 29px;
  margin-bottom: 30px;
  border: 1px solid #e9ecef;
  width: 936px;
  height: 120px;
  background-color: #fbfdff;
}
ul {
  width: 936px;
  text-align: center;
}
.risk li {
  float: left;
  width: 234px;
  margin-top: 35px;
  font-size: 16px;
  color: #666666;
}
.risk-number li {
  float: left;
  width: 234px;
  border-right: 1px solid #e9ecef;
  font-size: 26px;
  font-family: HelveticaNeue;
  color: #333333;
  line-height: 38px;
}
</style>




