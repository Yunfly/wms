<template>
  <div class="chart-container">
    <p class="charttitle">近7日成单率</p>
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'PieChart',
  components: {},
  created() {},
  data() {
    return {
      pieChart: null,
      xdata: ['03-23', '03-24', '03-25', '03-26', '03-27', '03-28', '23-29'],
      ydata1: [70, 60, 85, 66, 52, 64, 78],
      ydata2: [53, 62, 72, 84, 67, 75, 95]
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      this.pieChart = echarts.init(this.$refs.chart)
      const option = {
        color: ['#298EFF', '#60C8B1', '#E09B57', '#D77A5D', '#B2C0CE'],
        title: {
          show: true,
          text: '单位：%',
          top: '1%',
          left: '1%',
          textStyle: {
            color: '#333',
            fontSize: 13
          }
        },
        grid: {
          top: '10%',
          left: '2%',
          bottom: '5%',
          right: '2%',
          containLabel: true
        },
        tooltip: {
          // trigger: 'item',
          // formatter: '{a} <br/>{b} : {c}'
          show: true,
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(0, 255, 233,0)'
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(255, 255, 255,1)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(0, 255, 233,0)'
                  }
                ],
                global: false
              }
            }
          }
        },
        toolbox: {
          show: true
        },
        legend: {
          right: 'center',
          align: 'left',
          top: '1%',
          textStyle: {
            color: '#000'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: this.xdata,
            axisTick: {
              alignWithLabel: true
            },
            nameTextStyle: {
              color: '#333'
            },
            axisLine: {
              lineStyle: {
                color: 'RGB(47,68,114)'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#000'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              textStyle: {
                color: '#000'
              },
              formatter: '{value}%'
            },
            splitLine: {
              lineStyle: {
                color: '#5555'
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'RGB(47,68,114)'
              }
            }
          }
        ],
        series: [
          {
            name: '卖家1',
            type: 'line',
            smooth: true,
            // silent: true,
            data: this.ydata1
          },
          {
            name: '卖家2',
            type: 'line',
            smooth: true,
            // silent: true,
            data: this.ydata2
          }
        ]
      }
      this.pieChart.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
.chart-container {
  width: 100%;
  height: 100%;
  .charttitle {
    width: 100%;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    line-height: 30px;
  }
  .chart {
    width: 100%;
    height: 94%;
  }
}
</style>
