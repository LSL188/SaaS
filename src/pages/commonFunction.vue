<template>
  <div class="functionlist">
    <div class="top">
      <!-- 早下晚上好 -->
      <div v-if="status == 'morning'">
        <div class="hello">早上好</div>
      </div>
      <div v-else-if="status === 'afternoon'">
        <div class="hello">下午好</div>
      </div>
      <div v-else>
        <div class="hello">晚上好</div>
      </div>
      <!-- 上次登陆时间 -->
      <span class="last-login">上次登录时间：</span>
      <!-- <span class="last-login">2018-11-10 16:08</span> -->
      <span class="last-login" v-html="$options.filters.formatDate(date)"></span>
      <!-- <span class="last-login">{{item.logintime | dateFormat}}</span> -->
    </div>
    <div class="content">
      <div class="content-left">
        <div class="left-top">
          <p class="first-p">智投组合</p>
          <div class="more">
            <img src="../assets/image/index/more.png" alt="">
          </div>
          <p class="second-p">详情</p>
        </div>
        <div class="left-right-bottom">
          <ul class="last-renew">
            <li class="first-li">上次更新时间</li>
            <li class="second-li">2018-08-23</li>
          </ul>
          <ul class="line"></ul>
          <ul class="time">
            <li class="first-li">距离当前</li>
            <li class="second-li">13天</li>
          </ul>
        </div>
      </div>
      <div class="content-right">
        <div class="right-top">
          <p class="first-p">用户概况</p>
          <div class="more">
            <img src="../assets/image/index/more.png" alt="">
          </div>
          <p class="second-p">详情</p>
        </div>
        <div class="left-right-bottom">
          <ul class="last-renew">
            <li class="first-li">今日新增用户</li>
            <li class="second-li">23</li>
            <li class="third-li">同比 +5.6%
              <img src="../assets/image/up.png" alt="">
            </li>
          </ul>
          <ul class="line"></ul>
          <ul class="time">
            <li class="first-li">累计用户</li>
            <li class="second-li">3258</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //定义早下晚
      status : 'morning',
      //定义时间
      date: new Date()
    }
  },
  // 当前时间跟着变
  // mounted() {
  //   var _this = this
  //   this.timer = setInterval(function() {
  //     _this.date = new Date()
  //   }, 1000)
  // },
  // beforeDestroy() {
  //   if (this.timer) {
  //     clearInterval(this.timer)
  //   }
  // },
  //过滤器定义时间
  filters: {
    formatDate: function(value) {
      const dt = new Date(value)
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + '').padStart(2, '0')
      const d = (dt.getDate() + '').padStart(2, '0')
      const H = (dt.getHours() + '').padStart(2, '0')
      const min = (dt.getMinutes() + '').padStart(2, '0')
      return `${y}-${m}-${d} ${H}:${min}`
    }
  },
  methods: {}
}
</script>

<style>
.functionlist {
  margin: 34px 41px 0px 42px;
}
.functionlist .top {
  text-align: left;
}
.hello {
  font-size: 20px;
  font-family: PingFangSC-Medium;
  color: #333333;
  font-weight: 700;
}
.last-login {
  margin-top: 5px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  color: #666;
}
/*常用功能主体部分*/
.content {
  margin-top: 68px;
}
/*左*/
.content .content-left {
  float: left;
  width: 442px;
  border: 1px solid #e9ecef;
  height: 210px;
}
.content .content-left .left-top {
  height: 60px;
  background-color: #e9ecef;
}
.first-p {
  float: left;
  font-size: 20px;
  color: #333333;
  font-family: PingFangSC-Medium;
  font-weight: 700;
  line-height: 60px;
  padding-left: 23px;
}
.second-p {
  float: right;
  line-height: 60px;
  color: #3495ff;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  margin-right: 5px;
}
.more {
  float: right;
  line-height: 60px;
  margin-right: 24px;
  margin-top: 3px;
}
/*左部分下*/
.left-right-bottom {
  width: 442px;
}
.left-right-bottom .last-renew {
  float: left;
  width: 221px;
  margin-top: 36px;
}
.first-li {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  color: #999;
}
.second-li {
  margin-top: 2px;
  font-size: 26px;
  font-family: HelveticaNeue;
  color: #666;
}
.line {
  width: 1px;
  height: 40px;
  float: left;
  background-color: #e9ecef;
  margin-top: 43px;
}
.left-right-bottom .time {
  float: right;
  width: 220px;
  margin-top: 36px;
}
/*右*/
.content .content-right {
  float: right;
  width: 442px;
  border: 1px solid #e9ecef;
  height: 210px;
}
.content .content-right .right-top {
  height: 60px;
  background-color: #e9ecef;
}
/*右部分下*/
.third-li {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  color: #999;
}
</style>
