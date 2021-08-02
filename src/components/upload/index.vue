<template>
  <i>
    <el-button
      size="mini"
      @click="handleimport"
      type="primary"
      plain
      icon="icon iconfont icon-jichutubiao-"
      >导入
    </el-button>
    <el-dialog
      title="批量导入"
      :visible.sync="importdialogVisible"
      width="45%"
      :before-close="handleClose"
    >
      <div class="importdiv" v-if="importstatu == 'uploading'">
        <div class="importdivitem">
          <div class="importdivitem-left">
            <img src="/img/download.png" alt="" />
          </div>
          <div class="importdivitem-right">
            <p class="p16">批量导入产品信息</p>
            <p class="p14">请使用Excel创建一个.xls文件，格式如下</p>
            <el-link type="primary" href="">点击下载模板</el-link>
          </div>
        </div>
        <div class="importdivitem">
          <div class="importdivitem-left">
            <img src="/img/upload.png" alt="" />
          </div>
          <div class="importdivitem-right">
            <p class="p16">上传已下载好的产品信息</p>
            <p class="p14">
              文件后缀名必须为xls或xlsx（即Excel格式）,文件大小不得大于2M，超过2M的请分批导入
            </p>
            <el-upload
              class="upload-demo"
              action="#"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-change="handleChange"
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList"
              accept=".xls,.csv"
            >
              <el-link type="primary">上传文件</el-link>
            </el-upload>
          </div>
        </div>
        <div class="importdivitem1">
          <p class="pp"><i class="el-icon-info"></i>特别提示</p>
          <p class="p14">1、客户单号为空，默认为系统自动生成单号</p>
          <p class="p14">
            2、请勿修改表格格式和重复导入Excel表格，否则无法导入
          </p>
        </div>
      </div>
      <div class="importdiv" v-if="importstatu == 'success'">
        <div class="importsuccess">
          <img src="/img/success.png" alt="" />
          <p class="importstatu">导入成功</p>
          <div class="listinfo">
            <p>正常数据条数：<span class="green">100条</span></p>
            <p>异常数据条数：<span class="red">0条</span></p>
          </div>
        </div>
      </div>
      <div class="importdiv" v-if="importstatu == 'falie'">
        <div class="importerror">
          <img src="/img/error.png" alt="" />
          <p class="importstatu">导入失败</p>
          <div class="listinfo">
            <div class="listinfoitem">
              <p>正常数据条数：<span class="green">100条</span></p>
              <p>异常数据条数：<span class="red">0条</span></p>
            </div>
            <p class="pp"><i class="el-icon-info"></i>异常提示</p>
            <div class="errorlist">
              <p>
                第3行：已存在名称为【 深圳市亿恩科技有限公司
                】的客户，如果继续导入将会更新这条客户的数据
              </p>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="importdialogVisible = false"
          v-if="importstatu == 'uploading'"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="importstatu = 'falie'"
          v-if="importstatu == 'uploading'"
          >下一步</el-button
        >
        <el-button
          type="primary"
          @click="importdialogVisible = false"
          v-if="importstatu == 'success'"
          >确认</el-button
        >
        <el-button
          type="primary"
          @click="importstatu = 'uploading'"
          v-if="importstatu == 'falie'"
          >重新上传</el-button
        >
        <el-button
          type="primary"
          @click="importdialogVisible = false"
          v-if="importstatu == 'falie'"
          >确认</el-button
        >
      </span>
    </el-dialog>
  </i>
</template>

<script>
export default {
  data() {
    return {
      importstatu: 'uploading',
      importdialogVisible: false
    }
  },
  props: {
    // 检测类型
  },
  methods: {
    handleClose(done) {
      done()
    },
    handleimport() {
      console.log(111)
      this.importstatu = 'uploading'
      this.importdialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.importdiv {
  padding: 0px 30px;
  box-sizing: border-box;
  .importdivitem {
    width: 100%;
    height: 130px;
    background: rgba(47, 143, 251, 0.05);
    border: 1px solid rgba(47, 143, 251, 0.2);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .importdivitem-left {
      height: 100%;
      width: 20%;
      border-right: 1px solid #2f8efb2f;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .importdivitem-right {
      // height: 100%;
      width: 75%;
      .p16 {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #666666;
        line-height: 24px;
      }
      .p14 {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #999999;
        line-height: 24px;
      }
      /deep/.upload-demo {
        display: flex;
        align-items: center;
        ul {
          li {
            margin: 0;
            .el-upload-list__item-name {
              color: #409eff;
            }
          }
        }
      }
    }
  }
  .importdivitem1 {
    width: 100%;
    height: 130px;
    background: rgba(251, 167, 47, 0.1);
    border: 1px solid rgba(251, 167, 47, 0.2);
    border-radius: 5px;
    padding: 20px;
    box-sizing: border-box;
    .pp {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #666666;
      line-height: 30px;
      i {
        color: #fba72f;
        font-size: 18px;
        margin-right: 5px;
      }
    }
    .p14 {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #999999;
      line-height: 24px;
      text-indent: 20px;
    }
  }
  .importsuccess {
    margin-left: 50%;
    transform: translateX(-50%);
    img {
      margin-left: 50%;
      transform: translateX(-50%);
    }
    .importstatu {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #333333;
      line-height: 50px;
      text-align: center;
    }
    .listinfo {
      margin-left: 50%;
      transform: translateX(-50%);
      width: 401px;
      height: 60px;
      background: rgba(47, 143, 251, 0.05);
      border: 1px solid rgba(47, 143, 251, 0.2);
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      p {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #666666;
        line-height: 24px;
        span {
          font-weight: 400;
        }
      }
      .green {
        color: #30ac2d;
      }
      .red {
        color: #e82424;
      }
    }
  }
  .importerror {
    margin-left: 50%;
    transform: translateX(-50%);
    img {
      margin-left: 50%;
      transform: translateX(-50%);
    }
    .importstatu {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #333333;
      line-height: 50px;
      text-align: center;
    }
    .listinfo {
      margin-left: 50%;
      transform: translateX(-50%);
      width: 830px;
      height: 290px;
      background: rgba(47, 143, 251, 0.05);
      border: 1px solid rgba(47, 143, 251, 0.2);
      border-radius: 5px;
      padding: 20px;
      box-sizing: border-box;
      .listinfoitem {
        display: flex;
        align-items: center;
        padding-bottom: 15px;
        border-bottom: 1px dashed rgba(47, 143, 251, 0.2);
        p {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #666666;
          line-height: 24px;
          margin-right: 50px;
          span {
            font-weight: 400;
          }
        }
        .green {
          color: #30ac2d;
        }
        .red {
          color: #e82424;
        }
      }
      .pp {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #666666;
        line-height: 30px;
        i {
          color: #e82424;
          font-size: 18px;
          margin-right: 5px;
        }
      }
      .errorlist {
        width: 100%;
        height: 240px;
        overflow: auto;
        p {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #e82424;
          line-height: 24px;
        }
      }
    }
  }
}
</style>