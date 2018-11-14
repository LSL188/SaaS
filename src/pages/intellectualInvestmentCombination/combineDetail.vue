<template>
  <div class="combaine-detail">
    <div class="daohang">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: 'intellectualInvestmentCombinationList' }"><span class="zhitou">&lt;智投组合</span></el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="#" class="name">{{portfolio_name}}</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box-nav">
      <div class="nav-left">
        <p class="nav-text">风险等级</p>
        <h6 class="level-num">{{riskLevel}}</h6>
        <el-button class="change-level" type="text">调整风险等级</el-button>
      </div>
      <div class="nav-right">
        <el-button type="primary" @click="gotocOptimize">仓位优化</el-button>
      </div>
    </div>
    <div class="linechartbox">
      <p class="tip-text">收益曲线</p>
      <div class="lineshow">
        <lineBox ref="lineChart"></lineBox>
      </div>
    </div>
    <div class="basic-params">
      <p class="tip-text">基本参数</p>
      <ul class="clear">
        <li>历史总收益：
          <span :class="rateList.return_all_time > 0 ?'up':'down'">{{rateList.return_all_time || 0 | toThousands(2,true)}}%</span>
        </li>
        <!-- <li>历史年化波动率：<span :class="rateList.volatility_all_time > 0 ?'up':'down'">{{rateList.volatility_all_time || '0.00' | formatRate}}</span></li> -->
        <li>历史年化波动率：
          <span>{{rateList.volatility_all_time || '0.00'}}%</span>
        </li>
        <li>今日收益:
          <span :class="rateList.return_last_day > 0 ?'up':'down'">{{rateList.return_last_day || 0 | toThousands(2,true)}}%</span>
        </li>
        <li>近3个月收益：
          <span :class="rateList.return_3m > 0 ?'up':'down'">{{rateList.return_3m || 0 | toThousands(2,true)}}%</span>
        </li>
        <!-- <li>近3个月波动率：<span :class="rateList.volatility_3m > 0 ?'up':'down'">{{rateList.volatility_3m || '0.00' | formatRate}}</span></li> -->
        <li>近3个月年化波动率：
          <span>{{rateList.volatility_3m || '0.00'}}%</span>
        </li>
        <li>最近调仓时间：
          <span>{{balenceDate || '暂无数据'}}</span>
        </li>
        <li>风险等级：
          <span>{{riskLevel || '暂无数据'}}</span>
        </li>
        <li>创建时间：
          <span>{{createDate || '暂无数据'}}</span>
        </li>
        <li></li>
      </ul>
    </div>
    <div class="piebox">
      <p class="tip-text">仓位详情</p>
      <pieBox ref="pieChart"></pieBox>
    </div>
    <div class="adjust-record">
      <div class="adjust-box">
        <div class="adjust-head">
          <p class="tip-text">调仓记录</p>
          <p class="record-all" @click="showAllRecord()" v-if="recordList.length>0">全部
            <span><img src="" alt="" />></span>
          </p>
        </div>
        <div style="color:#AAA;" v-if="recordList.length==0">
          暂无调仓记录
        </div>
        <ul v-if="showRecord">
          <li class="list-item" v-for="(item,index) in recordList" :key="index">
            <span class="port-name">{{item.rebalance_date}}</span>
            <span class="port-detail" @click="gotoRecordDetail(index)">详情</span>
          </li>
        </ul>
        <div class="no-combine" v-else>
          <img src="../../../src/assets/image/noCombine.png" alt="">
          <p>无记录</p>
        </div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div class="detailbox" v-show="detailFlag">
        <div class="showbox">
          <div class="showbox-tit">{{detailTit}}调仓详情
            <i class="closebtn" @click="detailFlag = false"></i>
          </div>
          <ul class="showbox-list">
            <li v-for="(item, index) in detailshow" :key="index" v-if="detailshow.length > 0">
              <p class="name">{{publicMethod.decodeUnicode(item.fund_name)}}{{item.ticker|deleteOF}}</p>
              <div class="changebar">
                <span class="beginRate">{{item.from}}%</span>
                <i class="arrow"></i>
                <span class="endRate">{{item.to}}%</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import pieBox from '../../../src/components/pieEchart'
import lineBox from '../../../src/components/lineEchart'
export default {
  components: {
    pieBox,
    lineBox
  },
  data() {
    return {
      portfolio_id: this.$route.query.portfolio_id,
      portfolio_name: this.$route.query.portfolio_name,
      recordList: [],
      rateList: [],
      riskLevel: '',
      checkMonth: 1,
      balenceDate: '',
      createDate: '',
      recordDetail: {},
      detailFlag: false,
      detailTit: '',
      detailshow: [],
      showRecord: true
    }
  },
  created() {
    document.title = '组合详情'
  },
  mounted() {
    // 获取收益曲线
    this.getLineData()
    // 获取基本参考数据
    this.getBaseData()
    // 获取调仓详情
    this.getpieData()
    // 调仓记录
    this.getRecordData()
  },
  methods: {
    // 仓位优化
    gotocOptimize() {
      this.$router.push({
        path: '/index/combineoptimize',
        query: { portfolio_id: this.portfolio_id }
      })
    },
    // 查看全部调仓记录
    showAllRecord() {
      this.$router.push({ path: '/index/adjustRecord', query: { portfolio_id: this.portfolio_id } })
    },
    // 查看调仓记录详情
    gotoRecordDetail(index) {
      const date = this.recordList[index].rebalance_date || ''
      let params = {
        portfolio_id: this.portfolio_id,
        rebalance_date: encodeURIComponent(date)
      }
      this.$http
        .get('/portfolio/pos_history/detail' + this.publicMethod.spliceParamsGet(params))
        .then(res => {
          let data = res.data
          if (data.code === 200) {
            this.detailTit = this.recordDetail.rebalance_date
            this.recordDetail = this.recordList[index]
            this.detailshow = data.data.rebalance_log_detail
            this.detailFlag = true
          }
        })
    },
    // 获取收益曲线数据
    getLineData() {
      let params = {
        portfolio_id: this.portfolio_id
        // month_facet: this.checkMonth
      }
      this.$http
        .get('portfolio/history_line' + this.publicMethod.spliceParamsGet(params))
        .then(res => {
          let data = res.data
          if (JSON.stringify(data.data) === '{}') {
            this.$refs.lineChart.serverError = true
            this.$refs.lineChart.textList = '哎呀，出错了~'
            return false
          }
          if (typeof data === 'string') {
            data = data.replace(/NaN/g, null)
            data = JSON.parse(data)
          }
          if (data.code === 200) {
            // 折线图变化
            this.$refs.lineChart.dealList(data.data.history_line)
          }
        })
    },
    // 获取基本参考利率
    getBaseData() {
      let params = {
        portfolio_id: this.portfolio_id
      }
      this.$http.get('portfolio/baseinfo' + this.publicMethod.spliceParamsGet(params)).then(res => {
        let data = res.data
        if (data.code === 200) {
          this.rateList = data.data.return
          this.riskLevel = data.data.risk_level
          this.balenceDate = data.data.last_rebalance_date
          this.createDate = data.data.create_date
        }
      })
    },
    // 仓位详情
    getpieData() {
      let params = {
        portfolio_id: this.portfolio_id
      }
      this.$http
        .get('portfolio/pos_detail' + this.publicMethod.spliceParamsGet(params))
        .then(res => {
          if (res.data.code === 200) {
            this.$refs.pieChart.dealList(res.data.data.portfolio_detail)
          }
        })
    },
    // 调仓记录
    getRecordData() {
      let params = {
        portfolio_id: this.portfolio_id
      }
      this.$http
        .get('portfolio/pos_history' + this.publicMethod.spliceParamsGet(params))
        .then(res => {
          if (res.data.code === 200) {
            this.recordList = res.data.data.rebalance_detail
            if (JSON.stringify(this.recordList) === '{}' || this.recordList.length <= 0) {
              this.showRecord = false
            }
          }
        })
    }
  }
}
</script>
<style  lang="scss" scoped>
.combaine-detail {
  width: 100%;
  // min-height:900px;
  overflow: hidden;
  background: #fff;
  padding: 0 40px;
  .box-nav {
    width: 100%;
    display: flex;
    border-bottom: 1px solid #e9ecef;
    height: 82px;
    line-height: 82px;
    .nav-right {
      flex: 1;
      text-align: right;
      .el-button {
        @include wh(126px, 44px);
      }
    }
  }
  .tip-text {
    @include wh(80px, 28px);
    @include font(20px, 28px, #333);
    margin: 20px 0 20px 0;
    text-align: left;
  }
  .basic-params {
    border-bottom: 1px solid #e9ecef;
    ul {
      margin-bottom: 30px;
      display: block;
      li {
        @include wh(292px, 50px);
        background: #fbfdff;
        float: left;
        @include font(16px, 50px, #666);
        text-align: left;
        position: relative;
        margin-right: 30px;
        padding-left: 20px;
        span {
          display: inline-block;
          position: absolute;
          top: 0;
          right: 10px;
        }
        .up {
          @include font(18px, 50px, #ff2500);
        }
        .down {
          @include font(18px, 50px, #17c671);
        }
      }
      li:nth-child(3),
      li:nth-child(6),
      li:nth-child(9) {
        margin-right: 0;
      }
    }
  }
  .piebox {
    background: #fff;
    position: relative;
    .tip-text {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 99;
    }
  }
  .linechartbox {
    padding: 30px 0;
    border-bottom: 1px solid #e9ecef;
    position: relative;
    .tip-text {
      @include font(20px, 28px, #333);
      position: absolute;
      top: 0;
      left: 0;
    }
    .lineshow {
      margin-top: 30px;
    }
  }
  .adjust-record {
    padding-bottom: 70px;
    .list-item {
      transition: 0.3s;
      &:hover {
        transform: translateX(10px);
      }
    }
    .adjust-head {
      display: flex;
      p {
        flex: 1;
      }
      .adjust-text {
        text-align: left;
        @include font(20px, 78px, #333);
      }
      .record-all {
        text-align: right;
        @include font(20px, 78px, #007bff);
        cursor: pointer;
      }
    }
    ul {
      width: 937px;
      li {
        @include wh(100%, 70px);
        @include font(16px, 70px, #333);
        padding: 0px;
        span {
          display: inline-block;
          width: 50%;
          float: left;
        }
        .port-name {
          text-align: left;
        }
        .port-detail {
          text-align: right;
          color: #3495ff;
          cursor: pointer;
        }
        border-bottom: 1px solid #d7dee6;
      }
      li:hover {
        cursor: pointer;
        color: #3495ff;
      }
      li:nth-of-type(odd) {
        background: #fbfdff;
      }
    }
    .no-combine {
      img {
        @include wh(139px, 100px);
        display: block;
        padding-top: 55px;
        margin: 0 auto;
      }
      p {
        @include font(16px, 22px, #333);
        padding-top: 31px;
      }
    }
  }
  .detailbox {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    .showbox {
      width: 592px;
      background: #ffffff;
      border-radius: 6px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding-bottom: 20px;
      .showbox-tit {
        height: 60px;
        line-height: 60px;
        padding-left: 30px;
        font-size: 18px;
        color: #333333;
        position: relative;
        text-align: left;
        .closebtn {
          position: absolute;
          width: 19px;
          height: 20px;
          right: 30px;
          top: 50%;
          transform: translateY(-50%);
          background: url('../../assets/image/adjustRecord/X.png') no-repeat;
          background-size: 100% 100%;
        }
      }
      .showbox-list {
        padding: 0 14px;
        height: 300px;
        overflow-y: auto;
        li {
          height: 57px;
          line-height: 57px;
          border-top: 1px solid #e9ecef;
          position: relative;
          .name {
            font-size: 16px;
            color: #333333;
            text-align: left;
            padding-left: 28px;
            position: relative;
            &::before {
              content: '';
              position: absolute;
              left: 14px;
              top: 50%;
              transform: translateY(-50%);
              width: 4px;
              height: 4px;
              background: #007bff;
              border-radius: 50%;
            }
          }
          .changebar {
            position: absolute;
            top: 0;
            right: 30px;
            width: 40%;
            height: 100%;
            .beginRate {
              font-size: 16px;
              color: #666666;
              float: left;
            }
            .endRate {
              font-size: 16px;
              color: #666666;
              float: right;
            }
            .arrow {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -40%);
              width: 22px;
              height: 15px;
              background: url('../../assets/image/adjustRecord/arrow.png') no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
    }
  }
}
// 面包屑导航
.daohang {
  margin-top: 22px;
}
.zhitou {
  font-size: 14px !important;
  color: #007bff !important;
  font-family: PingFangSC-Regular;
}
.name {
  font-size: 14px !important;
  color: #000 !important;
  font-family: PingFangSC-Medium;
}
// 导航部分
.box-nav .nav-left {
  float: left;
}
.box-nav .nav-text {
  float: left;
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: #999;
  font-weight: 700;
}
.box-nav .level-num {
  float: left;
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: #999;
  font-weight: 700;
  padding: 0px 14px;
}
.box-nav .change-level {
  float: left;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #3495FF;
  height: 82px;
}
</style>
