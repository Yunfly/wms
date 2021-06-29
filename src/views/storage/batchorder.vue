<template>
  <div class="directorder-container">
    <div class="title">
      <i class="fa fa-bookmark"></i>
      <p>批量导入运单</p>
    </div>
    <div>
      <el-form
        :model="directorderForm"
        class="directorder-form"
        label-width="110px"
        :rules="directorderRules"
        ref="directorderForm"
        :inline="true"
      >
        <el-form-item label="仓库:" prop="cangku" style="width:50%">
          <CrudSelect
            :dic="cangkus"
            v-model="directorderForm.cangku"
            label=""
          ></CrudSelect>
        </el-form-item>
        <el-form-item label="文件上传:" prop="sku" style="width:50%">
          <el-upload
            class="upload-demo"
            action="#"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
            accept=".pdf,.png,.jpg,.jepg"
          >
            <el-button size="mini" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div class="line"></div>
    <div class="tool">
      <el-button type="primary" icon="fa fa-upload">批量导入运单</el-button>
    </div>
    <div class="title">
      <i class="fa fa-exclamation-circle yellow"></i>
      <p>注意事项</p>
    </div>
    <div class="textbox">
      <p>1、请使用Excel创建一个.xls文件，格式如下：</p>
      <el-link type="primary">(点击下载模板)</el-link>
      <p>2、Excel表格一次不能大于2M，超过2M的请分批导入</p>
      <p>3、客户单号为空，默认为系统自动生成单号</p>
      <p>4、请勿修改表格格式和重复导入Excel表，否则无法导入</p>
    </div>
  </div>
</template>

<script>
import CrudSelect from '../../components/avue/crud-select.vue'
export default {
  components: {
    CrudSelect
  },
  created() {},
  data() {
    return {
      directorderForm: {
        cangku: null,
        sendername: null,
        orderNo: null,
        recipient: null,
        recipientcall: null,
        recipientaddress1: null,
        recipientaddress2: null,
        area: null,
        haocai1: 1,
        haocai2: 1,
        haocai3: 1,
        fuwu: 1,
        products: []
      },
      directorderRules: {
        cangku: [{ required: true, message: '请选择仓库', trigger: 'blur' }]
      },
      fileList: [],
      cangkus: [
        { label: '仓库1', value: '1' },
        { label: '仓库2', value: '4' }
      ]
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style lang="less" scoped>
p {
  margin: 0;
}
.directorder-container {
  width: 100%;
  height: 100%;
  background: #ffffff;
  .title {
    display: flex;
    align-items: center;
    background-color: #f8f8f8;
    padding-left: 30px;
    i {
      color: #2f8ffb;
      margin-right: 10px;
    }
    .yellow{
      color: #fc8804;
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
  .directorder-form {
    padding: 20px 20px 0px 35px;
    /deep/.el-form-item {
      margin-right: 20px;
      .el-form-item__content {
        width: calc(100% - 110px);
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
    .product-table {
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
      /deep/.el-table__body-wrapper {
        .el-table__body {
          .el-table__row {
            .cell {
              .el-form-item {
                margin: 0;
                width: 100%;
                .el-form-item__content {
                  width: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
  .line {
    width: 96%;
    height: 0px;
    // background: #dbdbdb;
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 30px;
    margin-bottom: 30px;
    border: 1px dashed #dbdbdb;
  }
  .tool {
    display: flex;
    align-items: center;
    margin-left: 70px;
    padding-bottom: 30px;
  }
  .textbox {
    padding: 20px 20px 20px 65px;
    p {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #666666;
      line-height: 40px;
    }
    .el-link {
      margin-left: 20px;
    }
  }
}
</style>
