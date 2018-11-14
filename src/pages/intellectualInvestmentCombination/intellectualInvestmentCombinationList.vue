<template>
  <div class="combinationlist">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- tab切换1 -->
      <el-tab-pane label="智投组合" name="first">
        <div class="renew-box">
          <p class="renew">更新时间：2018年6月11日 07:11 （已更新至最新配置）</p>
          <!-- 今日组合部分 -->
          <div class="box-nav rank-box">
            <div class="nav-left">
              <p class="nav-text">风险等级</p>
              <h6 class="level-num">{{riskLevel}}</h6>
              <el-button class="change-btn" type="text" @click="dialogVisible = true">切换</el-button>
              <el-dialog class="changeDialog" :visible.sync="dialogVisible">
                <span>切换为
                  <span class="five">5</span>
                  级
                </span>
                <el-button type="primary" size="small" @click="confirm">确定</el-button>
              </el-dialog>
            </div>
            <div class="nav-right">
              <el-button class="nav-el-btn" type="primary" @click="centerDialogVisible = true">关注当前组合</el-button>
            </div>
          </div>
        </div>
        <div class="box-body">
          <div class="mainbox">
            <pieBox :isIndex="true" @getTime="getTime" ref="pieChart"></pieBox>
            <div class="chartbox">
              <div class="line_month">
                <span :class="{'date-check':dataCheck == index}" v-for="(item, index) in linechartList" :key="index" @click="dateChange(item.code, index)">{{item.tit}}</span>
              </div>
              <div class="lineshow">
                <lineBox :isIndex="true" ref="lineChart"></lineBox>
              </div>
            </div>
            <div class="charbox-text">
              <ul v-if="chartText.icome.length > 0">
                <li v-for="(val,index) in incomeList" :key="index">
                  <span class="fl">{{val}}:</span>
                  <span class="fr" :class="chartText.icome[index]>=0?'up':'down'">{{chartText.icome[index] || 0 | toThousands(2,true)}}%</span>
                </li>
              </ul>
              <ul v-if="chartText.fluct.length > 0">
                <li v-for="(val,index) in fluctList" :key="index">
                  <span class="fl">{{val}}:</span>
                  <!-- <span class="fr" :class="chartText.fluct[index]>=0?'up':'down'">{{chartText.fluct[index] || '0.00' | formatRate}}</span> -->
                  <span class="fr">{{chartText.fluct[index] || '0.00'}}%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <el-dialog title="从今天开始跟踪当前组合？" :visible.sync="centerDialogVisible" width="30%" center>
          <el-input placeholder="请输入组合名称" v-model="fillComineName" clearable maxlength="30">
          </el-input>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="followCurCombine">确认跟踪</el-button>
            <el-button @click="centerDialogVisible = false;fillComineName=''">取消</el-button>
          </span>
        </el-dialog>
        <!-- 饼状图和折线图部分结束 -->
      </el-tab-pane>
      <!-- tab切换2 -->
      <el-tab-pane label="关注的组合" name="second"></el-tab-pane>
      <el-tab-pane label="个性化设置" name="third"></el-tab-pane>
    </el-tabs>
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
      activeName: 'first',
      dialogVisible: false,
      chartText: {
        icome: [],
        fluct: []
      },
      incomeList: ['1个月收益', '6个月收益', '1年收益', '3年收益'],
      fluctList: ['1个月波动率', '6个月波动率', '1年波动率', '3年波动率'],
      linechartList: [
        {
          tit: '1个月',
          code: '1'
        },
        {
          tit: '6个月',
          code: '2'
        },
        {
          tit: '1年',
          code: '3'
        },
        {
          tit: '3年',
          code: '4'
        }
      ],
      websocket: null,
      percentage: 0,
      dialogVisible: false,
      dataCheck: 0,
      riskLevel: 5, // 风险等级
      // riskLevelCur: 0, // 滑动中风险等级
      // levelChanging: false, // 滑动中
      date: 1, // 选择的时间 1=1个月，2=6个月，3=1年，4=3年
      fillComineName: '',
      centerDialogVisible: false,
      // blackListFileName: '', // 需要更新的黑名单名
      // whiteListFileName: '', // 需要更新的白名单名
      taskId: '',
      setTime: '',
      stopDbClick: true,
      stopDbCombClick: true
    }
  },
  created() {
    this.getRateText(this.riskLevel)
  },
  methods: {
    // tab切换跳转
    handleClick(tab, event) {
      console.log(tab, event)
      console.log(tab.index)
      if (tab.index == 1) {
        this.$router.push({
          name:'attentionCombination'
        })
      } else if (tab.index == 2) {
        this.$router.push({
          name:'personalizationSettings'
        })
      } else {
        this.$router.push({
          name:'intellectualInvestmentCombinationList'
        })
      }
    },
    confirm() {
      this.dialogVisible = false
    },
    // 获取更新时间
    getTime(val) {
      this.updateTime = val
    },
    // 跟踪今日组合
    followCurCombine() {
      if (this.fillComineName === '') {
        this.$message({
          showClose: true,
          message: '组合名称不能为空',
          type: 'error'
        })
        return false
      }
      if (this.stopDbCombClick) {
        this.stopDbCombClick = false
        let params = {
          portfolio_name: this.fillComineName,
          risk_level: this.riskLevel
        }
        this.$http.post('portfolio/watch', params).then(res => {
          this.stopDbCombClick = true
          let data = res.data
          if (data.code === 200) {
            this.fillComineName = ''
            this.$message({
              showClose: true,
              message: '关注当前组合成功',
              type: 'success'
            })
            this.centerDialogVisible = false
          } else if (data.code === 501) {
            this.$message({
              showClose: true,
              message: '该跟踪组合名称已存在',
              type: 'error'
            })
          } else if (data.code === 502) {
            this.$message({
              showClose: true,
              message: '跟踪组合权重之和不为1',
              type: 'error'
            })
          } else {
            this.$message({
              showClose: true,
              message: '接口调用出错',
              type: 'error'
            })
          }
        })
      }
    },
    // 风险等级变化
    riskChange(val) {
      this.riskLevel = val
      // 收益率表变化
      this.getRateText(this.riskLevel)
      // 折线图变化
      this.$refs.lineChart.getLineData(this.riskLevel, this.date)
      // 饼图变化
      this.$refs.pieChart.getPieData(this.riskLevel)
    },
    // 折线图时间切换
    dateChange(code, index) {
      this.dataCheck = index
      this.date = code
      // 收益率表变化,接口不支持，去掉
      // this.getRateText(this.riskLevel, this.date);
      // 折线图变化
      this.$refs.lineChart.getLineData(this.riskLevel, this.date)
    },
    // 获取收益率
    getRateText(riskLevel) {
      let params = {
        risk_level: riskLevel
      }
      this.$http
        .get('portfolio/daily/return/risk_level' + this.publicMethod.spliceParamsGet(params))
        .then(res => {
          let data = res.data
          console.log('收益', data)
          if (data.code === 200) {
            this.chartText = {
              icome: [
                data.data.return_3m,
                data.data.return_6m,
                data.data.return_1y,
                data.data.return_3y
              ],
              fluct: [
                data.data.volatility_3m,
                data.data.volatility_6m,
                data.data.volatility_1y,
                data.data.volatility_3y
              ]
            }
          }
        })
    }
    // watch: {
    //   fillComineName: function(val) {
    //     this.fillComineName = val
    //   }
    // }
  }
}
</script>
<style lang="scss">
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
  margin-bottom: 11px;
}
//
#tab-second {
  padding: 0 10px;
}

#tab-third {
  margin-left: -10px;
}
#tab-first,
#tab-second,
#tab-third {
  height: 30px !important;
  margin-top: 18px;
}

.el-tabs__nav-wrap::after {
  margin-top: -10px;
}
//
.el-tabs__header {
  margin-bottom: 0px;
}
/*更新部分的样式*/
.renew-box {
  height: 113px;
  border-bottom: 1px solid #e9ecef;
}
.renew {
  text-align: left;
  padding: 35px 0 8px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  color: #999999;
}
.nav-left {
  float: left;
}
.nav-text {
  float: left;
  font-family: PingFangSC-Medium;
  font-size: 20px;
  color: #333333;
  font-weight: 700;
}
.level-num {
  float: left;
  font-family: PingFangSC-Medium;
  font-size: 20px;
  color: #333333;
  font-weight: 700;
  padding: 0px 14px;
}
.change-btn {
  padding: 0px;
  float: left;
  margin-top: 3px;
}
.nav-left .el-dialog {
  width: 300px;
  height: 70px;
  border-radius: 6px;
  margin: 290px 0px 0px 308px !important;
}
.nav-left .el-icon-close:before {
  content: '';
}
.nav-left .el-dialog__header {
  padding: 0px;
}
.nav-left .el-dialog__body {
  padding: 19px 0px 19px 0px;
}
.nav-left .el-dialog__body span {
  padding: 16px;
}
.change-btn span {
  float: left;
  font-family: PingFangSC-Regular;
  font-size: 20px;
  color: #3495ff;
}
.changeDialog span {
  font-size: 18px;
}
.changeDialog .five {
  width: 60px;
  height: 47px;
  border: 1px solid #d8d8d8;
}
.nav-right {
  float: right;
  text-align: center;
}
.nav-el-btn {
  margin-top: -17px;
  // width: 114px;
  // height: 32px;
  // text-align: center;
}
/*样式结尾*/
.box-body {
  width: 100%;
}
.mainbox {
  margin: 0 auto;
}
.chartbox {
  position: relative;
  // height: 645px;
}
.line_month {
  padding-left: 40px;
  text-align: left;
  position: absolute;
  top: 35px;
  left: 14px;
  z-index: 99;
  height: 34px;
}
.line_month span {
  display: inline-block;
  margin-right: 50px;
  padding: 0 10px 5px;
  // border-bottom: 2px solid #fff;
}
span:hover {
  cursor: pointer;
  color: #007bff;
}
.date-check {
  color: #007bff;
  border-bottom: 2px solid #007bff;
}
.lineshow {
  padding-top: 40px;
  padding-left: 10px;
}
// .charbox-text {
//   padding: 30px 0 40px;
//   overflow: hidden;
// }
// .charbox-text ul {
//   float: left;
//   background: #fbfdff;
//   border-radius: 8px;
// }
// .charbox-text ul li {
// }
// .charbox-text ul li span {
//   display: inline-block;
// }
// .charbox-text ul li .fl {
//   text-align: left;
//   padding-left: 40px;
// }
// .charbox-text ul li .fr {
//   text-align: right;
//   padding-right: 40px;
// }
.charbox-text {
  padding: 30px 0 40px;
  overflow: hidden;
  ul {
    @include wh(440px, 209px);
    float: left;
    margin-right: 28px;
    background: #fbfdff;
    border-radius: 8px;
    li {
      @include wh(100%, 50px);
      span {
        display: inline-block;
        @include wh(210px, 50px);
        @include font(16px, 50px, #666);
      }
      .fl {
        text-align: left;
        padding-left: 40px;
      }
      .fr {
        text-align: right;
        padding-right: 40px;
      }
      .up {
        @include font(18px, 50px, #ff2500);
      }
      .down {
        @include font(18px, 50px, #17c671);
      }
    }
  }
}
// .box-nav {
//   border-bottom: 1px solid #e9ecef;
//   .nav-left {
//     flex: 1;
//     text-align: left;
//     .nav-text {
//       @include wh(80px, 28px);
//       @include font(20px, 28px, #333);
//     }
//     .updateDate {
//       height: 22px;
//       @include font(16px, 22px, #999);
//     }
//     .progress-box {
//       /*padding-top: 8px;*/
//       span {
//         float: left;
//         @include font(16px, 22px, #999);
//       }
//       .progress-wh {
//         float: left;
//         @include wh(480px, 4px);
//         margin: 9px 10px 0;
//         background: #eceeef;
//         border-radius: 4px;
//       }
//     }
//   }
//   .nav-right {
//     flex: 1;
//     text-align: right;
//     margin-top: 3px;
//     .el-button {
//       @include wh(179px, 44px);
//     }
//     .update-btn {
//       margin-left: 20px;
//     }
//   }
// }
// .rank-box {
//   padding: 30px 0 33px;
//   .progress-box {
//     width: 90%;
//     overflow: hidden;
//     position: relative;
//     z-index: 100;
//     div {
//       padding: 2px 0;
//       float: left;
//       width: 10%;
//       color: #bbb;
//       text-align: center;
//       box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1) inset;
//       &:hover {
//         cursor: pointer;
//       }
//     }
//     .risk-num-box {
//       text-align: center;
//       span {
//         width: 100%;
//         color: #000;
//         transition: 0.5s;
//         text-shadow: 0px 0px 0px rgba(0, 0, 0, 0.5);
//       }
//       &:hover {
//         span {
//           text-shadow: 3px 2px 1px rgba(0, 0, 0, 0.6);
//           transform: rotateY(360deg) scale(1.3) translateY(-1px);
//         }
//       }
//     }
//     .level-bar,
//     .level-bar-cur {
//       position: absolute;
//       height: 100%;
//       left: 0;
//       top: 0;
//       z-index: -1;
//       transition: 0.3s 0.2s;
//       // &.level1 {
//       //   background: #111;
//       //   width: 10%;
//       //   background: #4acce9;
//       // }
//       // &.level2 {
//       //   background: #222;
//       //   width: 20%;
//       //   background: #52e5cf;
//       // }
//       // &.level3 {
//       //   background: #333;
//       //   width: 30%;
//       //   background: #10c92d;
//       // }
//       // &.level4 {
//       //   background: #444;
//       //   width: 40%;
//       //   background: #57d16b;
//       // }
//       // &.level5 {
//       //   background: #777;
//       //   width: 50%;
//       //   background: #9ce5a8;
//       // }
//       // &.level6 {
//       //   background: #555;
//       //   width: 60%;
//       //   background: #e05db5;
//       // }
//       // &.level7 {
//       //   background: #666;
//       //   width: 70%;
//       //   background: #c741f8;
//       // }
//       // &.level8 {
//       //   background: #777;
//       //   width: 80%;
//       //   background: #8b81ff;
//       // }
//       // &.level9 {
//       //   background: #888;
//       //   width: 90%;
//       //   background: #6056da;
//       // }
//       // &.level10 {
//       //   background: #888;
//       //   width: 100%;
//       //   background: #6798ef;
//       // }
//     }
//   }
//   .nav-left {
//     flex: 2;
//     position: relative;
//     .level-num {
//       position: absolute;
//       right: 0;
//       bottom: 0;
//     }
//   }
//   .nav-right {
//     margin-top: 8px;
//   }
// }
// .box-body {
//   width: 100%;
//   .mainbox {
//     width: 1000px;
//     margin: 0 auto;
//     padding: 0 20px;
//     .chartbox {
//       position: relative;
//       .line_month {
//         padding-left: 30px;
//         text-align: left;
//         position: absolute;
//         top: 15px;
//         left: 10px;
//         z-index: 99;
//         span {
//           display: inline-block;
//           margin-right: 10px;
//           @include font(16px, 40px, #999);
//           padding: 0 10px;
//           border-bottom: 2px solid #fff;
//           &:hover {
//             cursor: pointer;
//             color: #007bff;
//           }
//         }
//         .date-check {
//           color: #007bff;
//           border-bottom: 2px solid #007bff;
//         }
//       }
//       .lineshow {
//         padding-top: 40px;
//       }
//     }
//     .charbox-text {
//       padding: 30px 0 40px;
//       overflow: hidden;
//       ul {
//         @include wh(440px, 209px);
//         float: left;
//         margin-right: 30px;
//         background: #fbfdff;
//         border-radius: 8px;
//         li {
//           @include wh(100%, 50px);
//           span {
//             display: inline-block;
//             @include wh(210px, 50px);
//             @include font(16px, 50px, #666);
//           }
//           .fl {
//             text-align: left;
//             padding-left: 40px;
//           }
//           .fr {
//             text-align: right;
//             padding-right: 40px;
//           }
//           .up {
//             @include font(18px, 50px, #ff2500);
//           }
//           .down {
//             @include font(18px, 50px, #17c671);
//           }
//         }
//       }
//     }
//   }
// }
</style>

