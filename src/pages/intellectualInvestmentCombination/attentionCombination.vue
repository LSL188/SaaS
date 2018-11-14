<template>
  <div class="combinationlist">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- tab切换1 -->
      <el-tab-pane label="智投组合" name="first"></el-tab-pane>
      <!-- tab切换2 -->
      <el-tab-pane label="关注的组合" name="second">
        <div class="follow-list" onselectstart="return false;">
          <div class="box-head" v-if="tableData.length>0">
            <div class="head-bar clear" v-if="tableDataFlg">
              <!-- <div class="totalPage">共1/16页</div>
              <div class="prev">上一页</div>
              <div class="next">下一页</div>
              <div class="jumper">跳转</div> -->
              <!-- <el-button class="sure-btn" type="primary" @click="skipToPage" plain>确定</el-button> -->
              <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total=totalList>
              </el-pagination>
            </div>
          </div>
          <div class="table-box">
            <table cellpadding="0" cellspacing="0" v-if="tableDataFlg">
              <tr class="rank-itm">
                <th width="35%">组合名称</th>
                <th width="20%" v-for="(val,index) in rankItm" :key="index">
                  <p :class="{'rankcheck':checkIndex==index}" @click="rankChange(index)">{{val}}
                    <span>
                      <i class="top" :class="{'topcheck':rankFlg==1}" @click.stop="rankChange(index,1)"></i>
                      <i class="botm" :class="{'botmcheck':rankFlg==0}" @click.stop="rankChange(index,0)"></i>
                    </span>
                  </p>
                </th>
                <!-- <th width="5%"></th> -->
              </tr>
              <tr class="list-item" v-for="(val,index) in tableData" :key="index">
                <td @click="gotoDetail(val.portfolio_id, val.portfolio_name)" class="combine-name">{{val.portfolio_name}}</td>
                <td>{{val.create_date}}</td>
                <td :class="val.accumulate_return>=0?'addicome':'subicome'">{{val.accumulate_return | toThousands(2,true)}}{{!!val.accumulate_return || val.accumulate_return === 0? '%':''}}</td>
                <td>{{val.last_rebalance_date}}</td>
                <td @click="deleteListAlert(val.portfolio_name, val.portfolio_id)">删除</td>
              </tr>
            </table>
            <div class="no-combine" v-else>
              <img src="../../../src/assets/image/noCombine.png" alt="">
              <p>当前没有跟踪任何组合，
                <span @click="addCombineFunction">去智投组合添加</span>
              </p>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="个性化设置" name="third"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'second', //当前tab
      currentPage: 1, //分页
      checkIndex: 0,
      rankFlg: 1,
      rankItm: ['开始时间', '累计收益', '上次调仓时间'],
      tableData: [],
      tableDataFlg: true,
      csize: 1,
      sort: 11,
      totalList: 0 // 总条数
    }
  },
  created() {
    document.title = '组合跟踪'
    if (this.$route.name !== 'login') {
      document.querySelector('body').style.overflowY = 'scroll'
    }
    // 获取列表数据
    this.getData()
  },
  methods: {
    // tab切换跳转
    handleClick(tab, event) {
      console.log(tab, event)
      console.log(tab.index)
      if (tab.index == 0) {
        this.$router.push({
          name: 'intellectualInvestmentCombinationList'
        })
      } else if (tab.index == 2) {
        this.$router.push({
          name: 'personalizationSettings'
        })
      } else {
        this.$router.push({
          name: 'attentionCombination'
        })
      }
    },
    // 获取列表数据
    getData() {
      let params = {
        psize: 10,
        csize: this.csize,
        sort: this.sort
      }
      this.$http.get('portfolio/list?' + this.publicMethod.spliceParamsPost(params)).then(res => {
        // console.log(res.data)
        if (res.data.code === 200) {
          this.tableData = []
          this.tableData = res.data.data.portfolio_list
          this.totalList = res.data.data.total_records
          if (this.tableData.length <= 0) {
            this.tableDataFlg = false
          } else {
            this.tableDataFlg = true
          }
        }
      })
    },
    // 分页
    handleCurrentChange(val) {
      this.currentPage = val
      this.csize = val
      this.getData()
    },
    skipToPage() {
      // 前往页数
    },
    // 排序
    rankChange(index, rankdIrect) {
      if (this.checkIndex === index) {
        if (this.rankFlg !== rankdIrect) {
          if (this.rankFlg === 1) {
            this.rankFlg = 0
          } else {
            this.rankFlg = 1
          }
        }
      } else {
        if (rankdIrect === 1) {
          this.rankFlg = 1
        } else {
          this.rankFlg = 0
        }
        this.checkIndex = index
      }
      this.sort = String(this.checkIndex + 1) + String(this.rankFlg)
      this.handleCurrentChange(1)
    },
    // 删除组合
    deleteListAlert(val, id) {
      this.$confirm('删除组合' + val + '?', '', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        center: true
      })
        .then(action => {
          if (action === 'confirm') {
            let params = {
              portfolio_id: id
            }
            this.$http.post('/portfolio/delete', params).then(res => {
              if (res.data.code === 200) {
                this.getData()
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
              } else {
                this.$message({
                  showClose: true,
                  message: '删除失败',
                  type: 'error'
                })
              }
            })
          }
        })
        .catch(() => {
          this.$message({
            message: '删除取消'
          })
        })
    },
    // 点击组合名称跳转详情页
    gotoDetail(val, name) {
      this.$router.push({
        path: '/index/combineDetail',
        query: { portfolio_id: val, portfolio_name: name }    
      })
    },
    // 去点击去今日组合添加
    addCombineFunction() {
      this.$router.push('/index/intellectualInvestmentCombinationList')
    }
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
// 分页
// .box-head {
//   position: relative;
// }
// .head-bar {
//   position: absolute;
//   top:0px;
//   right: 0px;
// }
// .head-bar .totalPage {
//   float: left;
//   padding-right:20px;
// }
// .head-bar .prev {
//   float: left;
//   padding-right:20px;
// }
// .head-bar .next {
//   float: left;
//   padding-right:20px;
// }
// .head-bar .jumper {
//   float: left;
//   padding-right:20px;
// }
// 多次点击，不让收回
ul.el-pager {
  width: unset;
}
.follow-list {
  .box-head {
    width: 100%;
    display: flex;
    margin-top: 40px;
    background: #f3f7fd;
    border-bottom: 10px solid #f3f7fd;
    .head-bar {
      flex: 1;
      text-align: right;
      padding-top: 10px;
      @include font(16px, 22px, #333);
      .el-pagination {
        float: right;
      }
      .el-pagination__jump {
        margin: 0;
      }
      .el-pager li,
      .el-pagination button,
      .el-pagination span:not([class*='suffix']) {
        font-size: 16px;
      }
      .sure-btn {
        @include wh(50px, 28px);
        float: right;
        margin: 2px 40px 0 10px;
        padding: 0;
      }
    }
  }
  .table-box {
    padding: 32px 0px;
    background: #fff;
    .list-item {
      transition: 0.4s;
      &:hover {
        transform: translateX(10px);
      }
    }
    table {
      width: 100%;
      text-align: left;
      th {
        @include font(18px, 25px, #333);
        padding-bottom: 13px;
      }
      td {
        height: 60px;
        @include font(16px, 60px, #333);
        border-bottom: 1px solid #d7dee6;
      }
      tr:nth-child(even) td {
        background: #fbfdff;
      }
      th:first-child,
      td:first-child {
        padding-left: 15px;
      }
      td:last-child {
        color: #3495ff;
      }
      td:last-child:hover {
        cursor: pointer;
      }
      .addicome {
        color: #ff2500;
      }
      .subicome {
        color: #17c671;
      }
      .combine-name:hover {
        cursor: pointer;
        color: #3495ff;
      }
      .rank-itm {
        p {
          position: relative;
          display: inline-block;
          span {
            position: absolute;
            top: 4px;
            right: -16px;
            i {
              @include wh(8px, 6px);
              display: block;
            }
            .top {
              background: url(../../../src/assets/image/upNoCheck.png) no-repeat;
              background-size: 100%;
            }
            .botm {
              margin-top: 4px;
              background: url(../../../src/assets/image/downNoCheck.png) no-repeat;
              background-size: 100%;
            }
          }
          &:hover {
            cursor: pointer;
            color: #3495ff;
          }
        }
        .rankcheck {
          color: #409eff;
          .topcheck {
            background: url(../../../src/assets/image/upCheck.png) no-repeat;
            background-size: 100%;
          }
          .botmcheck {
            background: url(../../../src/assets/image/downCheck.png) no-repeat;
            background-size: 100%;
          }
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
        a {
          color: #3495ff;
        }
        a:hover {
          cursor: pointer;
        }
      }
      span {
        @include font(16px, 22px, #007bff);
      }
      span:hover {
        cursor: pointer;
      }
    }
  }
}
</style>

