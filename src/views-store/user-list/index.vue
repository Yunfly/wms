<template>
  <div>
    <no-page
      :searchForm="filters"
      @handleFilter="handleFilter"
      @handleCurrentChange="handleCurrentChange"
      @handleBitchDispatch="handleBitchDispatch"
    >
      <template v-slot:filter>
        <el-form-item label="所需面积:" prop="user">
          <el-input
            class="filter-item input-normal"
            v-model="filters.user"
          ></el-input>
        </el-form-item>
        <el-form-item label="日发货量:" prop="user">
          <el-input
            class="filter-item input-normal"
            v-model="filters.user"
          ></el-input>
        </el-form-item>
        <el-form-item label="星级:" prop="name">
          <el-input
            class="filter-item input-normal"
            v-model="filters.name"
          ></el-input>
        </el-form-item>
      </template>

      <template v-slot:table-menu-left>
        <el-radio-group size="small" v-model="warehouseType">
          <el-radio-button
            size="small"
            label="all"
            class="filter-item"
            type="primary"
            >全部卖家
          </el-radio-button>
          <el-radio-button
            size="small"
            label="sign"
            class="filter-item"
            type="primary"
            plain
            >签约卖家
          </el-radio-button>
          <el-radio-button
            size="small"
            label="already"
            class="filter-item"
            type="primary"
            plain
            >已存卖家
          </el-radio-button>
        </el-radio-group>
      </template>
      <template v-slot:table-menu-right>
        <el-button
          size="mini"
          class="filter-item"
          @click="searchdialogVisible = true"
          type="primary"
          icon="icon iconfont icon-search"
          >查找用户
        </el-button>
      </template>

      <template v-slot:table>
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="序号">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="卖家名" width="175">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDrawerClick(scope.row)">
              {{ ifempty(scope.row.email) }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="公司名" width="100">
          <template slot-scope="scope">
            <span>{{ ifempty(scope.row.company) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="日发货包裹数量" width="130">
          <template slot-scope="scope">
            <span>{{ ifempty(scope.row.weight) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所需面积">
          <template slot-scope="scope">
            <span>{{ ifempty(scope.row.size) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="星级" width="180">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.size" disabled></el-rate>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="280">
          <template slot-scope="scope">
            <el-button
              title="联系用户"
              type="warning"
              size="mini"
              @click="handleEdit(scope.row)"
              >联系用户
            </el-button>
            <el-button
              title="保存用户"
              type="success"
              size="mini"
              @click="handleCancleRequest(scope.row)"
            >
              保存用户
            </el-button>
            <el-dropdown style="margin-left: 10px">
              <el-button
                title="签约"
                type="primary"
                size="mini"
                @click="handleCancleRequest(scope.row)"
              >
                签约
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看服务条款</el-dropdown-item>
                <el-dropdown-item>解除合同</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </template>
    </no-page>
    <drawer-card
      @handleClose="drawerVisible = false"
      :visible="drawerVisible"
      :drawerInfo="drawerInfo"
    />
    <el-dialog
      title="查找用户"
      :visible.sync="searchdialogVisible"
      width="500px"
    >
      <div v-if="!warehosuseInfo.img">
        请输入用户ID:
        <el-input
          style="margin-top: 5px"
          v-model="warehosuseNo"
          size="small"
        ></el-input>
        <el-alert
          style="margin-top: 5px; background: #fff"
          title="提示说明：用户ID为用户用户名，可在用户基本资料中查找。"
          type="warning"
          show-icon
          :closable="false"
        >
        </el-alert>

        <div style="text-align: center">
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="handleClose">取 消</el-button>
            <el-button size="small" type="primary" @click="fetchWareHouse"
              >确 定</el-button
            >
          </span>
        </div>
      </div>

      <div v-else style="text-align: center">
        <br />
        <p style="margin-bottom: 5px">{{ warehosuseInfo.desc }}阿斯达多所</p>
        <el-avatar> user </el-avatar>
        <el-rate v-model="warehosuseInfo.star" disabled></el-rate>
        <p>{{ warehosuseInfo.desc }}阿斯达多所</p>
        <br />
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="handleClose">取 消</el-button>
          <el-button size="small" type="primary" @click="handleSearch"
            >添 加</el-button
          >
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import noPage from '@/components/noPage/noPage.vue'
import drawerCard from './drawerCard.vue'
import { mapState } from 'vuex'
import Axios from '@/https/axios'

export default {
  components: { noPage, drawerCard },
  data() {
    return {
      drawerVisible: false,
      editForm: { name: null, size_unit: '1', width: '' },
      searchdialogVisible: false,
      drawerInfo: {},
      importdialogVisible: false,
      warehosuseNo: '',
      warehosuseInfo: {},
      warehouseType: '',
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
    this.$store.commit(
      'noPage/setApi',
      '/warehouse/contract/listRelation?id=bca4360ec8b519ea87393b1a6184baff'
    )
  },
  methods: {
    handleDrawerClick(info) {
      this.drawerInfo = info
      this.drawerVisible = true
      console.log(this.drawerVisible)
    },
    async fetchWareHouse() {
      // /warehouse/getPository
      const res = await Axios.fetchGet(
        `/warehouse/getPository?id=${this.warehosuseNo}`
      )
      console.log(res)
    },
    async addRelation() {
      // /warehouse/getPository
      const res = await Axios.fetchPost('/seller/addRelation', {
        id: this.warehosuseNo
      })
      this.warehosuseInfo = {}
      this.searchdialogVisible = false
      console.log(res)
    },
    ifempty(value) {
      return value || '--'
    },
    handleSearch() {
      console.log('添加')
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