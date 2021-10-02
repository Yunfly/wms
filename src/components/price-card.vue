<template>
  <div class="forecaststorage-container">
    <div class="table-title">
      <p class="h1">
        {{ title }}：<span>{{ subtitle }}</span>
      </p>
    </div>
    <el-row type="flex">
      <el-col :span="16">
        <el-table :data="tableData" border>
          <el-table-column
            label="序号"
            type="index"
            width="80px"
            align="center"
          ></el-table-column>

          <el-table-column label="收费项目（USD）" align="center">
            <template slot-scope="scope">
              <div>
                <span>{{ ifempty(scope.row.title) }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="价格" align="center">
            <template slot-scope="scope">
              <div>
                <span>${{ ifempty(scope.row.unitprice) }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                v-if="editalbe"
                type="danger"
                size="small"
                @click="handleEdit(title, scope.row, scope.$index)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                size="small"
                @click="handleDelete(title, scope.row, scope.$index)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="8">
        <div class="mixtitle">说明</div>
        <div class="mixcontent">
          <p :key="item.name" v-for="(item, index) in tableData">
            {{ index + 1 + '.' }} {{ item.desc }}
          </p>
        </div>
      </el-col>
    </el-row>
    <el-form size="small" ref="form" :model="form" :inline="true">
      <el-form-item
        label="选择模块:"
        prop="models"
        style="width: 100%; margin-top: 10px"
      >
        <el-select
          @change="handleModelsChange"
          v-model="models"
          multiple
          placeholder
          size="small"
        >
          <el-option
            v-for="(item, index) in modelsOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <br />
  </div>
</template>

<script>
export default {
  props: ['title', 'subtitle', 'options', 'tableData', 'models', 'editalbe'],

  data() {
    return {
      warsehouse: '',
      datetype: '1',
      form: {},
      modelsOptions: [
        {
          value: 0,
          label: '前程管理'
        },
        {
          value: 1,
          label: '订单管理'
        }
      ]
    }
  },
  methods: {
    ifempty(value) {
      return value || '--'
    },
    handleDelete(title, row, index) {
      this.$emit('delete', title, row, index)
    },
    handleEdit(title, row, index) {
      this.$emit('edit', title, row, index)
    },
    handleModelsChange(value) {
      console.log(value)
      this.$emit('change', this.title, value)
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  /deep/.el-table__header-wrapper {
    .el-table__header {
      thead {
        tr {
          background-color: #f8f8f8;
          th {
            background-color: #f8f8f8;
          }
        }
      }
    }
  }
}
p {
  margin: 0;
}
.table-title {
  margin-bottom: 15px;
  p {
    font-size: 14px;
    font-weight: 500;
  }
  span {
    font-size: 12px;
    color: #909399;
  }
}
.table-header {
  font-size: 14px;
  color: #606266;
  padding: 5px 0;
}
.product-collect {
  color: #606266;
  font-size: 14px;
  .el-row {
    border: 1px solid #d9d9d9;
    height: 45px;
    line-height: 45px;
  }
  .header {
    background: #f1f1f1;
    text-align: center;
  }
}
.mixtitle {
  font-size: 14px;
  width: 100%;
  height: 49px;
  line-height: 49px;
  text-align: center;
  box-sizing: border-box;
  text-overflow: ellipsis;
  background: #f8f8f8;
  border: 1px solid #ebeef5;
  border-left: none;
  vertical-align: middle;
  color: #909399;
  font-weight: bold;
}
.mixcontent {
  font-size: 14px;
  color: #606266;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  box-sizing: border-box;
  border-right: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  height: calc(100% - 49px);
  padding: 12px;
}

.forecaststorage-container {
  width: 100%;
  // height: 100%;
  background: #ffffff;
  min-height: 100%;
  .title {
    &::before {
      content: '';
      width: 30px;
      height: 50px;
      background: #f8f8f8;
      margin-left: -30px;
    }
    display: flex;
    align-items: center;
    background-color: #f8f8f8;
    i {
      color: #2f8ffb;
      margin-right: 10px;
    }
    p {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #303030;
      line-height: 50px;
      span {
        font-size: 14px;
        font-weight: 400;
        color: #888;
      }
    }
  }
}
</style>
