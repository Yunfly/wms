<template>
  <div class="forecaststorage-container">
    <el-form :model="storageFrom" :rules="storageRules" ref="storageFrom">
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
          <el-select placeholder size="small">
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
          :data="storageFrom.packages"
          border
          show-summary
          sum-text="总计包裹:"
          class="product-table"
        >
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
          <el-table-column label="包裹信息" width="275px">
            <template slot-scope="scope">
              <div>
                <p>单个包裹尺寸：{{ ifempty(scope.row.size) }}</p>
                <p>增值服务：{{ ifempty(scope.row.serve) }}</p>
                <p>包裹处理费：{{ ifempty(scope.row.deal) }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="scope">
              <div>
                <span>{{ ifempty(scope.row.note) }}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="padding-bottom: 20px" class="product-collect">
        <p class="table-header">商品总数汇总:</p>
        <el-row type="flex" align="center">
          <el-col class="header" :span="4">SKU:</el-col>
          <el-col :span="7" :offset="1">SKU001</el-col>
          <el-col class="header" :span="4">数量:</el-col>
          <el-col :span="7" :offset="1">23</el-col>
        </el-row>
      </div>

      <div style="padding-bottom: 20px" class="product-collect">
        <p class="table-header">备注:</p>
        <el-row type="flex" align="center">
          <el-col class="header" :span="4">备注:</el-col>
          <el-col :span="19" :offset="1">SKU001</el-col>
        </el-row>
      </div>

      <div class="title">
        <i class="fa fa-bookmark"></i>
        <p>货物入库</p>
      </div>
      <br />
      <el-form-item prop="warsehouse" style="width: 100%">
        <el-radio-group size="small">
          <el-radio-button label="按包裹数目入库"></el-radio-button>
          <el-radio-button label="按SKU入库"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-radio label="1" v-model="datetype">手动入库</el-radio>
      <el-radio label="2" v-model="datetype">扫描入库</el-radio>
      <br />
      <br />

      <el-table
        v-if="datetype === '1'"
        :data="storageFrom.packages"
        border
        class="product-table"
      >
        <el-table-column label="SKU" width="300px">
          <template slot-scope="scope">
            <div>
              <span>{{ ifempty(scope.row.code) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="数目" width="150px">
          <template slot-scope="scope">
            <div>
              <span>{{ ifempty(scope.row.count) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="实收数目" width="275px"> 200 </el-table-column>
        <el-table-column label="操作">
          <el-button type="warning" @click="handleSubmit">删除</el-button>
        </el-table-column>
      </el-table>
      <el-form-item
        v-if="datetype === '2'"
        prop="warsehouse"
        style="width: 100%"
      >
        <el-input type="textarea" :rows="4" placeholder="请输入内容">
        </el-input>
      </el-form-item>
      <br />

      <el-button type="primary">确认</el-button>
      <br />
      <br />

      <div class="title">
        <i class="fa fa-bookmark"></i>
        <p>服务</p>
      </div>
      <br />
      <p class="table-header">服务:</p>

      <el-row class="table-header" type="flex">
        <el-col :span="4" style="text-align: right"
          >电子产品检测: &nbsp;&nbsp;</el-col
        >
        <el-col :span="4">
          <el-radio label="1">$2/个</el-radio>
        </el-col>

        <el-col :span="4" style="text-align: right"
          >产品检测: &nbsp;&nbsp;</el-col
        >
        <el-col :span="4">
          <el-radio label="1">$2/个</el-radio>
        </el-col>
      </el-row>
      <br /><br />

      <el-button type="primary" @click="handleSubmit">入库</el-button>
      <el-button>取消</el-button>

      <br /><br />
    </el-form>
  </div>
</template>

<script>
import Axios from '@/https/axios'

export default {
  created() {
    this.getItem()
  },
  data() {
    return {
      datetype: '1',
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
      ]
    }
  },
  methods: {
    async getItem() {
      const item = await Axios.fetchGet('/')
      this.storageFrom = item
    },
    ifempty(value) {
      return value || '--'
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
        this.$refs.storageFrom.validate(async (valid) => {
          if (valid) {
            //  TODO: 更新数据
          } else {
            console.log('error submit!!')
            return false
          }
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
