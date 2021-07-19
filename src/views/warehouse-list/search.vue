<template>
  <div class="filter-container">
    <el-form :inline="true" :model="searchForm" ref="searchForm">
      <el-form-item label="所在州:" prop="sku">
        <el-input
          class="filter-item input-normal"
          v-model="searchForm.sku"
          placeholder="请输入库存量单位"
        ></el-input>
      </el-form-item>
      <el-form-item label="所需面积:" prop="name">
        <el-input
          class="filter-item input-normal"
          v-model="searchForm.name"
          placeholder="请输入品名"
        ></el-input>
      </el-form-item>
      <el-form-item label="星级:" prop="name">
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
    searchReset() {
      this.$emit('searchReset')
    }
  }
}
</script>

<style lang="less" scoped>
p {
  margin: 0;
}
.product-container {
  width: 100%;
  height: 100%;
  width: 98%;
  height: 100%;
  margin: 15px 15px;
  border-radius: 5px;

  .title {
    background: #ffffff;
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
    padding-left: 30px;
    i {
      color: #999999;
      margin-right: 10px;
    }
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
  .twoheight1 {
    width: 100%;
    height: 86%;
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

      .table-menu-right {
        position: absolute;
        height: auto;
        overflow: hidden;
        right: 0;
      }
    }
    .el-table {
      height: 87% !important;
      margin: 0 !important;
      overflow: auto;
      border-bottom: 1px solid #ebeef5;
    }
    .tableactions-container {
      margin-top: 10px;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    /deep/.avue-tags__menu {
      margin-left: 10px;
    }
  }
}
.countdiv {
  padding: 20px;
  background: #000000;
  opacity: 0.7;
  border-radius: 5px;
  .countitem {
    display: flex;
    align-items: center;
    p {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      line-height: 21px;
    }
  }
}
.tipdiv {
  width: 130px;
  height: 50px;
  padding: 10px;
  background: #000000;
  opacity: 0.7;
  border-radius: 5px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
  line-height: 24px;
}
.product-form {
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
.importdiv {
  padding: 0px 30px;
  box-sizing: border-box;
  .importdivitem {
    width: 100%;
    height: 130px;
    background: rgba(47, 143, 251, 0.05);
    border: 1px solid rgba(47, 143, 251, 0.2);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .importdivitem-left {
      height: 100%;
      width: 20%;
      border-right: 1px solid #2f8efb2f;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .importdivitem-right {
      // height: 100%;
      width: 75%;
      .p16 {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #666666;
        line-height: 24px;
      }
      .p14 {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #999999;
        line-height: 24px;
      }
      /deep/.upload-demo {
        display: flex;
        align-items: center;
        ul {
          li {
            margin: 0;
            .el-upload-list__item-name {
              color: #409eff;
            }
          }
        }
      }
    }
  }
  .importdivitem1 {
    width: 100%;
    height: 130px;
    background: rgba(251, 167, 47, 0.1);
    border: 1px solid rgba(251, 167, 47, 0.2);
    border-radius: 5px;
    padding: 20px;
    box-sizing: border-box;
    .pp {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #666666;
      line-height: 30px;
      i {
        color: #fba72f;
        font-size: 18px;
        margin-right: 5px;
      }
    }
    .p14 {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #999999;
      line-height: 24px;
      text-indent: 20px;
    }
  }
  .importsuccess {
    margin-left: 50%;
    transform: translateX(-50%);
    img {
      margin-left: 50%;
      transform: translateX(-50%);
    }
    .importstatu {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #333333;
      line-height: 50px;
      text-align: center;
    }
    .listinfo {
      margin-left: 50%;
      transform: translateX(-50%);
      width: 401px;
      height: 60px;
      background: rgba(47, 143, 251, 0.05);
      border: 1px solid rgba(47, 143, 251, 0.2);
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      p {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #666666;
        line-height: 24px;
        span {
          font-weight: 400;
        }
      }
      .green {
        color: #30ac2d;
      }
      .red {
        color: #e82424;
      }
    }
  }
</style>
