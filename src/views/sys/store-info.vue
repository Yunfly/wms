<template>
  <div>
    <no-page :data="data">
      <template v-slot:table-menu-right>
        <el-button
          size="mini"
          class="filter-item"
          @click="handleCreate"
          type="primary"
          plain
          >添加店铺
        </el-button>
      </template>
      <template v-slot:table>
        <el-table-column label="店铺名称" prop="name"></el-table-column>
        <el-table-column label="平台名称" prop="platform"></el-table-column>
        <el-table-column label="创建时间" prop="createDate"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              title="编辑"
              type="primary"
              @click="handleEdit(scope.row)"
              size="mini"
              >编辑
            </el-button>

            <el-button
              title="删除"
              type="danger"
              @click="handleDelete(scope.row.id)"
              size="mini"
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
      width="500px"
      :before-close="handleClose"
    >
      <el-form
        :model="this.editForm"
        size="small"
        ref="editForm"
        labelPosition="top"
      >
        <el-form-item label="平台名称:" prop="platform">
          <el-select
            style="disable: block"
            v-model="editForm.platform"
            size="mini"
          >
            <el-option label="Amazon" value="Amazon"></el-option>
            <el-option label="eBay" value="eBay"></el-option> </el-select
        ></el-form-item>
        <el-form-item label="自定义店铺名称:" prop="name">
          <el-input v-model="editForm.name"> </el-input
        ></el-form-item>

        <el-form-item
          label="卖家编号:"
          prop="seller"
          v-if="editForm.platform === 'Amazon'"
        >
          <el-input v-model="editForm.seller"> </el-input
        ></el-form-item>

        <el-form-item
          label="WMS授权令牌:"
          prop="token"
          v-if="editForm.platform === 'Amazon'"
        >
          <el-input type="input" v-model="editForm.token"> </el-input
        ></el-form-item>

        <el-form-item
          label="店铺名称:"
          prop="seller"
          v-if="editForm.platform === 'eBay'"
        >
          <el-input type="input" v-model="editForm.seller"> </el-input
        ></el-form-item>
        <div
          style="display: flex; justify-content: space-around"
          v-if="editForm.platform === 'eBay'"
        >
          <el-button type="primary" size="small" @click="handleClose"
            >点击授权</el-button
          >
          <el-button @click="handleClose" size="small"
            >已授权获取token</el-button
          >
        </div>

        <el-form-item
          label="eBay token:"
          prop="token"
          v-if="editForm.platform === 'eBay'"
        >
          <el-input type="input" v-model="editForm.token"> </el-input
        ></el-form-item>

        <el-form-item
          label="店铺地点:"
          prop="location"
          v-if="editForm.platform === 'Amazon'"
        >
          <el-select
            style="disable: block"
            v-model="editForm.location"
            size="mini"
          >
            <el-option
              v-for="item in countries"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handldEditConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import noPage from '@/components/noPage/noPage.vue'
import Axios from '@/https/axios'

export default {
  beforeMount() {
    // /api/seller/shop/listShop
    this.$store.commit('noPage/setApi', '/seller/shop/listShop')
  },
  data() {
    return {
      data: [],
      countries: [
        'US',
        'CA',
        'MX',
        'BR',
        'AE',
        'DE',
        'ES',
        'FR',
        'GB',
        'IN',
        'IT',
        'TR',
        'AU',
        'JP',
        'CN'
      ],
      editForm: {
        platform: 'Amazon',
        name: '',
        location: '',
        token: '',
        seller: '',
        id: ''
      },
      importdialogVisible: false,
      dialogTitle: '添加店铺'
    }
  },
  components: { noPage },
  methods: {
    handleEdit({ name, location, platform, seller, token, id }) {
      console.log(location)
      this.dialogTitle = '编辑店铺'
      Object.assign(this.editForm, {
        name,
        location,
        platform,
        seller,
        token,
        id
      })
      this.importdialogVisible = true
    },
    async handldEditConfirm() {
      const { id, ...params } = this.editForm
      let url = ''

      if (this.dialogTitle === '添加店铺') {
        url = '/seller/shop/addShop'
      } else {
        url = `/seller/shop/${id}`
      }
      try {
        await Axios.fetchPost(url, params)

        this.$message.success(
          `${this.dialogTitle === '添加店铺' ? '添加' : '更新'}成功`
        )
      } finally {
        this.importdialogVisible = false
        this.$store.dispatch('noPage/init')
      }
    },
    handleCreate() {
      this.dialogTitle = '添加店铺'
      this.importdialogVisible = true
    },
    handleClose() {
      console.log(1)
      this.$refs.editForm.resetFields()
      this.importdialogVisible = false
    },
    handleDelete(id) {
      this.$confirm('若删除店铺则同时删除与该店铺相关联的商品 sku', '提示', {
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
    }
  }
}
</script>