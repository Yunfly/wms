<template>
  <div class="acount-container">
    <div class="title">
      <i class="fa fa-bookmark"></i>
      <p>账号信息</p>
    </div>
    <div>
      <el-form
        :model="acountForm"
        class="acount-form"
        label-width="100px"
        :rules="registryRules"
        ref="acountForm"
      >
        <el-form-item label="邮箱:" prop="email">
          <el-input
            v-model="acountForm.email"
            placeholder="请输入邮箱号"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="姓:" prop="firstname">
          <el-input
            v-model="acountForm.firstname"
            placeholder="请输入姓"
          ></el-input>
        </el-form-item>
        <el-form-item label="名:" prop="lastname">
          <el-input
            v-model="acountForm.lastname"
            placeholder="请输入名"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话:" prop="contact">
          <el-input
            v-model="acountForm.contact"
            placeholder="请输入电话号码"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="我的邀请码:" prop="invite">
          <el-input
            v-model="acountForm.invite"
            placeholder="请输入邀请码"
            disabled
          ></el-input>
          <el-button
            v-clipboard:copy="acountForm.invite"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            >复制</el-button
          >
        </el-form-item>
        <div class="acount-tool">
          <el-button type="primary" plain @click="changepwd"
            >修改密码</el-button
          >
          <el-button type="primary">保存</el-button>
        </div>
      </el-form>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
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
        <el-form-item label="旧密码:" prop="oldpassword">
          <el-input
            v-model="pwdForm.oldpassword"
            placeholder="请输入旧密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input
            v-model="pwdForm.password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="pwdConfirm">
          <el-input
            v-model="pwdForm.pwdConfirm"
            placeholder="请再次输入密码"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >保 存</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
    // this.getAccountInfo()
  },
  data() {
    return {
      accountInfo: {},
      acountForm: {
        firstname: null,
        lastname: null,
        email: null,
        contact: null,
        invite: '223'
      },
      pwdForm: {
        oldpassword: null,
        password: null,
        pwdConfirm: null
      },
      registryRules: {
        grouptype: [{ required: true }],
        firstname: [
          { required: true, message: '请输入有效的姓氏', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ],
        lastname: [
          { required: true, message: '请输入有效的名', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请输入电话号码', trigger: 'blur' }
        ],
        email: [
          {
            required: true,
            trigger: 'blur',
            validator: this.checkEmail
          },
          { min: 6, max: 35, message: '长度在 6 到 35 个字符', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请输入有效公司名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      },
      pwdRules: {
        oldpassword: [
          { required: true, message: '请输入有效密码', trigger: 'blur' },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入有效密码', trigger: 'blur' },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
        ],
        pwdConfirm: [
          { required: true, trigger: 'blur', validator: this.checkPwd }
        ]
      },
      dialogVisible: false
    }
  },
  methods: {
    getAccountInfo() {
      this.$axios
        .get('/account/info', {
          headers: {
            Authorization: window.localStorage.getItem('wms_auth_Login_Token')
          }
        })
        .then((res) => {
          res = res.data
          console.log(res)
          localStorage.role = res.data.role
          this.accountInfo = res.data
        })
        .catch((err) => {
          this.$handleResError(err.response)
        })
    },
    checkEmail(rule, value, callback) {
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if (!emailRegex.test(value)) {
        callback(new Error('请输入有效的邮箱号'))
      } else {
        callback()
      }
    },
    checkPwd(rule, value, callback) {
      if (value !== this.pwdForm.password) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    },
    handleClose(done) {
      done()
    },
    changepwd() {
      this.dialogVisible = true
    },
    // 复制成功时的回调函数
    onCopy(e) {
      this.$message.success('内容已复制到剪切板！')
    },
    // 复制失败时的回调函数
    onError(e) {
      this.$message.error('抱歉，复制失败！')
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
  /deep/.el-form-item__content {
    display: flex;
    align-items: center;
  }
  .acount-tool {
    margin-left: 100px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}
</style>
