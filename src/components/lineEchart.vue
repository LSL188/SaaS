<template>
    <div class="main-chart">
        <div class="chartbox clear" id="linechart" style="width:100%; height:332px"></div>
        <p class="nodata" v-if="serverError">{{textList}}</p>
        <p class="nodata" v-if="noRate">尚未产生收益~</p>
    </div>
</template>
<script>
export default {
    name: 'chartbox',
    data() {
        return {
            chart: null,
            dateList: [],
            firstLine: [],
            secondLine: [],
            noRate: false,
            serverError: true,
            textList: '加载中...'
        }
    },
    props: {
        isIndex: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        this.initLineChart();
        if (this.isIndex) {
            this.getLineData('6', '1');
        }
    },
    methods: {
        initLineChart() {
            this.chart = this.$echarts.init(document.getElementById('linechart'))
            this.chart.setOption({
                xAxis: {
                    data: this.dateList,
                    boundaryGap: false,
                    axisTick: {
                        show: false
                    }
                },
                grid: {
                    left: 10,
                    right: 10,
                    bottom: 40,
                    top: 30,
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    padding: [5, 10],
                    formatter: function(params) {
                        var result = params[0].name + '</br>';
                        params.forEach((item) => {
                            result += item.marker + ' ' + item.seriesName + ' : ' + item.value + '%</br>';
                        })
                        return result;
                    }
                    // formatter: '{b0}: {c0}<br />{b1}: {c1}'
                },
                yAxis: {
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value}%'
                    }
                },
                legend: {
                    x: 'center',
                    y: 'bottom'
                },
                series: [{
                    name: '智投组合',
                    itemStyle: {
                        normal: {
                            color: '#FF005A',
                            lineStyle: {
                                color: '#FF005A',
                                width: 2
                            },
                            areaStyle: {
                                color: '#f3f8ff'
                            }
                        }
                    },
                    showSymbol: false,
                    smooth: true,
                    type: 'line',
                    data: this.firstLine,
                    animationDuration: 2800,
                    animationEasing: 'cubicInOut'
                },
                {
                    name: '沪深300 ',
                    smooth: true,
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: '#3888fa',
                            lineStyle: {
                                color: '#3888fa',
                                width: 2
                            },
                            areaStyle: {
                                color: '#f3f8ff'
                            }
                        }
                    },
                    showSymbol: false,
                    data: this.secondLine,
                    animationDuration: 2800,
                    animationEasing: 'quadraticOut'
                }]
            })
        },
        getLineData(riskLevel, date) {
            this.chart.showLoading();
            let params = {
                risk_level: riskLevel,
                month_facet: date
            }
            this.$http.get('portfolio/daily/trend' + this.publicMethod.spliceParamsGet(params)).then((res) => {
                this.chart.hideLoading();
                let data = res.data;
                if (JSON.stringify(data.data) === '{}') {
                    this.serverError = true;
                    this.textList = '哎呀，出错了~';
                    return false;
                }
                if (typeof data === 'string') {
                    data = data.replace(/NaN/g, null);
                    data = JSON.parse(data);
                }
                if (data.code === 200) {
                    console.log('qq:' + this.dateList)
                    // 折线图变化
                    this.dealList(data.data.history_line);
                } else {
                    this.serverError = true;
                    this.textList = '哎呀，出错了~';
                }
            })
        },
        dealList(list) {
            this.noRate = false;
            this.dateList = [];
            this.firstLine = [];
            this.secondLine = [];
            Array.from(list).forEach((item, index) => {
                this.dateList.push(item.deal_time);
                this.firstLine.push(item.x);
                this.secondLine.push(item.y);
            });
            if (!Array.isArray(list) || list.length === 0) {
                this.noRate = true;
            }
            if (list.length > 0) {
                this.serverError = false;
            }
            this.chart.setOption({
                xAxis: {
                    data: this.dateList
                },
                series: [
                    {
                        data: this.firstLine
                    },
                    {
                        data: this.secondLine
                    }
                ]
            })
        }
    }
}
</script>
<style  lang="scss" scoped>
    .main-chart {
        @include wh(100%,332px);
        position: relative;
        .nodata{
            @include wh(100%,332px);
            @include center;
            background: #fff;
            line-height: 332px;
        }
    }
</style>
