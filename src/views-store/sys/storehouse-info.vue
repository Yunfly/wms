<template>
  <div>
    <no-page>
      <template v-slot:table-menu-right>
        <el-button
          size="mini"
          class="filter-item"
          @click="handleEdit"
          type="primary"
          plain
          >添加仓库
        </el-button>
      </template>
      <template v-slot:table>
        <el-table-column label="仓库名称">
          <template slot-scope="scope">
            <div>
              <img src="" alt="" />
              <span>{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="仓库地址">
          <template slot-scope="scope">
            <div>
              <img src="" alt="" />
              <span
                >{{ scope.row.country }} {{ scope.row.city
                }}{{ scope.row.state }}</span
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <div>
              <img src="" alt="" />
              <span>{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          {{ userInfo.email }}
          <el-button title="编辑" type="primary" size="mini"
            >分配权限
          </el-button>

          <el-button title="删除" type="danger" size="mini">删除 </el-button>
        </el-table-column>
      </template>

      <!-- <template v-slot:table-menu-right> asdasd </template> -->
    </no-page>

    <el-dialog
      title="添加仓库"
      :visible.sync="importdialogVisible"
      width="800px"
      :before-close="handleClose"
    >
      <el-form
        :model="this.editForm"
        size="small"
        :rules="loginRules"
        ref="editForm"
        labelPosition="top"
      >
        <el-form-item label="仓库名称:" prop="name">
          <el-input v-model="editForm.name"> </el-input
        ></el-form-item>

        <el-form-item label="仓库面积:" prop="name">
          <el-input v-model="editForm.name"> </el-input
        ></el-form-item>

        <el-form-item label="地址1/Street Address:" prop="main_street">
          <el-input v-model="editForm.main_street"> </el-input
        ></el-form-item>

        <el-form-item label="地址2/apt,unit number:" prop="sub_street">
          <el-input type="input" v-model="editForm.sub_street"> </el-input
        ></el-form-item>

        <el-form-item label="城市:" prop="city">
          <el-input type="input" v-model="editForm.city"> </el-input
        ></el-form-item>

        <el-form-item label="州/state:" prop="state">
          <el-select
            v-model="editForm.state"
            placeholder="state"
            style="width: 100%"
          >
            <el-option
              v-for="item in states"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="国家/country:" prop="country">
          <el-input type="input" v-model="editForm.country"> </el-input
        ></el-form-item>

        <el-form-item label="编号/zipcode:" prop="zipcode">
          <el-input type="input" v-model="editForm.zipcode"> </el-input
        ></el-form-item>

        <el-form-item label="电话:" prop="phone">
          <el-input type="input" v-model="editForm.phone"> </el-input
        ></el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import noPage from '@/components/noPage/noPage.vue'
import Axios from '@/https/axios'
import { mapGetters, mapState } from 'vuex'

// /api/warehouse/listPository
export default {
  data() {
    return {
      editForm: {
        name: '',
        main_street: '',
        sub_street: '',
        city: '',
        state: '',
        country: '美国',
        zipcode: '',
        phone: ''
      },
      importdialogVisible: false,
      loginRules: {
        name: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        main_street: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        city: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        zipcode: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        state: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        country: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      states: 'states'
    }),
    ...mapGetters({
      userInfo: 'getUserInfo'
    })
  },
  components: { noPage },
  beforeMount() {
    this.$store.commit('noPage/setApi', '/warehouse/listPository')
  },
  methods: {
    handleSubmit() {
      this.$refs.editForm.validate(async (valid) => {
        if (valid) {
          await Axios.fetchPost('/warehouse/addPository', this.editForm)
          this.handleClose()
          this.$store.dispatch('noPage/init')
        }
      })
    },
    handleEdit() {
      this.importdialogVisible = true
    },
    handleClose() {
      this.$refs.editForm.resetFields()
      this.importdialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.el-main {
  border-top: 1px solid #dcdfe9;
}
</style>