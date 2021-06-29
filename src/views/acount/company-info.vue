<template>
  <div class="acount-container">
    <div class="title">
      <i class="fa fa-bookmark"></i>
      <p>公司信息</p>
    </div>
    <div>
      <el-form
        :model="companyForm"
        class="acount-form"
        label-width="100px"
        :rules="registryRules"
        ref="companyForm"
      >
        <el-form-item label="公司名:" prop="companyname">
          <el-input
            v-model="companyForm.companyname"
            placeholder="请输入公司名"
          ></el-input>
        </el-form-item>
        <el-form-item label="公司地址:" prop="address" v-if="userrole == 2">
          <el-input
            v-model="companyForm.address"
            placeholder="请输入公司地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话:" prop="contact" v-if="userrole == 2">
          <el-input
            v-model="companyForm.contact"
            placeholder="请输入电话号码"
            type="number"
          ></el-input>
        </el-form-item>
        <div class="addressdiv">
          <el-form-item label="" prop="streetadress" v-if="userrole == 1">
            <el-input
              v-model="companyForm.streetadress"
              placeholder="Street Adress"
            ></el-input>
          </el-form-item>
          <el-form-item label="" prop="apartment" v-if="userrole == 1">
            <el-input
              v-model="companyForm.apartment"
              placeholder="apartment/unit/suite"
            ></el-input>
          </el-form-item>
        </div>
        <div class="addressdiv">
          <div class="addressdiv1">
            <el-form-item label="" prop="city" v-if="userrole == 1">
              <el-input
                v-model="companyForm.city"
                placeholder="City"
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="state" v-if="userrole == 1">
              <el-select v-model="companyForm.state" placeholder="state">
                <el-option
                  v-for="item in states"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="" prop="zipcode" v-if="userrole == 1">
              <el-input
                v-model="companyForm.zipcode"
                placeholder="Zip Code"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item label="" prop="Phone" v-if="userrole == 1">
            <el-input
              v-model="companyForm.Phone"
              placeholder="Phone"
            ></el-input>
          </el-form-item>
        </div>
        <el-form-item label="公司logo:" prop="imageUrl">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <div class="acount-tool">
          <el-button type="primary">保存</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      userrole: 1,
      companyForm: {
        companyname: null,
        address: null,
        email: null,
        contact: null,
        invite: '223'
      },
      imageUrl: '',
      registryRules: {
        address: [
          { required: true, message: '请输入有效的名', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请输入电话号码', trigger: 'blur' }
        ],
        companyname: [
          { required: true, message: '请输入有效公司名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      },
      states: [
        {
          value: 'state1',
          label: 'state1'
        }
      ]
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="less">
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
  .el-form-item__content {
    display: flex;
    align-items: center;
    .avatar-uploader {
      // border: 1px dashed #d9d9d9;
      .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .el-upload:hover {
        border-color: #66b1ff;
      }
    }
  }
  .addressdiv {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-form-item {
      width: 50%;
      .el-form-item__content {
        margin-left: 40px !important;
      }
    }
    .addressdiv1 {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .el-form-item {
        width: 40%;
        .el-form-item__content {
          margin-left: 40px !important;
        }
      }
    }
  }
  .acount-tool {
    margin-left: 100px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 20px;
  }
}

.avatar-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>
