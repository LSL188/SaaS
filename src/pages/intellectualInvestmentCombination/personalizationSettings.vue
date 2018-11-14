<template>
  <div class="combinationlist">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- tab切换1 -->
      <el-tab-pane label="智投组合" name="first"></el-tab-pane>
      <!-- tab切换2 -->
      <el-tab-pane label="关注的组合" name="second"></el-tab-pane>
      <el-tab-pane label="个性化设置" name="third">
        <!-- 黑白名单部分 -->
        <div class="combineDiy">
          <!-- 白名单  -->
          <div class="fundbox">
            <div class="top">
              <p class="tit">可选基金</p>
              <p class="filename">{{whiteListFileName}}</p>
              <div class="btn-container">
                <div class="progressbar" v-show="fundBarFlag">
                  <el-progress class="resetprogress" :percentage="80" color="red" :stroke-width="10" :show-text="false"></el-progress>
                  <span class="proshow">80%</span>
                </div>
                <div class="btnbar">
                  <a :href="whiteDownloadUrl" v-if="whiteDownloadUrl !==''">
                    <!-- <el-progress :percentage="37" status="success" :stroke-width="18"></el-progress> -->
                    <el-button class="btnreset">下载</el-button>
                  </a>
                  <div class="upload-box">
                    <el-button class="btnreset">
                      上传更新
                    </el-button>
                    <input ref="white" type="file" @change="showFileName('white')">
                  </div>
                </div>
              </div>
            </div>
            <p class="tip">智能组合可选的基金列表，一般由当前机构在售的所在基金构成。csv文件，每行一个基金代码，如“840009.OF”</p>
          </div>
          <!-- 黑名单  -->
          <div class="fundbox">
            <div class="top">
              <p class="tit">黑名单</p>
              <p class="filename">{{blackListFileName}}</p>
              <div class="btn-container">
                <div class="progressbar" v-show="blackBarFlag">
                  <el-progress class="resetprogress" :percentage="80" color="#17C671" :stroke-width="10" :show-text="false"></el-progress>
                  <span class="proshow">80%</span>
                </div>
                <div class="btnbar">
                  <a :href="blackDownloadUrl" v-if="blackDownloadUrl!==''">
                    <el-button class="btnreset">下载</el-button>
                  </a>
                  <div class="upload-box">
                    <el-button class="btnreset">
                      上传更新
                    </el-button>
                    <input ref="black" type="file" @change="showFileName('black')">
                  </div>
                </div>
              </div>
            </div>
            <p class="tip">智能组合需要屏蔽的基金，此列表中的基金不会出现在智能投资组合中。csv文件，每行一个基金代码，如“840009.OF”</p>
          </div>
          <el-dialog title="保存并更新智投组合中" :visible.sync="dialogVisible" width="30%" center>
            <el-progress class="nav-el-progress" :percentage="percentage"></el-progress>
            <span slot="footer" class="dialog-footer">
            </span>
          </el-dialog>
          <div class="bottom-box">
            <el-tooltip class="item" effect="dark" content="立即根据更新的个性化设置更新组合，大约需要5分钟" placement="bottom" :enterable="false">
              <el-button type="primary" class="bottom-box-btn" @click="preUploadFile('white')">保存并更新组合</el-button>
            </el-tooltip>
            <el-button plain class="bottom-box-btn" @click="cancelBtn">取消</el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'third',
      // 黑白名单
      fundBarFlag: false,
      blackBarFlag: false,
      whiteListFileName: '', // 白名单文件名
      whiteDownloadUrl: '', // 白名单下载url
      blackListFileName: '', // 黑名单文件名
      blackDownloadUrl: '', // 黑名单下载url
      stopDbClick: true,
      dialogVisible: false,
      percentage: 0,
      taskId: ''
    }
  },
  created() {
    document.title = '可选基金定制'
    this.getFile()
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
      } else if (tab.index == 1) {
        this.$router.push({
          name: 'attentionCombination'
        })
      } else {
        this.$router.push({
          name: 'personalizationSettings'
        })
      }
    },
    // 查询能下载的黑白名单
    getFile() {
      this.$http.get('portfolio/files').then(res => {
        let data = res.data
        if (data.code === 200) {
          this.whiteDownloadUrl = this.publicMethod.decodeUnicode(data.data.white)
          this.blackDownloadUrl = this.publicMethod.decodeUnicode(data.data.black)
          this.blackListFileName = this.publicMethod.decodeUnicode(data.data.black_file_name)
          this.whiteListFileName = this.publicMethod.decodeUnicode(data.data.white_file_name)
        }
      })
    },
    // 回显显示的文件
    showFileName(type) {
      let filename
      let white = this.$refs.white.files[0]
      let black = this.$refs.black.files[0]
      if (type === 'white') {
        filename = white
        this.whiteListFileName = filename.name
      } else {
        filename = black
        this.blackListFileName = filename.name
      }
    },
    // 选择上传黑白名单文件
    preUploadFile(type) {
      if (this.stopDbClick) {
        this.stopDbClick = false
        let white = this.$refs.white.files[0]
        let black = this.$refs.black.files[0]
        let filePath = ''
        let uploadType = ''
        if (white && type === 'white') {
          filePath = white
          uploadType = 0
        } else {
          filePath = black
          uploadType = 1
        }
        if (!white && !black) {
          this.$message({
            type: 'warning',
            message: '请上传定制基金白名单文件或黑名单文件'
          })
          this.stopDbClick = true
          return false
        }
        if (white && !/csv$/.test(white.name)) {
          this.$message({
            type: 'warning',
            message: '请确认定制基金文件类型为csv!'
          })
          this.stopDbClick = true
          return false
        }
        if (black && !/csv$/.test(black.name)) {
          this.$message({
            type: 'warning',
            message: '请确认黑名单文件类型为csv!'
          })
          this.stopDbClick = true
          return false
        }
        // 调上传接口
        let form = new FormData()
        form.append('black_white', uploadType)
        console.log(uploadType)
        form.append('fpath', filePath)
        console.log(filePath)
        this.$http
          .postImg('portfolio/upload', form)
          .then(res => {
            console.log(form)
            if (res.data.code === 200) {
              if (white && type === 'white' && black) {
                this.stopDbClick = true
                this.preUploadFile('black')
                return false
              } else {
                this.saveFile()
                return false
              }
            } else {
              this.stopDbClick = true
              this.$message({
                showClose: true,
                message: '上传失败',
                type: 'error'
              })
            }
          })
          .catch(() => {
            this.stopDbClick = true
            this.$message({
              showClose: true,
              message: '上传失败',
              type: 'error'
            })
          })
      }
    },
    // 保存
    saveFile() {
      this.$refs.white.value = ''
      this.$refs.black.value = ''
      this.percentage = 0
      this.$http.post('portfolio/save').then(res => {
        this.stopDbClick = true
        let data = res.data
        if (data.code === 200) {
          this.$message({
            showClose: true,
            message: '保存成功',
            type: 'success'
          })
          this.dialogVisible = true
          this.initWs()
        } else if (data.code === 501) {
          this.$message({
            showClose: true,
            message: '您设置的可选基金范围过小，无法推荐合适的组合，请调整后重新上传',
            type: 'error'
          })
          this.dialogVisible = false
          this.getFile()
        } else {
          this.stopDbClick = true
          this.$message({
            showClose: true,
            message: '保存失败',
            type: 'error'
          })
        }
      })
    },
    // 更新
    initWs() {
      if (this.taskId === '') {
        this.percentage = 0
        this.$http.post('portfolio').then(res => {
          let data = res.data
          this.stopDbClick = true
          if (data.code === 200) {
            this.taskId = data.task_id
            this.getProgress(data.task_id)
            setTimeout(() => {
              this.initWs()
            }, 500)
          } else {
            clearInterval(this.setTime)
            this.dialogVisible = false
            this.taskId = ''
            this.$message({
              showClose: true,
              message: '调用接口失败',
              type: 'error'
            })
          }
          this.stopDbClick = true
        })
      } else {
        console.log(this.taskId)
        this.setTime = setInterval(() => {
          this.getProgress(this.taskId)
        }, 3000)
      }
    },
    // 获取更新进度
    getProgress() {
      let params = {
        task_id: this.taskId
      }
      this.$http
        .get('portfolio/task_status' + this.publicMethod.spliceParamsGet(params))
        .then(res => {
          let data = res.data
          if (data.code === 200) {
            // 更新结果
            if (res.data.task_status === 'done') {
              clearInterval(this.setTime)
              // this.destroyTask(this.taskId);
              this.taskId = ''
              this.percentage = 100
              this.dialogVisible = false
              this.$message({
                showClose: true,
                message: '更新成功',
                type: 'success'
              })
              this.getFile()
            } else if (res.data.task_status === 'failed') {
              clearInterval(this.setTime)
              // this.destroyTask(this.taskId);
              this.dialogVisible = false
              this.taskId = ''
              this.$message({
                showClose: true,
                message: '更新失败',
                type: 'error'
              })
            } else {
              console.log(11)
              this.dialogVisible = true
              if (this.percentage < 95) {
                this.percentage += 5
              }
            }
          } else {
            clearInterval(this.setTime)
          }
          this.stopDbClick = true
        })
    },
    // 取消
    cancelBtn() {
      this.stopDbClick = true
      this.getFile()
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
//黑白名单样式
.combineDiy {
  width: 100%;
  background: #fff;
  // padding: 0 40px;
  .fundbox {
    width: 100%;
    height: 174px;
    border-bottom: 1px solid #e9ecef;
    padding: 34px 0 40px 0;
    .top {
      width: 100%;
      height: 55px;
      line-height: 55px;
      position: relative;
      margin-bottom: 22px;
      .tit {
        height: 28px;
        line-height: 28px;
        text-align: left;
        font-size: 20px;
        color: #333333;
      }
      .filename {
        height: 22px;
        line-height: 22px;
        text-align: left;
        font-size: 16px;
        color: #007bff;
      }
      .btn-container {
        position: absolute;
        right: 0;
        top: 0;
        width: 62%;
        height: 55px;
        line-height: 55px;
        .progressbar {
          width: 40%;
          height: 25px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          padding-top: 6px;
          .proshow {
            position: absolute;
            right: -48px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 18px;
            color: #17c671;
          }
        }
        .btnbar {
          float: right;
          .btnreset {
            width: 126px;
            height: 44px;
            line-height: 44px;
            padding: 0;
            span {
              line-height: 44px;
            }
          }
        }
        .upload-box {
          position: relative;
          display: inline-block;
          cursor: pointer;
          input[type='file'] {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            opacity: 0;
            cursor: pointer;
          }
        }
      }
    }
    .tip {
      text-align: left;
      font-size: 16px;
      color: #999999;
    }
  }
  .bottom-box {
    margin: 100px 0 20px;
    text-align: center;
    .bottom-box-btn {
      width: 126px;
      height: 44px;
      line-height: 44px;
      padding: 0;
    }
  }
}
.title {
  text-align: left;
  &.black {
    margin-top: 20px;
  }
}
.btn {
  padding: 1px 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f2f2f2;
  margin-left: 20px;
  cursor: pointer;
  input {
    position: absolute;
    left: -99999px;
  }
}
.btn-wrap {
  .btn {
    margin-left: 0;
    margin-right: 30px;
  }
}
.fr {
  float: right;
}
.fl {
  float: left;
}
.clearfix {
  zoom: 1;
}

.clearfix:after {
  content: '.';
  width: 0;
  height: 0;
  visibility: hidden;
  display: block;
  clear: both;
}
.tag {
  color: #ccc;
  text-align: left;
}
.btn-wrap {
  text-align: left;
  margin-top: 50px;
}
</style>
