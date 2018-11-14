<template>
  <div class="opt-container">
    <div class="titbar">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: 'attentionCombination' }">
          <span class="zhitou">&lt;关注的组合</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="combineDetail" class="zhitou">{{portfolio_name}}</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="#" class="name">仓位优化</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="mainbox">
      <table border="0">
        <thead>
          <tr>
            <td>基金名称</td>
            <td>当前仓位</td>
            <td>最优仓位</td>
            <td>仓位优化</td>
            <td>
              <button @click="doOptimize()">调整至最优仓位</button>
              <button @click="doNormalize">仓位归一化</button>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,idx) in fundList" :key="idx">
            <td>{{item.ticker|deleteOF}}{{item.fund_name}}</td>
            <td>{{item.current_pos}}%</td>
            <td>{{item.best_pos}}%</td>
            <td><input type="number" min="1.00" max="100.00" v-model="item.targetPer">%</td>
            <td><input type="range" min="1.00" max="100.00" step="0.01" v-model="item.targetPer"></td>
          </tr>
        </tbody>
      </table>
      <button class="add-fund" @click="searchBoxFlag = true">手动新增基金</button>
      <transition name="fade" mode="out-in">
        <div class="search-box" v-show="searchBoxFlag">
          <div class="showbox">
            <p>手动新增基金</p>
            <div class="inpbox">
              <el-input v-model="searchVal" placeholder="请输入基金代码" class="inp" type="number" v-on:input="searchFun" ref="content"></el-input>
              <div @click="hasCheckd=false;$refs.content.focus()" class="search-check" v-show="hasCheckd">
                <span class="fundnum">{{checkTicker|deleteOF}}</span>
                <span class="fundname">{{checkName}}</span>
              </div>
              <div class="searchlist" v-show="searchListFlag && searchList.length>0">
                <div @click="searchCheckFunction(value.ticker, value.fund_short)" v-for="(value,index) in searchList" :key="index">
                  <span class="fundnum">{{value.ticker|deleteOF}}</span>
                  <span class="fundname">{{value.fund_short}}</span>
                </div>
              </div>
            </div>
            <div class="btmbox">
              <el-button type="primary" class="bottom-box-btn" @click="saveFund">确认新增</el-button>
              <el-button plain class="bottom-box-btn" @click="cancelAddBox">取消</el-button>
            </div>
          </div>
        </div>
      </transition>
      <div class="save-cancel">
        <button @click="addFund">确定仓位</button>
        <button @click="cancelGo">返回</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    document.title = '组合优化'
    this.portfolio_id = this.$route.query.portfolio_id
    for (var i = 0; i < this.fundList.length; i++) {
      this.fundList[i].targetPer = this.fundList[i].curPer
    }
    localStorage.ckptest = 'changed'
    this.getRecord()
  },
  data() {
    return {
      portfolio_id: '',
      portfolio_name: this.$route.query.portfolio_name,
      showAddFund: false,
      inputFund: '',
      showQuerySuggest: false,
      fundList: [],
      oldFundList: [],
      NewFundList: [],
      searchBoxFlag: false,
      searchListFlag: false,
      searchVal: '',
      searchList: [],
      hasCheckd: false,
      checkTicker: '',
      checkName: '',
      stopDbClick: true
    }
  },
  methods: {
    // 获取数据
    getRecord() {
      let params = {
        portfolio_id: this.portfolio_id
      }
      this.$http
        .get('portfolio/rebalance' + this.publicMethod.spliceParamsGet(params))
        .then(res => {
          let data = res.data
          if (data.code === 200) {
            let tempList = data.data.fund_list
            for (var i = 0; i < tempList.length; i++) {
              tempList[i].targetPer = tempList[i].current_pos
            }
            this.fundList = tempList
            // 小数点不足两位补零
            for (var j = 0; j < this.fundList.length; j++) {
              var item = this.fundList[j].targetPer
              var num = new Array()
              num.push(item)
              var f = parseFloat(item)
              if (isNaN(f)) {
                return false
              }
              var s = f.toString()
              var rs = s.indexOf('.')
              if (rs < 0) {
                rs = s.length
                s += '.'
              }
              while (s.length <= rs + 2) {
                s += '0'
              }
              this.fundList[j].current_pos = s
              this.fundList[j].targetPer = s
            }
            this.fundList = tempList
            // 保存未调之前的数据
            this.oldFundList = tempList
          }
        })
    },
    doOptimize() {
      for (var i = 0; i < this.fundList.length; i++) {
        this.fundList[i].targetPer = this.fundList[i].best_pos
      }
    },
    doNormalize() {
      let sum = 0
      let toFixed = 2
      for (let i = 0; i < this.fundList.length; i++) {
        sum += +this.fundList[i].targetPer
      }
      // console.log('归一：' + sum)
      if (sum === 0) {
        for (let i = 0; i < this.fundList.length; i++) {
          this.fundList[i].targetPer = (100 / this.fundList.length).toFixed(2)
        }
      } else {
        for (let i = 0; i < this.fundList.length; i++) {
          this.fundList[i].targetPer = (100 * this.fundList[i].targetPer / sum).toFixed(2) + ''
        }
      }
      // 补全100
      let sumAfter = 0
      let max = 0
      let maxIndex = -1
      for (let i = 0; i < this.fundList.length; i++) {
        this.fundList[i].targetPer > max && (max = this.fundList[i].targetPer) && (maxIndex = i)
        sumAfter += +this.fundList[i].targetPer
      }
      if (sumAfter < 100) {
        this.fundList[maxIndex].targetPer = (
          +this.fundList[maxIndex].targetPer +
          (100 - sumAfter)
        ).toFixed(toFixed)
        return false
      }
      if (sumAfter > 100) {
        this.fundList[maxIndex].targetPer = (
          +this.fundList[maxIndex].targetPer +
          (100 - sumAfter)
        ).toFixed(toFixed)
        return false
      }
      // console.dir(this.fundList)
    },
    // 确定仓位
    addFund() {
      if (this.stopDbClick) {
        this.stopDbClick = false
        let fromArr = []
        let toArr = []
        this.NewFundList = []
        this.doNormalize()
        for (let i = 0; i < this.oldFundList.length; i++) {
          fromArr.push(parseFloat(this.oldFundList[i].current_pos))
          toArr.push(parseFloat(this.fundList[i].targetPer))
          let newData = {
            group_id: this.oldFundList[i].id,
            group_name: this.oldFundList[i].group_name,
            user_name: this.oldFundList[i].user_name,
            ticker: this.oldFundList[i].ticker,
            fund_name: this.oldFundList[i].fund_name,
            from: this.oldFundList[i].current_pos,
            best: this.oldFundList[i].best_pos,
            to: this.fundList[i].targetPer,
            create_date: this.oldFundList[i].create_date
          }
          this.NewFundList.push(newData)
        }
        if (fromArr.toString() === toArr.toString()) {
          this.$message({
            showClose: true,
            message: '数据没有变化',
            type: 'error'
          })
          this.stopDbClick = true
          return false
        }
        console.dir(this.NewFundList)
        let params = {
          formdata: JSON.stringify(this.NewFundList)
        }
        console.dir(params)
        this.$http.post('/portfolio/rebalance', params).then(res => {
          this.stopDbClick = true
          if (res.data.code === 200) {
            this.getRecord()
            this.$message({
              showClose: true,
              message: '保存成功',
              type: 'success'
            })
            setTimeout(() => {
              this.cancelGo()
            })
          } else {
            this.$message({
              showClose: true,
              message: '保存失败',
              type: 'error'
            })
          }
        })
      }
    },
    searchFun() {
      if (this.searchVal.length > 3) {
        this.getSearchVal()
        this.searchListFlag = true
      } else {
        this.searchListFlag = false
      }
    },
    // 模糊查询
    getSearchVal() {
      let params = {
        keyword: this.searchVal,
        portfolio_id: this.portfolio_id
      }
      this.$http.get('/ticker/suggestion' + this.publicMethod.spliceParamsGet(params)).then(res => {
        let data = res.data
        if (data.code === 200) {
          this.searchList = data.data
        }
      })
    },
    // 模糊查询选中
    searchCheckFunction(ticker, name) {
      this.hasCheckd = true
      this.checkTicker = ticker
      this.checkName = name
      this.searchListFlag = false
      this.searchVal = ''
    },
    // 模糊查询保存
    saveFund() {
      if (!this.hasCheckd) {
        this.$message({
          showClose: true,
          message: '输入的基金不存在',
          type: 'error'
        })
        return false
      }
      if (this.fundList.length > 20) {
        this.$message({
          showClose: true,
          message: '最多添加20个基金组合',
          type: 'error'
        })
        return false
      }
      if (this.stopDbClick) {
        this.stopDbClick = false
        let params = {
          portfolio_id: this.$route.query.portfolio_id,
          ticker: this.checkTicker
        }
        this.$http.post('/portfolio/rebalance/fund', params).then(res => {
          this.stopDbClick = true
          if (res.data.code === 200) {
            this.getRecord()
            this.hasCheckd = false
            this.$refs.content.focus()
            this.$message({
              showClose: true,
              message: '添加成功',
              type: 'success'
            })
            this.searchBoxFlag = false
          } else {
            this.$message({
              showClose: true,
              message: '添加失败',
              type: 'error'
            })
          }
        })
      }
    },
    // 取消添加基金
    cancelAddBox() {
      this.searchBoxFlag = false
      this.searchVal = ''
      this.hasCheckd = false
    },
    // 取消回到详情页
    cancelGo() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss">
.opt-container {
  min-height: 100%;
  width: 100%;
  background: #f3f7fd;
  .mainbox {
    background: #fff;
    padding: 0 40px;
  }
  .titbar {
    width: 100%;
    height: 110px;
    line-height: 110px;
    padding-left: 42px;
    font-size: 20px;
    color: #333333;
    margin-top: 22px;
    margin-bottom: -60px; //手动调的
    text-align: left;
    background: #fff;
  }
  .el-dialog {
    width: 600px;
    .input-query {
      position: relative;
    }
  }
  table {
    background: #fafafa;
    /*width:937px;*/
    width: 100%;
    color: #333;
    margin-bottom: 30px;
    tr {
      height: 70px;
      line-height: 70px;
      position: relative;
      td {
        margin: 0;
        white-space: nowrap;
        width: 100px;
        display: inline-block;
        color: #333;
        &:nth-child(1) {
          width: 20%;
        }
        &:nth-child(2) {
          width: 15%;
        }
        &:nth-child(3) {
          width: 15%;
        }
        &:nth-child(4) {
          width: 15%;
        }
        &:last-child {
          width: 30%;
        }
        input {
          max-width: 85%;
        }
        input[type='number'] {
          height: 38px;
          line-height: 38px;
          width: 60px;
          text-align: center;
          border: 1px solid #becad6;
          border-radius: 4px;
          margin-right: 13px;
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
        input[type='number'] {
          -moz-appearance: textfield;
        }
        input[type='range'] {
          transition: all 0.3s;
          max-width: 100%;
          -webkit-appearance: slider-horizontal;
          -webkit-box-shadow: 0 0 20px 1px #eceeef inset;
          background-color: #272728;
          border-radius: 15px;
          width: 400px;
          -webkit-appearance: none;
          height: 4px;
        }
        input[type='range']::-webkit-slider-runnable-track {
          background: linear-gradient(-63deg, #17c671 8%, #00b8d8 69%);
          height: 4px;
          border-radius: 10px;
        }
        input[type='range']::-moz-range-progress {
          background: linear-gradient(-63deg, #17c671 8%, #00b8d8 69%);
          border-radius: 10px;
        }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          cursor: pointer;
          height: 16px;
          width: 16px;
          transform: translateY(-50%);
          background: none repeat scroll 0 0 #fff;
          border-radius: 50px;
          -webkit-box-shadow: 0 2px 3px 0 rgba(90, 97, 105, 0.2),
            0 3px 15px 0 rgba(90, 97, 105, 0.1);
        }
        input[type='range']::-moz-range-thumb {
          -webkit-appearance: none;
          cursor: pointer;
          top: 5px;
          height: 16px;
          width: 16px;
          background: none repeat scroll 0 0 #fff;
          border-radius: 50px;
          -webkit-box-shadow: 0 2px 3px 0 rgba(90, 97, 105, 0.2),
            0 3px 15px 0 rgba(90, 97, 105, 0.1);
        }
      }
    }
    tr td:first-child {
      text-align: left;
    }
    thead {
      overflow: hidden;
      white-space: nowrap;
      background: #fff;
      font-size: 18px;
      background: linear-gradient(#fff 99%, #d7dee6 99%);
      td {
        white-space: nowrap;
        width: 100px;
        display: inline-block;
        color: #333;
      }
      button {
        color: #007bff;
        background: none;
        cursor: pointer;
        transition: 0.2s;
        &:hover {
          transform: translateY(-1px) scale(1.05);
        }
        &:first-child {
          margin-right: 25px;
        }
        &:last-child {
        }
      }
    }
    tbody {
      font-size: 16px;
      tr {
        background: linear-gradient(#fbfdff 99%, #d7dee6 99%);
        td {
          &:nth-child(3) {
            color: #007bff;
          }
        }
      }
      tr:nth-child(even) {
        background: linear-gradient(#fff 99%, #d7dee6 99%);
      }
    }
  }
  .add-fund {
    display: block;
    -webkit-appearance: none;
    -moz-appearance: none;
    float: right;
    font-size: 18px;
    color: #007bff;
    padding-right: 18px;
    position: relative;
    background: none;
    cursor: pointer;
    &:after {
      position: absolute;
      content: '';
      right: 0px;
      top: 50%;
      transform: translateY(-50%);
      width: 8px;
      height: 15px;
      background: url('~@/assets/image/adjustRecord/arrRight.png');
      background-size: 100% 100%;
    }
  }
  .save-cancel {
    text-align: center;
    padding: 48px 0 130px;
    button {
      height: 44px;
      line-height: 44px;
      text-align: center;
      width: 126px;
      border-radius: 8px;
      cursor: pointer;
      transition: 0.2s;
      &:hover {
        opacity: 0.8;
      }
      &:last-child {
        border: 1px solid #007bff;
        background: #fff;
        color: #333;
        margin-left: 20px;
      }
      &:first-child {
        border: 1px solid #e9ecef;
        color: #fff;
        background: #007bff;
      }
    }
  }
  .search-box {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    .showbox {
      width: 400px;
      background: #ffffff;
      border-radius: 6px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 54.5px 20px 24px 20px;
      p {
        height: 25px;
        line-height: 25px;
        font-size: 18px;
        color: #333333;
        margin-bottom: 36.5px;
        font-weight: 400;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
      input[type='number'] {
        -moz-appearance: textfield;
      }
      .inpbox {
        position: relative;
        input {
          height: 47px;
          line-height: 47px;
        }
        .search-check {
          width: 100%;
          border: 1px solid #edeff3;
          border-radius: 5px;
          height: 47px;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
          background: #fff;
          line-height: 44px;
          font-size: 16px;
          color: #333333;
          text-align: left;
          padding: 0 13px;
          .fundname {
            float: right;
          }
        }
        .search-check:hover {
          cursor: text;
        }
        .searchlist {
          height: 220px;
          overflow-y: auto;
          position: absolute;
          left: 0;
          width: 100%;
          background: #ffffff;
          box-shadow: 0 1px 10px 0 #d0d0d0;
          div {
            height: 44px;
            line-height: 44px;
            font-size: 16px;
            color: #333333;
            text-align: left;
            padding: 0 13px;
            cursor: pointer;
            .fundname {
              float: right;
            }
            &:hover {
              background: #fbfdff;
              color: #007bff;
            }
          }
        }
      }
      .btmbox {
        margin-top: 45px;
        .bottom-box-btn {
          width: 100px;
          height: 44px;
          line-height: 44px;
          padding: 0;
        }
      }
    }
  }
}
// 面包屑导航
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
</style>
