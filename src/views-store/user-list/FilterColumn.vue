<template>
  <div class="filter-container">
    <el-form :inline="true" :model="searchForm" ref="searchForm">
      <el-form-item label="仓库SKU:" prop="sku">
        <el-input
          class="filter-item input-normal"
          v-model="searchForm.sku"
          placeholder="请输入库存量单位"
        ></el-input>
      </el-form-item>
      <el-form-item label="所属用户:" prop="user">
        <el-input
          class="filter-item input-normal"
          v-model="searchForm.user"
          placeholder="请输入所属用户"
        ></el-input>
      </el-form-item>
      <el-form-item label="名称:" prop="name">
        <el-input
          class="filter-item input-normal"
          v-model="searchForm.name"
          placeholder="请选择名称"
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
</template>

<script>
import { readExcel } from '../../util/readXlsxFile.js'
import productService from '../../services/productService'

export default {
  components: {},
  created() {
    this.getlist()
  },
  data() {
    return {
      tagkey: 1,
      searchForm: {
        sku: null,
        name: null,
        user: null
      },
      list: [],
      types: [],
      listLoading: false,
      listQuery: {
        current: 1,
        size: 10
      },
      total: 0,
      dialogVisible: false,
      title: '',
      value: [],
      productForm: {
        sku: [{ value: '' }],
        unit: null,
        name: null,
        length: null,
        size_unit: 'cm',
        width: null,
        height: null,
        weight: null,
        weight_unit: 'lbs',
        notes: null
      },
      imageUrl: '',
      productRules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur' }
        ]
      },
      importdialogVisible: false,
      importstatu: 'uploading',
      fileList: [],
      options: [
        {
          value: 'opt1',
          label: '确认仓库修改'
        },
        {
          value: 'opt2',
          label: '删除'
        }
      ]
    }
  },
  methods: {
    ifempty(value) {
      return value || '--'
    },
    submitForm() {
      if (this.title === '添加新商品') {
        this.addItem()
      }

      if (this.title === '编辑产品') {
        this.updateItem()
      }
    },

    async getlist() {
      await productService.getListData().then((res) => {
        this.list = res.content
        this.total = res.totalElements
      })
    },
    updateList(data) {
      return productService.updateItem({
        ...data,
        sku: data.sku.filter((i) => i.value !== '').map((x) => x.value)
      })
    },
    deleteItem(data) {
      productService.deleteItem(data)
    },
    handleFilter() {
      productService.getListData(this.searchForm)
    },
    searchReset() {
      this.searchForm = {
        sku: null,
        name: null
      }
    },
    addSKURow() {
      this.productForm.sku.push({ value: '' })
    },
    delSKURow(index) {
      this.productForm.sku.splice(index, 1)
    },
    handleAdd() {
      this.title = '添加新商品'
      this.dialogVisible = true
    },
    addItem() {
      this.$refs.productForm.validate(async (valid) => {
        if (valid) {
          const {
            name,
            unit,
            imgurl,
            sku,
            length,
            height,
            width,
            weight_unit,
            size_unit,
            weight,
            notes
          } = this.productForm
          console.log(this.productForm)
          await productService.addItem({
            name,
            unit,
            imgurl,
            length,
            height,
            width,
            weight,
            weight_unit,
            size_unit,
            notes,
            sku: sku.map((x) => x.value)
          })
          this.dialogVisible = false
          await this.getlist()
          this.$refs.productForm.resetFields()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    updateItem() {
      this.$refs.productForm.validate(async (valid) => {
        if (valid) {
          await this.updateList(this.productForm)
          await this.getlist()
          this.dialogVisible = false
          this.$refs.productForm.resetFields()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleEdit(row) {
      console.log(row)
      this.productForm = row
      if (!this.productForm.sku.length) {
        this.addSKURow()
      } else {
        this.productForm.sku = this.productForm.sku.map((value) => {
          console.log(value)
          return {
            value: typeof value !== 'object' ? value : value.value
          }
        })
      }
      this.title = '编辑产品'
      this.dialogVisible = true
    },
    async handleCancleRequest(item) {
      await productService.deleteItem({ item: item.openid })
      console.log('Request cancled', item)
    },
    handleSubmitRequest() {
      console.log('Request submitted')
    },
    handleimport() {
      this.importstatu = 'uploading'
      this.importdialogVisible = true
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
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const extension = file.name.split('.')[1] === 'xls'
      const extension2 = file.name.split('.')[1] === 'xlsx'

      const isLt2M = file.size / 1024 / 1024 < 2

      if (!extension && !extension2) {
        this.$message.error('上传文件只能是 xls、xlsx格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return !extension && !extension2 && isLt2M
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleChange(files, fileList) {
      console.log(readExcel(files))
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    changtagkey(key) {
      this.tagkey = key
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
  .importerror {
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
      width: 830px;
      height: 290px;
      background: rgba(47, 143, 251, 0.05);
      border: 1px solid rgba(47, 143, 251, 0.2);
      border-radius: 5px;
      padding: 20px;
      box-sizing: border-box;
      .listinfoitem {
        display: flex;
        align-items: center;
        padding-bottom: 15px;
        border-bottom: 1px dashed rgba(47, 143, 251, 0.2);
        p {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #666666;
          line-height: 24px;
          margin-right: 50px;
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
      .pp {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #666666;
        line-height: 30px;
        i {
          color: #e82424;
          font-size: 18px;
          margin-right: 5px;
        }
      }
      .errorlist {
        width: 100%;
        height: 240px;
        overflow: auto;
        p {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #e82424;
          line-height: 24px;
        }
      }
    }
  }
}
</style>
