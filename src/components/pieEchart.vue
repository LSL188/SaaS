<template>
    <div class="piebox clear">
        <div class="pieshow" id="piechart" style="width:400px; height:329px"></div>
        <div class="combine-box">
            <p v-for="(item, index) in textList" :key="index"><i :style="{background: bgStyle[index]}"></i>{{item.ticker|deleteOF}} {{item.fund_name}}<span>{{item.proportion}}%</span></p>
        </div>
        <p class="nodata" v-if="noPie">{{noPieText}}</p>
    </div>
</template>
<script>
export default {
    name: 'pieBox',
    data() {
        return {
            chart: null,
            pieList: [],
            textList: [],
            bgStyle: [
                '#58C9F7',
                '#1D89F3',
                '#0E68CF',
                '#FFE083',
                '#FECB32',
                '#FF942A',
                '#FF776F',
                '#FD3E53',
                '#E9362A',
                '#D72D4D',

                '#4ACCE9',
                '#52E5CF',
                '#10C92D',
                '#57D16B',
                '#9CE5A8',
                '#E05DB5',
                '#C741F8',
                '#8B81FF',
                '#6056DA',
                '#322FAD',
                '#6798EF'
            ],
            noPie: true,
            noPieText: '加载中...'
        }
    },
    props: {
        isIndex: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        this.initPieChart();
        if (this.isIndex) {
            this.getPieData('6');
        }
    },
    methods: {
        initPieChart() {
            this.chart = this.$echarts.init(document.getElementById('piechart'))
            this.chart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                calculable: true,
                series: [{
                    name: '数据详情',
                    type: 'pie',
                    radius: ['25', '65%'],
                    center: ['50%', '50%'],
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        }
                    },
                    data: this.pieList,
                    animationEasing: 'cubicInOut',
                    animationDuration: 2600
                }]
            })
        },
        getPieData(riskLevel) {
            console.log(riskLevel);
            let params = {
                risk_level: riskLevel
            }
            this.$http.get('portfolio/daily' + this.publicMethod.spliceParamsGet(params)).then((res) => {
                let data = res.data;
                if (data.code === 200) {
                    this.dealList(data.data.daily_portfolio);
                    this.sendTime(data.data.start_date);
                } else {
                    this.noPie = true;
                    this.noPieText = '哎呀，出错了';
                }
            })
        },
        sendTime(val) {
            this.$emit('getTime', val);
        },
        dealList(list) {
            this.pieList = [];
            this.textList = [];
            // console.log(list);
            if (list.length > 0) {
                this.noPie = false;
            } else {
                this.noPie = true;
                this.noPieText = '哎呀，出错了';
            }
            Array.from(list).forEach((item, index) => {
                this.textList.push(item);
                this.pieList.push({
                    value: item.proportion,
                    name: item.ticker + item.fund_name,
                    itemStyle: {
                        color: this.bgStyle[index]
                    }
                })
            })
            this.chart.setOption({
                series: [{
                    data: this.pieList
                }]
            })
        }
    }
}
</script>

<style  lang="scss" scoped>
    .piebox {
        @include wh(100%,329px);
        border-bottom: 1px solid #E9ECEF;
        display: flex;
        position: relative;
        .pieshow{
            float: left;
        }
        .combine-box{
            float: left;
            height: 192px;
            overflow: auto;
            margin-top: 72px;
            p{
                width: 520px;
                text-align: left;
                padding: 0 0 12px 18px;
                position: relative;
                @include font(16px,22px,#333);
                cursor: pointer;
                i{
                    @include wh(6px,6px);
                    border-radius: 6px;
                    display: block;
                    position: absolute;
                    top: 8px;
                    left: 0px;
                }
                span{
                    float: right;
                    margin-right: 30px;
                }
            }
            p:last-child{
                padding-bottom: 0;
            }
        }
        .nodata{
            @include center;
        }
    }
</style>
