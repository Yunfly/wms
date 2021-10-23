<template>
  <div class="totalorder-container">
    <div class="filter-container">
      <el-form :inline="true" :model="searchForm" ref="searchForm">
        <el-form-item label="批次号:" prop="sku">
          <el-input
            class="filter-item input-normal"
            v-model="searchForm.sku"
            placeholder="请输入批次号"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="物流单号:" prop="warehouse">
          <el-input
            class="filter-item input-normal"
            v-model="searchForm.warehouse"
            placeholder="请输入物流单号"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="开始时间:" prop="name">
          <el-date-picker
            v-model="searchForm.starttime"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            size="small"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间:" prop="name">
          <el-date-picker
            v-model="searchForm.endtime"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            size="small"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="SKU:" prop="contact">
          <el-input
            class="filter-item input-normal"
            v-model="searchForm.contact"
            placeholder="请输入sku"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item>
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
    <div class="twoheight1">
      <div class="table-menu">
        <div class="table-menu-left">
          <el-radio-group v-model="storageType">
            <el-radio-button
              size="small"
              label="1"
              class="filter-item"
              type="primary"
              >全部订单
            </el-radio-button>
            <el-radio-button
              size="small"
              label="2"
              class="filter-item"
              type="primary"
              plain
              >预约入库
            </el-radio-button>
            <el-radio-button
              size="small"
              label="3"
              class="filter-item"
              type="primary"
              plain
              >已入库
            </el-radio-button>
          </el-radio-group>
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
        <!-- <el-table-column label="序号" type="index" width="50"></el-table-column> -->
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="操作日期" width="120">
          <template slot-scope="scope">
            <div>
              <img src="" alt="" />
              <span>{{ ifempty(scope.row.sku) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="对应订单号/批次号">
          <template slot-scope="scope">
            <p>{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="150">
          <template slot-scope="scope">
            <p class="statu0" v-if="scope.row.statu == 0">未入库入库</p>
            <p class="statu1" v-if="scope.row.statu == 1">已入库</p>
            <p class="statu2" v-if="scope.row.statu == 2">已完成</p>
          </template>
        </el-table-column>
        <el-table-column label="物品信息">
          <template slot-scope="scope">
            <p>SKU：{{ ifempty(scope.row.name) }}</p>
            <p>数量：{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="物流信息">
          <template slot-scope="scope">
            <p>配送物流：{{ ifempty(scope.row.name) }}</p>
            <p>单 号：{{ ifempty(scope.row.name) }}</p>
            <p>配送状态：{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              title="详情"
              type="primary"
              size="mini"
              @click="handleReview(scope.row)"
              >查看详情
            </el-button>
            <el-button
              title="更新发货状态"
              type="success"
              size="mini"
              @click="handleEdit(scope.row)"
              >更新发货状态
            </el-button>
            <el-button
              title="入库"
              type="warning"
              size="mini"
              @click="toForecast(scope.row.id)"
            >
              入库
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
      <div class="toolbox">
        <CrudSelect
          :dic="options"
          v-model="option"
          label="选择要执行的操作"
        ></CrudSelect>
        <el-button size="small" type="primary" @click="handleFilter"
          >执行
        </el-button>
      </div>
    </div>
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div>
        <el-form :inline="true" v-model="reviewDetail" ref="reviewDetail">
          <p class="review-form-section">
            入库批次号：{{ ifempty(reviewDetail.batckNumber) }}
          </p>
          <p class="review-form-section">预报物品信息：</p>
          <el-table border fit :data="reviewDetail.rows">
            <el-table-column label="参考码">
              <template slot-scope="scope">
                <span>{{ ifempty(scope.row.code) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="包裹数">
              <template slot-scope="scope">
                <span>{{ ifempty(scope.row.packnum) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="包裹明细及请求服务项目">
              <template slot-scope="scope">
                <span>{{ ifempty(scope.row.services) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="备注">
              <template slot-scope="scope">
                <span>{{ ifempty(scope.row.notes) }}</span>
              </template>
            </el-table-column>
          </el-table>
          <p class="review-form-section">商品总数汇总：</p>
          <el-form-item style="width: 48%; margin-bottom: 0px">
            <el-input
              placeholder="没有数据"
              v-model="reviewDetail.sku"
              readonly=""
            >
              <template slot="prepend">SKU</template>
            </el-input>
          </el-form-item>
          <el-form-item style="width: 48%; margin-bottom: 0px">
            <el-input
              placeholder="没有数据"
              v-model="reviewDetail.count"
              readonly=""
            >
              <template slot="prepend">数量</template>
            </el-input>
          </el-form-item>
          <p class="review-form-section">备注：</p>
          <el-input
            type="textarea"
            :rows="4"
            readonly="true"
            resize="none"
            placeholder="没有数据"
            v-model="reviewDetail.note"
          >
          </el-input>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          style="justify-content: flex-end"
          type="primary"
          @click="dialogVisible = true"
          >确定</el-button
        >
      </div>
    </el-dialog>
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
      storageType: '1',
      searchForm: {
        sku: null,
        warehouse: null,
        name: null,
        type: null,
        contact: null,
        starttime: null,
        endtime: null
      },
      reviewDetail: {
        rows: [],
        sku: null,
        count: null,
        note: null
      },
      list: [
        {
          imgurl: '',
          sku: 'sdoj132',
          name: '一次性一用口罩',
          count: 300,
          price: 100,
          desc: '',
          statu: 0
        },
        {
          imgurl: '',
          sku: 'sdoj132',
          name: '一次性一用口罩',
          count: 300,
          price: 100,
          desc: '',
          statu: 1
        },
        {
          imgurl: '',
          sku: 'sdoj132',
          name: '一次性一用口罩',
          count: 300,
          price: 100,
          desc: '',
          statu: 2
        }
      ],
      options: [{ label: '批量删除', value: '1' }],
      listLoading: false,
      listQuery: {
        current: 1,
        size: 10
      },
      total: 3,
      dialogVisible: false,
      title: '',
      productForm: {
        sku: null,
        barcode: null,
        productname: null,
        price: null,
        pl: null,
        plunit: 'cm',
        pw: null,
        pwunit: 'cm',
        ph: null,
        phunit: 'cm',
        pweight: null,
        pweunit: 'lbs',
        pdesc: null,
        iswarning: false
      },
      imageUrl: '',
      productRules: {
        sku: [
          { required: true, message: '请输入有效密码', trigger: 'blur' },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
        ],
        barcode: [
          { required: true, message: '请输入有效密码', trigger: 'blur' },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
        ],
        productname: [
          { required: true, message: '请输入有效密码', trigger: 'blur' },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入有效密码', trigger: 'blur' },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
        ]
      },
      importdialogVisible: false,
      importstatu: 'uploading',
      fileList: [],
      multipleSelection: [],
      option: null
    }
  },
  methods: {
    toForecast(id) {
      this.$router.push({ path: '/forecaststorage' })
    },
    ifempty(value) {
      return value || '--'
    },
    getlist() {},
    handleFilter() {},
    searchReset() {},
    handleReview(row) {
      this.title = '查看详情'
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.title = '编辑产品'
      this.dialogVisible = true
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
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
.totalorder-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .filter-container {
    width: 100%;
    background: #ffffff;
    border-radius: 4px;
    margin-bottom: 1%;
    padding: 10px;
    box-sizing: border-box;
    /deep/.el-form-item {
      vertical-align: bottom;
      width: 18%;
      margin-bottom: 0;
      .el-form-item__label {
        line-height: 28px;
      }
    }
    /deep/.el-form-item__content {
      display: block;
      .el-select {
        width: 100%;
      }
      .el-date-editor {
        width: 100%;
      }
    }
  }
  .twoheight1 {
    flex: 1;
    width: 100%;
    background: #ffffff;
    border-radius: 4px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
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
    .toolbox {
      display: flex;
      align-items: center;
      .el-select {
        margin-right: 20px;
      }
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
.statu0 {
  width: 65px;
  height: 28px;
  background: rgba(244, 92, 88, 0.1);
  border: 1px solid #f45c58;
  border-radius: 3px;
  text-align: center;
  line-height: 28px;
  color: #f45c58;
}
.statu1 {
  width: 56px;
  height: 28px;
  background: rgba(69, 197, 142, 0.1);
  border: 1px solid #45c58e;
  border-radius: 3px;
  text-align: center;
  line-height: 28px;
  color: #45c58e;
}
.statu2 {
  width: 56px;
  height: 28px;
  background: rgba(41, 142, 255, 0.1);
  border: 1px solid #66b1ff;
  border-radius: 3px;
  text-align: center;
  line-height: 28px;
  color: #66b1ff;
}
.review-form-section {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #000;
  line-height: 50px;
}
</style>
