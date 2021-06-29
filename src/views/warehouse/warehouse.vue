<template>
  <div class="warehouse-container">
    <div class="aside">
      <el-menu
        :default-active="menuactive"
        class="aside-menu"
        text-color="#000"
        active-text-color="#000"
        router
      >
        <el-menu-item index="/allgoods">
          <i class="fa fa-shopping-bag" aria-hidden="true"></i>
          <span slot="title">所有商品</span>
        </el-menu-item>
        <el-menu-item index="/deletegoods">
          <i class="fa fa-trash" aria-hidden="true"></i>
          <span slot="title">删除商品</span>
        </el-menu-item>
      </el-menu>
    </div>
    <el-main>
      <div class="mainview">
        <router-view></router-view>
      </div>
    </el-main>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      menuactive: '/allgoods'
    }
  },
  methods: {},

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
.warehouse-container {
  width: 100%;
  height: calc(100% - 50px);
  display: flex;
  flex: 1;
  .aside {
    width: 150px;
    height: 100%;
    background: #dbdfea;
    box-sizing: border-box;
    flex-shrink: 0;
    .aside-menu {
      background-color: #fff0;
      border-right: solid 0px #e6e6e6;
    }
    /deep/ .el-menu-item {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
    }

    /deep/ .is-active {
      background-color: #0042f825 !important;
    }
    /deep/ .is-active:after {
      content: '';
      background-color: #298eff !important;
      width: 4px;
      position: absolute;
      right: 0;
      height: 100%;
    }
    /deep/.el-menu-item [class^='el-icon-'] {
      margin-right: 10px;
      font-size: 21px;
    }
    /deep/.fa {
      margin-right: 10px;
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
  }
}
</style>
