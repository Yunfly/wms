<template>
  <div class="totalorder-container">
    <div class="filter-container">
      <el-form :inline="true" :model="searchForm" ref="searchForm">
        <el-form-item label="SKU:" prop="sku">
          <el-input
            class="filter-item input-normal"
            v-model="searchForm.sku"
            placeholder="请输入SKU"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="品名:" prop="name">
          <el-input
            class="filter-item input-normal"
            v-model="searchForm.name"
            placeholder="请输入品名"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="库位:" prop="warehouse">
          <CrudSelect
            :dic="types"
            v-model="searchForm.type"
            label="分类"
          ></CrudSelect>
        </el-form-item>
        <el-form-item>
          <el-button
            size=""
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
      <div class="table-menu">
        <div class="table-menu-left">
          <el-button-group>
            <el-button size="small" class="filter-item" type="primary"
              >全部商品
            </el-button>
            <el-button size="small" class="filter-item" type="primary" plain
              >待发货
            </el-button>
          </el-button-group>
        </div>
      </div>
      <el-table
        key="0"
        :data="list"
        border
        v-loading="listLoading"
        element-loading-text="加载中..."
        fit
        highlight-current-row
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column label="序号" type="index" width="50"></el-table-column> -->
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="商品图片" width="120">
          <template slot-scope="scope">
            <div>
              <img :src="scope.row.sku" alt="" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="SKU" width="120">
          <template slot-scope="scope">
            <div>
              <span>{{ ifempty(scope.row.sku) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="产品名称">
          <template slot-scope="scope">
            <p>{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="单位重量">
          <template slot-scope="scope">
            <p>{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="体积(inch)">
          <template slot-scope="scope">
            <p>{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="当前数量">
          <template slot-scope="scope">
            <p>{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="所属卖家">
          <template slot-scope="scope">
            <p>{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="所在位置" width="80">
          <template slot-scope="scope">
            <span>{{ ifempty(scope.row.desc) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="230">
          <template slot-scope="scope">
            <el-button
              title="详情"
              type="primary"
              size="mini"
              @click="look(scope.row)"
              >详情
            </el-button>
            <el-button
              title="移库"
              type="warning"
              size="mini"
              @click="handleEdit(scope.row)"
              >移库
            </el-button>
            <el-button
              title="删除"
              type="danger"
              size="mini"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
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
      <div class="toolbox">
        <CrudSelect
          :dic="options"
          v-model="option"
          label="选择要执行的操作"
        ></CrudSelect>
        <el-button size="small" type="primary" @click="handleFilter"
          >执行
        </el-button>
      </div>
    </div>
    <el-dialog
      title="移库"
      :visible.sync="yikudialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div>
        <div class="yiku">
          <p>所在位置：</p>
          <p>一库</p>
        </div>
        <div class="yiku">
          <p>转入位置：</p>
          <CrudSelect
            :dic="types"
            v-model="searchForm.type"
            label="仓库"
          ></CrudSelect>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="yikudialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="yikudialogVisible = false"
          >保 存</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div class="detailbox">
        <div class="detailboxitem">
          <div class="item">
            <p>所在库位：</p>
            <p>一库</p>
          </div>
          <div class="item">
            <p>下单时间：</p>
            <p>2021-03-16 14 : 00 : 56</p>
          </div>
        </div>
        <div class="detailboxtitle">
          <p>基本信息</p>
        </div>
        <table border="1" cellpadding="10" border-collapse="collapse">
          <tr>
            <td rowspan="2" class="tableitem1">商品图片：</td>
            <td rowspan="2" class="tableitem2"></td>
            <td class="tableitem1">长：</td>
            <td class="tableitem2">3英寸</td>
          </tr>
          <tr>
            <td class="tableitem1">宽：</td>
            <td class="tableitem2">3英寸</td>
          </tr>
          <tr>
            <td class="tableitem1">SKU：</td>
            <td class="tableitem2">sadf1234</td>
            <td class="tableitem1">高：</td>
            <td class="tableitem2">3英寸</td>
          </tr>
          <tr>
            <td class="tableitem1">产品名称：</td>
            <td class="tableitem2">鼠标</td>
            <td class="tableitem1">重量：</td>
            <td class="tableitem2">10千克</td>
          </tr>
          <tr>
            <td class="tableitem1">入库个数：</td>
            <td class="tableitem2">10</td>
            <td class="tableitem1">入库时间：</td>
            <td class="tableitem2">2021-3-16 14：28：58</td>
          </tr>
          <tr>
            <td class="tableitem1">所属卖家：</td>
            <td class="tableitem2">卖家xxxxxxxxxxx1</td>
            <td class="tableitem1">出库时间：</td>
            <td class="tableitem2">2021-3-16 14：28：58</td>
          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CrudSelect from '../../components/avue/crud-select.vue'
export default {
  components: {
    CrudSelect
  },
  created() {},
  data() {
    return {
      searchForm: {
        sku: null,
        warehouse: null,
        name: null
      },
      types: [
        { label: '一库', value: '1' },
        { label: '二库', value: '4' }
      ],
      list: [
        {
          imgurl: '',
          sku: 'sdoj132',
          name: '一次性一用口罩',
          count: 300,
          price: 100,
          desc: ''
        },
        {
          imgurl: '',
          sku: 'sdoj132',
          name: '一次性一用口罩',
          count: 300,
          price: 100,
          desc: ''
        },
        {
          imgurl: '',
          sku: 'sdoj132',
          name: '一次性一用口罩',
          count: 300,
          price: 100,
          desc: ''
        }
      ],
      options: [{ label: '批量删除', value: '1' }],
      listLoading: false,
      listQuery: {
        current: 1,
        size: 10
      },
      total: 3,
      dialogVisible: false,
      yikudialogVisible: false,
      title: '',
      multipleSelection: [],
      option: null
    }
  },
  methods: {
    ifempty(value) {
      return value || '--'
    },
    getlist() {},
    handleFilter() {},
    searchReset() {},
    look(row) {
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.yikudialogVisible = true
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDelete(row) {
      this.$confirm(
        '<p style="font-size: 18px;font-weight: bold;color: black;line-height: 32px;font-family: Microsoft YaHei;">您确定要将改商品删除吗?</p><p>友情提示：删除后该商品将出现在删除管理里，可进行恢复或彻底删除。</p>',
        '删除',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning'
        }
      )
        .then(() => {
          this.$confirm('仓储数量大于1，不可删除！', '操作提示', {
            confirmButtonText: '确认',
            showCancelButton: false,
            type: 'warning',
            center: true
          })
            .then(() => {})
            .catch(() => {})
        })
        .catch(() => {})
    },
    handleCurrentChange(val) {},
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
.totalorder-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .filter-container {
    width: 100%;
    background: #ffffff;
    border-radius: 4px;
    margin-bottom: 1%;
    padding: 10px;
    box-sizing: border-box;
    /deep/.el-form-item {
      vertical-align: bottom;
      width: 18%;
      margin-bottom: 0;
      .el-form-item__label {
        line-height: 28px;
      }
    }
    /deep/.el-form-item__content {
      display: block;
      .el-select {
        width: 100%;
      }
      .el-date-editor {
        width: 100%;
      }
    }
  }
  .twoheight1 {
    flex: 1;
    width: 100%;
    background: #ffffff;
    border-radius: 4px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .table-menu {
      position: relative;
      width: 100%;
      height: 6%;
      overflow: hidden;
      margin: 0;
      .table-menu-left {
        position: absolute;
        height: auto;
        overflow: hidden;
        left: 0;
      }
    }
    .el-table {
      height: 87% !important;
      margin: 0 !important;
      overflow: auto;
      border-bottom: 1px solid #ebeef5;
    }
    .pagination-container {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    /deep/.avue-tags__menu {
      margin-left: 10px;
    }
    .toolbox {
      display: flex;
      align-items: center;
      .el-select {
        margin-right: 20px;
      }
    }
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
.yiku {
  display: flex;
  align-items: center;
  width: 100%;
  p:nth-child(1) {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #666666;
    line-height: 40px;
    width: 80px;
  }
  .el-select {
    width: 80%;
  }
}
.detailbox {
  .detailboxitem {
    width: 100%;
    height: 50px;
    padding: 0px 20px;
    box-sizing: border-box;
    border: 1px solid #ececec;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .item {
      display: flex;
      align-items: center;
      p {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #666666;
      }
      .blue {
        color: #298eff;
      }
      :nth-child(2) {
        color: #333;
      }
    }
  }
  .detailboxtitle {
    width: 100%;
    p {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #333333;
      line-height: 60px;
      position: relative;
      margin-left: 10px;
    }
    p::before {
      content: '';
      width: 4px;
      height: 14px;
      background: #298eff;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -10px;
    }
  }
  table {
    width: 100%;
    border-collapse: collapse;
    tr th,
    tr td {
      border-collapse: collapse;
      border: 1px solid #55555528;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #666666;
    }
    .tableitem1 {
      text-align: right;
      width: 100px;
    }
    .tableitem2 {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #333333;
      line-height: 28px;
    }
  }
}
</style>
