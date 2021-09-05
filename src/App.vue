<template>
  <div id="app">
    <!--视图路由占位符-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {},
  metaInfo() {
    return {
      title: 'WMS全球仓库管理系统',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content:
            'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
        }
      ]
    }
  }
}
</script>

<style lang="less">
body {
  min-width: 1300px;
}
.fa {
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
  vertical-align: middle;
}
.clear:after {
  content: '';
  height: 0;
  line-height: 0;
  display: block;
  visibility: hidden;
  clear: both;
}
.text-right {
  text-align: right;
}

</style>
