<template>
    <div class="tcjl">
        <div class="tit-box">
            <div class="titbar">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: 'attentionCombination' }">
                        <span class="zhitou">&lt;关注的组合</span>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>
                        <!-- <a href="combineDetail" class="zhitou">{{portfolio_name}}</a> -->
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>
                        <a href="#" class="name">调仓记录</a>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="main-box">
            <ul class="listbox" v-if="currentList.length>0">
                <li v-for="(item, index) in currentList" :key="index" @click="showDetailFun(index)">
                    <span class="dateshow">{{item.rebalance_date}}</span>
                    <span class="detail">详情</span>
                </li>
            </ul>
            <div class="no-combine" v-else>
                <img src="../../../src/assets/image/noCombine.png" alt="">
                <p>无记录</p>
            </div>
        </div>
        <transition name="fade" mode="out-in">
            <div class="detailbox" v-show="detailFlag">
                <div class="showbox">
                    <div class="showbox-tit">{{detailTit}}调仓记录
                        <i class="closebtn" @click="detailFlag = false"></i>
                    </div>
                    <ul class="showbox-list">
                        <li v-for="(item, index) in detailList" :key="index">
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
export default {
  name: 'tcjl',
  data() {
    return {
      psize: 10,
      totalCount: 0,
      currentPage: 1,
      currentList: [],
      detailTit: '',
      detailList: [],
      detailFlag: false,
      portfolio_id: this.$route.query.portfolio_id
    }
  },
  created() {
    document.title = '调仓记录'
    this.getData('1')
  },
  methods: {
    handleCurrentChange(val) {
      this.getData(val)
    },
    showDetailFun(index) {
      const date = this.currentList ? this.currentList[index].rebalance_date : ''
      let params = {
        portfolio_id: this.portfolio_id,
        rebalance_date: encodeURIComponent(date)
      }
      this.$http
        .get('/portfolio/pos_history/detail' + this.publicMethod.spliceParamsGet(params))
        .then(res => {
          let data = res.data
          if (data.code === 200) {
            this.detailTit = data.data.rebalance_date
            this.detailList = data.data.rebalance_log_detail
            this.detailFlag = true
          }
        })
    },
    // 获取记录列表
    getData(csize) {
      let params = {
        psize: this.psize,
        csize: csize
      }
      this.$http
        .get(
          'portfolio/pos_history/list/' +
            this.portfolio_id +
            '?' +
            this.publicMethod.spliceParamsPost(params)
        )
        .then(res => {
          let data = res.data
          if (data.code === 200) {
            this.totalCount = data.data.total_records
            this.currentList = data.data.rebalance_log_detail
          }
        })
    }
  }
}
</script>
<style  lang="scss">
.tcjl {
  width: 100%;
  background: #f3f7fd;
  .tit-box {
    width: 100%;
    height: 110px;
    line-height: 110px;
    background: #fff;
    margin-top: 22px;
    margin-bottom: -80px; //手动调的
    text-align: left;
    padding-left: 42px;
  }
  .main-box {
    width: 100%;
    background: #fff;
    padding: 20px 40px;
    .listbox {
      width: 100%;
      li {
        height: 70px;
        line-height: 70px;
        border-bottom: 1px solid #d7dee6;
        padding: 0 21px 0 18px;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
          transform: translateX(10px);
        }
        &:nth-child(2n + 1) {
          background: #fbfdff;
        }
        .dateshow {
          float: left;
          font-size: 16px;
          color: #333333;
        }
        .detail {
          float: right;
          font-size: 16px;
          color: #3495ff;
          cursor: pointer;
        }
      }
    }
    .no-combine {
      img {
        @include wh(139px, 100px);
        display: block;
        padding-top: 155px;
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
