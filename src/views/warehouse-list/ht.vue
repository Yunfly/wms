<template>
  <div v-loading="loading">
    <div class="forecaststorage-container" v-if="priceCardDate">
      <div class="title">
        <i class="fa fa-bookmark"></i>
        <p>服务条款</p>
      </div>
      <el-form size="small" ref="form" :model="form" :inline="true">
        <el-row type="flex" style="margin: 10px 0" justify="space-between">
          <el-col :span="12"> <p>仓储费：</p></el-col>
          <!-- <el-col :span="12" style="text-align: right">
          <el-button
            icon="icon iconfont icon-jia"
            size="small"
            @click="dialogVisible = true"
            type="primary"
            >修订条款</el-button
          >
        </el-col> -->
        </el-row>
        <el-row type="flex" style="margin-bottom: 10px" justify="space-between">
          <el-col :span="8">
            <el-form-item label="一口价:">
              <el-input type="number" min="0" v-model="form.pricing">
                <template slot="append"> USD/月</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="体积费:" prop="unitprice">
              <el-input
                type="number"
                min="0"
                style="width: 250px"
                v-model="form.unitprice"
              >
                <template slot="append"> USD/英立方/月</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开始时间:" prop="startDate">
              <el-date-picker
                v-model="form.startDate"
                type="date"
                default-time="12:00:00"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                size="small"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-dialog
        v-if="dialogVisible"
        title="修订条款"
        :modal="false"
        :visible.sync="dialogVisible"
        width="1000px"
        :before-close="handleClose"
      >
        <el-form
          :model="editForm"
          ref="editForm"
          size="small"
          :inline="true"
          class="demo-dynamic"
        >
          <el-row type="flex">
            <el-col>
              <el-form-item prop="name" label="条款名称:">
                <el-input v-model="editForm.name" disabled type="text">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4"> </el-col>
          </el-row>
          <br />
          <el-row type="flex">
            <el-col :span="18">
              <el-table :data="editForm.details" max-height="700" border>
                <el-table-column
                  label="序号"
                  type="index"
                  size="small"
                  width="60px"
                  align="center"
                ></el-table-column>

                <el-table-column label="收费项目" align="center">
                  <template slot-scope="scope">
                    <div>
                      <el-form-item
                        :prop="'details.' + scope.$index + '.title'"
                      >
                        <el-input v-model="scope.row.title" type="text">
                        </el-input>
                      </el-form-item>
                    </div>
                  </template>
                </el-table-column>

                <el-table-column label="价格" align="center">
                  <template slot-scope="scope">
                    <div>
                      <el-form-item
                        :prop="'details.' + scope.$index + '.unitprice'"
                      >
                        <el-input
                          min="0"
                          v-model="scope.row.unitprice"
                          type="number"
                        >
                          <template slot="prepend">$</template>
                        </el-input>
                      </el-form-item>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="说明" align="center">
                  <template slot-scope="scope">
                    <div>
                      <el-form-item :prop="'details.' + scope.$index + '.desc'">
                        <el-input v-model="scope.row.desc" type="textarea">
                        </el-input>
                      </el-form-item>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
            <el-col :span="6">
              <div class="mixtitle">合并说明</div>
              <div class="mixcontent">
                <p :key="index" v-for="(item, index) in editForm.details">
                  {{ index + 1 + '.' }} {{ item.desc }}
                </p>
              </div>
            </el-col>
          </el-row>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" @click="handleConfirm"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <price-card
        v-for="item in priceCardDate"
        :key="item.name"
        :title="item.name"
        :tableData="item.details"
        :models="item.models"
        @delete="handleItemDelete"
        @edit="handleItemEdit"
        :editalbe="true"
        @change="handleModelsChange"
      ></price-card>
      <el-row type="flex">
        <el-col :offset="8">
          <el-button type="primary" size="small" @click="handleClickBtn">{{
            hasEdited ? '修订条款' : '签约'
          }}</el-button>
        </el-col>
        <el-col>
          <el-button size="small" type="danger" @click="$emit('close')"
            >拒绝</el-button
          >
        </el-col>
      </el-row>

      <br /><br /><br /><br />
    </div>
    <div v-else style="min-height: 500px">
      <el-empty description="暂无合同条款"></el-empty>
    </div>
  </div>
</template>

<script>
import Axios from '@/https/axios'
import priceCard from '../../components/price-card.vue'
export default {
  components: { priceCard },
  props: ['htId'],
  created() {
    this.getItem(this.htId)
  },
  computed: {
    id() {
      return this.$router.currentRoute.query.id
    }
  },
  data() {
    return {
      data: {},
      loading: true,
      contractId: null,
      dialogVisible: false,
      warsehouse: '',
      datetype: '1',
      hasEdited: false,
      form: {
        pricing: '',
        unitprice: null,
        startDate: null
      },
      priceCardDate: undefined,
      editForm: {
        details: [{}],
        title: ''
      }
    }
  },
  methods: {
    addItem() {
      this.editForm.details.push({ name: '' })
    },
    async getItem() {
      try {
        const res = await Axios.fetchGet('/seller/getContract', {
          id: this.htId
        })
        if (!res.data) return
        this.form = res.data.basic
        if (res.data.id) this.contractId = res.data.id
        this.data = res.data
        this.priceCardDate = this.data.others.map((x) => {
          return {
            name: x.name,
            models: x.models,
            id: x.id,
            details: x.details
          }
        })
      } finally {
        this.loading = false
      }
    },
    ifempty(value) {
      return value || '--'
    },
    handleClose() {
      this.dialogVisible = false
    },
    async handleClickBtn() {
      if (this.hasEdited) {
        await Axios.fetchPost('/seller/buildRelation', this.data)

        this.$message.success('修订成功')
        this.$store.dispatch('noPage/init')
        this.$emit('close')
      } else {
        await Axios.fetchPost('/seller/addRelation', {
          id: this.htId
        })
        this.$message.success('合同签约成功')
        this.$store.dispatch('noPage/init')
        this.$emit('close')
      }
    },
    async handleConfirm() {
      console.log(this.data)
      this.handleClose()
    },
    handleItemEdit(title, row, index) {
      this.dialogVisible = true
      console.log(this.priceCardDate)
      console.log(title, row, index)
      this.hasEdited = true
      this.editForm = this.priceCardDate.find((x) => x.name === title)
    },
    handleItemDelete(title, row, index) {
      const item = this.priceCardDate.find((x) => x.name === title)
      item.details.splice(index, 1)

      if (!item.details.length) {
        const index = this.priceCardDate.findIndex((x) => x.name === title)
        this.priceCardDate.splice(index, 1)
      }
    },
    handleModelsChange(title, value) {
      const item = this.priceCardDate.find((x) => x.name === title)
      item.models = value
    },
    handleDelete(index) {
      this.editForm.details.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
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
}
p {
  margin: 0;
}
.table-title {
  margin-bottom: 15px;
  p {
    font-size: 14px;
    font-weight: 500;
  }
  span {
    font-size: 12px;
    color: #909399;
  }
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
.mixtitle {
  font-size: 14px;
  width: 100%;
  height: 49px;
  line-height: 49px;
  text-align: center;
  box-sizing: border-box;
  text-overflow: ellipsis;
  background: #f8f8f8;
  border: 1px solid #ebeef5;
  border-left: none;
  vertical-align: middle;
  color: #909399;
  font-weight: bold;
}
.mixcontent {
  font-size: 14px;
  color: #606266;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  box-sizing: border-box;
  border-right: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  height: calc(100% - 49px);
  padding: 12px;
}

.forecaststorage-container {
  overflow: hidden;
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
}
</style>
