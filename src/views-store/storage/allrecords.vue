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
      </template>

      <template v-slot:table-menu-left>
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
      </template>

      <template v-slot:table>
        <!-- <el-table-column label="序号" type="index" width="50"></el-table-column> -->
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="操作日期" width="130">
          <template slot-scope="scope">
            <div>
              <img src="" alt="" />
              <span>{{ ifempty(scope.row.updateTime) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="对应订单号/批次号">
          <template slot-scope="scope">
            <p>{{ ifempty(scope.row.batckNumber) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="150">
          <template slot-scope="scope">
            <p class="statu0" v-if="scope.row.state == 0">未入库</p>
            <p class="statu1" v-if="scope.row.state == 1">已入库</p>
            <p class="statu2" v-if="scope.row.state == 2">已完成</p>
          </template>
        </el-table-column>
        <el-table-column label="物品信息">
          <template slot-scope="scope">
            <div :key="index" v-for="(item, index) in scope.row.goods">
              <p>SKU：{{ ifempty(item.sku) }}</p>
              <p>数量：{{ ifempty(item.count) }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="物流信息">
          <template slot-scope="scope">
            <p>配送物流：{{ ifempty(scope.row.logistic) }}</p>
            <p>单 号：{{ ifempty(scope.row.lognumber) }}</p>
            <!-- <p>配送状态：{{ ifempty(scope.row.name) }}</p> -->
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
              @click="toForecast(scope.row.batckNumber)"
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
      </template>
    </no-page>
  </div>
</template>

<script>
import noPage from '@/components/noPage/noPage.vue'
import axios from '@/https/axios'
// import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  components: { noPage },
  data() {
    return {
      searchForm: {
        sku: null,
        warehouse: null,
        name: null,
        type: null,
        contact: null,
        starttime: null,
        endtime: null
      },
      storageType: '1',
      editForm: { name: null, size_unit: '1', width: '' },
      importdialogVisible: false,
      options: [
        {
          isDefault: 1,
          value: 'comfirm',
          label: '确认用户修改'
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
      '/warehouse/firstpass/listRecords?positoryId=57ab8fd0f68c0bbbcb401d10b6838088'
    )
  },
  methods: {
    handleDelete(row) {
      this.$confirm('此操作将永久删除记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async (id) => {
        await axios.fetchPost(`/biz/firstpass/${row.id}`)
        this.$store.dispatch('noPage/init')
      })
    },
    toForecast(id) {
      this.$router.push({ path: '/forecaststorage', query: { id } })
    },
    ifempty(value) {
      return value || '--'
    },
    handleClose() {
      console.log(1)
      this.$refs.editForm.resetFields()
      this.importdialogVisible = false
    },
    handleFilter(value) {
      this.$store.dispatch('noPage/init')
    },
    handleEdit() {
      this.importdialogVisible = true
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

.col-label {
  text-align: right;
  vertical-align: middle;
  font-size: 14px;
  color: #606266;
  padding-right: 10px;
}
</style>