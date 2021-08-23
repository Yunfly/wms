<template>
  <div class="sys-container">
    <div class="aside">
      <div
        class="aside-item3"
        :class="menuactive == '/sys' ? 'isactive' : ''"
        @click="cliclmenu('/storagedashboard')"
      >
        我的信息
      </div>
      <!--TODO-->
      <div
        class="aside-item3"
        :class="menuactive == '/sproduct' ? 'isactive' : ''"
        @click="cliclmenu('/sproduct')"
      >
        公司信息
      </div>

      <div
        class="aside-item3"
        :class="menuactive == '/store-info' ? 'isactive' : ''"
        @click="cliclmenu('/store-info')"
      >
        店铺信息
      </div>
    </div>
    <!-- 表格功能列 -->
    <el-main style="border-top: 1px solid #dcdfe9">
      <div class="mainview">
        <router-view></router-view></div
    ></el-main>
  </div>
</template>

<script>
export default {
  components: {},
  created() {},
  data() {
    return {
      menuactive: '/storagedashboard',
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
  watch: {
    $route: {
      handler(to, from) {
        this.menuactive = to.path
      },
      immediate: true
    }
  },
  methods: {
    cliclmenu(path) {
      this.menuactive = path
      this.$router.push(path)
    },
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
  display: flex;
  height: 100%;
  height: 100%;
  background: #fff;

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
.aside {
  width: 170px;
  height: 100%;
  background: #dbdfea;
  box-sizing: border-box;
  flex-shrink: 0;
  .aside-item1 {
    background: #66b1ff;
    width: 100%;
    height: 40px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .aside-item2 {
    width: 100%;
    height: 40px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #333333;
    line-height: 21px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    i {
      margin-right: 10px;
      font-size: 16px;
    }
  }
  .aside-item3 {
    width: 100%;
    height: 40px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #333333;
    line-height: 21px;
    display: flex;
    align-items: center;
    // padding-left: 40px;
    text-indent: 40px;
    cursor: pointer;
    p {
      i {
        margin-left: 10px;
      }
    }
  }
  .aside-item3:hover {
    background: #0042f81a;
  }
  .isactive {
    background: #66b1ff;
    color: #ffffff;
  }
  .asidebox {
    width: 100%;
    .asidehead {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 10px;
      box-sizing: border-box;
      .asidehead-item1 {
        display: flex;
        align-items: center;
        p {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #2d2d2d;
        }
        i {
          margin-right: 5px;
          font-size: 20px;
        }
      }
    }
    .warehoselist {
      width: 100%;
      .warehoselist-item {
        width: 100%;
        height: 50px;
        box-sizing: border-box;
        padding: 0px 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        p {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #2d2d2d;
          display: flex;
          align-items: center;
          span {
            font-size: 12px;
            color: white;
            background: #14c0be;
            border-radius: 2px;
            padding: 2px 4px;
            margin-right: 5px;
          }
        }
      }
      .warehoselist-item:hover {
        background: #66b0ff23;
      }
      .active {
        background: #66b0ff3b;
      }
      .warehoselist-item1 {
        width: 100%;
        height: 45px;
        box-sizing: border-box;
        padding: 0px 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        p {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #66b1ff;
          display: flex;
          align-items: center;
          span {
            font-size: 12px;
            color: white;
            background: #14c0be;
            border-radius: 2px;
            padding: 2px 4px;
            margin-right: 5px;
          }
        }
      }
      .warehoselist-item1:hover {
        background: rgba(0, 66, 248, 0.103);
      }
    }
  }
  .asidetool1 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-top: 10px;
    border-top: 1px solid #ccc;
  }
  .asidetool {
    position: absolute;
    bottom: 2%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
}
</style>
