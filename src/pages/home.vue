<template>
    <div class="main">
        <div class="menu">
            <p class="menu-bg"></p>
            <div class="menu-item clear">
                <div class="item-left clear">
                    <img src="../assets/image/noLogin/gomeLogo.png">
                    <i></i>
                    <p>国美智投</p>
                </div>
                <ul class="item-right clear">
                    <li v-for="(value,index) in oprateList" :key="index" @click="applyMethod(index)" :class="{'active':index==0}">{{value}}</li>
                </ul>
            </div>
        </div>
        <div class="banner">
            <img src="../assets/image/noLogin/banner.png">
            <div class="image-word">
                <h2>国美智投</h2>
                <p>面向金融机构的智能化资产配置解决方案提供商</p>
            </div>
        </div>
        <div class="module-technology">
            <div class="module-top">
                <p class="top-titl">智能化资产配置技术</p>
                <p class="top-desc">INTELLECTUAL ASSET ALLOCATION</p>
            </div>
            <div class="module-content clear">
                <div class="content-left">
                    <div class="left-detail">
                       <p>根据用户风险画像</p>
                        <ul>
                            <li class="riskWill">风险承受意愿</li>
                            <li class="riskAbility">风险承受能力</li>
                            <li class="investHistory">投资历史</li>
                        </ul>
                    </div>
                    <div class="left-detail left-assets">
                       <p>在多种大类的海量金融资产中</p>
                        <ul>
                            <li class="publicFund">公募基金<br />(6000+)</li>
                            <li class="investStock">股票<br />(数万)</li>
                            <li class="publicFund">海外资产<br />(数万)</li>
                            <li class="noitemAssets">非标资产<br />(可定制)</li>
                        </ul>
                    </div>
                </div>
                <div class="content-right">
                    <p>自动生成最优资产组合配置</p>
                    <img src="../assets/image/noLogin/assetsCombin.png">
                </div>
            </div>
        </div>
        <div class="module-performed">
            <div class="module-top">
                <p class="top-titl">全行业领先的业绩表现</p>
                <p class="top-desc">LEADING PERFORMANCE</p>
            </div>
            <div class="module-content clear">
                <div class="content-left">
                    <p>实盘市场检验</p>
                    <img src="../assets/image/noLogin/market.png">
                </div>
                <div class="content-right">
                    <p>大幅超越竞争对手</p>
                    <img src="../assets/image/noLogin/opponent.png">
                </div>
            </div>
            <div class="module-risk">
                <p>超强避险能力</p>
                <div class="risk-box clear">
                    <div class="risk-left">
                        <p>过去半年，上证指数2017/12/29收3307点，2018/6/28 收2787点，跌幅<i>15.7%</i></p>
                        <p>国美智投组合同期表现：<i>低风险:+1.6%</i><i>中风险:-1.2%</i><i>高风险:-3.6%</i></p>
                    </div>
                    <div class="risk-right">
                        <p>6/12-6/19为A股跌幅最大一周，上证指数大跌<i>5.7%</i></p>
                        <p>国美智投组合同期表现：<i>低风险:+1.6%</i><i>中风险:-1.2%</i><i>高风险:-3.6%</i></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="module-product">
            <p class="module-bg"></p>
            <div class="module-box">
                <div class="module-top">
                    <p class="top-titl">产品贴心 服务灵活</p>
                    <p class="top-desc">CUSTOMIZED AND FLEXIBLE PRODUCT</p>
                </div>
                <img src="../assets/image/noLogin/service.png">
                <div class="module-top">
                    <p class="top-titl">配套服务 超出预期</p>
                    <p class="top-desc">BEYOND YOUR IMAGINATION</p>
                </div>
                <ul class="service">
                    <li class="customer">
                        <p>金融智能客服</p>
                        <p>金融领域深度挖掘<br />区别于常见对话机器人</p>
                    </li>
                    <li class="portrait">
                        <p>全方位用户风险画像</p>
                        <p>风险问题 <br />个人信息<br />社交网络信息<br />交易记录</p>
                    </li>
                    <li class="map">
                        <p>金融知识图谱</p>
                        <p>全平台数据抓取<br />信息深度挖掘<br />多维度整合分析<br />偏好深度定制<br />基于人工智能的精准推送<br />智能投研</p>
                    </li>
                    <li class="control">
                        <p>智能风控</p>
                        <p>智能数据搜集整合身份验证<br />多平台交叉验证<br />智能风控评级<br />欺诈行为智能识别</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="module-team">
            <ul>
                <li class="education">核心团队成员由多所美国常青藤名校、清华大学、北航、中科院等学校博士和硕士组成，最低学历为硕士。</li>
                <li class="member">核心团队成员包含CFA持证人、CFA侯选者、FRM持证人、投资顾问及高校量化金融讲师等。</li>
                <li class="company">核心团队成员来自国内外知名企业，包括美国华尔街著名机构投资研究部、美国谷歌总部、英特尔及腾讯等机构，兼具金融和互联网的大型项目主导和专业实施经验。</li>
            </ul>
        </div>
        <div class="module-try">
            <button @click="applyMethod(0)">申请试用</button>
            <p>国美智投，金融机构的赋能者，致力于在人工智能时代，全面提升机构财富管理和投资服务能力。</p>
        </div>
        <div  class="module-foot">
            <ul>
                <li>联系电话：(010) 5928 7915</li>
                <!-- <li class="line"></li>
                <li>XXXXXXXXXX有限公司</li>
                <li class="line"></li>
                <li>电话XXXXXXXXXX</li> -->
            </ul>
        </div>
        <div class="alert-box" v-show="alertBox">
            <div class="alert-boxbg"></div>
            <div class="alert-wrap">
                <p>申请试用国美智投产品</p>
                <input type="text" placeholder="申请人姓名" v-model="name">
                <input type="text" placeholder="公司/单位" v-model="company" maxlength="100">
                <input type="text" placeholder="职位" v-model="job" maxlength="50">
                <input type="tel" placeholder="手机" v-model="phone">
                <input type="email" placeholder="邮箱" v-model="email">
                <input type="text" placeholder="如何得知国美智投服务" v-model="channel" maxlength="100">
                <div class="oprate">
                    <button @click="cencelMethod">取消</button>
                    <button @click="applySubmit">申请提交</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            oprateList: ['申请试用', '登录'],
            alertBox: false,
            name: '',
            company: '',
            job: '',
            phone: '',
            email: '',
            channel: '',
            stopDbClick: true
        }
    },
    methods: {
        // 登录或申请试用
        applyMethod(index) {
            if (index === 0) {
                this.alertBox = true;
            } else {
                this.$router.push({path: '/login'});
            }
        },
        // 申请试用
        applySubmit() {
            if (this.name === '' || this.company === '' || this.job === '' || this.phone === '' || this.email === '' || this.channel === '') {
                this.$message({
                    showClose: true,
                    message: '数据不能为空',
                    type: 'error'
                });
                return false;
            }
            let res = /^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/;
            if (!res.test(this.email)) {
                this.$message({
                    showClose: true,
                    message: '邮箱格式不正确',
                    type: 'error'
                });
                return false;
            }
            if (this.stopDbClick) {
                this.stopDbClick = false;
                let params = {
                    applicant: this.name,
                    company: this.company,
                    job_title: this.job,
                    mobile: this.phone,
                    email: this.email,
                    channel: this.channel
                }
                this.$http.post('/user_apply', params).then((res) => {
                    this.stopDbClick = true;
                    if (res.data.code === 200) {
                        this.alertBox = false;
                        this.$message({
                            showClose: true,
                            message: '申请试用成功',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            showClose: true,
                            message: '申请试用失败',
                            type: 'error'
                        });
                    }
                })
            }
        },
        // 申请试用取消
        cencelMethod() {
            this.alertBox = false;
            this.name = '';
            this.company = '';
            this.job = '';
            this.phone = '';
            this.email = '';
            this.channel = '';
        }
    },
    watch: {
        name: function() {
            this.name = this.name.replace(/[^\w\u4e00-\u9fa5·•●]/g, '').slice(0, 20);
        },
        phone: function() {
            this.phone = this.phone.replace(/\D/g, '').slice(0, 11);
        }
    }
}
</script>
<style  lang="scss" scoped>
    .main{
        width: 100%;
        background: #FFF;
        position: relative;
        .menu{
            width: 100%;
            height: 80px;
            position: fixed;
            z-index: 10;
            .menu-bg{
                width: 100%;
                height: 80px;
                position: absolute;
                left: 0;
                top: 0;
                z-index: 11;
                background: #0E1222;
                opacity: 0.3;
            }
            .menu-item{
                @include auto;
                @include center;
                z-index: 12;
                .item-left{
                    float: left;
                    padding: 20px 0;
                    img{
                        float: left;
                        @include wh(160px,40px);
                        display: block;
                    }
                    i{
                        @include wh(2px,30px);
                        float: left;
                        display: block;
                        margin: 5px 27px 0;
                        background: #fff;
                    }
                    p{
                        float: left;
                        @include font(22px,40px,#FFF);
                    }
                }
                .item-right{
                    float: right;
                    li{
                        @include wh(130px,100%);
                        float: right;
                        @include font(22px,80px,#FFF);
                    }
                    li:hover{
                        cursor: pointer;
                    }
                    .active{
                        background: #296FCE;
                    }
                }
            }
        }
        .banner{
            position: relative;
            img{
                width: 100%;
                height: 400px;
                margin: 0 auto;
                display: block;
            }
            .image-word{
                @include cl;
                top: 134px;
                h2{
                    @include font(70px,95px,#FFF);
                }
                p{
                    @include font(30px,70px,#FFF);
                }
            }
        }
        .module-top{
            @include auto;
            padding: 40px 0 39px;
            .top-titl{
                @include font(36px,50px,#333);
                letter-spacing: 0.87px;
            }
            .top-desc{
                @include font(26px,37px,#999);
                letter-spacing: 0.63px;
            }
        }
        .module-technology{
            background: #F6F7FD;
            padding-bottom: 50px;
            .module-content{
                @include auto;
                .content-left{
                    width: 532px;
                    float: left;
                    .left-detail{
                        padding: 37px 39px;
                        background: #FFFFFF;
                        box-shadow: 0 0 10px 0 #CCD0E7;
                        border-radius: 7px;
                        p{
                            @include font(24px,33px,#000);
                            letter-spacing: 0.58px;
                        }
                        ul{
                            display: flex;
                            justify-content: space-between;
                            li{
                                @include font(20px,28px,#666);
                                letter-spacing: 0.49px;
                                &:before{
                                    content: '';
                                    @include wh(66px,66px);
                                    display: block;
                                    background-size: 100%;
                                    margin: 45px auto 23px;
                                }
                            }
                            .riskWill{
                                &:before{
                                    background: url(../assets/image/noLogin/riskWill.png) no-repeat;
                                }
                            }
                            .riskAbility{
                                &:before{
                                    background: url(../assets/image/noLogin/riskAbility.png) no-repeat;
                                }
                            }
                            .investHistory{
                                &:before{
                                    background: url(../assets/image/noLogin/investHistory.png) no-repeat;
                                }
                            }
                        }
                    }
                    .left-assets{
                        margin-top: 20px;
                        .publicFund{
                            &:before{
                                background: url(../assets/image/noLogin/publicFund.png) no-repeat;
                            }
                        }
                        .investStock{
                            &:before{
                                background: url(../assets/image/noLogin/investStock.png) no-repeat;
                            }
                        }
                        .publicFund{
                            &:before{
                                background: url(../assets/image/noLogin/publicFund.png) no-repeat;
                            }
                        }
                        .noitemAssets{
                            &:before{
                                background: url(../assets/image/noLogin/noitemAssets.png) no-repeat;
                            }
                        }
                    }
                }
                .content-right{
                    width: 649px;
                    float: right;
                    padding: 39px 0 56px;
                    background: #FFFFFF;
                    box-shadow: 0 0 10px 0 #CCD0E7;
                    border-radius: 7px;
                    p{
                        @include font(24px,33px,#000);
                        letter-spacing: 0.58px;
                    }
                    img{
                        @include wh(620px,401px);
                        display: block;
                        margin: 57px 9px 0 20px;
                    }
                }
            }
        }
        .module-performed{
            background: #FFF;
            .module-content{
                @include auto;
                p{
                    @include font(24px,33px,#333);
                    text-align: left;
                }
                img{
                    display: block;
                }
                .content-left{
                    float: left;
                    img{
                        @include wh(552px,318px);
                        margin-top: 16px;
                    }
                }
                .content-right{
                    float: right;
                    img{
                        @include wh(557px,310px);
                        margin-top: 23px;
                    }
                }
            }
            .module-risk{
                padding-bottom: 50px;
                border-bottom: 1px solid #E3E5F2;
                p{
                    @include auto;
                    @include font(24px,33px,#333);
                    text-align: left;
                    padding: 50px 0 17px;
                }
                .risk-box{
                    @include auto;
                    overflow: hidden;
                    p{
                        padding: 0;
                        @include font(16px,40px,#666);
                        i{
                            color: #5F92E7;
                            margin-right: 24px;
                        }
                    }
                    p:first-child{
                        i{
                            color: #FF8881;
                            margin: 0;
                        }
                    }
                    .risk-left{
                        float: left;
                        width: 620px;
                    }
                    .risk-right{
                        float: right;
                        width: 568px;
                    }
                    div{
                        background: #FAFCFF;
                        border-radius: 6px;
                        padding: 11px 0 9px 27px;
                    }
                }
            }
        }
        .module-product{
            padding-bottom: 50px;
            position: relative;
            overflow: hidden;
            .module-bg{
                @include wh(100%,300px);
                background: #FBFDFF;
                position: absolute;
                top: 520px;
                left: 0;
                z-index: 0;
                transform: rotate(-28deg) scale(1.3);
            }
            .module-box{
                position: relative;
                z-index: 1;
            }
            img{
                @include wh(1200px,520px);
                margin-bottom: 100px;
            }
            .service{
                @include auto;
                display: flex;
                justify-content: space-between;
                li{
                    @include font(20px,28px,#666);
                    letter-spacing: 0.49px;
                    &:before{
                        content: '';
                        @include wh(169px,169px);
                        display: block;
                        background-size: 100%;
                        margin: 0 auto 27px;
                    }
                    p{
                        @include font(20px,28px,#333);
                        opacity: 0.7;
                        letter-spacing: 0.49px;
                    }
                    p:first-child{
                        @include font(30px,42px,#333);
                        letter-spacing: 0.73px;
                        padding-bottom: 20px;
                    }
                }
                .customer{
                    &:before{
                        background: url(../assets/image/noLogin/customer.png) no-repeat;
                    }
                }
                .portrait{
                    &:before{
                        background: url(../assets/image/noLogin/portrait.png) no-repeat;
                    }
                }
                .map{
                    &:before{
                        background: url(../assets/image/noLogin/map.png) no-repeat;
                    }
                }
                .control{
                    &:before{
                        background: url(../assets/image/noLogin/control.png) no-repeat;
                    }
                }
            }
        }
        .module-team{
            height: 358px;
            background: url(../assets/image/noLogin/teamIntro.png) center top no-repeat;
            ul{
                @include auto;
                display: flex;
                justify-content: space-between;
                li{
                    letter-spacing: 0.49px;
                    text-align: justify;
                    opacity: 0.9;
                    @include font(20px,28px,#FFF);
                    &:before{
                        content: '';
                        @include wh(88px,88px);
                        display: block;
                        background-size: 100%;
                        margin: 56px auto 18px;
                    }
                }
                li:nth-child(2){
                    padding: 0 122px;
                }
                .education{
                    &:before{
                        background: url(../assets/image/noLogin/education.png) no-repeat;
                    }
                }
                .member{
                    &:before{
                        background: url(../assets/image/noLogin/member.png) no-repeat;
                    }
                }
                .company{
                    &:before{
                        background: url(../assets/image/noLogin/company.png) no-repeat;
                    }
                }
            }
        }
        .module-try{
            height: 248px;
            background: url(../assets/image/noLogin/try.png) center top no-repeat;
            button{
                @include wh(262px,78px);
                background: #007BFF;
                border-radius: 4px;
                @include font(30px,76px,#FFF);
                letter-spacing: 0.73px;
                margin: 60px 0 35px;
            }
            button:hover{
                cursor: pointer;
            }
            p{
                @include font(22px,30px,#333);
                letter-spacing: 0.53px;
            }
        }
        .module-foot{
            background: #2E2F30;
            ul{
                @include auto;
                li{
                    padding: 32px 0;
                    @include font(22px,30px,#FFF);
                    letter-spacing: 0.53px;
                    opacity: 0.7;
                    display: inline-block;
                }
                .line{
                    @include wh(1px,19px);
                    margin: 0 11px;
                    background: #FFF;
                    padding: 0;
                    position: relative;
                    top: 2px;
                }
            }
        }
        .alert-box{
            position: fixed;
            top: 0;
            left: 0;
            z-index: 100;
            @include wh(100%,100%);
            .alert-boxbg{
                @include wh(100%,100%);
                opacity: 0.5;
                background: #333333;
                position: absolute;
                top: 0;
                left: 0;
            }
            .alert-wrap{
                width: 558px;
                background: #FFFFFF;
                box-shadow: 0 0 20px 0 rgba(29,17,86,0.12);
                border-radius: 8px;
                @include center;
                padding: 20px 60px 26px;
                p{
                    @include font(30px,60px,#007BFF);
                    letter-spacing: 0.51px;
                }
                input{
                    @include wh(100%,45px);
                    border: 1px solid #CFD6DF;
                    border-radius: 4px;
                    @include font(20px,45px,#333);
                    padding-left: 15px;
                    margin-top: 20px;
                }
                input:placeholder{
                    color: #e6e6e6;
                }
                .oprate{
                    padding-top: 20px;
                    button{
                        @include wh(200px,45px);
                        border-radius: 4px;
                        @include font(20px,45px,#FFF);
                    }
                    button:last-child{
                        float: right;
                        background: #007BFF;
                    }
                    button:first-child{
                        float: left;
                        border: 1px solid #E9ECEF;
                        background: #FFF;
                        color: #333;
                    }
                    button:hover{
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>
