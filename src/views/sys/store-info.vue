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
          >添加店铺
        </el-button>
      </template>
      <template v-slot:table>
        <el-table-column label="店铺名称"></el-table-column>
        <el-table-column label="平台名称"></el-table-column>
        <el-table-column label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <el-button title="编辑" type="primary" @click="handleEdit" size="mini"
            >编辑
          </el-button>

          <el-button title="删除" type="danger" size="mini">删除 </el-button>
        </el-table-column>
      </template>

      <!-- <template v-slot:table-menu-right> asdasd </template> -->
    </no-page>

    <el-dialog
      title="添加店铺"
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
        <el-form-item label="平台名称:" prop="name">
          <el-select style="disable: block" v-model="editForm.name" size="mini">
            <el-option label="Amazon" value="Amazon"></el-option>
            <el-option label="eBay" value="eBay"></el-option> </el-select
        ></el-form-item>
        <el-form-item label="自定义店铺名称:" prop="diy_name">
          <el-input v-model="editForm.diy_name"> </el-input
        ></el-form-item>

        <el-form-item
          label="卖家编号:"
          prop="no"
          v-if="editForm.name === 'Amazon'"
        >
          <el-input v-model="editForm.no"> </el-input
        ></el-form-item>

        <el-form-item
          label="WMS授权令牌:"
          prop="token"
          v-if="editForm.name === 'Amazon'"
        >
          <el-input type="input" v-model="editForm.token"> </el-input
        ></el-form-item>

        <el-form-item
          label="店铺名称:"
          prop="eBaytoken"
          v-if="editForm.name === 'eBay'"
        >
          <el-input type="input" v-model="editForm.eBaytoken"> </el-input
        ></el-form-item>
        <div
          style="display: flex; justify-content: space-around"
          v-if="editForm.name === 'eBay'"
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
          prop="eBaytoken"
          v-if="editForm.name === 'eBay'"
        >
          <el-input type="input" v-model="editForm.eBaytoken"> </el-input
        ></el-form-item>

        <el-form-item
          label="店铺地点:"
          prop="address"
          v-if="editForm.name === 'Amazon'"
        >
          <el-select
            style="disable: block"
            v-model="editForm.address"
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
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import noPage from '@/components/noPage/noPage.vue'

export default {
  data() {
    return {
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
        name: 'Amazon',
        diy_name: '',
        size_unit: '1',
        address: '',
        token: '',
        no: '',
        eBaytoken: '',
        width: ''
      },
      importdialogVisible: false
    }
  },
  components: { noPage },
  methods: {
    handleEdit() {
      this.importdialogVisible = true
    },
    handleClose() {
      console.log(1)
      this.$refs.editForm.resetFields()
      this.importdialogVisible = false
    }
  }
}
</script>