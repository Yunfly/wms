<template>
  <div class="sys-container">
    <div class="title">
      <p>库位管理</p>
    </div>
    <!-- 表格功能列 -->
    <div class="twoheight1">
      <div class="table-menu">
        <div class="table-menu-left">
          <el-button-group>
            <el-button
              size="mini"
              class="filter-item"
              @click="handleAdd"
              type="primary"
              icon="el-icon-plus"
              >添加
            </el-button>
            <el-button
              size="mini"
              class="filter-item"
              @click="allhandleDelete"
              type="danger"
              plain
              icon="el-icon-delete"
              >一键删除
            </el-button>
          </el-button-group>
        </div>
      </div>
      <el-table
        key="0"
        :data="list"
        border
        v-loading="listLoading"
        element-loading-text="加载中..."
        fit
        highlight-current-row
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column label="库位名称" width="300">
          <template slot-scope="scope">
            <div>
              <span>{{ ifempty(scope.row.sku) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="详细介绍">
          <template slot-scope="scope">
            <span>{{ ifempty(scope.row.desc) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              title="编辑"
              type="success"
              size="mini"
              @click="handleEdit(scope.row)"
              >编辑
            </el-button>
            <el-button
              title="删除"
              type="danger"
              size="mini"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div v-show="!listLoading" class="pagination-container">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="listQuery.current"
          :page-size="listQuery.size"
          layout="total, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="sysForm"
        class="sys-form"
        label-width="100px"
        :rules="sysRules"
        ref="sysForm"
        :inline="true"
      >
        <el-form-item label="库位名称:" prop="sku" style="width:90%">
          <el-input
            v-model="sysForm.sku"
            placeholder="请填写库位名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="详细介绍:" prop="pdesc" style="width:90%">
          <el-input
            v-model="sysForm.pdesc"
            placeholder="请填写详细介绍"
            type="textarea"
            :rows="4"
            resize="none"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >保 存</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  created() {},
  data() {
    return {
      list: [
        {
          imgurl: '',
          sku: 'sdoj132',
          name: '一次性一用口罩',
          count: 300,
          counts: [
            {
              warehousename: 'xx仓局',
              warehousecount: 15
            }
          ],
          price: 100,
          desc: ''
        }
      ],
      listLoading: false,
      listQuery: {
        current: 1,
        size: 10
      },
      total: 0,
      dialogVisible: false,
      title: '',
      sysForm: {
        sku: null,
        pdesc: null
      },
      sysRules: {
        sku: [{ required: true, message: '请输入有效密码', trigger: 'blur' }]
      },
      multipleSelection: []
    }
  },
  methods: {
    ifempty(value) {
      return value || '--'
    },
    getlist() {},
    handleFilter() {},
    searchReset() {},
    handleAdd() {
      this.title = '添加库位'
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.title = '编辑库位'
      this.dialogVisible = true
    },
    allhandleDelete() {},
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该资讯, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //
      })
    },
    handleCurrentChange(val) {},
    handleClose(done) {
      done()
    }
  }
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
    padding-left: 15px;
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
    background: #ffffff;
    border-radius: 4px;
    padding: 10px;
    box-sizing: border-box;
    .table-menu {
      position: relative;
      width: 100%;
      height: 6%;
      overflow: hidden;
      margin: 0;
      .table-menu-left {
        position: absolute;
        height: auto;
        overflow: hidden;
        left: 0;
      }
    }
    .el-table {
      height: 87% !important;
      margin: 0 !important;
      overflow: auto;
      border-bottom: 1px solid #ebeef5;
    }
    .pagination-container {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    /deep/.avue-tags__menu {
      margin-left: 10px;
    }
  }
}

.sys-form {
  /deep/.el-form-item {
    margin-right: 0px;
    .el-form-item__content {
      width: calc(100% - 100px);
      .avatar-uploader {
        // border: 1px dashed #d9d9d9;
        .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .el-upload:hover {
          border-color: #409eff;
        }
      }
      .el-input {
        .el-input__inner {
          padding: 0 0px 0 10px;
        }
        .el-input-group__append {
          .el-select {
            .el-input {
              .el-input__inner {
                padding: 0 0 0 8px;
              }
              .el-input__suffix {
                display: none;
              }
            }
          }
        }
      }
      .el-select {
        width: 100%;
      }
    }
  }
}
/deep/.el-dialog__wrapper {
  .el-dialog {
    .el-dialog__header {
      padding: 10px 20px 10px;
      background: #efefef;
    }
    .el-dialog__body {
      padding: 20px 20px;
    }
    .el-dialog__footer {
      display: flex;
      align-items: center;
      justify-content: center;
      border-top: 1px solid #b9b9b925;
    }
  }
}
</style>
