<template>
  <div class="forecaststorage-container">
    <div class="title">
      <i class="fa fa-bookmark"></i>
      <p>批次信息</p>
    </div>
    <div class="">
      <el-form
        :model="storageFrom"
        class="storage-form"
        label-width="110px"
        :rules="storageRules"
        ref="storageFrom"
        :inline="true"
      >
        <el-form-item label="发货仓库:" prop="cangku" style="width:40%">
          <CrudSelect
            :dic="cangkus"
            v-model="storageFrom.cangku"
            label=""
          ></CrudSelect>
        </el-form-item>
        <el-form-item label="文件上传:" prop="sku" style="width:40%">
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
        <el-form-item label="接受仓库:" prop="cangku" style="width:40%">
          <CrudSelect
            :dic="cangkus"
            v-model="storageFrom.cangku"
            label=""
          ></CrudSelect>
        </el-form-item>
      </el-form>
    </div>
    <div class="title">
      <i class="fa fa-bookmark"></i>
      <p>批次信息汇总</p>
    </div>
    <div style="padding-bottom: 20px;">
      <el-form
        :model="storageFrom"
        class="storage-form"
        label-width="110px"
        ref="storageFrom"
        :inline="true"
        style="width: 80%"
      >
        <div
          style="display: flex;justify-content: flex-end;margin-bottom: 20px;"
        >
          <el-button
            type="primary"
            size="small"
            @click="addproduct"
            icon="el-icon-plus"
            >添加包裹</el-button
          >
        </div>
        <el-table :data="storageFrom.packages" border show-summary class="product-table">
          <el-table-column label="参考码" width="300px">
            <template slot-scope="scope">
              <div>
                <span>{{ ifempty(scope.row.code) }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="包裹数" width="150px">
            <template slot-scope="scope">
              <div>
                <span>{{ ifempty(scope.row.count) }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="包裹信息">
            <template slot-scope="scope">
              <div>
                <p>单个包裹尺寸：{{ ifempty(scope.row.size) }}</p>
                <p>增值服务：{{ ifempty(scope.row.serve) }}</p>
                <p>包裹处理费：{{ ifempty(scope.row.deal) }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="费用" width="150px">
            <template slot-scope="scope">
              <div>
                <span>{{ ifempty(scope.row.price) }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80px">
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="mini"
                @click="deleteRow(scope.$index)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </div>

    <el-dialog
      title="物流信息"
      :visible.sync="dialogVisible"
      width="52%"
      top="2vh"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div class="packagebox">
        <div class="packagebox-title">
          <p>单个包裹信息</p>
          <el-button
            type="primary"
            size="small"
            @click="addpackage"
            icon="el-icon-plus"
            >添加</el-button
          >
        </div>
        <div style="margin-bottom: 20px;">
          <el-form
            :model="packageForm"
            class="package-form"
            label-width="110px"
            :rules="packageRules"
            ref="packageForm"
            :inline="true"
          >
            <el-table :data="packageForm.list" border class="product-table">
              <el-table-column prop="name" label="物品名">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'list.' + scope.$index + '.name'"
                    :rules="[
                      {
                        required: true,
                        message: '请选择物品信息',
                        trigger: 'blur'
                      }
                    ]"
                  >
                    <el-select placeholder v-model="scope.row.name">
                      <el-option
                        v-for="(item, index) in products"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="count" label="数量">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'list.' + scope.$index + '.count'"
                    :rules="[
                      {
                        required: true,
                        message: '请输入数量',
                        trigger: 'blur'
                      },
                      { type: 'number', message: '必须为数字值' }
                    ]"
                  >
                    <el-input
                      v-model.number="scope.row.count"
                      style="width: 100%"
                      @change="calRowAmount(scope.$index)"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="weight" label="单位重量">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'list.' + scope.$index + '.weight'"
                    :rules="[
                      { required: true, message: '请输入数量', trigger: 'blur' }
                    ]"
                  >
                    <el-input
                      v-model.number="scope.row.weight"
                      style="width: 100%"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="totalweight" label="合计重量">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'list.' + scope.$index + '.totalweight'"
                    :rules="[
                      { required: true, message: '请输入数量', trigger: 'blur' }
                    ]"
                  >
                    <el-input
                      v-model.number="scope.row.totalweight"
                      style="width: 100%"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="totalweight" label="上传条形码">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'list.' + scope.$index + '.barcode'"
                    :rules="[
                      { required: true, message: '请输入数量', trigger: 'blur' }
                    ]"
                  >
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
                </template>
              </el-table-column>
              <el-table-column prop="describe" label="备注">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'list.' + scope.$index + '.describe'"
                    :rules="[
                      {
                        required: true,
                        message: '请输入备注信息',
                        trigger: 'blur'
                      }
                    ]"
                  >
                    <el-input
                      v-model.number="scope.row.describe"
                      style="width: 100%"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="80px">
                <template slot-scope="scope">
                  <el-button
                    type="danger"
                    size="mini"
                    @click="deleteRow1(scope.$index)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </div>
        <div style="">
          <el-form
            :model="packageForm"
            class="package-form"
            label-width=""
            :rules="packageRules"
            ref="packageForm"
            :inline="true"
          >
            <el-form-item label="预计包裹数目:" prop="count" style="width:48%">
              <el-input
                v-model="packageForm.count"
                placeholder="请输入名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="单个包裹重量:" prop="weight" style="width:48%">
              <el-input
                v-model="packageForm.weight"
                placeholder="请输入货值"
              ></el-input>
            </el-form-item>
            <p
              style="font-size: 14px;font-family: Microsoft YaHei;font-weight: bold;color: #000;line-height: 30px;"
            >
              预计单个包裹尺寸：
            </p>
            <div
              style="display: flex;justify-content: space-between;align-items: center;"
            >
              <el-form-item
                label="长:"
                prop="pl"
                style="width:24%;display: flex;"
              >
                <el-input v-model="packageForm.pl" placeholder="请输入长">
                  <el-select
                    v-model="packageForm.plunit"
                    slot="append"
                    placeholder=""
                    size="mini"
                  >
                    <el-option label="cm" value="1"></el-option>
                    <el-option label="inch" value="2"></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
              <el-form-item
                label="宽:"
                prop="pw"
                style="width:24%;display: flex;"
              >
                <el-input v-model="packageForm.pw" placeholder="请输入宽">
                  <el-select
                    v-model="packageForm.pwunit"
                    slot="append"
                    placeholder=""
                  >
                    <el-option label="cm" value="1"></el-option>
                    <el-option label="inch" value="2"></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
              <el-form-item
                label="高:"
                prop="ph"
                style="width:24%;display: flex;"
              >
                <el-input v-model="packageForm.ph" placeholder="请输入高">
                  <el-select
                    v-model="packageForm.phunit"
                    slot="append"
                    placeholder=""
                  >
                    <el-option label="cm" value="1"></el-option>
                    <el-option label="inch" value="2"></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="line"></div>
        <div class="packagebox-title">
          <p>增值费用<span>(费率请在仓库设置中更改)</span></p>
        </div>
        <div>
          <el-form
            :model="packageForm"
            class="package-form"
            label-width="110px"
            :rules="packageRules"
            ref="packageForm"
            :inline="true"
          >
            <div>耗材：</div>
            <el-form-item label="快速塑料袋:" prop="haocai1">
              <el-radio-group v-model="packageForm.haocai1">
                <el-radio :label="1">$0.15/重量低于0.42LB</el-radio>
                <el-radio :label="2">$0.20/重量低于0.42LB</el-radio>
                <el-radio :label="3">$0.50/重量低于0.42LB</el-radio>
                <el-radio :label="4">$1/重量低于0.42LB</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="气泡袋:" prop="haocai2">
              <el-radio-group v-model="packageForm.haocai2">
                <el-radio :label="1">$0.15/重量低于0.42LB</el-radio>
                <el-radio :label="2">$0.20/重量低于0.42LB</el-radio>
                <el-radio :label="3">$0.50/重量低于0.42LB</el-radio>
                <el-radio :label="4">$1/重量低于0.42LB</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="纸箱:" prop="haocai3">
              <el-radio-group v-model="packageForm.haocai3">
                <el-radio :label="1">$0.15/重量低于0.42LB</el-radio>
                <el-radio :label="2">$0.20/重量低于0.42LB</el-radio>
                <el-radio :label="3">$0.50/重量低于0.42LB</el-radio>
                <el-radio :label="4">$1/重量低于0.42LB</el-radio>
              </el-radio-group>
            </el-form-item>
            <div>服务：</div>
            <el-form-item label="服务:" prop="serve">
              <el-radio-group v-model="packageForm.serve">
                <el-radio :label="1">$2/个普通产品检测</el-radio>
                <el-radio :label="2">$2/个电子产品检测</el-radio>
                <el-radio :label="3">$2/个产品测量</el-radio>
                <el-radio :label="4">$2/个产品条码标签</el-radio>
              </el-radio-group>
            </el-form-item>
            <div>附加费用</div>
            <el-form-item label="发货费:" prop="fujia">
              <el-radio-group v-model="packageForm.fujia">
                <el-radio :label="1">$2/包裹</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addpackage1">添加包裹</el-button>
      </span>
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
      storageFrom: {
        warsehouse: '',
        logistics: '',
        shipmentNo: '',
        packages: [
          {
            code: 'BHKFDSDSKFFHD',
            count: 300,
            size: '8KU001*100',
            serve: '商品贴标$0.2/个',
            deal: '$2/包裹',
            price: 100,
            barcode: ''
          }
        ]
      },
      packageForm: {
        count: null,
        weight: null,
        pl: null,
        plunit: 'cm',
        pw: null,
        pwunit: 'cm',
        ph: null,
        phunit: 'cm',
        list: [],
        serve: null,
        haocai1: null,
        haocai2: null,
        haocai3: null,
        fujia: null
      },
      storageRules: {
        warsehouse: [
          { required: true, message: '请选择仓库', trigger: 'blur' }
        ],
        logistics: [{ required: true, message: '请选择物流', trigger: 'blur' }]
      },
      packageRules: {},
      cangkus: [
        { label: '仓库1', value: '1' },
        { label: '仓库2', value: '4' }
      ],
      fileList: [],
      list: [
        {
          code: 'BHKFDSDSKFFHD',
          count: 300,
          size: '8KU001*100',
          serve: '商品贴标$0.2/个',
          deal: '$2/包裹',
          price: 100
        }
      ],
      dialogVisible: false,
      products: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ]
    }
  },
  methods: {
    ifempty(value) {
      return value || '--'
    },
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
    },
    addproduct() {
      this.dialogVisible = true
    },
    deleteRow(index) {
      this.storageFrom.packages.splice(index, 1)
    },
    handleClose(done) {
      done()
    },
    addpackage() {
      this.packageForm.list.push({
        name: '',
        count: 0,
        weight: 0,
        totalweight: 0,
        describe: ''
      })
    },
    deleteRow1(index) {
      this.packageForm.list.splice(index, 1)
    },
    addpackage1() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
p {
  margin: 0;
}
.forecaststorage-container {
  width: 100%;
  // height: 100%;
  background: #ffffff;
  min-height: 100%;
  .title {
    display: flex;
    align-items: center;
    background-color: #f8f8f8;
    padding-left: 30px;
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
  .storage-form {
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
    width: 100%;
    height: 0px;
    // background: #dbdbdb;
    // margin-left: 30px;
    // margin-right: 30px;
    margin-top: 10px;
    margin-bottom: 20px;
    border: 1px dashed #dbdbdb;
  }

  .packagebox {
    width: 100%;
    .packagebox-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      p {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
        line-height: 32px;
        position: relative;
        margin-left: 15px;
      }
      p::before {
        content: '';
        width: 4px;
        height: 14px;
        background: #298eff;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: -15px;
      }
    }
    .package-form {
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
  }
}
</style>
