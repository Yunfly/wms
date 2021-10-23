<template>
  <div class="accountset-container">
    <div class="title">
      <i class="el-icon-s-tools"></i>
      <span slot="title">基础信息</span>
    </div>
    <div class="account-body">
      <div class="account-body-left">
        <div
          class="account-menu"
          :class="menuactive == 0 ? 'isactive' : ''"
          @click="clickmenu(0)"
        >
          <p>账号信息</p>
        </div>
        <div
          class="account-menu"
          :class="menuactive == 1 ? 'isactive' : ''"
          @click="clickmenu(1)"
        >
          <p>公司信息</p>
        </div>
        <div
          class="account-menu"
          :class="menuactive == 2 ? 'isactive' : ''"
          @click="clickmenu(2)"
        >
          <p>权限管理</p>
        </div>
      </div>
      <div class="account-body-right">
        <accountinfo v-if="menuactive == 0" />
        <companyinfo v-if="menuactive == 1" />
        <authorityinfo v-if="menuactive == 2" />
      </div>
    </div>
  </div>
</template>

<script>
import accountinfo from './acount-info.vue'
import companyinfo from './company-info.vue'
import authorityinfo from './authority-info.vue'
export default {
  components: {
    accountinfo,
    companyinfo,
    authorityinfo
  },
  created() {
    // this.getAccountInfo()
  },
  data() {
    return {
      accountInfo: {},
      menuactive: 0
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
        .then(res => {
          res = res.data
          console.log(res)
          localStorage.role = res.data.role
          this.accountInfo = res.data
        })
        .catch(err => {
          this.$handleResError(err.response)
        })
    },
    clickmenu(index) {
      if (index !== this.menuactive) {
        this.menuactive = index
      }
    }
  }
}
</script>

<style lang="less" scoped>
p {
  margin: 0;
}
.accountset-container {
  width: 98%;
  height: 100%;
  background: #ffffff;
  margin: 15px 15px;
  border-radius: 5px;
  .title {
    width: 100%;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #333333;
    line-height: 21px;
    height: 50px;
    border-bottom: 1px solid #33333311;
    display: flex;
    align-items: center;
    padding-left: 30px;
    i {
      color: #999999;
      margin-right: 10px;
    }
  }
  .account-body {
    width: 100%;
    display: flex;
    height: calc(100% - 50px);
    .account-body-left {
      width: 170px;
      height: 100%;
      border-right: 1px solid #33333311;
      .account-menu {
        width: 170px;
        height: 59px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #33333311;
        cursor: pointer;
        p {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #666666;
          line-height: 21px;
        }
      }
      .isactive {
        background: #f8f8f8;
        position: relative;
        p {
          color: #66b1ff;
        }
        p::before {
          width: 3px;
          height: 100%;
          background: #66b1ff;
          position: absolute;
          left: 0;
          top: 0;
          content: '';
        }
      }
    }
    .account-body-right {
      height: 100%;
      width: calc(100% - 170px);
    }
  }
}
</style>
