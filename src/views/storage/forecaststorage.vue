// TODO: 添加包裹时对每个商品增加服务， /api/seller/getContractByModel 查看仓库某模块增值服务条款 services对应每一条服务id
// 外层和包裹里面均有备注

<template>
  <div class="forecaststorage-container" v-loading="loading">
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
        <!-- 所有仓库列表 -->
        <el-form-item label="接受仓库:" prop="warsehouse" style="width: 40%">
          <CrudSelect
            :dic="listPository"
            @input="handleWarsehouseChange"
            v-model="storageFrom.warsehouse"
          ></CrudSelect>
        </el-form-item>
        <el-form-item label="物流信息:" prop="logistic" style="width: 40%">
          <CrudSelect
            :dic="cangkus"
            v-model="storageFrom.logistic"
            label="运送物流或手动填写"
          ></CrudSelect>
        </el-form-item>
        <el-form-item label="物流单号:" prop="lognumber" style="width: 40%">
          <el-input
            v-model="storageFrom.lognumber"
            placeholder="请填写物流单号"
          ></el-input>
        </el-form-item>

        <el-form-item label="备注:" prop="desc" style="width: 40%">
          <el-input
            type="textarea"
            v-model="storageFrom.desc"
            placeholder="请填写物流单号"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="title">
      <i class="fa fa-bookmark"></i>
      <p>批次信息汇总</p>
    </div>
    <div style="padding-bottom: 20px">
      <el-form
        :model="storageFrom"
        class="storage-form"
        label-width="110px"
        ref="storageFrom"
        :inline="true"
        style="width: 80%"
      >
        <div
          style="display: flex; justify-content: flex-end; margin-bottom: 20px"
        >
          <el-button
            type="primary"
            size="small"
            @click="addproduct"
            icon="el-icon-plus"
            >添加包裹</el-button
          >
        </div>
        <el-table
          :data="storageFrom.packs"
          border
          show-summary
          class="product-table"
        >
          <el-table-column label="序号" width="300px">
            <template slot-scope="scope">
              <div>
                <span>{{ ifempty(scope.$index + 1) }}</span>
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
          <el-table-column label="包裹信息" width="275px">
            <template slot-scope="scope">
              <div>
                <p>
                  单个包裹尺寸：
                  <br />
                  长：{{ scope.row.length }}/{{ scope.row.size_unit }}
                  <br />
                  宽：{{ scope.row.width }}/{{ scope.row.size_unit }}
                  <br />
                  高：{{ scope.row.width }}/{{ scope.row.size_unit }}
                </p>
                <p>增值服务：{{ ifempty(scope.row.serve) }}</p>
                <!-- <p>包裹处理费：{{ ifempty(scope.row.deal) }}</p> -->
              </div>
            </template>
          </el-table-column>
          <el-table-column label="费用" width="75px">
            <template slot-scope="scope">
              <div>
                <span>{{ ifempty(scope.row.price) }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="scope">
              <div>
                <span>{{ ifempty(scope.row.desc) }}</span>
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
      title="单个包裹信息"
      :visible.sync="dialogVisible"
      width="1200px"
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
        <div style="margin-bottom: 20px">
          <el-form
            :model="packageForm"
            class="package-form"
            label-width="110px"
            :rules="packageRules"
            ref="packageForm"
            :inline="true"
          >
            <el-table :data="packageForm.goods" border class="product-table">
              <el-table-column prop="name" label="物品名" width="150px">
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
                    <el-select
                      @change="(value) => productSelect(value, scope.$index)"
                      placeholder
                      v-model="scope.row.name"
                    >
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
              <el-table-column prop="count" label="数量" width="100px">
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
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="unit-weight"
                label="单位重量"
                width="100px"
              >
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'list.' + scope.$index + '.unit-weight'"
                    :rules="[
                      { required: true, message: '请输入数量', trigger: 'blur' }
                    ]"
                  >
                    {{ scope.row['weight'] }} /
                    {{ scope.row['weight_unit'] }}
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="totalweight"
                label="合计重量"
                width="100px"
              >
                <template slot-scope="scope">
                  {{ scope.row['weight'] * scope.row['count'] || '' }} /
                  {{ scope.row['weight_unit'] }}
                </template>
              </el-table-column>
              <el-table-column
                prop="totalweight"
                label="上传条形码"
                width="100px"
              >
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
              <el-table-column prop="services" label="增值服务" width="350px">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'list.' + scope.$index + '.services'"
                    :rules="[
                      {
                        required: true,
                        message: '请选择增值服务',
                        trigger: 'blur'
                      }
                    ]"
                  >
                    <el-cascader
                      :options="servicesModelCascader"
                      :props="{ multiple: true }"
                      v-model="scope.row.services"
                      clearable
                    ></el-cascader>
                    <!-- <el-select
                      @change="(value) => productSelect(value, scope.$index)"
                      placeholder
                      v-model="scope.row.name"
                    >
                      <el-option
                        v-for="(item, index) in this.servicesModel.others"
                        :key="index"
                        :label="item.name"
                        :value="item.value"
                      ></el-option>
                    </el-select> -->
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="desc" label="备注">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'list.' + scope.$index + '.desc'"
                    :rules="[
                      {
                        required: true,
                        message: '请输入备注信息',
                        trigger: 'blur'
                      }
                    ]"
                  >
                    <el-input
                      type="textarea"
                      v-model="scope.row.desc"
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
            <el-form-item label="预计包裹数目:" prop="count" style="width: 48%">
              <el-input
                v-model.number="packageForm.count"
                placeholder="请输入名称"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="单个包裹重量:"
              prop="weight"
              style="width: 48%"
            >
              <el-input
                v-model="packageForm.weight"
                placeholder="请输入货值"
              ></el-input>
            </el-form-item>
            <p
              style="
                font-size: 14px;
                font-weight: 400;
                color: #333333;
                margin-bottom: 10px;
                color: #000;
                line-height: 30px;
              "
            >
              预计单个包裹尺寸：
            </p>
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <el-form-item label="长:" prop="length">
                <el-input v-model="packageForm.length" placeholder="请输入长">
                  <el-select
                    v-model="packageForm.size_unit"
                    slot="append"
                    placeholder=""
                    size="mini"
                  >
                    <el-option label="cm" value="cm"></el-option>
                    <el-option label="inch" value="inch"></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
              <el-form-item label="宽:" prop="width">
                <el-input v-model="packageForm.width" placeholder="请输入宽">
                  <el-select
                    v-model="packageForm.size_unit"
                    slot="append"
                    placeholder=""
                  >
                    <el-option label="cm" value="cm"></el-option>
                    <el-option label="inch" value="inch"></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
              <el-form-item label="高:" prop="height">
                <el-input v-model="packageForm.height" placeholder="请输入高">
                  <el-select
                    v-model="packageForm.size_unit"
                    slot="append"
                    placeholder=""
                  >
                    <el-option label="cm" value="cm"></el-option>
                    <el-option label="inch" value="inch"></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
              <div>
                <el-form-item label="备注:" prop="desc" style="width: 100%">
                  <el-input
                    type="textarea"
                    v-model="packageForm.desc"
                    placeholder=""
                  ></el-input>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <!-- <div class="line"></div> -->
        <!-- <div class="packagebox-title">
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
            <div>服务：</div>
            <el-form-item label="服务:" prop="serve"> -->
        <!-- GET /api/seller/getContractByModel 查看仓库某模块增值服务条款 -->
        <!-- <el-radio-group v-model="packageForm.serve">
                <el-radio :label="1">$2/个普通产品检测</el-radio>
                <el-radio :label="2">$2/个电子产品检测</el-radio>
                <el-radio :label="3">$2/个产品测量</el-radio>
                <el-radio :label="4">$2/个产品条码标签</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addpackage1"
          >添加包裹</el-button
        >
      </span>
    </el-dialog>
    <br />
    <div style="padding-left: 35px">
      <el-button size="small" type="primary" @click="handleForecast"
        >预报</el-button
      >
    </div>

    <!-- TODO: 整体增加提交接口:  /api/seller/firstpass/forecast 预报 -->
  </div>
</template>

<script>
import CrudSelect from '../../components/avue/crud-select.vue'
import Axios from '@/https/axios'
const initPacks = {
  count: null,
  weight: null,
  length: null,
  size_unit: 'cm',
  width: null,
  height: null,
  goods: [{ name: '' }]
}
const initStroage = {
  warsehouse: '',
  logistic: '',
  lognumber: '',
  packs: []
}
export default {
  components: {
    CrudSelect
  },
  created() {
    this.init()
  },
  props: ['warehouseactive'],
  data() {
    return {
      loading: false,
      storageFrom: {
        warsehouse: '',
        logistic: '',
        lognumber: '',
        packs: []
      },
      packageForm: JSON.parse(JSON.stringify(initPacks)),
      storageRules: {
        warsehouse: [
          { required: true, message: '请选择仓库', trigger: 'blur' }
        ],
        logistic: [{ required: true, message: '请选择物流', trigger: 'blur' }]
      },
      packageRules: {},
      cangkus: [
        { label: '联邦快递', value: 'FedEx' },
        { label: '敦豪', value: 'DHL' },
        { label: '天地快运', value: 'TNT' },
        { label: '联合包裹', value: 'UPS' },
        { label: '中国邮政', value: 'EMS' },
        { label: '民航快递', value: 'CAE' },
        { label: '中铁快运', value: 'CRE' },
        { label: '顺丰速运', value: 'SF' }
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
      listPository: [],
      dialogVisible: false,
      products: [],
      servicesModel: {}
    }
  },
  computed: {
    servicesModelCascader() {
      try {
        return this.servicesModel.others.map((x) => {
          return {
            value: x.id,
            label: x.name,
            children: x.details.map((c) => ({
              value: c.id,
              label: `$${c.unitprice}/${c.title}`
            }))
          }
        })
      } catch (err) {
        return []
      }
    }
  },
  methods: {
    async init() {
      this.loading = true
      const res = await Axios.fetchGet('/seller/listPository')
      this.listPository = res.data.records.map((x) => ({
        label: x.name,
        value: x.id
      }))

      const productsRes = await Axios.fetchGet('/iteminfo/search?sku=&name=')
      this.products = productsRes.data.content.map((x) => ({
        label: x.name,
        value: x.openid,
        sku: x.sku,
        weight: x.weight,
        weight_unit: x.weight_unit
      }))
      this.storageFrom.warsehouse = this.warehouseactive.id
      this.loading = false
    },
    productSelect(uid, index) {
      // console.log(value)
      const weight = this.products.find((x) => x.value === uid)
      console.log({ weight })
      this.packageForm.goods[index].weight = weight.weight
      this.packageForm.goods[index].weight_unit = weight.weight_unit
      this.packageForm.goods[index].sku = weight.sku
      this.packageForm.goods[index].id = weight.value
      this.packageForm.goods[index].barcode = weight.value

      // 1ad11e3e-9137-4f88-ad17-21db9c751b3d
    },
    ifempty(value) {
      return value || '--'
    },
    async handleWarsehouseChange(val) {
      console.log(val)
      const res = await Axios.fetchGet(`/seller/getContract?id=${val}`)
      this.servicesModel = res.data
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    async handleForecast() {
      const { packs, ...res } = this.storageFrom
      console.log(this.storageFrom)
      await Axios.fetchPut('/seller/firstpass/forecast', {
        id: this.warehouseactive.id,
        ...res,
        packs: packs.map(({ goods, ...x }) => {
          return {
            ...x,
            goods: goods.map((c) => {
              return {
                ...c,
                services:
                  c && c.services ? c.services.map((a) => a.slice(-1)[0]) : []
              }
            })
          }
        })
      })
      this.$refs.storageFrom.resetFields()
      this.packageForm = JSON.parse(JSON.stringify(initPacks))
      this.storageFrom = JSON.parse(JSON.stringify(initStroage))
      this.storageFrom.warsehouse = this.warehouseactive.id

      this.$message.success('预报入库成功！')
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
      if (!this.storageFrom.warsehouse) {
        return this.$message.warning('请先选择接受仓库')
      }
      this.dialogVisible = true
    },
    deleteRow(index) {
      this.storageFrom.packs.splice(index, 1)
    },
    handleClose(done) {
      done()
    },
    addpackage() {
      this.packageForm.goods.push({
        name: '',
        count: 0,
        weight: 0,
        totalweight: 0,
        describe: ''
      })
    },
    deleteRow1(index) {
      this.packageForm.goods.splice(index, 1)
    },
    addpackage1() {
      this.storageFrom.packs.push(this.packageForm)
      console.log(this.packageForm)
      this.packageForm = JSON.parse(JSON.stringify(initPacks))
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
          /deep/.el-input-group__append {
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
/deep/.el-input-group__append {
  width: 35px;
}
</style>
