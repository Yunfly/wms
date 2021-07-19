<template>
  <div class="filter-container">
    <el-form :inline="true" :model="searchForm" ref="searchForm">
      <el-form-item label="SKU:" prop="sku">
        <el-input
          class="filter-item input-normal"
          v-model="searchForm.sku"
          placeholder="请输入库存量单位"
        ></el-input>
      </el-form-item>
      <el-form-item label="品名:" prop="name">
        <el-input
          class="filter-item input-normal"
          v-model="searchForm.name"
          placeholder="请输入品名"
        ></el-input>
      </el-form-item>
      <el-form-item style="width: 300px">
        <el-button
          size="small"
          @click="searchReset"
          icon="icon iconfont icon-qingkong"
          type="primary"
          plain
          >清空查询条件
        </el-button>
        <el-button
          size="small"
          type="primary"
          icon="icon iconfont icon-chaxun"
          @click="handleFilter"
          >查询
        </el-button>
      </el-form-item>
    </el-form>
  </div>
  <!-- 表格功能列 -->
</template>

<script>
export default {
  components: {},
  created() {},
  data() {
    return {
      tagkey: 1,
      searchForm: {
        sku: null,
        name: null
      }
    }
  },
  methods: {
    handleFilter() {},
    searchReset() {}
  }
}
</script>

<style lang="less" scoped>
p {
  margin: 0;
}

.filter-container {
  width: 100%;
  height: 12%;
  background: #ffffff;
  border-radius: 4px;
  margin-bottom: 1%;
  padding: 10px;
  box-sizing: border-box;
  /deep/.el-form-item {
    vertical-align: bottom;
    width: 15%;
    .el-form-item__label {
      line-height: 28px;
    }
  }
  /deep/.el-form-item__content {
    display: block;
    .el-select {
      width: 100%;
    }
  }
}
</style>
