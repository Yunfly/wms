<template>
  <div class="product-container">
    <div class="filter-container" v-if="searchForm">
      <el-form :inline="true" size="small" :model="searchForm" ref="searchForm">
        <slot name="filter"></slot>
        <el-form-item style="width: 300px">
          <el-button
            size="small"
            @click="searchReset"
            icon="icon iconfont icon-qingkong"
            type="primary"
            plain
            >清空查询条件
          </el-button>
          <el-button
            size="small"
            type="primary"
            icon="icon iconfont icon-chaxun"
            @click="handleFilter"
            >查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格功能列 -->
    <div class="twoheight1">
      <div class="table-menu clear">
        <div class="table-menu-left">
          <slot name="table-menu-left"></slot>
        </div>
        <div class="table-menu-right">
          <slot name="table-menu-right"></slot>
        </div>
      </div>
      <el-table
        key="0"
        :data="dataSource"
        border
        v-loading="listLoading"
        element-loading-text="加载中..."
        fit
        highlight-current-row
      >
        <slot name="table"></slot>
      </el-table>
      <div class="tableactions-container">
        <div v-show="options && options.length">
          <el-select v-model="value" placeholder="选择执行的操作">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-button
            title="批量执行"
            type="primary"
            size="medium"
            style="margin-left: 7px"
            @click="$emit('handleBitchDispatch', value)"
          >
            批量执行
          </el-button>
        </div>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pagination.number"
          :page-size="pagination.size"
          layout="total, prev, pager, next, jumper"
          :total="pageTotal"
        >
        </el-pagination>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  components: {},
  mounted() {
    console.log(this.$store.getters.getApi)
    this.$store.dispatch('noPage/init')
  },
  data() {
    return {
      value: this.options ? this.options.find((x) => x.isDefault).value : []
    }
  },
  computed: {
    ...mapState('noPage', {
      dataSource: (state) => state.dataSource,
      useName: (state) => state.useName,
      listLoading: (state) => state.loading,
      pagination: (state) => state.pagination,
      pageTotal: (state) => state.pageTotal
    })
  },
  props: ['searchForm', 'options'],
  watch: {
    value(val) {
      console.log(val)
    }
  },
  methods: {
    ...mapMutations({
      updateStates: 'noPage/updateStates'
    }),
    ifempty(value) {
      return value || '--'
    },
    handleFilter() {
      this.$emit('handleFilter', this.searchForm)
    },
    searchReset() {
      this.$refs.searchForm.resetFields()
    },
    handleCurrentChange(current) {
      // this.updateStates({ pagination: { ...this.pagination, current } })
      this.$store.dispatch('noPage/init')
    }
  }
}
</script>

<style lang="less" src="./noPage.less" scoped />
