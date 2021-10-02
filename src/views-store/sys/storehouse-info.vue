<template>
  <div>
    <no-page>
      <template v-slot:table-menu-right>
        <el-button
          size="mini"
          class="filter-item"
          @click="handleCreate"
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
        <el-table-column label="操作人">
          {{ userInfo.email }}
        </el-table-column>

        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          width="350px"
        >
          <template slot-scope="scope">
            <el-button
              title="编辑"
              type="primary"
              size="mini"
              @click="handleEdit(scope.row)"
              >编辑
            </el-button>
            <el-button
              title="合同管理"
              type="primary"
              size="mini"
              @click="
                $router.push({ path: '/ht', query: { id: scope.row.id } })
              "
              >合同管理
            </el-button>

            <el-button title="分配权限" type="primary" size="mini"
              >分配权限
            </el-button>

            <el-button
              title="删除"
              type="danger"
              size="mini"
              @click="handleDeleteClick(scope.row.id)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </template>

      <!-- <template v-slot:table-menu-right> asdasd </template> -->
    </no-page>

    <el-dialog
      :title="dialogTitle"
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
        <!-- <el-form-item label="仓库名称:" prop="name">
          <el-input v-model="editForm.name"> </el-input
        ></el-form-item> -->

        <el-form-item label="仓库面积:" prop="area">
          <el-input v-model="editForm.area">
            <template slot="append">
              <el-select
                style="width: 100px"
                v-model="editForm.size_unit"
                size="mini"
              >
                <el-option label="平方米" value="平方米"></el-option>
                <el-option label="平方公尺" value="平方公尺"></el-option>
              </el-select>
            </template> </el-input
        ></el-form-item>

        <el-form-item label="类型" prop="type">
          <el-select v-model="editForm.type" style="width: 100%">
            <el-option
              v-for="item in types"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址1/Street Address:" prop="mainStreet">
          <el-input v-model="editForm.mainStreet"> </el-input
        ></el-form-item>

        <el-form-item label="地址2/apt,unit number:" prop="subStreet">
          <el-input type="input" v-model="editForm.subStreet"> </el-input
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
const initForm = {
  // name: '',
  mainStreet: '',
  subStreet: '',
  city: '',
  state: '',
  size_unit: '平方米',
  country: '美国',
  zipcode: '',
  area: '',
  type: true,
  phone: ''
}
// /api/warehouse/listPository
export default {
  data() {
    return {
      editForm: {
        // name: '',
        mainStreet: '',
        subStreet: '',
        city: '',
        state: '',
        country: '美国',
        zipcode: '',
        phone: ''
      },
      dialogTitle: '添加仓库',
      types: [
        {
          value: true,
          label: '全职'
        },
        {
          value: false,
          label: '兼职'
        }
      ],
      importdialogVisible: false,
      loginRules: {
        subStreet: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        mainStreet: [
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
          this.editForm.area += this.editForm.size_unit
          delete this.editForm.size_unit
          if (this.dialogTitle === '添加仓库') {
            await Axios.fetchPost('/warehouse/addPository', this.editForm)
            this.$message.success('添加成功')
          } else {
            await Axios.fetchPost('/warehouse/updatePository', this.editForm)
            this.$message.success('更新成功')
          }
          this.handleClose()
          this.$store.dispatch('noPage/init')
        }
      })
    },
    handleCreate() {
      this.dialogTitle = '添加仓库'
      this.editForm = JSON.parse(JSON.stringify(initForm))
      this.importdialogVisible = true
    },
    handleEdit({
      name,
      mainStreet,
      subStreet,
      type,
      area,
      city,
      id,
      state,
      country,
      zipcode,
      phone
    }) {
      this.dialogTitle = '编辑仓库'
      let size_unit = '平方米'
      if (area && ~area.indexOf('平方公尺')) {
        size_unit = '平方公尺'
      }
      this.editForm = {
        name,
        size_unit,
        id,
        mainStreet,
        subStreet,
        type,
        area: area
          ? +area.split('').reduce((x, y) => (isNaN(y) ? x : x + y), 0)
          : '',
        city,
        state,
        country,
        zipcode,
        phone
      }
      this.importdialogVisible = true
    },
    handleDeleteClick(id) {
      this.$confirm('若删除仓库，则删除与该仓库所有签订合同的用户', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const url = `/seller/shop/${id}`
        try {
          await Axios.fetchDeleteRoute(url)
        } finally {
          this.$store.dispatch('noPage/init')
        }
      })
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