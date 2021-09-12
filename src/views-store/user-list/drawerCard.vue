<template>
  <el-drawer
    :title="drawerInfo.email"
    :visible="visible"
    :show-close="false"
    :before-close="handleClose"
    direction="rtl"
  >
    <div style="padding: 0 5px">
      <el-row class="card-info">
        <el-col :span="24" style="text-align: center">
          <el-avatar :size="64" style="margin-bottom: 10px"> user </el-avatar>
        </el-col>
        <el-col :span="6" class="title mb10">仓库省份：</el-col>
        <el-col :span="18" class="mb10"
          >北卡莱罗纳州
          <div style="display: inline-flex">
            <el-rate :value="5" disabled></el-rate>
          </div>
        </el-col>
        <el-col :span="6" class="title mb10">占地面积：</el-col>
        <el-col :span="18" class="mb10">120000sqft</el-col>
        <el-col :span="6" class="title mb10">仓库地址：</el-col>
        <el-col :span="18" class="mb10">北卡莱罗纳州</el-col>
        <el-col :span="6" class="title mb10">仓库简介：</el-col>
        <el-col :span="18" class="mb10"
          >仓库简介仓库简介仓库简介仓库简介仓库简介仓库简介</el-col
        >
      </el-row>

      <div class="divider"></div>
      <el-row type="flex" style="text-align: center" align="center">
        <el-col :span="8"> <el-button type="text">联系仓库</el-button> </el-col>
        <el-col :span="8"> <el-button type="text">保存仓库</el-button> </el-col>
        <el-col :span="8"> <el-button type="text">签约</el-button> </el-col>
      </el-row>
    </div>
    <div class="divider" style="height: 10px"></div>
  </el-drawer>
</template>

<script>
export default {
  props: ['title', 'visible', 'drawerInfo'],
  methods: {
    handleClose() {
      this.$emit('handleClose')
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.el-drawer__header {
  border-bottom: 1px solid #dcdfe6;
  padding-bottom: 10px;
  & > :first-child {
    border-left: 5px solid #409eff;
    padding-left: 5px;
    font-size: 14px;
  }
}
.divider {
  margin: 0;
  background-color: #dcdfe6;
  position: relative;
  display: block;
  height: 1px;
  width: 100%;
}
.card-info {
  font-size: 14px;

  .title {
    color: #c0c4cc;
    text-align: right;
  }
  .mb10 {
    margin-bottom: 10px;
  }
}
</style>