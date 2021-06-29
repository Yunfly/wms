<template>
  <div class="chart-container">
    <p class="charttitle">最近7天出单量</p>
    <div class="tool">
      <CrudSelect :dic="sellers" v-model="seller" label="卖家"></CrudSelect>
    </div>
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import CrudSelect from '../../components/avue/crud-select.vue'
export default {
  name: 'PieChart',
  components: {
    CrudSelect
  },
  created() {},
  data() {
    return {
      sellers: [
        { label: '卖家1', value: '1' },
        { label: '卖家2', value: '2' }
      ],
      seller: '1',
      pieChart: null,
      xdata: ['03-23', '03-24', '03-25', '03-26', '03-27', '03-28', '23-29'],
      ydata1: [130, 140, 160, 170, 160, 172, 150],
      ydata2: [160, 180, 190, 200, 210, 200, 203]
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
          text: '单位：个',
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
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
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
              formatter: '{value}'
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
            name: '单个卖家出单量',
            type: 'bar',
            // silent: true,
            barWidth: '20',
            // barGap: '-100%', // Make series be overlap
            data: this.ydata1
          },
          {
            name: '总出单量',
            type: 'bar',
            // silent: true,
            barWidth: '20',
            // barGap: '-100%', // Make series be overlap
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
  position: relative;
  .charttitle {
    width: 100%;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    line-height: 30px;
  }
  .tool{
    position: absolute;
    right: 0;
    top: 5%;
    z-index: 3;
  }
  .chart {
    width: 100%;
    height: 94%;
  }
}
</style>
