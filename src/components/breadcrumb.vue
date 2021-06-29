<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item v-for="(item, index) in paths" :key="index">{{
        item.name
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data() {
    return {
      paths: []
    }
  },
  methods: {},
  mounted() {},
  watch: {
    $route: {
      handler(to, from) {
        this.paths = []
        to.matched.forEach(item => {
          this.paths.push({
            name: item.name,
            path: item.path
          })
        })
      },
      immediate: true
    }
  }
}
</script>
<style lang="less" scoped>
.el-breadcrumb {
  width: 100%;
  height: 50px;
  background: #ffffff;
  box-shadow: 0px 2px 6px 0px rgba(189, 194, 197, 0.3);
  border-top: 1px solid #c3c3c361;
  display: flex;
  align-items: center;
  padding-left: 15px;
}
</style>
