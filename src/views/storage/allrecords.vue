<template>
  <div>
    <no-page
      :searchForm="filters"
      :options="options"
      @handleFilter="handleFilter"
      @handleCurrentChange="handleCurrentChange"
      @handleBitchDispatch="handleBitchDispatch"
    >
      <template v-slot:filter>
        <el-form-item label="批次号:" prop="batchId">
          <el-input
            class="filter-item input-normal"
            v-model="filters.batchId"
          ></el-input>
        </el-form-item>
        <el-form-item label="物流单号:" prop="lognumber">
          <el-input
            class="filter-item input-normal"
            v-model="filters.lognumber"
          ></el-input>
        </el-form-item>
        <el-form-item label="sku:" prop="sku">
          <el-input
            class="filter-item input-normal"
            v-model="filters.sku"
          ></el-input>
        </el-form-item>

        <el-form-item label="状态:" prop="state">
          <el-select v-model="filters.state" placeholder="">
            <el-option label="卖家预报" value="0"></el-option>
            <el-option label="仓库入库完成" value="1"></el-option>
            <el-option
              label="仓库入库等待卖家确认入库信息"
              value="2"
            ></el-option>
          </el-select>
        </el-form-item>
      </template>

      <template v-slot:table-menu-left>
        <el-button-group>
          <el-button size="mini" class="filter-item" type="primary"
            >全部
          </el-button>
          <el-button size="mini" class="filter-item" type="primary" plain
            >预约入库
          </el-button>
          <el-button size="mini" class="filter-item" type="primary" plain
            >已入库
          </el-button>
        </el-button-group>
      </template>

      <template v-slot:table>
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="序号" width="75">
          <template slot-scope="scope">
            <div>
              <img src="" alt="" />
              <span>{{ ifempty(scope.row.rid) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作日期" width="120">
          <template slot-scope="scope">
            <div>
              <span>{{ ifempty(scope.row.updateTime) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="对应订单号/批次号" width="150">
          <template slot-scope="scope">
            <p>{{ ifempty(scope.row.batckNumber) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="物品信息">
          <template slot-scope="scope">
            <div :key="index" v-for="(item, index) in scope.row.goods">
              <p>SKU：{{ ifempty(item.sku) }}</p>
              <p>数量：{{ item.count }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="物流信息" width="200px">
          <template slot-scope="scope">
            <p>配送物流：{{ ifempty(scope.row.logistic) }}</p>
            <p>单 号：{{ ifempty(scope.row.lognumber) }}</p>
            <p>配送状态：{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="150">
          <template slot-scope="scope">
            <p class="statu0" v-if="scope.row.state == 0">卖家预报</p>
            <p class="statu1" v-if="scope.row.state == 1">仓库入库完成</p>
            <p class="statu2" v-if="scope.row.state == 2">
              仓库入库等待卖家确认入库信息
            </p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <el-button
              title="详情"
              type="primary"
              size="mini"
              @click="handleReview(scope.row)"
              >查看详情
            </el-button>
            <el-button
              title="编辑"
              type="success"
              size="mini"
              @click="handleEdit(scope.row)"
              >编辑
            </el-button>
            <el-button
              title="删除"
              type="danger"
              size="mini"
              @click="handleDelete(scope.row)"
            >
              <!-- biz/firstpass/{id} -->
              删除
            </el-button>
          </template>
        </el-table-column>
      </template>
    </no-page>
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div>
        <el-form
          :inline="true"
          :model="reviewDetailForm"
          ref="reviewDetailForm"
        >
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
          <el-form-item style="width: 48%; margin-bottom: 0px" prop="sku">
            <el-input placeholder="没有数据" v-model="reviewDetailForm.sku">
              <template slot="prepend">SKU</template>
            </el-input>
          </el-form-item>
          <el-form-item style="width: 48%; margin-bottom: 0px" prop="count">
            <el-input placeholder="没有数据" v-model="reviewDetailForm.count">
              <template slot="prepend">数量</template>
            </el-input>
          </el-form-item>
          <p class="review-form-section">备注：</p>
          <el-form-item style="width: 100%; margin-bottom: 0px" prop="note">
            <el-input
              type="textarea"
              :rows="4"
              style="width: 100%"
              resize="none"
              placeholder="没有数据"
              v-model="reviewDetailForm.note"
            >
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          style="justify-content: flex-end"
          type="primary"
          @click="handleSubmit"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import noPage from '@/components/noPage/noPage.vue'
// import { mapActions, mapState, mapGetters } from 'vuex'
import Axios from '@/https/axios'

export default {
  components: { noPage },
  props: ['warehouseactive'],
  data() {
    return {
      editForm: { name: null, size_unit: '1', width: '' },
      reviewDetail: {},
      reviewInfo: { sku: '', detail: '', note: '' },
      reviewDetailForm: { sku: '', detail: '', note: '' },
      dialogVisible: false,
      options: [
        {
          isDefault: 1,
          value: 'comfirm',
          label: '彻底删除'
        }
      ]
    }
  },
  computed: {
    filters: {
      get() {
        return this.$store.state.noPage.filters
      },
      set(value) {
        console.log({ value })
        this.$store.commit('noPage/updateMessage', value)
      }
    }
  },
  beforeMount() {
    this.$store.commit(
      'noPage/setApi',
      `/seller/firstpass/listRecords?positoryId=${this.warehouseactive.id}`
    )
  },
  methods: {
    handleSubmit() {
      return Axios.fetchPost('/seller/firstpass/forecast', this.reviewDetail)
    },
    handleEdit(row) {
      this.reviewDetail = row
      this.title = '编辑产品'
      this.dialogVisible = true
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        //
        await Axios.fetchPost(`/biz/firstpass/${row.id}`)
        this.$message.success('删除成功')
        this.$store.dispatch('noPage/init')
      })
    },
    async handleReview(row) {
      this.title = '查看详情'
      try {
        this.reviewInfo = await Axios.fetchGet(`/biz/firstpass/${row.id}`)
      } finally {
        this.dialogVisible = true
        this.reviewDetail = row
      }
    },
    ifempty(value) {
      return value || '--'
    },
    handleClose() {
      console.log(1)
      this.$refs.reviewDetailForm.resetFields()
      this.dialogVisible = false
    },
    handleFilter(value) {
      this.$store.dispatch('noPage/init')
    },
    handleCancleRequest() {},
    handleBitchDispatch(object) {
      console.log(object)
    },
    handleCurrentChange(object) {
      console.log(object)
    }
  }
}
</script>

<style lang="less" scoped>
.el-dialog__body {
  padding: 20px 10px;
}
.el-col {
  margin-bottom: 25px;
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

/deep/.el-form-item {
  .el-form-item__content {
    .avatar-uploader {
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

.col-label {
  text-align: right;
  vertical-align: middle;
  font-size: 14px;
  color: #606266;
  padding-right: 10px;
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
  color: #000;
  margin: 10px 0;
}
</style>