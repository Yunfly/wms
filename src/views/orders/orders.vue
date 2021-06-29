<template>
  <div class="orders-container">
    <div class="aside">
      <div class="asidebox" v-if="sellertype == 1">
        <div class="asidehead">
          <div class="aside-item1">
            <i class="icon iconfont icon-fuhao-shangdian"></i>
            <p>卖家列表</p>
          </div>
        </div>
        <div class="sellerlist">
          <div
            class="sellerlist-item"
            :class="selleractive == index ? 'active' : ''"
            v-for="(item, index) in sellerlist"
            :key="index"
            @click="clickseller(item, index)"
          >
            <p><span>卖</span>{{ item.seller }}{{ index + 1 }}</p>
            <i
              class="el-icon-delete"
              title="删除卖家"
              @click="handlEdeleteSeller(item, index)"
            ></i>
          </div>
        </div>
        <div class="asidetool1">
          <el-button
            size="mini"
            @click="handleAdd"
            type="primary"
            icon="el-icon-plus"
            >新增卖家
          </el-button>
        </div>
      </div>
      <div class="asidebox" v-if="sellertype == 2">
        <div class="sellerlist">
          <div class="sellerlist-item1" @click="backseller">
            <p><span>卖</span>卖家xxxxxxx</p>
          </div>
        </div>
        <el-menu
          :default-active="menuactive"
          class="aside-menu"
          text-color="#000"
          active-text-color="#000"
          router
        >
          <el-menu-item index="/allorders">
            <i class="fa fa-shopping-bag" aria-hidden="true"></i>
            <span slot="title">所有订单</span>
          </el-menu-item>
          <el-menu-item index="/deleteorders">
            <i class="fa fa-trash" aria-hidden="true"></i>
            <span slot="title">删除订单</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="asidetool" v-if="sellertype == 2">
        <el-button
          size="mini"
          @click="backseller"
          type="primary"
          icon="icon iconfont icon-fanhui"
          >返回卖家列表
        </el-button>
      </div>
    </div>
    <el-main>
      <div class="mainview">
        <div class="sellerbox" v-if="sellertype == 1">
          <div class="sellerbox-left">
            <div class="sellerbox-left-top">
              <img src="/img/head.png" alt="" />
              <p>卖家XXXXXXXXXX1</p>
              <div class="tag">卖家</div>
            </div>
            <div class="sellerbox-left-bottom">
              <div class="sellerbox-left-bottom-item">
                <div class="contact" @click="openchartbox">
                  <i class="icon iconfont icon-zu17"></i>
                  <p>联系卖家</p>
                </div>
              </div>
              <div class="sellerbox-left-bottom-item">
                <div class="goorder" @click="gotoorder">
                  <i class="icon iconfont icon-dingdan"></i>
                  <p>进入订单</p>
                </div>
              </div>
            </div>
          </div>
          <div class="sellerbox-right">
            <div class="title">
              <i class="icon iconfont icon-shixiangdengji"></i>
              <p>代办事项</p>
            </div>
            <div class="sellerbox-right-table">
              <el-table
                key="0"
                :data="list"
                border
                v-loading="listLoading"
                element-loading-text="加载中..."
                fit
                highlight-current-row
              >
                <!-- <el-table-column label="序号" type="index" width="50"></el-table-column> -->
                <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
                <el-table-column label="商品图片" width="120">
                  <template slot-scope="scope">
                    <div>
                      <img :src="scope.row.sku" alt="" />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="SKU">
                  <template slot-scope="scope">
                    <div>
                      <span>{{ ifempty(scope.row.sku) }}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="数量">
                  <template slot-scope="scope">
                    <p>{{ ifempty(scope.row.count) }}</p>
                  </template>
                </el-table-column>
                <el-table-column label="状态" width="100">
                  <template slot-scope="scope">
                    <p class="statu0" v-if="scope.row.statu == 0">待发货</p>
                    <p class="statu1" v-if="scope.row.statu == 1">已发货</p>
                    <p class="statu2" v-if="scope.row.statu == 2">已完成</p>
                  </template>
                </el-table-column>
              </el-table>

              <div v-show="!listLoading" class="pagination-container">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page.sync="listQuery.current"
                  :page-size="listQuery.size"
                  layout="total, prev, pager, next, jumper"
                  :total="total"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
        <router-view v-if="sellertype == 2"></router-view>
      </div>
    </el-main>
    <div
      class="chartbox animated fadeInUp"
      v-if="showchartbox && sellertype == 1"
    >
      <div class="chartboxtitle">
        <div class="chartboxtitleleft">
          <img src="/img/head.png" alt="" />
          <p>卖家XXXXXXXXXX1</p>
        </div>
        <i class="fa fa-minus" @click="closechartbox"></i>
      </div>
      <div class="chartboxbody">
        <div
          class=""
          v-for="(item, index) in chartmessagelist"
          :key="index"
          :class="item.type == 1 ? 'chartleft' : 'chartright'"
        >
          <div class="charthead" v-if="item.type == 1">
            <img :src="item.photo" alt="" />
            <p>{{ item.seller }}</p>
            <p>{{ item.time }}</p>
          </div>
          <div class="charthead" v-else>
            <p>17 : 23 : 40</p>
          </div>
          <div class="chartcontent">
            <p>
              {{ item.message }}
            </p>
          </div>
        </div>
      </div>
      <div class="chartboxinputbox">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="chartmessage"
          resize="none"
        >
        </el-input>
        <div class="tool">
          <el-button type="primary" size="small" @click="sendmessage"
            >发送</el-button
          >
        </div>
      </div>
    </div>
    <div
      class="chartbar"
      @click="openchartbox"
      v-if="!showchartbox && sellertype == 1"
    >
      <div class="chartbarleft">
        <i class="el-icon-chat-dot-round"></i>
      </div>
      <div class="chartbarright">
        <p>和我们在线交谈!</p>
        <i class="el-icon-arrow-up"></i>
      </div>
    </div>
    <el-dialog
      title="新增卖家"
      :visible.sync="adddialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="addsellerbox">
        <p>请输入邀请码：</p>
        <el-input
          placeholder="请输入邀请码"
          v-model="Invitationcode"
          clearable
          size="small"
        ></el-input>
        <p>
          <i class="fa fa-exclamation-circle"></i
          >提示说明：什么是邀请码？在卖家账号下，选择账号设置，在账号设置中，有该
          账号的唯一groupid。
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialogVisible = false" type="info"
          >取 消</el-button
        >
        <el-button type="primary" @click="adddialogVisible = false"
          >确 认</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  components: {},
  data() {
    return {
      sellertype: 1,
      menuactive: '/allorders',
      sellerlist: [
        {
          seller: '卖家xxxxxxx'
        },
        {
          seller: '卖家xxxxxxx'
        },
        {
          seller: '卖家xxxxxxx'
        },
        {
          seller: '卖家xxxxxxx'
        }
      ],
      selleractive: 0,
      list: [
        {
          imgurl: '',
          sku: 'sdoj132',
          name: '一次性一用口罩',
          count: 300,
          statu: 0
        },
        {
          imgurl: '',
          sku: 'sdoj132',
          name: '一次性一用口罩',
          count: 300,
          statu: 1
        },
        {
          imgurl: '',
          sku: 'sdoj132',
          name: '一次性一用口罩',
          count: 300,
          statu: 2
        }
      ],
      listLoading: false,
      listQuery: {
        current: 1,
        size: 10
      },
      total: 3,
      showchartbox: false,
      chartmessage: '',
      chartmessagelist: [
        {
          type: 1,
          seller: '卖家XXXXXXXXXX1',
          photo: '/img/head.png',
          message:
            '要不这样吧，你这边的订单要晚点发货，因为 你时间太晚了，这边没能及时通知发货，给你 造成不便，还请原谅，我会尽快通知发货，你 看可以吗？',
          time: '17 : 23 : 40'
        },
        {
          type: 2,
          seller: '',
          photo: '',
          message: '好的，可以，没问题',
          time: '17 : 23 : 40'
        },
        {
          type: 2,
          seller: '',
          photo: '',
          message: '好的，可以，没问题1111',
          time: '17 : 23 : 40'
        }
      ],
      adddialogVisible: false,
      Invitationcode: null
    }
  },
  methods: {
    ifempty(value) {
      return value || '--'
    },
    handleClose(done) {
      done()
    },
    handleAdd() {
      this.adddialogVisible = true
    },
    clickseller(item, index) {
      this.selleractive = index
    },
    handlEdeleteSeller(item, index) {},
    handleCurrentChange(val) {},
    gettime() {
      var now = new Date()
      var year = now.getFullYear() // 年
      var month = now.getMonth() + 1 // 月
      var day = now.getDate() // 日

      var hh = now.getHours() // 时
      var mm = now.getMinutes() // 分
      var ss = now.getSeconds() // 分

      // eslint-disable-next-line no-unused-vars
      var clock = year + '.'
      if (month < 10) {
        clock += '0'
      }
      clock += month + '.'
      if (day < 10) {
        clock += '0'
      }
      clock += day + ''
      var clock1 = ''
      if (hh < 10) {
        clock1 += '0'
      }
      clock1 += hh + ':'
      if (mm < 10) {
        clock1 += '0'
      }
      clock1 += mm + ':'
      if (ss < 10) {
        clock1 += '0'
      }
      clock1 += ss
      return clock1
      // this.time2 = clock1
    },
    sendmessage() {
      var message = {
        type: 2,
        seller: '',
        photo: '',
        message: this.chartmessage,
        time: this.gettime()
      }
      this.chartmessagelist.push(message)
      this.chartmessage = ''
      this.$nextTick(() => {
        var container = this.$el.querySelector('.chartboxbody')
        container.scrollTop = container.scrollHeight
      })
    },
    openchartbox() {
      $('.chartbox').removeClass('fadeOutDown')
      $('.chartbox').addClass('fadeInUp')
      this.showchartbox = true
    },
    closechartbox() {
      $('.chartbox').removeClass('fadeInUp')
      $('.chartbox').addClass('fadeOutDown')
      setTimeout(() => {
        this.showchartbox = false
      }, 1000)
    },
    gotoorder() {
      this.sellertype = 2
    },
    backseller() {
      this.sellertype = 1
    }
  },

  watch: {
    $route: {
      handler(to, from) {
        this.menuactive = to.path
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.orders-container {
  width: 100%;
  height: calc(100% - 50px);
  display: flex;
  flex: 1;
  .aside {
    width: 170px;
    height: 100%;
    background: #dbdfea;
    box-sizing: border-box;
    flex-shrink: 0;
    position: relative;
    .aside-menu {
      background-color: #fff0;
      border-right: solid 0px #e6e6e6;
    }
    /deep/ .el-menu-item {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
    }

    /deep/ .is-active {
      background-color: #0042f825 !important;
    }
    /deep/ .is-active:after {
      content: '';
      background-color: #66b1ff !important;
      width: 4px;
      position: absolute;
      right: 0;
      height: 100%;
    }
    /deep/.el-menu-item [class^='el-icon-'] {
      margin-right: 10px;
      font-size: 21px;
    }
    // /deep/.fa {
    //   margin-right: 10px;
    // }
    .asidebox {
      width: 100%;
      .asidehead {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 10px;
        box-sizing: border-box;
        .aside-item1 {
          display: flex;
          align-items: center;
          p {
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #2d2d2d;
          }
          i {
            margin-right: 5px;
            font-size: 20px;
          }
        }
      }
      .sellerlist {
        width: 100%;
        .sellerlist-item {
          width: 100%;
          height: 50px;
          box-sizing: border-box;
          padding: 0px 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          p {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #2d2d2d;
            display: flex;
            align-items: center;
            span {
              font-size: 12px;
              color: white;
              background: #ff8929;
              border-radius: 2px;
              padding: 2px 4px;
              margin-right: 5px;
            }
          }
        }
        .sellerlist-item:hover {
          background: #66b0ff23;
        }
        .active {
          background: #66b0ff3b;
        }
        .sellerlist-item1 {
          width: 100%;
          height: 45px;
          box-sizing: border-box;
          padding: 0px 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          p {
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #66b1ff;
            display: flex;
            align-items: center;
            span {
              font-size: 12px;
              color: white;
              background: #ff8929;
              border-radius: 2px;
              padding: 2px 4px;
              margin-right: 5px;
            }
          }
        }
        .sellerlist-item1:hover {
          background: rgba(0, 66, 248, 0.103);
        }
      }
    }
    .asidetool1 {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding-top: 10px;
      border-top: 1px solid #ccc;
    }
    .asidetool {
      position: absolute;
      bottom: 2%;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
  }
  .el-main {
    height: 100%;
    overflow-x: hidden;
    flex: 1;
  }
  .mainview {
    border-radius: 5px;
    height: 100%;
    .sellerbox {
      width: 100%;
      height: 100%;
      background: #ffffff;
      border-radius: 5px;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .sellerbox-left {
        width: 350px;
        height: 380px;
        background: #ffffff;
        border: 1px solid #55555528;
        border-collapse: collapse;
        border-radius: 3px;
        .sellerbox-left-top {
          width: 100%;
          height: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          p {
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #2d2d2d;
            line-height: 40px;
          }
          .tag {
            width: 80px;
            height: 40px;
            background: #ff8929;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #fefefe;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 0;
            right: 0;
            transform: rotate(45deg) translate(17%, -55%);
            transform-origin: center;
          }
        }
        .sellerbox-left-bottom {
          width: 100%;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .sellerbox-left-bottom-item {
            width: 50%;
            height: 100%;
            border: 1px solid #55555528;
            border-collapse: collapse;
            display: flex;
            align-items: center;
            justify-content: center;
            .contact {
              width: 140px;
              height: 50px;
              background: #3a81ff;
              border: 1px solid rgba(255, 255, 255, 0.5);
              border-radius: 7px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #ffffff;
              cursor: pointer;
              i {
                // margin-right: 10px;
                font-size: 18px;
              }
            }
            .goorder {
              width: 140px;
              height: 50px;
              background: #f0983c;
              border: 1px solid rgba(255, 255, 255, 0.5);
              border-radius: 7px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #ffffff;
              cursor: pointer;
              i {
                // margin-right: 10px;
                font-size: 18px;
              }
            }
          }
        }
      }
      .sellerbox-right {
        width: 1120px;
        height: 100%;
        background: #ffffff;
        border: 1px solid #55555528;
        border-radius: 3px;
        display: flex;
        flex-direction: column;
        .title {
          display: flex;
          align-items: center;
          border-bottom: 1px solid #55555528;
          padding: 0px 10px;
          box-sizing: border-box;
          p {
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #6b6b6b;
            line-height: 40px;
          }
        }
        .sellerbox-right-table {
          flex: 1;
          padding: 20px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          .el-table {
            flex: 1;
          }
          .statu0 {
            width: 56px;
            height: 28px;
            background: rgba(244, 92, 88, 0.1);
            border: 1px solid #f45c58;
            border-radius: 3px;
            text-align: center;
            line-height: 28px;
            color: #f45c58;
          }
          .statu1 {
            width: 56px;
            height: 28px;
            background: rgba(69, 197, 142, 0.1);
            border: 1px solid #45c58e;
            border-radius: 3px;
            text-align: center;
            line-height: 28px;
            color: #45c58e;
          }
          .statu2 {
            width: 56px;
            height: 28px;
            background: rgba(41, 142, 255, 0.1);
            border: 1px solid #66b1ff;
            border-radius: 3px;
            text-align: center;
            line-height: 28px;
            color: #66b1ff;
          }
          .pagination-container {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 10px;
          }
        }
      }
    }
  }
  .chartbox {
    width: 419px;
    height: 500px;
    background: #ffffff;
    box-shadow: 0px 0px 20px 0px rgba(124, 124, 124, 0.5);
    border-radius: 5px;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 2;
    .chartboxtitle {
      width: 100%;
      height: 60px;
      background: #298eff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0px 10px;
      box-sizing: border-box;
      .chartboxtitleleft {
        display: flex;
        align-items: center;
        img {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          margin-right: 10px;
        }
        p {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
        }
      }
      i {
        color: white;
        cursor: pointer;
      }
    }
    .chartboxbody {
      width: 100%;
      height: 320px;
      background: #f7f7f7;
      overflow: auto;
      overflow-x: hidden;
      padding: 20px 10px;
      box-sizing: border-box;

      .chartleft {
        margin-bottom: 15px;
        .charthead {
          display: flex;
          align-items: center;
          img {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            margin-right: 5px;
          }
          p {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #777777;
            margin-right: 10px;
          }
        }
        .chartcontent {
          background: #ffffff;
          border: 1px solid #e8e8e8;
          border-radius: 2px;
          padding: 10px;
          box-sizing: border-box;
          max-width: 330px;
          margin-left: 35px;
          p {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #2d2d2d;
            line-height: 18px;
          }
        }
      }
      .chartright {
        margin-bottom: 15px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        .charthead {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          img {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            margin-left: 5px;
          }
          p {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #777777;
            margin-left: 10px;
          }
        }
        .chartcontent {
          background: #298eff;
          border-radius: 3px;
          padding: 10px;
          box-sizing: border-box;
          max-width: 330px;
          align-self: flex-end;
          // margin-left: 35px;
          p {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
            line-height: 18px;
          }
        }
      }
    }
    .chartboxinputbox {
      width: 100%;
      height: 140px;
      /deep/.el-textarea {
        .el-textarea__inner {
          border: none;
          font-family: Microsoft YaHei;
        }
      }
      .tool {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 5px;
        padding: 0px 10px;
        box-sizing: border-box;
      }
    }
  }
  .chartbar {
    width: 420px;
    height: 60px;
    background: #ffffff;
    box-shadow: 0px 0px 20px 0px rgba(124, 124, 124, 0.5);
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    cursor: pointer;
    .chartbarleft {
      width: 60px;
      height: 100%;
      background: #298eff;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        color: white;
        font-size: 30px;
      }
    }
    .chartbarright {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;
      padding: 0px 20px;
      box-sizing: border-box;
      p {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #666666;
      }
      i {
        color: #298eff;
        font-size: 24px;
      }
    }
  }
  .addsellerbox {
    p {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #666666;
      line-height: 30px;
      i {
        color: #f29b2a;
      }
    }
    p:nth-child(1) {
      line-height: 32px;
    }
    p:nth-child(3) {
      color: #999999;
    }
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
}
</style>
