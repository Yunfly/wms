<template>
  <div class="sys-container">
    <div class="title">
      <p>数据报表</p>
    </div>
    <!-- 报表列 -->
    <ul class="twoheight1">
      <li class="chartbox">
        <piechart />
      </li>
      <li class="chartbox">
        <barchart />
      </li>
      <li class="chartbox">
        <linechart1 />
      </li>
      <li class="chartbox">
        <linechart2 />
      </li>
    </ul>
  </div>
</template>

<script>
import piechart from './chart/piechart'
import barchart from './chart/barchart'
import linechart1 from './chart/linechart1'
import linechart2 from './chart/linechart2'
export default {
  components: {
    piechart,
    barchart,
    linechart1,
    linechart2
  },
  created() {},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
p {
  margin: 0;
}
.sys-container {
  width: 100%;
  height: 100%;
  width: 98%;
  height: 100%;
  margin: 15px 15px;
  border-radius: 5px;
  background: #ffffff;

  .title {
    width: 100%;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #333333;
    line-height: 21px;
    height: 50px;
    border-bottom: 1px solid #33333311;
    display: flex;
    align-items: center;
    padding-left: 40px;
    p {
      position: relative;
    }
    p::before {
      content: '';
      width: 4px;
      height: 18px;
      background: #298eff;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -15px;
    }
  }
  .twoheight1 {
    width: 100%;
    height: 94%;
    border-radius: 4px;
    padding: 10px;
    box-sizing: border-box;
    margin: 0;
    // display: flex;
    .chartbox {
      width: 48.5%;
      height: 47%;
      background: #ffffff;
      border: 1px solid #eeeeee;
      border-radius: 5px;
      list-style: none;
      float: left;
      margin-left: 10px;
      margin-right: 10px;
      margin-top: 10px;
      margin-bottom: 10px;
      padding: 15px;
      box-sizing: border-box;
    }
  }
}
</style>
