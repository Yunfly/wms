<template>
  <div class="chart-container">
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
      piedata: [
        { value: 20, name: '卖家1' },
        { value: 30, name: '卖家2' },
        { value: 25, name: '卖家3' },
        { value: 25, name: '卖家4' },
        { value: 20, name: '卖家5' }
      ]
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
          text: '同卖家数量统计',
          top: '1%',
          left: 'center',
          textStyle: {
            color: '#333',
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        toolbox: {
          show: true
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: '10%',
          align: 'left',
          top: 'middle',
          textStyle: {
            color: '#8C8C8C'
          },
          height: 150
        },
        series: [
          {
            name: '业务警种',
            type: 'pie',
            radius: [0, 100],
            label: {
              normal: {
                formatter: params => {
                  return (
                    '{name|' +
                    params.name +
                    '}\n{name|销量：}{value|' +
                    params.value +
                    '件}'
                  )
                },
                // padding: [0, -130, 25, -130],
                rich: {
                  name: {
                    fontSize: 14,
                    padding: [5, 5, 5, 0],
                    color: '#666666'
                  },
                  percent: {
                    color: '#333',
                    padding: [0, 5, 0, 0]
                  },
                  value: {
                    fontSize: 14,
                    color: '#E09B57'
                  }
                }
              }
            },
            data: this.piedata
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
  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>
