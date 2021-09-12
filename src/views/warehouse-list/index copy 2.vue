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
        <el-form-item label="所在州:" prop="sku">
          <el-select v-model="filters.state" placeholder="state">
            <el-option
              v-for="item in states"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属用户:" prop="user">
          <el-input
            class="filter-item input-normal"
            v-model="filters.user"
            placeholder="请输入所属用户"
          ></el-input>
        </el-form-item>
        <el-form-item label="名称:" prop="name">
          <el-input
            class="filter-item input-normal"
            v-model="filters.name"
            placeholder="请选择名称"
          ></el-input>
        </el-form-item>
      </template>

      <template v-slot:table-menu-left>
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
      </template>
      <template v-slot:table-menu-right>
        <el-button
          size="mini"
          class="filter-item"
          @click="handleAdd"
          type="primary"
          icon="icon iconfont icon-search"
          >查找仓库
        </el-button>
      </template>

      <template v-slot:table>
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
      </template>
    </no-page>
    <el-dialog
      title="编辑商品"
      :visible.sync="importdialogVisible"
      width="800px"
      :before-close="handleClose"
    >
      <el-form
        :model="this.editForm"
        size="small"
        ref="editForm"
        :inline="true"
        labelPosition="left"
      >
        <el-row justify="center">
          <el-col :span="3" class="col-label">仓库SKU:</el-col>
          <el-col :span="21">UN001</el-col>
          <el-col :span="3" class="col-label">商品名称:</el-col>
          <el-col :span="21">123123123</el-col>
          <el-col :span="3" class="col-label">单位:</el-col>
          <el-col :span="21">SET</el-col>
          <el-col :span="3" class="col-label">重量:</el-col>
          <el-col :span="21">123</el-col>

          <el-col :span="3" class="col-label" style="line-height: 32px"
            >尺寸:</el-col
          >
          <el-col :span="7">
            <el-form-item label="长:" prop="length">
              <el-input
                type="number"
                style="width: 160px"
                v-model="editForm.length"
                placeholder="请输入长"
              >
                <el-select
                  v-model="editForm.size_unit"
                  slot="append"
                  placeholder=""
                  size="mini"
                >
                  <el-option label="cm" value="1"></el-option>
                  <el-option label="inch" value="2"></el-option>
                </el-select>
              </el-input> </el-form-item
          ></el-col>
          <el-col :span="7">
            <el-form-item label="宽:" prop="width">
              <el-input
                type="number"
                style="width: 160px"
                v-model="editForm.width"
                placeholder="请输入宽"
              >
                <el-select
                  v-model="editForm.size_unit"
                  slot="append"
                  placeholder=""
                >
                  <el-option label="cm" value="1"></el-option>
                  <el-option label="inch" value="2"></el-option>
                </el-select>
              </el-input> </el-form-item
          ></el-col>
          <el-col :span="7">
            <el-form-item label="高:" prop="height">
              <el-input
                type="number"
                style="width: 160px"
                v-model="editForm.height"
                placeholder="请输入高"
              >
                <el-select
                  v-model="editForm.size_unit"
                  slot="append"
                  placeholder=""
                >
                  <el-option label="cm" value="1"></el-option>
                  <el-option label="inch" value="2"></el-option>
                </el-select>
              </el-input> </el-form-item
          ></el-col>
          <el-col :span="21" :offset="3" style="margin-top: -38px; color: red"
            >(说明：修改尺寸及重量需要用户方审核)</el-col
          >
          <el-col :span="3" class="col-label" style="line-height: 32px"
            >位置:</el-col
          >
          <el-col :span="21">
            <el-input
              type="number"
              v-model="editForm.address"
              placeholder="请输入位置"
            ></el-input
          ></el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import noPage from '@/components/noPage/noPage.vue'
import { mapState } from 'vuex'

export default {
  components: { noPage },
  data() {
    return {
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
    ...mapState({
      states: 'states'
    }),
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
    this.$store.commit('noPage/setApi', '/seller/listPository')
  },
  methods: {
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
</style>