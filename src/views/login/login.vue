<template>
  <div class="login-base-container">
    <div class="login-boxview">
      <div class="left">
        <img src="../../assets/images/login/left-header.png" />
        <img src="../../assets/images/login/left-body.png" />
      </div>
      <div class="right">
        <!--登陆表单-->
        <el-collapse-transition>
          <div class="login" v-show="showLoginForm">
            <img
              class="right-header-normal"
              src="../../assets/images/login/right-header.png"
            />
            <img
              class="right-header-min"
              src="../../assets/images/login/left-header.png"
            />
            <el-form
              :model="loginForm"
              class="login-form"
              :rules="loginRules"
              ref="loginForm"
            >
              <!--邮箱-->
              <el-form-item label="" prop="email">
                <span class="form-input">
                  <img src="../../assets/images/login/email.png" />
                  <el-input
                    v-model="loginForm.email"
                    type="text"
                    placeholder="请输入邮箱号"
                    class="login-input-email"
                  >
                  </el-input>
                  <img
                    src="../../assets/images/login/clear.png"
                    class="clear"
                    v-show="loginForm.email"
                    v-on:click="clear('email')"
                  />
                </span>
              </el-form-item>
              <!--密码-->
              <el-form-item label="" prop="password">
                <span class="form-input">
                  <img src="../../assets/images/login/lock.png" />
                  <el-input
                    @keyup.enter.native="login"
                    v-model="loginForm.password"
                    type="password"
                    placeholder="请输入密码"
                    class="login-input-password"
                  ></el-input>
                </span>
              </el-form-item>
              <!--组号-->
              <el-form-item label="" prop="companyname">
                <span class="form-input">
                  <img src="../../assets/images/login/shield.png" />
                  <el-input
                    v-model="loginForm.companyname"
                    type="text"
                    placeholder="请输入公司名"
                    class="login-input-email"
                  >
                  </el-input>
                </span>
              </el-form-item>
              <el-form-item>
                <span class="others">
                  <span v-on:click="forgetPwd" class="linkText">忘记密码</span>
                  <span v-on:click="toRegistry" class="linkText">立即注册</span>
                </span>
              </el-form-item>
              <el-form-item>
                <span>
                  <el-button
                    @click="submitForm('loginForm', login)"
                    class="login-btn"
                    :loading="inTheLogin"
                    >立即登录</el-button
                  >
                </span>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-transition>
        <!--注册表单-->
        <el-collapse-transition>
          <div class="registry" v-show="!showLoginForm">
            <el-form
              size="mini"
              :model="registryForm"
              class="registry-form"
              label-width="85px"
              :rules="registryRules"
              ref="registryForm"
            >
              <el-form-item label="角色:" prop="grouptype">
                <el-radio-group v-model="registryForm.grouptype">
                  <el-radio label="1">我是卖家</el-radio>
                  <el-radio label="2">我是仓库方</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item
                label="国家:"
                prop="country"
                v-if="registryForm.grouptype == '1'"
              >
                <el-radio-group v-model="registryForm.country">
                  <el-radio label="China">中国</el-radio>
                  <el-radio label="USA">美国</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="姓:" prop="firstname">
                <el-input
                  v-model="registryForm.firstname"
                  placeholder="请输入姓"
                ></el-input>
              </el-form-item>
              <el-form-item label="名:" prop="lastname">
                <el-input
                  v-model="registryForm.lastname"
                  placeholder="请输入名"
                ></el-input>
              </el-form-item>
              <el-form-item label="邮箱:" prop="email">
                <el-input
                  v-model="registryForm.email"
                  placeholder="请输入邮箱号"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码:" prop="password">
                <el-input
                  v-model="registryForm.password"
                  placeholder="请输入密码"
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码:" prop="pwdConfirm">
                <el-input
                  v-model="registryForm.pwdConfirm"
                  placeholder="请再次输入密码"
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item label="公司名:" prop="cname">
                <el-input
                  v-model="registryForm.cname"
                  placeholder="请输入公司名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="邮编:" prop="zipcode">
                <el-input
                  v-model="registryForm.zipcode"
                  placeholder="Zip Code"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="电话:"
                prop="contact"
                v-if="registryForm.grouptype == '1'"
              >
                <el-input
                  v-model="registryForm.contact"
                  placeholder="请输入电话号码"
                  type="number"
                ></el-input>
              </el-form-item>
              <!-- 选择地区 -->
              <div v-if="registryForm.country == 'China'">
                <el-form-item label="地区:" prop="area">
                  <el-cascader
                    size="mini"
                    :options="options"
                    v-model="registryForm.area"
                  >
                  </el-cascader>
                </el-form-item>

                <el-form-item label="街道号:" prop="main_street">
                  <el-input
                    v-model="registryForm.main_street"
                    placeholder="请输入街道号"
                  ></el-input>
                </el-form-item>
                <el-form-item label="门牌号:" prop="sub_street">
                  <el-input
                    v-model="registryForm.sub_street"
                    placeholder="请输入门牌号"
                  ></el-input>
                </el-form-item>
              </div>
              <div
                v-if="
                  registryForm.country == 'USA' || registryForm.grouptype == '2'
                "
              >
                <div class="">
                  <el-form-item label="街道号:" prop="main_street">
                    <el-input
                      v-model="registryForm.main_street"
                      placeholder="Street Adress"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="门牌号:" prop="sub_street">
                    <el-input
                      v-model="registryForm.sub_street"
                      placeholder="apartment/unit/suite"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="" style="display: flex">
                  <el-form-item label="城市:" prop="city">
                    <el-input
                      v-model="registryForm.city"
                      placeholder="City"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="州:" prop="state">
                    <el-select v-model="registryForm.state" placeholder="state">
                      <el-option
                        v-for="item in states"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <el-form-item
                  label="Phone："
                  prop="Phone"
                  v-if="registryForm.grouptype == '2'"
                >
                  <el-input
                    v-model="registryForm.Phone"
                    placeholder="Phone"
                  ></el-input>
                </el-form-item>
              </div>
              <!-- <el-form-item label="邀请码:" prop="invite">
                <el-input
                  v-model="registryForm.invite"
                  placeholder="请输入邀请码"
                  type="number"
                ></el-input>
              </el-form-item> -->
              <el-form-item>
                <span class="others">
                  <span>
                    <el-checkbox v-model="checked">同意 </el-checkbox
                    ><span class="linkText" v-on:click="showAgreement"
                      >《用户注册协议》</span
                    >
                  </span>
                  <span
                    >已有账号？ 直接<span class="linkText" v-on:click="toLogin"
                      >登录</span
                    ></span
                  >
                </span>
              </el-form-item>
              <div>
                <el-button
                  @click="submitForm('registryForm', registry)"
                  class="registry-btn"
                  :loading="registering"
                  >确认注册</el-button
                >
              </div>
            </el-form>
          </div>
        </el-collapse-transition>
      </div>
    </div>
    <img src="../../assets/images/login/bg-login-footer.png" class="footer" />
  </div>
</template>

<script>
import userService from '../../services/userService'
import { provinceAndCityData, CodeToText } from 'element-china-area-data'
import states_hash from './states_hash.json'

export default {
  data() {
    return {
      options: provinceAndCityData,
      loginForm: {
        email: null,
        password: null,
        companyname: null,
        rememberMe: 1
      },
      registryForm: {
        grouptype: '1',
        country: 'China',
        area: '',
        main_street: '',
        sub_street: '',
        firstname: null,
        lastname: null,
        email: null,
        password: null,
        pwdConfirm: null,
        cname: null,
        // location: null,
        contact: null
        // invite: null
      },
      loginRules: {
        email: [
          {
            required: true,
            trigger: 'blur',
            validator: this.checkEmail
          }
        ],
        password: [
          { required: true, message: '请输入有效密码', trigger: 'blur' },
          {
            min: 6,
            max: 20,
            message: '密码长度在 6 到 20 个字符',
            trigger: 'blur'
          }
        ],
        groupspace: [
          { required: true, message: '请输入有效组号', trigger: 'blur' }
        ]
      },
      registryRules: {
        grouptype: [{ required: true }],
        firstname: [
          { required: true, message: '请输入有效的姓氏', trigger: 'blur' },
          { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }
        ],
        lastname: [
          { required: true, message: '请输入有效的名', trigger: 'blur' },
          { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }
        ],
        email: [
          {
            required: true,
            trigger: 'blur',
            validator: this.checkEmail
          },
          { min: 6, max: 35, message: '长度在 6 到 35 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入有效密码', trigger: 'blur' },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
        ],
        pwdConfirm: [
          { required: true, trigger: 'blur', validator: this.checkPwd }
        ],
        cname: [
          { required: true, message: '请输入有效公司名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        streetadress: [
          { required: true, message: 'Street Adress', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      },
      showLoginForm: true,
      checked: false,
      inTheLogin: false,
      registering: false,
      states: Object.values(states_hash).map((x) => {
        console.log(states_hash)
        return {
          value: x,
          label: x
        }
      })
    }
  },
  watch: {
    'registryForm.grouptype': function (val, oldVal) {
      if (val === '2') {
        this.registryForm.country = 'USA'
      }
    }
  },
  methods: {
    submitForm(formName, next) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          next()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    login() {
      this.inTheLogin = true
      const params = JSON.parse(JSON.stringify(this.loginForm))
      userService
        .login(params)
        .then((res) => {
          this.inTheLogin = false
          this.$router.push('/dashboard')
        })
        .catch((err) => {
          this.inTheLogin = false
          this.$message.error(err.message)
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
      if (value !== this.registryForm.password) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    },
    registry() {
      this.registering = true
      const formData = JSON.parse(JSON.stringify(this.registryForm))
      formData.grouptype = parseInt(formData.grouptype)
      window.localStorage.setItem('wms_auth_access_token', '')
      window.localStorage.setItem('wms_auth_expires', '')
      console.log(CodeToText[formData.area[0]], CodeToText[formData.area[1]])
      const {
        email,
        password,
        grouptype,
        cname,
        firstname,
        lastname,
        main_street,
        sub_street,
        city,
        state,
        country,
        zipcode
      } = formData
      let params = {}
      if (grouptype === 1) {
        params = {
          email,
          password,
          grouptype,
          cname,
          firstname,
          lastname,
          main_street,
          sub_street,
          city,
          state,
          country,
          zipcode
        }
        if (params.country === 'China') {
          params.city = CodeToText[formData.area[0]]
          params.state = CodeToText[formData.area[1]]
        }
      }

      userService
        .registry(params)
        .then((res) => {
          this.$message({
            message: '注册成功！请前往注册邮箱激活账号！',
            type: 'success'
          })
          this.registering = false
          this.showLoginForm = true
        })
        .catch((err) => {
          this.registering = false
          this.$message.error(err.message)
        })
    },
    clear(params) {
      this.loginForm[params] = ''
    },
    forgetPwd() {
      alert('忘记密码')
    },
    toRegistry() {
      this.showLoginForm = false
    },
    showAgreement() {
      alert('用户注册协议')
    },
    toLogin() {
      this.showLoginForm = true
    }
  }
}
</script>

<style lang="less" scoped>
.login-base-container {
  width: 100%;
  height: 100%;
  min-height: 900px;
  background-image: url('../../assets/images/login/bg-login.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    pointer-events: none;
    min-width: 1300px;
  }
}

.login-boxview {
  width: 70%;
  min-height: 750px;
  height: 750px;
  display: flex;
  box-shadow: 0px 15px 50px 0px rgba(103, 182, 206, 0.27);
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .left {
    background: #e5f1ff;
    border-radius: 20px 0px 0px 20px;
    padding: 5% 0;
    box-sizing: border-box;
    width: 50%;
    > :first-child {
      width: 65%;
    }
    > :last-child {
      width: 100%;
      margin-top: 35px;
    }
  }
  .right {
    background: #ffffff;
    border-radius: 0px 20px 20px 0px;
    position: relative;
    overflow: hidden;
    width: 50%;
    margin: 0 auto;
    .login {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10% 15%;
      box-sizing: border-box;
      .right-header-normal {
        display: block;
        width: 80%;
      }
      .right-header-min {
        display: none;
      }
      .login-form {
        margin-top: 56px;
        width: 100%;
        .el-form-item {
          margin-bottom: 38px;
          /deep/.el-form-item__content {
            .form-input {
              > :first-child {
                position: absolute;
                z-index: 1;
                left: 20px;
                width: 20px;
              }
              .clear {
                right: 20px;
                width: 20px;
                position: absolute;
                z-index: 1;
                cursor: pointer;
              }
            }
            > span {
              position: relative;
              display: flex;
              flex-direction: row;
              align-items: center;

              .login-btn {
                width: 100%;
                height: 55px;
                background: #0079fe;
                border-radius: 5px;
                color: #fff;
                font-size: 1.2rem;
                letter-spacing: 3px;
              }
              .login-btn:hover {
                box-shadow: 0px 6px 12px 0px rgba(90, 158, 233, 0.35);
              }
            }
            .others {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              > span {
                font-size: 1rem;
                font-weight: bold;
                color: #2f8ffb;
                letter-spacing: 1px;
                cursor: pointer;
              }
            }
          }
        }
        /deep/ .el-input__inner {
          color: #000;
          line-height: 56px;
          height: 56px;
          border: none;
          background: #f3f8fe;
          font-size: 1.2rem;
          padding: 0 60px !important;

          &::placeholder {
            font-size: 1rem;
            color: #b6c2ce;
            letter-spacing: 1px;
          }
        }

        /deep/ .el-input__icon {
          font-size: 1.2rem;
        }

        /deep/ .el-input__prefix {
          left: 1vw;
        }

        /deep/ .el-form-item__error {
          color: #ff4948;
          font-size: 1rem;
          letter-spacing: 1px;
        }
        /deep/ .el-form-item__error::before {
          content: '\f071';
          font-family: 'FontAwesome';
          width: 1rem;
        }
      }
    }
    .registry {
      width: 90%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2vh 2vw;
      box-sizing: border-box;
      .registry-form {
        width: 100%;
        box-sizing: border-box;
        .el-form-item {
          margin-bottom: 20px;
          /deep/.el-form-item__content {
            .others {
              line-height: 30px;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              flex-wrap: wrap;
            }
            /deep/ .el-input__inner {
              background: transparent;
            }
          }
        }
        > :last-child {
          width: 100%;
          text-align: center;
          .registry-btn {
            width: 60%;
            height: 50%;
            background: #0079fe;
            border-radius: 5px;
            color: #fff;
            font-size: 1.2rem;
            letter-spacing: 3px;
          }
          .registry-btn:hover {
            box-shadow: 0px 6px 12px 0px rgba(90, 158, 233, 0.35);
          }
        }
      }
      .addressdiv {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .el-form-item {
          width: 50%;
          /deep/.el-form-item__content {
            margin-left: 20px !important;
          }
        }
        .addressdiv1 {
          // width: 50%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .el-form-item {
            width: 40%;
            /deep/.el-form-item__content {
              margin-left: 20px !important;
            }
          }
        }
      }
    }
  }
  .right::before {
    content: ' ';
    width: 260px;
    height: 260px;
    background: #f3f8fe;
    position: absolute;
    top: -130px;
    right: -130px;
    border-radius: 130px;
  }
}

.linkText {
  color: #0079fe;
  cursor: pointer;
}
.linkText:hover {
  font-style: italic;
}

@media screen and (max-width: 1300px) {
  .login-base-container {
    width: 100%;
    .login-boxview {
      width: 100%;
      height: 100%;
      .left {
        width: 100%;
        display: none;
      }
      .right {
        width: 100%;
        height: 100%;
        border-radius: 0;
        .right-header-normal {
          display: none;
        }
        .right-header-min {
          display: block;
          width: 65%;
        }
      }
      .right::before {
        display: none;
      }
    }
    .footer {
      display: none;
    }
  }
}

@media screen and (max-height: 750px) {
  .login-base-container {
    .footer {
      display: none;
    }
  }
}
</style>
