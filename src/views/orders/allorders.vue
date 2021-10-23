<template>
  <div class="totalorder-container">
    <div class="filter-container">
      <el-form :inline="true" :model="searchForm" ref="searchForm">
        <el-form-item label="平台:" prop="platform">
          <el-input
            class="filter-item input-normal"
            v-model="searchForm.platform"
            placeholder="请输入平台"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="店铺名称:" prop="seller">
          <el-input
            class="filter-item input-normal"
            v-model="searchForm.seller"
            placeholder="请输入店铺名称"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="订单号:" prop="ordernum">
          <el-input
            class="filter-item input-normal"
            v-model="searchForm.ordernum"
            placeholder="请输入订单号"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="收件人:" prop="receiver">
          <el-input
            class="filter-item input-normal"
            v-model="searchForm.receiver"
            placeholder="请输入收件人姓名"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="收件人地址:" prop="del_to">
          <el-input
            class="filter-item input-normal"
            v-model="searchForm.del_to"
            placeholder="请输入收件人地址"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="仓库SKU:" prop="sku">
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
        <el-form-item label="发货仓库:" prop="warehouse">
          <el-input
            class="filter-item input-normal"
            v-model="searchForm.warehouse"
            placeholder="请输入仓库"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="物流单号:" prop="tracknum">
          <el-input
            class="filter-item input-normal"
            v-model="searchForm.tracknum"
            placeholder="请输入物流单号"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            size="small"
            @click="searchReset"
            icon="icon iconfont icon-qingkong"
            type="primary"
            plain
            >清空条件
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
            <el-button
              size="small"
              class="filter-item"
              type="primary"
              @click="changtagkey(1)"
              >全部订单
            </el-button>
            <el-button
              size="small"
              class="filter-item"
              type="primary"
              plain
              @click="changtagkey(2)"
              >已购买Label
            </el-button>
            <el-button
              size="small"
              class="filter-item"
              type="primary"
              plain
              @click="changtagkey(3)"
              >未购买Label
            </el-button>
            <el-button
              size="small"
              class="filter-item"
              type="primary"
              plain
              @click="changtagkey(4)"
              >已分配仓库
            </el-button>
            <el-button
              size="small"
              class="filter-item"
              type="primary"
              plain
              @click="changtagkey(5)"
              >未分配仓库
            </el-button>
            <el-button
              size="small"
              class="filter-item"
              type="primary"
              plain
              @click="changtagkey(6)"
              >已送达
            </el-button>
            <el-button
              size="small"
              class="filter-item"
              type="primary"
              plain
              @click="changtagkey(7)"
              >未送达
            </el-button>
          </el-button-group>
        </div>
        <div class="table-menu-right">
          <el-button
            size="mini"
            class="filter-item"
            @click="handleimport"
            type="primary"
            plain
            icon="icon iconfont icon-jichutubiao-"
            >导入
          </el-button>
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
        v-if="tagkey == 1"
        height="99%"
      >
        <el-table-column fixed type="selection" width="55"> </el-table-column>
        <el-table-column label="订单号" width="120">
          <template slot-scope="scope">
            <div>
              <span>{{ ifempty(scope.row.sku) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="订单详情" width="250">
          <template slot-scope="scope">
            <p>平台：{{ ifempty(scope.row.name) }}</p>
            <p>店铺名称：{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="订单明细" width="250">
          <template slot-scope="scope">
            <p>品名：{{ ifempty(scope.row.name) }}</p>
            <p>店铺SKU：{{ ifempty(scope.row.name) }}</p>
            <p>仓库SKU：{{ ifempty(scope.row.name) }}</p>
            <p>数量：{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="收件人" width="200">
          <template slot-scope="scope">
            <p>姓名：{{ ifempty(scope.row.name) }}</p>
            <p>地址：{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="发货物流信息" width="250">
          <template slot-scope="scope">
            <p>配送物流：{{ ifempty(scope.row.name) }}</p>
            <p>单号：{{ ifempty(scope.row.name) }}</p>
            <p>
              配送状态：
              <strong class="statu0" v-if="scope.row.statu == 0">待发货</strong>
              <strong class="statu1" v-if="scope.row.statu == 1">已发货</strong>
              <strong class="statu2" v-if="scope.row.statu == 2">已完成</strong>
              <el-button size="mini" style="margin-left: 5px"
                >更改配送状态</el-button
              >
            </p>
          </template>
        </el-table-column>
        <el-table-column label="发货仓库" width="200">
          <template slot-scope="scope">
            <p>{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作日期" width="250">
          <template slot-scope="scope">
            <p>创建日期：{{ ifempty(scope.row.name) }}</p>
            <p>分配日期：{{ ifempty(scope.row.name) }}</p>
            <p>发货日期：{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="240">
          <template slot-scope="scope">
            <el-button
              title="编辑"
              type="danger"
              size="mini"
              @click="handleEdit(scope.row)"
              >编辑
            </el-button>
            <el-button
              title="删除"
              type="warning"
              size="mini"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
            <el-dropdown style="margin-left: 10px" @command="handleCommand">
              <el-button type="primary" size="mini">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="buy">购买Label</el-dropdown-item>
                <el-dropdown-item>打印Label</el-dropdown-item>
                <el-dropdown-item>上传Label</el-dropdown-item>
                <el-dropdown-item>确认已经发货</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
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
        v-if="tagkey == 2"
      >
        <!-- <el-table-column label="序号" type="index" width="50"></el-table-column> -->
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="产品图片" width="120">
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
        <el-table-column label="数量" width="80">
          <template slot-scope="scope">
            <p>{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
            <p>{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="收件人信息">
          <template slot-scope="scope">
            <p>{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="scope">
            <p>{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button
              title="查看订单"
              type="primary"
              size="mini"
              @click="look(scope.row)"
              >查看订单
            </el-button>
            <el-button
              title="标记为已发"
              type="info"
              size="mini"
              @click="markyifa(scope.row)"
              >标记为已发
            </el-button>
            <el-button
              title="退单"
              type="danger"
              size="mini"
              @click="handleDelete(scope.row)"
            >
              退单
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
        v-if="tagkey == 3"
      >
        <!-- <el-table-column label="序号" type="index" width="50"></el-table-column> -->
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="产品图片" width="120">
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
        <el-table-column label="已发数量" width="80">
          <template slot-scope="scope">
            <p>{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="收件人信息">
          <template slot-scope="scope">
            <p>{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="物流追踪码">
          <template slot-scope="scope">
            <p>{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="发货时间">
          <template slot-scope="scope">
            <p>{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="货物状态" width="80">
          <template slot-scope="scope">
            <p class="statu0" v-if="scope.row.statu == 0">已下单</p>
            <p class="statu1" v-if="scope.row.statu == 1">运输中</p>
            <p class="statu2" v-if="scope.row.statu == 2">派送中</p>
            <p class="statu3" v-if="scope.row.statu == 3">已签收</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button
              title="查看订单"
              type="primary"
              size="mini"
              @click="look(scope.row)"
              >查看订单
            </el-button>
            <el-button
              title="标记为完成"
              type="info"
              size="mini"
              @click="markcomplete(scope.row)"
              >标记为已发
            </el-button>
            <el-button
              title="退单"
              type="danger"
              size="mini"
              @click="handleDelete(scope.row)"
            >
              退单
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
        v-if="tagkey == 5"
      >
        <!-- <el-table-column label="序号" type="index" width="50"></el-table-column> -->
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="产品图片" width="120">
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
        <el-table-column label="退单数量" width="80">
          <template slot-scope="scope">
            <p>{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="scope">
            <p>{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="退单时间">
          <template slot-scope="scope">
            <p>{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
            <p>{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
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
        v-if="tagkey == 4"
      >
        <!-- <el-table-column label="序号" type="index" width="50"></el-table-column> -->
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="产品图片" width="120">
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
        <el-table-column label="完成数量" width="80">
          <template slot-scope="scope">
            <p>{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="scope">
            <p>{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="发货时间">
          <template slot-scope="scope">
            <p>{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="到货时间">
          <template slot-scope="scope">
            <p>{{ ifempty(scope.row.name) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="货物状态" width="80">
          <template slot-scope="scope">
            <p class="statu0" v-if="scope.row.statu == 0">已下单</p>
            <p class="statu1" v-if="scope.row.statu == 1">运输中</p>
            <p class="statu2" v-if="scope.row.statu == 2">派送中</p>
            <p class="statu3" v-if="scope.row.statu == 3">已签收</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="230">
          <template slot-scope="scope">
            <el-button
              title="查看订单"
              type="primary"
              size="mini"
              @click="look(scope.row)"
              >查看订单
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
      title="订单详情"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div class="detailbox">
        <table border="1" cellpadding="10" border-collapse="collapse">
          <tr>
            <td class="tableitem1">订单信息：</td>
            <td class="tableitem2">sadf1234</td>
            <td class="tableitem1"></td>
            <td class="tableitem2"></td>
          </tr>
          <tr>
            <td class="tableitem1">SKU：</td>
            <td class="tableitem2">sku111</td>
            <td class="tableitem1">商品：</td>
            <td class="tableitem2">帽子</td>
          </tr>
          <tr>
            <td class="tableitem1">数量：</td>
            <td class="tableitem2" colspan="3">2</td>
          </tr>
          <tr>
            <td class="tableitem1">收件人</td>
            <td class="tableitem2" colspan="3">Joe</td>
          </tr>
          <tr>
            <td class="tableitem1">收件地址：</td>
            <td class="tableitem3" colspan="3">123123</td>
          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="Bug Shopping"
      :visible.sync="buymodelDialog"
      width="1200px"
      :before-close="handleShoppingClose"
    >
      <div>
        <div style="float: right">
          <el-button
            size="small"
            @click="dialogVisible = false"
            >返回</el-button
          >
        </div>
        <div style="clear: both"></div>
      </div>
      <div class="detailbox">
        <el-table :data="[{ id: 1 }]" style="width: 100%">
          <el-table-column prop="date" label="Order Detail" width="180">
            <template> sku: sku00001 </template>
          </el-table-column>
          <el-table-column prop="name" label="Weight and packing" width="280">
            <template>
              <el-row type="flex" justify="space-between">
                <el-col :span="11">
                  <el-input size="mini" type="number" placeholder="">
                    <el-select
                      style="width: 60px"
                      slot="append"
                      value="lb"
                      placeholder=""
                      size="mini"
                    >
                      <el-option label="lb" value="lb"></el-option>
                    </el-select>
                  </el-input>
                </el-col>
                <el-col :span="11">
                  <el-input size="mini" type="number" placeholder="">
                    <el-select
                      value="oz"
                      style="width: 60px"
                      slot="append"
                      placeholder=""
                      size="mini"
                    >
                      <el-option label="oz" value="oz"></el-option>
                    </el-select>
                  </el-input>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="Customer ship option">
            <template> Standard </template>
          </el-table-column>
          <el-table-column prop="address" label="Selected shopping service">
            <template> <el-button type="text">change</el-button></template>
          </el-table-column>
          <el-table-column prop="address" label="Declared value / Confirmation">
            <template>
              <el-input size="mini" type="number" placeholder="">
                <template slot="prepend">$</template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="Total">
            <template> $6.18</template>
          </el-table-column>
          <el-table-column prop="address" label="Option">
            <template>
              <el-button type="danger" size="small">删除此单</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="margin-top: 10px">
        <div style="float: right">
          <div>Total: $6.18</div>
          <el-button type="warning" size="small" @click="dialogVisible = false"
            >购买运单</el-button
          >
        </div>
        <div style="clear: both"></div>
      </div>
    </el-dialog>
    <el-dialog
      title="物流信息"
      :visible.sync="yifadialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        :model="yifaForm"
        class="yifa-form"
        label-width="110px"
        ref="yifaForm"
        :inline="true"
        style="width: 100%"
      >
        <el-table :data="yifaForm.list" border fit class="product-table">
          <el-table-column label="SKU" width="120">
            <template slot-scope="scope">
              <div>
                <span>{{ ifempty(scope.row.sku) }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="商品名称">
            <template slot-scope="scope">
              <p>{{ ifempty(scope.row.name) }}</p>
            </template>
          </el-table-column>
          <el-table-column label="应发数量" width="80">
            <template slot-scope="scope">
              <p>{{ ifempty(scope.row.ycount) }}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="scount"
            label="实发数量"
            width="80"
            v-if="yifastatu == 2"
          >
            <template slot-scope="scope">
              <p>{{ ifempty(scope.row.scount) }}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="scount"
            label="实发数量"
            width="80"
            v-if="yifastatu == 1"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'list.' + scope.$index + '.scount'"
                :rules="[
                  { required: true, message: '请输入数量', trigger: 'blur' },
                  { type: 'number', message: '必须为数字值' }
                ]"
              >
                <el-input
                  v-model.number="scope.row.scount"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="code" label="物流追踪码" v-if="yifastatu == 1">
            <template slot-scope="scope">
              <el-form-item :prop="'list.' + scope.$index + '.code'">
                <el-input
                  v-model.number="scope.row.code"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="reason" label="退单原因" v-if="yifastatu == 2">
            <template slot-scope="scope">
              <el-form-item :prop="'list.' + scope.$index + '.reason'">
                <el-input
                  v-model.number="scope.row.reason"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="desc" label="备注">
            <template slot-scope="scope">
              <el-form-item :prop="'list.' + scope.$index + '.desc'">
                <el-input
                  v-model.number="scope.row.describe"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" plain @click="yifadialogVisible = false"
          >取消</el-button
        >
        <el-button type="primary" @click="handlesure()" v-if="yifastatu == 1"
          >确定</el-button
        >
        <el-button type="primary" @click="chargeback()" v-if="yifastatu == 2"
          >确定</el-button
        >
      </span>
    </el-dialog>
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

        <div class="importdivitem">
          <div class="importdivitem-left">导入平台</div>
          <div class="importdivitem-right">
            <el-radio v-model="uploadType" label="Amazon">Amazon</el-radio>
            <el-radio v-model="uploadType" label="newegg2">newegg</el-radio>
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
      uploadType: 'Amazon',
      importstatu: '',
      importdialogVisible: false,
      buymodelDialog: true,
      searchForm: {
        sku: null,
        warehouse: null,
        time: null,
        name: null,
        platform: null,
        ordernum: null,
        receiver: null,
        del_to: null,
        tracknum: null,
        seller: null
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
          desc: '',
          statu: 0
        },
        {
          imgurl: '',
          sku: 'sdoj132',
          name: '一次性一用口罩',
          count: 300,
          price: 100,
          desc: '',
          statu: 1
        },
        {
          imgurl: '',
          sku: 'sdoj132',
          name: '一次性一用口罩',
          count: 300,
          price: 100,
          desc: '',
          statu: 2
        }
      ],
      yifaForm: {
        list: [
          {
            sku: 'Sodji123',
            name: '鼠标',
            ycount: 10,
            scount: null,
            code: null,
            reason: null,
            desc: null
          }
        ]
      },

      options: [
        { label: '确认发货', value: '1' },
        { label: '分配仓库', value: '2' },
        { label: '购买Label', value: '3' },
        { label: '打印Label', value: '4' },
        { label: '更新物流状态', value: '5' },
        { label: '删除订单', value: '6' }
      ],
      listLoading: false,
      listQuery: {
        current: 1,
        size: 10
      },
      total: 3,
      dialogVisible: false,
      yifadialogVisible: false,
      title: '',
      multipleSelection: [],
      option: null,
      tagkey: 1,
      yifastatu: 1
    }
  },
  methods: {
    handleShoppingClose() {
      this.buymodelDialog = false
    },
    handleCommand(command) {
      console.log(command)
      if (command === 'buy') {
        this.handleBuyClick()
      }
      // this.$message('click on item ' + command)
    },
    handleBuyClick() {
      this.dialogVisible = true
      console.log(11)
    },
    ifempty(value) {
      return value || '--'
    },
    getlist() {},
    handleFilter() {},
    handleimport() {
      this.importstatu = 'uploading'
      this.importdialogVisible = true
    },
    searchReset() {
      this.searchForm = {
        sku: null,
        warehouse: null,
        time: null,
        name: null,
        platform: null,
        ordernum: null,
        receiver: null,
        del_to: null,
        tracknum: null,
        seller: null
      }
    },
    look(row) {
      this.dialogVisible = true
    },
    handleEdit(row) {},
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    changtagkey(key) {
      this.tagkey = key
      if (this.tagkey === 1) {
        this.options = [{ label: '批量删除', value: '1' }]
      } else if (this.tagkey === 2) {
        this.options = [
          { label: '批量标记已发', value: '2' },
          { label: '批量导出订单', value: '3' },
          { label: '批量退单', value: '4' }
        ]
      } else if (this.tagkey === 3) {
        this.options = [
          { label: '批量标记为完成', value: '5' },
          { label: '批量导出订单', value: '3' },
          { label: '批量退单', value: '4' }
        ]
      } else if (this.tagkey === 4 || this.tagkey === 5) {
        this.options = [{ label: '批量删除', value: '1' }]
      }
    },
    handleDelete(row) {
      this.$confirm(
        '<p style="font-size: 18px;font-weight: bold;color: black;line-height: 32px;font-family: Microsoft YaHei;">您确定要退单吗?</p>',
        '删除',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning'
        }
      ).catch(() => {})
    },
    handleCurrentChange(val) {},
    handleClose(done) {
      done()
    },
    markyifa() {
      this.yifadialogVisible = true
    },
    handlesure() {
      if (this.yifaForm.list[0].scount < this.yifaForm.list[0].ycount) {
        console.log('实发数量小于应发数量')
        this.yifastatu = 2
      } else {
        this.yifadialogVisible = false
      }
    },
    chargeback() {
      this.yifadialogVisible = false
    },
    markcomplete(row) {}
  }
}
</script>

<style lang="less" scoped>
p {
  margin: 0;
}
.totalorder-container {
  /*
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  */

  width: 98%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 15px 15px;
  border-radius: 5px;

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

      .table-menu-right {
        position: absolute;
        height: auto;
        overflow: hidden;
        right: 0;
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
  border: 1px solid #298eff;
  border-radius: 3px;
  text-align: center;
  line-height: 28px;
  color: #298eff;
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
    .tableitem3 {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #333333;
      line-height: 28px;
    }
  }
}
.yifa-form {
  box-sizing: border-box;
  /deep/.el-form-item {
    margin-right: 20px;
    .el-form-item__content {
      width: calc(100% - 110px);
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
          border-color: #409eff;
        }
      }
      .el-input {
        .el-input__inner {
          padding: 0 0px 0 10px;
        }
        .el-input-group__append {
          .el-select {
            .el-input {
              .el-input__inner {
                padding: 0 0 0 8px;
              }
              .el-input__suffix {
                display: none;
              }
            }
          }
        }
      }
      .el-select {
        width: 100%;
      }
    }
  }
  .product-table {
    /deep/.el-table__header-wrapper {
      .el-table__header {
        thead {
          tr {
            background-color: #f8f8f8;
            th {
              background-color: #f8f8f8;
            }
          }
        }
      }
    }
    /deep/.el-table__body-wrapper {
      .el-table__body {
        .el-table__row {
          .cell {
            .el-form-item {
              margin: 0;
              width: 100%;
              .el-form-item__content {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
}

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
