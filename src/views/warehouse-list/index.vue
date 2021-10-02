<template>
  <div>
    <no-page
      :searchForm="filters"
      @handleFilter="handleFilter"
      @handleCurrentChange="handleCurrentChange"
      @handleBitchDispatch="handleBitchDispatch"
    >
      <template v-slot:filter>
        <el-form-item label="所在州:" prop="sku">
          <el-select v-model="filters.state">
            <el-option
              v-for="item in states"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所需面积:" prop="user">
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
            >全部仓库
          </el-radio-button>
          <el-radio-button
            size="small"
            label="sign"
            class="filter-item"
            type="primary"
            plain
            >签约仓库
          </el-radio-button>
          <el-radio-button
            size="small"
            label="already"
            class="filter-item"
            type="primary"
            plain
            >已存仓库
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
          >查找仓库
        </el-button>
      </template>

      <template v-slot:table>
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="序号">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="仓库名" width="175">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDrawerClick(scope.row)">
              {{ ifempty(scope.row.name) }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="地址" width="100">
          <template slot-scope="scope">
            <span>{{ ifempty(scope.row.mainStreet) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="100">
          <template slot-scope="scope">
            <span
              >{{ scope.row.type === true ? '全职' : ''
              }}{{ scope.row.type === false ? '兼职' : '' }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="面积">
          <template slot-scope="scope">
            <span>{{ ifempty(scope.row.area) }}</span>
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
              title="联系仓库"
              type="warning"
              size="mini"
              @click="handleEdit(scope.row)"
              >联系仓库
            </el-button>
            <el-button
              title="保存仓库"
              type="success"
              size="mini"
              @click="handleCancleRequest(scope.row)"
            >
              保存仓库
            </el-button>
            <el-dropdown
              style="margin-left: 10px"
              @command="(command) => handleCommand(scope.row.id, command)"
            >
              <el-button type="text" size="small">更多</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="handleAddRelation">
                  签约
                </el-dropdown-item>

                <el-dropdown-item command="viewTerms"
                  >查看服务条款</el-dropdown-item
                >
                <el-dropdown-item command="handleJcht"
                  >解除合同</el-dropdown-item
                >
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
      title="查找仓库"
      :visible.sync="searchdialogVisible"
      width="500px"
    >
      <div v-if="!warehosuseInfo.img">
        请输入仓库ID:
        <el-input
          style="margin-top: 5px"
          v-model="warehosuseNo"
          size="small"
        ></el-input>
        <el-alert
          style="margin-top: 5px; background: #fff"
          title="提示说明：仓库ID为仓库用户名，可在仓库基本资料中查找。"
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

    <el-dialog
      v-if="viewTermsContract"
      title="服务条款"
      destroy-on-close
      :visible.sync="viewTermsContract"
      width="1000px"
    >
      <ht-component :htId="htId" @close="this.handleTermsClose"></ht-component>
    </el-dialog>
  </div>
</template>

<script>
import noPage from '@/components/noPage/noPage.vue'
import drawerCard from '@/components/drawerCard.vue'
import { mapState } from 'vuex'
import Axios from '@/https/axios'
import htComponent from './ht.vue'

export default {
  components: { noPage, drawerCard, htComponent },
  data() {
    return {
      viewTermsContract: false,
      htId: null,
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
    this.$store.commit('noPage/setApi', '/seller/listPository')
  },
  methods: {
    handleCommand(id, command) {
      if (command === 'handleAddRelation') return this.handleAddRelation(id)
      if (command === 'viewTerms') return this.viewTerms(id)
      if (command === 'handleJcht') return this.handleJcht(id)
    },
    handleTermsClose() {
      this.viewTermsContract = false
    },
    viewTerms(id) {
      console.log(id)
      this.htId = id
      this.viewTermsContract = true
    },
    async handleAddRelation(id) {
      await Axios.fetchPost('/seller/addRelation', {
        id
      })
      this.$message.success('签约成功')
      this.$store.dispatch('noPage/init')
    },
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
    async handleJcht(id) {
      // seller/delRelation
      this.$confirm('是否解除合同', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await Axios.fetchPost('/seller/delRelation', {
          id
        })
        this.$message.success('解约成功')
        this.$store.dispatch('noPage/init')
      })
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