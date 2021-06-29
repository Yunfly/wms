<template>
  <div class="acount-container">
    <div class="title">
      <i class="fa fa-bookmark"></i>
      <p>权限管理</p>
    </div>
    <div>
      <el-form
        :model="companyForm"
        class="acount-form"
        label-width="100px"
        ref="companyForm"
      >
        <el-form-item label="账号类型:" prop="acounttype">
          <el-input v-model="companyForm.acounttype" disabled></el-input>
        </el-form-item>
        <div class="acount-tool">
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="add"
            >添加</el-button
          >
        </div>
        <el-form-item label="账号权限:" prop="acounttype">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="acount" label="账号"></el-table-column>
            <el-table-column prop="authority" label="权限"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="success" size="mini" @click="edit(scope.row)"
                  >管理</el-button
                >
                <el-button type="danger" size="mini" @click="deleted(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="邀请成员"
      :visible.sync="adddialogVisible"
      width="30%"
      append-to-body
      :before-close="handleClose"
    >
      <el-form
        :model="pwdForm"
        class="acount-form"
        label-width="100px"
        :rules="pwdRules"
        ref="pwdForm"
      >
        <el-form-item label="邀请邮箱:" prop="email">
          <el-input
            v-model="pwdForm.email"
            placeholder="请输入邀请邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限:" prop="email">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="权限1"></el-checkbox>
            <el-checkbox label="权限2"></el-checkbox>
            <el-checkbox label="权限3"></el-checkbox>
            <el-checkbox label="权限4"></el-checkbox>
            <el-checkbox label="权限5"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="adddialogVisible = false"
          >保 存</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="权限管理"
      :visible.sync="editdialogVisible"
      width="30%"
      append-to-body
      :before-close="handleClose"
    >
      <el-form
        :model="pwdForm"
        class="acount-form"
        label-width="100px"
        :rules="pwdRules"
        ref="pwdForm"
      >
        <el-form-item label="权限:">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="权限1"></el-checkbox>
            <el-checkbox label="权限2"></el-checkbox>
            <el-checkbox label="权限3"></el-checkbox>
            <el-checkbox label="权限4"></el-checkbox>
            <el-checkbox label="权限5"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editdialogVisible = false"
          >保 存</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      companyForm: {
        acounttype: null
      },
      tableData: [
        {
          acount: '2016-05-03',
          authority: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          acount: '2016-05-02',
          authority: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          acount: '2016-05-04',
          authority: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          acount: '2016-05-01',
          authority: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          acount: '2016-05-08',
          authority: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          acount: '2016-05-06',
          authority: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          acount: '2016-05-07',
          authority: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      adddialogVisible: false,
      editdialogVisible: false,
      pwdForm: {
        email: null
      },
      pwdRules: {
        email: [
          {
            required: true,
            trigger: 'blur',
            validator: this.checkEmail
          },
          { min: 6, max: 35, message: '长度在 6 到 35 个字符', trigger: 'blur' }
        ]
      },
      checkList: []
    }
  },
  methods: {
    checkEmail(rule, value, callback) {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if (!emailRegex.test(value)) {
        callback(new Error('请输入有效的邮箱号'))
      } else {
        callback()
      }
    },
    add() {
      this.adddialogVisible = true
    },
    edit(row) {
      this.editdialogVisible = true
    },
    deleted(row) {
      this.$confirm('此操作将永久删除该资讯, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //
      })
    },
    handleClose(done) {
      done()
    }
  }
}
</script>

<style lang="less" scoped>
p {
  margin: 0;
}
.acount-container {
  padding: 50px 200px;
  .title {
    display: flex;
    align-items: center;
    i {
      color: #66b1ff;
      margin-right: 10px;
    }
    p {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #303030;
      line-height: 50px;
    }
  }
  .acount-tool {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 20px;
  }
  table {
    thead {
      color: #666666;
      tr {
        th {
          background-color: #f8f8f8;
        }
      }
    }
  }
  .cell {
    padding-left: 30px !important;
  }
}
</style>
