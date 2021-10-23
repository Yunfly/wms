/**

/api/warehouse/firstpass/forecast 入库
enum type{
  "包裹入库"： false 不传
  "SKU入库"： true
}

/api/biz/firstpass/{id}入库记录详情
goods 仓库填的货物入库

packs 卖家填写的预报信息

SKU入库，包裹packs中 goods*services 展示服务
  */

<template>
  <div class="forecaststorage-container">
    <el-form
      :model="storageFrom"
      size="small"
      :rules="storageRules"
      ref="storageFrom"
    >
      <div class="title">
        <i class="fa fa-bookmark"></i>
        <p>批次预报信息</p>
      </div>
      <div class="">
        <el-form-item
          label="入库批次号:"
          prop="warsehouse"
          style="width: 100%; margin-top: 10px"
        >
          <span v-if="id">{{ id }}</span>
          <el-select v-else placeholder size="small">
            <el-option
              v-for="(item, index) in products"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div style="padding-bottom: 20px">
        <p class="table-header">预报物品信息:</p>
        <el-table
          :data="storageFrom.packs"
          border
          :summary-method="getSummaries"
          show-summary
          sum-text="总计包裹:"
          class="product-table"
        >
          <el-table-column label="参考码" width="300px">
            <template slot-scope="scope">
              <div>
                <span>{{ ifempty(scope.row.barcode) }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="包裹数" prop="count" width="150px">
          </el-table-column>
          <el-table-column label="包裹信息" width="275px">
            <template slot-scope="scope">
              <div>
                <p>
                  单个包裹尺寸： <br />
                  长：{{ scope.row.length }}/{{ scope.row.size_unit }}
                  <br />
                  宽：{{ scope.row.width }}/{{ scope.row.size_unit }}
                  <br />
                  高：{{ scope.row.width }}/{{ scope.row.size_unit }}
                </p>
                <p>
                  增值服务：{{
                    ifempty(
                      scope.row.goods
                        .reduce((a, b) => {
                          return [...a, ...b.services.map((x) => x.title)]
                        }, [])
                        .join('')
                    )
                  }}
                </p>
                <p>
                  包裹处理费：{{
                    ifempty(
                      scope.row.goods.reduce((a, b) => {
                        return (
                          a +
                          b.services
                            .map((x) => x.unitprice)
                            .reduce((c, d) => c + d, 0)
                        )
                      }, 0)
                    )
                  }}
                </p>
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
        </el-table>
      </div>
      <div style="padding-bottom: 20px" class="product-collect">
        <p class="table-header">商品总数汇总:</p>
        <el-row
          type="flex"
          :key="key"
          align="center"
          v-for="(item, key) in Object.keys(packageList)"
        >
          <el-col class="header" :span="4">SKU:</el-col>
          <el-col :span="7" :offset="1">{{ item }}</el-col>
          <el-col class="header" :span="4">数量:</el-col>
          <el-col :span="7" :offset="1">{{ packageList[item] }}</el-col>
        </el-row>
      </div>

      <div style="padding-bottom: 20px" class="product-collect">
        <p class="table-header">备注:</p>
        <el-row type="flex" align="center">
          <el-col class="header" :span="4">备注:</el-col>
          <el-col :span="19" :offset="1">{{ storageFrom.desc }}</el-col>
        </el-row>
      </div>

      <div class="title">
        <i class="fa fa-bookmark"></i>
        <p>货物入库</p>
      </div>
      <br />
      <el-form-item prop="warsehouse" style="width: 100%">
        <el-radio-group size="small" v-model="radio1">
          <el-radio-button :label="1">按包裹数目入库</el-radio-button>
          <el-radio-button :label="2">按SKU入库</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <div v-if="radio1 === 1">
        <el-table
          :data="storageFrom.packs"
          border
          :summary-method="getSummaries"
          show-summary
          sum-text="总计包裹:"
          class="product-table"
        >
          <el-table-column label="参考码" width="300px">
            <template slot-scope="scope">
              <div>
                <span>{{ ifempty(scope.row.barcode) }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="包裹数" prop="count" width="150px">
          </el-table-column>
          <el-table-column label="包裹明细及请求服务信息" width="275px">
            <template slot-scope="scope">
              <div>
                <p :key="index" v-for="(item, index) in scope.row.goods">
                  单个包裹信息： {{ item.sku }}*{{ item.count }}
                </p>
                <p>
                  增值服务：{{
                    ifempty(
                      scope.row.goods
                        .reduce((a, b) => {
                          return [...a, ...b.services.map((x) => x.title)]
                        }, [])
                        .join('')
                    )
                  }}
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="实收包裹数">
            <template slot-scope="scope">
              <el-form-item
                :prop="'storageFrom.packs.' + scope.$index + '.realCount'"
              >
                <el-input
                  v-model.number="scope.row.realCount"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="radio1 === 2">
        <el-radio label="1" v-model="datetype">手动入库</el-radio>
        <el-radio label="2" v-model="datetype">扫描入库</el-radio>

        <el-button
          type="primary"
          style="float: right; margin: 0 20px 10px 0"
          @click="handleSkuAdd"
          size="small"
          v-if="datetype === '1'"
          icon=" icon iconfont icon-jia"
          >添加SKU</el-button
        >
        <br />
        <br />

        <el-table
          v-if="datetype === '1'"
          :data="storageFrom.skuList"
          border
          class="product-table"
        >
          <el-table-column label="SKU" width="300px">
            <template slot-scope="scope">
              <el-form-item
                style="margin: 0"
                :prop="'storageFrom.skuList.' + scope.$index + '.sku'"
              >
                <el-input v-model="scope.row.sku"> </el-input>
              </el-form-item>
              <!-- <div>
              <span>{{ ifempty(scope.row.code) }}</span>
            </div> -->
            </template>
          </el-table-column>
          <el-table-column label="数目" width="150px">
            <template slot-scope="scope">
              <el-form-item
                style="margin: 0"
                :prop="'storageFrom.skuList.' + scope.$index + '.number'"
              >
                <el-input v-model="scope.row.number"> </el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="实收数目" width="275px">
            <template slot-scope="scope">
              <el-form-item
                style="margin: 0"
                :prop="'storageFrom.skuList.' + scope.$index + '.count'"
              >
                <el-input v-model="scope.row.count"> </el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="warning"
                @click="handleDeleteSku(scope.$index)"
                size="small"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <el-input
          v-if="datetype === '2' && !showSkuRecordDetail"
          type="textarea"
          style="width: 60%"
          v-model="skuRecords"
          :rows="15"
        >
        </el-input>
        <div style="margin: 10px 0">
          <el-button
            type="primary"
            size="medium"
            v-if="datetype === '2'"
            @click="handleSkuRecords"
            >{{ showSkuRecordDetail ? '编辑' : '确认' }}</el-button
          >
        </div>

        <el-table
          v-if="showSkuRecordDetail === true"
          :data="storageFrom.skuList"
          border
          class="product-table"
        >
          <el-table-column label="SKU" width="300px">
            <template slot-scope="scope">
              <el-form-item
                style="margin: 0"
                :prop="'storageFrom.skuList.' + scope.$index + '.sku'"
              >
                <el-input v-model="scope.row.sku"> </el-input>
              </el-form-item>
              <!-- <div>
              <span>{{ ifempty(scope.row.code) }}</span>
            </div> -->
            </template>
          </el-table-column>
          <!-- <el-table-column label="数目" width="150px">
            <template slot-scope="scope">
              <el-form-item
                style="margin: 0"
                :prop="'storageFrom.skuList.' + scope.$index + '.number'"
              >
                <el-input v-model="scope.row.number"> </el-input>
              </el-form-item>
            </template>
          </el-table-column> -->
          <el-table-column label="实收数目" width="275px">
            <template slot-scope="scope">
              <el-form-item
                style="margin: 0"
                :prop="'storageFrom.skuList.' + scope.$index + '.count'"
              >
                <el-input v-model="scope.row.count"> </el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="warning"
                @click="handleDeleteSku(scope.$index)"
                size="small"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <br />
      </div>

      <!-- <el-button type="primary">确认</el-button> -->
      <br />
      <br />

      <div class="title">
        <i class="fa fa-bookmark"></i>
        <p>服务</p>
      </div>
      <br />
      <p class="table-header">服务:</p>
      <el-row type="flex">
        <el-col
          :span="8"
          class="table-header"
          :key="index"
          v-for="(item, index) in Object.keys(serviceList)"
        >
          <el-row type="flex">
            <el-col style="text-align: right">{{ item }}: &nbsp;&nbsp;</el-col>
            <el-col>
              <el-checkbox
                :label="serviceList[item].split('|')[1]"
                @change="handleServiceChange"
                >${{ serviceList[item].split('|')[0] }}/个</el-checkbox
              >
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <br /><br />

      <el-button type="primary" @click="handleSubmit" size="small"
        >入库</el-button
      >
      <el-button size="small">取消</el-button>

      <br /><br />
    </el-form>
  </div>
</template>

<script>
import Axios from '@/https/axios'
// import UploadExcelComponent from '@/components/UploadExcel/index.vue'

export default {
  created() {
    this.getItem()
  },
  // components: { UploadExcelComponent },
  data() {
    return {
      showSkuRecordDetail: false,
      skuRecords: '',
      datetype: '1',
      radio1: 1,
      packageList: {},
      storageFrom: {
        warsehouse: '',
        logistics: '',
        shipmentNo: '',
        skuList: [],
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
      storageRules: {
        warsehouse: [
          { required: true, message: '请选择仓库', trigger: 'blur' }
        ],
        logistics: [{ required: true, message: '请选择物流', trigger: 'blur' }]
      },
      packageRules: {},
      serviceList: {},
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
      products: [],
      service: new Set()
    }
  },
  computed: {
    id() {
      return this.$router.currentRoute.query.id
    }
  },
  methods: {
    handleSkuRecords() {
      if (this.showSkuRecordDetail) {
        this.showSkuRecordDetail = !this.showSkuRecordDetail
        return
      }
      if (!this.skuRecords) {
        return this.$message.error('无扫描记录')
      }
      try {
        const skuList = this.skuRecords.split('\n')
        this.showSkuRecordDetail = true
        const obj = {}
        skuList.forEach((x) => {
          if (obj[x]) {
            obj[x] += 1
          } else {
            obj[x] = 1
          }
        })
        this.storageFrom.skuList = Object.keys(obj).map((x) => ({
          sku: x,
          number: obj[x],
          count: obj[x]
        }))
      } catch (err) {
        this.$message.error('解析扫描入库失败')
      }
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计包裹:'
          return
        }
        const values = data.map((item) => Number(item[column.property]))
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 个'
        } else {
          sums[index] = ''
        }
      })

      return sums
    },
    handleServiceChange(checked, event) {
      if (checked) {
        this.service.add(event.target.value)
      } else {
        this.service.delete(event.target.value)
      }
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: '文件大于1M!',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.storageFrom.skuList = results
      // this.tableHeader = header
    },
    async getItem() {
      if (this.id) {
        const item = await Axios.fetchGet(`/biz/firstpass/${this.id}`)
        console.log(this.packageList)
        this.storageFrom = item.data
        this.storageFrom.skuList = []
        this.storageFrom.packs.forEach((x) => {
          x.goods.forEach((item) => {
            this.packageList[item.sku] = this.packageList[item.sku] || 0
            this.packageList[item.sku] += x.count * item.count
            if (item.services && item.services.length) {
              item.services.forEach((i) => {
                this.serviceList[i.title] = i.unitprice + '|' + i.id
              })
            }
          })
        })
      }
    },
    ifempty(value) {
      return value || '--'
    },
    handleSkuAdd() {
      this.storageFrom.skuList.push([])
    },
    handleDeleteSku(index) {
      this.storageFrom.skuList.splice(index, 1)
    },
    handleSubmit() {
      this.$confirm(
        '本批次，卖家有服务请求，如已操作请点击确认，否则请点击返回',
        '提示',
        {
          confirmButtonText: '入库',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        let goods = []
        if (this.datetype === '1') {
          goods = this.storageFrom.packs.map((x) => ({
            count: x.realCount,
            id: x.id,
            services: [...this.service],
            sku: x.sku
          }))
        } else {
          goods = this.storageFrom.skuList.map((x) => ({
            count: x.count,
            id: x.id,
            services: [...this.service],
            sku: x.sku
          }))
        }
        Axios.fetchPost('/warehouse/firstpass/forecast', {
          goodType: true,
          goods,
          id: this.id,
          packs: this.storageFrom.packs.map((x) => ({
            count: x.count,
            id: x.id,
            services: [...this.service]
          })),
          type: true
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
p {
  margin: 0;
}
.table-header {
  font-size: 14px;
  color: #606266;
  padding: 5px 0;
}
.product-collect {
  color: #606266;
  font-size: 14px;
  .el-row {
    border: 1px solid #d9d9d9;
    height: 45px;
    line-height: 45px;
  }
  .header {
    background: #f1f1f1;
    text-align: center;
  }
}
.forecaststorage-container {
  padding: 0 30px;
  width: 100%;
  // height: 100%;
  background: #ffffff;
  min-height: 100%;
  .title {
    &::before {
      content: '';
      width: 30px;
      height: 50px;
      background: #f8f8f8;
      margin-left: -30px;
    }
    display: flex;
    align-items: center;
    background-color: #f8f8f8;
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
    margin-top: 20px;
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
