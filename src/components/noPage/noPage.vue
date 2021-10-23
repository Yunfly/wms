<template>
  <div class="product-container">
    <div class="filter-container" v-if="searchForm">
      <el-form :inline="true" size="small" :model="searchForm" ref="searchForm">
        <el-row type="flex" align="middle">
          <el-col :span="20"> <slot name="filter"></slot> </el-col>
          <el-col :span="4">
            <el-button
              size="small"
              @click="searchReset"
              icon="icon iconfont icon-qingkong"
              type="primary"
              plain
              style="margin-bottom: 10px"
              >清空查询条件
            </el-button>
            <el-button
              size="small"
              type="primary"
              icon="icon iconfont icon-chaxun"
              @click="handleFilter"
              >查询
            </el-button>
          </el-col>
        </el-row>
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
        size="small"
        border
        :height="tableHeight"
        v-loading="listLoading"
        element-loading-text="加载中..."
        @selection-change="handleSelectionChange"
        fit
        highlight-current-row
      >
        <slot name="table"></slot>
      </el-table>
      <div class="tableactions-container">
        <div>
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
              @click="$emit('handleBitchDispatch', value, multipleSelection)"
            >
              批量执行
            </el-button>
          </div>
        </div>

        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pagination.current"
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
    if (!this.disabledAutoInit) {
      console.log(this.$store.getters.getApi)
      this.$store.dispatch('noPage/init')
    }
  },
  data() {
    return {
      multipleSelection: [],
      daa: [
        {
          batckNumber: 'string',
          desc: 'string',
          goods: [
            {
              count: 0,
              goodsId: 0,
              packId: 'string',
              sku: 'string'
            }
          ],
          id: 'string',
          logistic: 'string',
          lognumber: 'string',
          state: 0,
          updateTime: '2021-10-16T13:01:33.328Z'
        }
      ],
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
  props: ['searchForm', 'options', 'data', 'tableHeight', 'disabledAutoInit'],
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleFilter() {
      this.$emit('handleFilter', this.searchForm)
    },
    searchReset() {
      console.log(this.$refs.searchForm)
      this.$refs.searchForm.resetFields()
      this.$store.dispatch('noPage/init')
    },
    handleCurrentChange(current) {
      // this.updateStates({ pagination: { ...this.pagination, current } })
      this.$store.dispatch('noPage/init')
    }
  }
}
</script>

<style lang="less" src="./noPage.less" scoped />
