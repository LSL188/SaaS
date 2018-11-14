<template>
    <div class="sidebar-wrap">
        <p v-for="(val,index) in leftList" :key="index" @click="skipTo(index)" :class="{'check':checkindex==index}">
            <img src="../assets/image/index/changCheck.png" v-if="checkindex == index && index == 0" />
            <img src="../assets/image/index/changNoCheck.png" v-if="checkindex !== index && index == 0" />
            <img src="../assets/image/index/zhiCheck.png" v-if="checkindex == index && index == 1" />
            <img src="../assets/image/index/zhiNoCheck.png" v-if="checkindex !== index && index == 1" />
            <img src="../assets/image/index/gaiCheck.png" v-if="checkindex == index && index == 2" />
            <img src="../assets/image/index/gaiNoCheck.png" v-if="checkindex !== index && index == 2" />
            <img src="../assets/image/index/cangNoCheck.png" v-if="checkindex !== index && index == 3" />
            <img src="../assets/image/index/cangCheck.png" v-if="checkindex == index && index == 3" />
            <img src="../assets/image/index/baoNoCheck.png" v-if="checkindex !== index && index == 4" />
            <img src="../assets/image/index/baoCheck.png" v-if="checkindex == index && index == 4" />
            <img src="../assets/image/index/jieNoCheck.png" v-if="checkindex !== index && index == 5" />
            <img src="../assets/image/index/jieCheck.png" v-if="checkindex == index && index == 5" />
            <img src="../assets/image/index/zhangNoCheck.png" v-if="checkindex !== index && index == 6" />
            <img src="../assets/image/index/zhangNoCheck.png" v-if="checkindex == index && index == 6" />
            <span>{{val}}</span>
        </p>
    </div>
</template>

<script>
export default {
  data() {
    return {
      checkindex: 0,
      leftList: [
        '常用功能',
        '智投组合',
        '用户概况',
        '用户持仓',
        '智投研报',
        '接口管理',
        '账户设置'
      ]
    }
  },
  created() {
    if (this.$route.meta.checkIndex === 6) {
      this.checkindex = 6
    } else if (this.$route.meta.checkIndex === 1) {
      this.checkindex = 1
    } else if (this.$route.meta.checkIndex === 2) {
      this.checkindex = 2
    } else if (this.$route.meta.checkIndex === 3) {
      this.checkindex = 3
    } else if (this.$route.meta.checkIndex === 4) {
      this.checkindex = 4
    } else if (this.$route.meta.checkIndex === 5) {
      this.checkindex = 5
    } else {
      this.checkindex = 0
    }
    // console.log(this.checkindex)
  },
  methods: {
    skipTo(val) {
    
      if (val === 0) {
        this.$router.push({ path: '/index' })
        this.checkindex = 0
      }
      if (val === 1) {
        this.$router.push({ path: '/index/intellectualInvestmentCombinationList' })
        this.checkindex = 1
      }
      if (val === 2) {
        this.$router.push({ path: '/index/userProfileList' })
        this.checkindex = 2
      }
      if (val === 3) {
          this.$router.push({path: '/index/userHolding'})
            this.checkindex = 3
      }
      if (val === 4) {
       
        this.checkindex = 4
      }
      if (val === 5) {
       
        this.checkindex = 5
      }
      if (val === 6) {
        this.$router.push({path:'/index/changePassword'})
        this.checkindex = 6
      }
      console.log(this.checkindex)
    }
  },
  // watch: {
  //   $route(to, from) {
  //     console.log(this.checkindex)
  //     if (to.meta.checkIndex === 0) {
  //       this.checkindex = 0
  //     } else if (to.meta.checkIndex === 1) {
  //       this.checkindex = 1
  //     } else if (to.meta.checkIndex === 2) {
  //       this.checkindex = 2
  //     } else {
  //       this.checkindex = 3
  //     }
  //   }
  // }
}
</script>
<style  lang="scss" scoped>
.sidebar-wrap {
  height: 100%;
  position: relative;
  top: 0;
  p {
    height: 66px;
    @include font(18px, 66px, #bec8db);
    img {
      vertical-align: text-bottom;
      // width:17px;
      margin-right: 10px;
      width: 24px;
      height: 21px;
    }
    &:hover {
      background: #2a323f;
      color: #fff;
      cursor: pointer;
    }
  }
  .check {
    background: #2a323f;
    color: #fff;
  }
}
</style>
