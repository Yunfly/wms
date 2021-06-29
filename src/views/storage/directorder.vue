<template>
  <div class="directorder-container">
    <div class="title">
      <i class="fa fa-bookmark"></i>
      <p>直接下单</p>
    </div>
    <div class="">
      <el-form
        :model="directorderForm"
        class="directorder-form"
        label-width="110px"
        :rules="directorderRules"
        ref="directorderForm"
        :inline="true"
      >
        <el-form-item label="仓库:" prop="cangku" style="width: 40%">
          <CrudSelect
            :dic="cangkus"
            v-model="directorderForm.cangku"
            label=""
          ></CrudSelect>
        </el-form-item>
        <el-form-item label="文件上传:" prop="sku" style="width: 40%">
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
        <el-form-item label="发件人姓名:" prop="sendername" style="width: 40%">
          <el-input
            v-model="directorderForm.sendername"
            placeholder="如果不填默认为仓库公司名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="订单号:" prop="orderNo" style="width: 40%">
          <el-input
            v-model="directorderForm.orderNo"
            placeholder="如果空着则为仓库默认单号"
          ></el-input>
        </el-form-item>
        <el-form-item label="收件人姓名:" prop="recipient" style="width: 40%">
          <el-input
            v-model="directorderForm.recipient"
            placeholder="请输入收件人姓名"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="收件人电话:"
          prop="recipientcall"
          style="width: 40%"
        >
          <el-input
            v-model="directorderForm.recipientcall"
            placeholder="请输入收件人电话"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="收件人地址1:"
          prop="recipientaddress1"
          style="width: 40%"
        >
          <el-input
            v-model="directorderForm.recipientaddress1"
            placeholder="请输入收件人地址"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="收件人地址2:"
          prop="recipientaddress2"
          style="width: 40%"
        >
          <el-input
            v-model="directorderForm.recipientaddress2"
            placeholder="请输入收件人地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="区域:" prop="area" style="width: 60%">
          <el-select
            v-model="directorderForm.area"
            placeholder="请选择"
            style="width: 30%; margin-right: 2%"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="directorderForm.area"
            placeholder="请选择"
            style="width: 30%; margin-right: 2%"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="directorderForm.area"
            placeholder="请选择"
            style="width: 30%"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="title">
      <i class="fa fa-bookmark"></i>
      <p>物品信息</p>
    </div>
    <div style="margin-bottom: 20px">
      <el-form
        :model="directorderForm"
        class="directorder-form"
        label-width="110px"
        :rules="directorderRules"
        ref="directorderForm"
        :inline="true"
        style="width: 100%"
      >
        <div
          style="
            display: flex;
            justify-content: flex-end;
            margin-bottom: 20px;
            width: 80%;
          "
        >
          <el-button
            type="primary"
            size="small"
            @click="addproduct"
            icon="el-icon-plus"
            >添加</el-button
          >
        </div>
        <el-table
          :data="directorderForm.products"
          border
          class="product-table"
          style="width: 80%"
        >
          <el-table-column prop="name" label="物品名">
            <template slot-scope="scope">
              <el-form-item
                :prop="'products.' + scope.$index + '.name'"
                :rules="[
                  { required: true, message: '请选择物品信息', trigger: 'blur' }
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
                :prop="'products.' + scope.$index + '.count'"
                :rules="[
                  { required: true, message: '请输入数量', trigger: 'blur' },
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
                :prop="'products.' + scope.$index + '.weight'"
                :rules="[
                  { required: true, message: '请输入数量', trigger: 'blur' }
                ]"
              >
                <el-input
                  v-model.number="scope.row.weight"
                  style="width: 100%"
                  disabled
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="totalweight" label="合计重量">
            <template slot-scope="scope">
              <el-form-item
                :prop="'products.' + scope.$index + '.totalweight'"
                :rules="[
                  { required: true, message: '请输入数量', trigger: 'blur' }
                ]"
              >
                <el-input
                  v-model.number="scope.row.totalweight"
                  style="width: 100%"
                  disabled
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="describe" label="备注">
            <template slot-scope="scope">
              <el-form-item
                :prop="'products.' + scope.$index + '.describe'"
                :rules="[
                  { required: true, message: '请输入备注信息', trigger: 'blur' }
                ]"
              >
                <el-input
                  v-model.number="scope.row.describe"
                  style="width: 100%"
                  disabled
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="55px">
            <template slot-scope="scope">
              <i class="el-icon-delete" @click="deleteRow(scope.$index)"></i>
            </template>
          </el-table-column>
        </el-table>
        <p
          style="
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #000;
            line-height: 50px;
          "
        >
          预计包裹数量：
        </p>
        <el-form-item label="包裹数量:" prop="pc" style="width: 26%">
          <el-input v-model="directorderForm.prepc" placeholder="请输入数量">
          </el-input>
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
          预计单个包裹尺寸/重量：
        </p>
        <el-form-item label="长:" prop="prepl" style="width: 24%">
          <el-input v-model="directorderForm.prepl" placeholder="请输入长">
            <el-select
              v-model="directorderForm.plunit"
              slot="append"
              placeholder=""
              style="width: 35px"
            >
              <el-option label="cm" value="1"></el-option>
              <el-option label="inch" value="2"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="宽:" prop="prepw" style="width: 24%">
          <el-input v-model="directorderForm.prepw" placeholder="请输入宽">
            <el-select
              v-model="directorderForm.pwunit"
              slot="append"
              placeholder=""
              style="width: 35px"
            >
              <el-option label="cm" value="1"></el-option>
              <el-option label="inch" value="2"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="高:" prop="preph" style="width: 24%">
          <el-input v-model="directorderForm.preph" placeholder="请输入高">
            <el-select
              v-model="directorderForm.phunit"
              slot="append"
              placeholder=""
              style="width: 35px"
            >
              <el-option label="cm" value="1"></el-option>
              <el-option label="inch" value="2"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="重量:" prop="pweight" style="width: 26%">
          <el-select v-model="directorderForm.pwkey" placeholder="请选择">
            <el-option label="默认自动填充总重量" value="1"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="title">
      <i class="fa fa-bookmark"></i>
      <p>增值费用<span>(费率请在仓库设置中更改)</span></p>
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
        <div>耗材：</div>
        <el-form-item label="快速塑料袋:" prop="haocai1">
          <el-radio-group v-model="directorderForm.haocai1">
            <el-radio :label="1">$0.15/重量低于0.42LB</el-radio>
            <el-radio :label="2">$0.20/重量低于0.42LB</el-radio>
            <el-radio :label="3">$0.50/重量低于0.42LB</el-radio>
            <el-radio :label="4">$1/重量低于0.42LB</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="气泡袋:" prop="haocai2">
          <el-radio-group v-model="directorderForm.haocai2">
            <el-radio :label="1">$0.15/重量低于0.42LB</el-radio>
            <el-radio :label="2">$0.20/重量低于0.42LB</el-radio>
            <el-radio :label="3">$0.50/重量低于0.42LB</el-radio>
            <el-radio :label="4">$1/重量低于0.42LB</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="纸箱:" prop="haocai3">
          <el-radio-group v-model="directorderForm.haocai3">
            <el-radio :label="1">$0.15/重量低于0.42LB</el-radio>
            <el-radio :label="2">$0.20/重量低于0.42LB</el-radio>
            <el-radio :label="3">$0.50/重量低于0.42LB</el-radio>
            <el-radio :label="4">$1/重量低于0.42LB</el-radio>
          </el-radio-group>
        </el-form-item>
        <div>服务：</div>
        <el-form-item label="服务:" prop="fuwu">
          <el-radio-group v-model="directorderForm.fuwu">
            <el-radio :label="1">$2/个普通产品检测</el-radio>
            <el-radio :label="2">$2/个电子产品检测</el-radio>
            <el-radio :label="3">$2/个产品测量</el-radio>
            <el-radio :label="4">$2/个产品条码标签</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <div class="line"></div>
    <div class="tool">
      <el-button type="primary">确认下单</el-button>
      <el-button type="primary" plain>取 消</el-button>
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
        prepc: null,
        prepw: null,
        pwunit: 'cm',
        preph: null,
        phunit: 'cm',
        prepl: null,
        plunit: 'cm',
        prepweight: null,
        pwkey: '默认自动填充总重量',
        products: []
      },
      directorderRules: {
        cangku: [{ required: true, message: '请选择仓库', trigger: 'blur' }],
        sendername: [
          { required: true, message: '请选择仓库', trigger: 'blur' }
        ],
        orderNo: [{ required: true, message: '请选择仓库', trigger: 'blur' }],
        recipient: [{ required: true, message: '请选择仓库', trigger: 'blur' }],
        recipientcall: [
          { required: true, message: '请选择仓库', trigger: 'blur' }
        ],
        recipientaddress1: [
          { required: true, message: '请选择仓库', trigger: 'blur' }
        ],
        recipientaddress2: [
          { required: true, message: '请选择仓库', trigger: 'blur' }
        ],
        area: [{ required: true, message: '请选择仓库', trigger: 'blur' }]
      },
      cangkus: [
        { label: '仓库1', value: '1' },
        { label: '仓库2', value: '4' }
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
      ],
      fileList: [],
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
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    addproduct() {
      this.directorderForm.products.push({
        name: '',
        count: 0,
        weight: 0,
        totalweight: 0,
        describe: ''
      })
    },
    deleteRow(index) {
      this.directorderForm.products.splice(index, 1)
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
  // height: 100%;
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
    width: 100%;
    height: 1px;
    background: #dbdbdb;
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .tool {
    display: flex;
    align-items: center;
    margin-left: 30px;
    padding-bottom: 30px;
  }
}
</style>
