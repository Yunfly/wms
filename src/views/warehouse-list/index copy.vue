<template>
  <div class="product-container">
    <search />

    <!-- 表格功能列 -->
    <div class="twoheight1">
      <div class="table-menu">
        <div class="table-menu-left">
          <el-button-group>
            <el-button size="small" class="filter-item" type="primary"
              >全部仓库
            </el-button>
            <el-button size="small" class="filter-item" type="primary" plain
              >签约仓库
            </el-button>
            <el-button size="small" class="filter-item" type="primary" plain
              >预存仓库
            </el-button>
          </el-button-group>
        </div>

        <div class="table-menu-left"></div>
        <div class="table-menu-right">
          <el-button-group>
            <el-button
              size="mini"
              class="filter-item"
              @click="handleAdd"
              type="primary"
              icon="icon iconfont icon-jia"
              >添加
            </el-button>
            <el-button
              size="mini"
              class="filter-item"
              @click="handleimport"
              type="primary"
              plain
              icon="icon iconfont icon-jichutubiao-"
              >导入
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
        v-if="tagkey == 1"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="序号" width="175">
          <template slot-scope="scope">
            <div>
              <img src="" alt="" />
              <span>{{ ifempty(scope.row.rid) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="卖家SKU">
          <template slot-scope="scope">
            <div>
              <img src="" alt="" />
              <span>{{ ifempty(scope.row.selsku) }}</span>
              <el-popover
                placement="right-start"
                title=""
                trigger="hover"
                :visible-arrow="false"
              >
                <div class="countdiv">
                  <div
                    class="countitem"
                    v-for="(n, index) in scope.row.counts"
                    :key="index"
                  >
                    <p>{{ n.warehousename }}：</p>
                    <p>{{ n.warehousecount }}</p>
                  </div>
                </div>
                <i class="el-icon-question" slot="reference"></i>
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="仓库名">
          <template slot-scope="scope">
            <span>{{ ifempty(scope.row.name) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="地址" width="100">
          <template slot-scope="scope">
            <span>{{ ifempty(scope.row.unit) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="100">
          <template slot-scope="scope">
            <span>{{ ifempty(scope.row.weight) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="面积">
          <template slot-scope="scope">
            <span>{{ ifempty(scope.row.size) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="星级">
          <template slot-scope="scope">
            <span>{{ ifempty(scope.row.size) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="150">
          <template slot-scope="scope">
            <el-button
              title="编辑"
              type="success"
              size="mini"
              @click="handleEdit(scope.row)"
              >编辑
            </el-button>
            <template>
              <el-button
                title="删除"
                type="danger"
                size="mini"
                @click="handleCancleRequest(scope.row)"
              >
                删除
              </el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        key="0"
        :data="list"
        border
        v-loading="listLoading"
        element-loading-text="加载中..."
        fit
        highlight-current-row
        v-if="tagkey == 2"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="序号" width="175">
          <template slot-scope="scope">
            <div>
              <img src="" alt="" />
              <span>{{ ifempty(scope.row.rid) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="仓库SKU" width="100">
          <template slot-scope="scope">
            <span>{{ ifempty(scope.row.stksku) }}</span>
            <el-popover
              placement="right-start"
              title=""
              trigger="hover"
              :visible-arrow="false"
            >
              <div class="countdiv">
                <div
                  class="countitem"
                  v-for="(n, index) in scope.row.counts"
                  :key="index"
                >
                  <p>{{ n.warehousename }}：</p>
                  <p>{{ n.warehousecount }}</p>
                </div>
              </div>
              <i class="el-icon-question" slot="reference"></i>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="卖家SKU">
          <template slot-scope="scope">
            <div>
              <img src="" alt="" />
              <span>{{ ifempty(scope.row.selsku) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="名称">
          <template slot-scope="scope">
            <span>{{ ifempty(scope.row.name) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单位" width="100">
          <template slot-scope="scope">
            <span>{{ ifempty(scope.row.unit) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="重量" width="100">
          <template slot-scope="scope">
            <span>{{ ifempty(scope.row.weight) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="尺寸">
          <template slot-scope="scope">
            <span>{{ ifempty(scope.row.size) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="200">
          <template slot-scope="scope">
            <el-button
              title="编辑"
              type="success"
              size="mini"
              @click="handleEdit(scope.row)"
              >编辑
            </el-button>
            <template v-if="scope.row.ptype === 1">
              <el-button
                title="删除"
                type="danger"
                size="mini"
                @click="handleCancleRequest(scope.row)"
              >
                取消提交审核
              </el-button>
            </template>
            <template v-else>
              <el-button
                title="删除"
                type="warning"
                size="mini"
                @click="handleSubmitRequest(scope.row)"
              >
                审核仓库修改
              </el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="!listLoading" class="tableactions-container">
        <div>
          <el-select v-model="value" placeholder="选择执行的操作">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-button
            title="批量执行"
            type="primary"
            size="medium"
            style="margin-left: 7px"
            @click="handleSubmitRequest(scope.row)"
          >
            批量执行
          </el-button>
        </div>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="listQuery.current"
          :page-size="listQuery.size"
          layout="total, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
      <div></div>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="52%"
      :before-close="handleClose"
    >
      <el-form
        :model="productForm"
        class="product-form"
        label-width="100px"
        :rules="productRules"
        ref="productForm"
        :inline="true"
      >
        <p
          style="
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #000;
            line-height: 50px;
          "
        >
          预计单个包裹尺寸：
        </p>
        <el-form-item label="长:" prop="pl" style="width: 24%">
          <el-input v-model="productForm.pl" placeholder="请输入长">
            <el-select
              v-model="productForm.plunit"
              slot="append"
              placeholder=""
              size="mini"
            >
              <el-option label="cm" value="1"></el-option>
              <el-option label="inch" value="2"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="宽:" prop="pw" style="width: 24%">
          <el-input v-model="productForm.pw" placeholder="请输入宽">
            <el-select
              v-model="productForm.pwunit"
              slot="append"
              placeholder=""
            >
              <el-option label="cm" value="1"></el-option>
              <el-option label="inch" value="2"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="高:" prop="ph" style="width: 24%">
          <el-input v-model="productForm.ph" placeholder="请输入高">
            <el-select
              v-model="productForm.phunit"
              slot="append"
              placeholder=""
            >
              <el-option label="cm" value="1"></el-option>
              <el-option label="inch" value="2"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="重量:" prop="pweight" style="width: 24%">
          <el-input v-model="productForm.pweight" placeholder="请输入重量">
            <el-select
              v-model="productForm.pweunit"
              slot="append"
              placeholder=""
            >
              <el-option label="lbs" value="1"></el-option>
              <el-option label="kg" value="2"></el-option> </el-select
          ></el-input>
        </el-form-item>
        <el-form-item label="商品图片:" prop="imageUrl" style="width: 48%">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注:" prop="pdesc" style="width: 48%">
          <el-input
            type="textarea"
            maxlength="300"
            show-word-limit
            v-model="productForm.pdesc"
            placeholder="请填写备注相关信息"
          ></el-input>
        </el-form-item>
        <p
          style="
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #000;
            line-height: 50px;
          "
        >
          商品信息：
        </p>
        <el-form-item label="名称:" prop="productname" style="width: 48%">
          <el-input v-model="productForm.productname" placeholder="请输入名称">
            <i slot="suffix" class="fa fa-barcode" aria-hidden="true"></i
          ></el-input>
        </el-form-item>
        <el-form-item label="单位:" prop="unit" style="width: 48%">
          <el-input
            v-model="productForm.unit"
            placeholder="请输入单位"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品SKU:" prop="sku" style="width: 48%">
          <div>
            <el-input
              :placeholder="'SKU序号-' + (index + 1)"
              v-for="(item, index) in productForm.sku"
              :key="index"
              v-model="item.value"
              class="input-with-select"
              style="margin-bottom: 5px"
            >
              <el-button
                @click="addSKURow"
                v-if="index == 0"
                slot="append"
                icon="el-icon-plus"
                circle
              ></el-button>
              <el-button
                @click="delSKURow(index)"
                v-if="index != 0"
                slot="append"
                icon="el-icon-minus"
                circle
              ></el-button>
            </el-input>
          </div>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >保 存</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="批量导入"
      :visible.sync="importdialogVisible"
      width="45%"
      :before-close="handleClose"
    >
      <div class="importdiv" v-if="importstatu == 'uploading'">
        <div class="importdivitem">
          <div class="importdivitem-left">
            <img src="/img/download.png" alt="" />
          </div>
          <div class="importdivitem-right">
            <p class="p16">批量导入产品信息</p>
            <p class="p14">请使用Excel创建一个.xls文件，格式如下</p>
            <el-link type="primary" href="">点击下载模板</el-link>
          </div>
        </div>
        <div class="importdivitem">
          <div class="importdivitem-left">
            <img src="/img/upload.png" alt="" />
          </div>
          <div class="importdivitem-right">
            <p class="p16">上传已下载好的产品信息</p>
            <p class="p14">
              文件后缀名必须为xls或xlsx（即Excel格式）,文件大小不得大于2M，超过2M的请分批导入
            </p>
            <el-upload
              class="upload-demo"
              action="#"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-change="handleChange"
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList"
              accept=".xls,.csv"
            >
              <el-link type="primary">上传文件</el-link>
            </el-upload>
          </div>
        </div>
        <div class="importdivitem1">
          <p class="pp"><i class="el-icon-info"></i>特别提示</p>
          <p class="p14">1、客户单号为空，默认为系统自动生成单号</p>
          <p class="p14">
            2、请勿修改表格格式和重复导入Excel表格，否则无法导入
          </p>
        </div>
      </div>
      <div class="importdiv" v-if="importstatu == 'success'">
        <div class="importsuccess">
          <img src="/img/success.png" alt="" />
          <p class="importstatu">导入成功</p>
          <div class="listinfo">
            <p>正常数据条数：<span class="green">100条</span></p>
            <p>异常数据条数：<span class="red">0条</span></p>
          </div>
        </div>
      </div>
      <div class="importdiv" v-if="importstatu == 'falie'">
        <div class="importerror">
          <img src="/img/error.png" alt="" />
          <p class="importstatu">导入失败</p>
          <div class="listinfo">
            <div class="listinfoitem">
              <p>正常数据条数：<span class="green">100条</span></p>
              <p>异常数据条数：<span class="red">0条</span></p>
            </div>
            <p class="pp"><i class="el-icon-info"></i>异常提示</p>
            <div class="errorlist">
              <p>
                第3行：已存在名称为【 深圳市亿恩科技有限公司
                】的客户，如果继续导入将会更新这条客户的数据
              </p>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="importdialogVisible = false"
          v-if="importstatu == 'uploading'"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="importstatu = 'falie'"
          v-if="importstatu == 'uploading'"
          >下一步</el-button
        >
        <el-button
          type="primary"
          @click="importdialogVisible = false"
          v-if="importstatu == 'success'"
          >确认</el-button
        >
        <el-button
          type="primary"
          @click="importstatu = 'uploading'"
          v-if="importstatu == 'falie'"
          >重新上传</el-button
        >
        <el-button
          type="primary"
          @click="importdialogVisible = false"
          v-if="importstatu == 'falie'"
          >确认</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { readExcel } from '../../util/readXlsxFile.js'
import search from '../../components/search/index.vue'
export default {
  components: { search },
  created() {},
  data() {
    return {
      value: {},
      tagkey: 1,
      searchForm: {
        sku: null,
        name: null
      },
      list: [
        {
          imgurl: '',
          rid: 1,
          stksku: 'UN001',
          selsku: 'IBSTONE0BLACK-001',
          name: '一次性一用口罩',
          unit: 'Set',
          weight: '7kg',
          size: null,
          count: 300,
          counts: [
            {
              warehousename: '北卡仓',
              warehousecount: 15
            }
          ],
          price: 100,
          desc: '',
          ptype: 0
        },
        {
          imgurl: '',
          rid: 2,
          stksku: 'UN002',
          selsku: 'IBSTONE0BLACK-001',
          name: '一次性一用口罩',
          unit: 'Set',
          weight: '7kg',
          size: null,
          count: 300,
          counts: [
            {
              warehousename: '南卡仓',
              warehousecount: 10
            }
          ],
          price: 100,
          desc: '',
          ptype: 1
        }
      ],
      types: [],
      listLoading: false,
      listQuery: {
        current: 1,
        size: 10
      },
      total: 0,
      dialogVisible: false,
      title: '',
      productForm: {
        sku: [{ value: '' }],
        unit: null,
        productname: null,
        pl: null,
        plunit: 'cm',
        pw: null,
        pwunit: 'cm',
        ph: null,
        phunit: 'cm',
        pweight: null,
        pweunit: 'lbs',
        pdesc: null
      },
      imageUrl: '',
      productRules: {
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
    getlist() {},
    handleFilter() {},
    searchReset() {},
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
    handleEdit(row) {
      this.title = '编辑产品'
      this.dialogVisible = true
    },
    handleCancleRequest() {
      console.log('Request cancled')
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
