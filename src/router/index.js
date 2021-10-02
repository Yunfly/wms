// /* global BigInt */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/login.vue'
import Dashboard from '../components/dashboard.vue'
import Dashhome from '../components/dashhome.vue'
import AccoutSetting from '../views/acount/account-setting.vue'
// import Orders from '../views/orders/orders.vue'
import allorders from '../views/orders/allorders.vue'
import deleteorders from '../views/orders/deleteorders.vue'
import Storages from '../views/storage/storages.vue'
import forecaststorage from '../views/storage/forecaststorage.vue'
import bulkstorage from '../views/storage/bulkstorage.vue'
import allrecords from '../views/storage/allrecords.vue'
import recordsbin from '../views/storage/recordsbin.vue'
import returningbin from '../views/storage/returningbin.vue'
import shipmentbin from '../views/storage/shipmentbin.vue'
import directorder from '../views/storage/directorder.vue'
import returningstock from '../views/storage/returningstock.vue'
import batchorder from '../views/storage/batchorder.vue'
import totalorder from '../views/storage/totalorder.vue'
import orderrecycle from '../views/storage/orderrecycle.vue'
import fbashiping from '../views/storage/fbashiping.vue'
import tuning from '../views/storage/tuning.vue'
import clearinventory from '../views/storage/clearinventory.vue'
import inventoryrecord from '../views/storage/inventoryrecord.vue'
import operationflow from '../views/storage/operationflow.vue'
import Product from '../views/product/product.vue'
import ProductStore from '../views-store/product/product.vue'

import Warehouse from '../views/warehouse/warehouse.vue'
import allgoods from '../views/warehouse/allgoods.vue'
import deletegoods from '../views/warehouse/deletegoods.vue'
import sys from '../views/sys/index.vue'
import StoreInfo from '../views/sys/store-info.vue'
import Ht from '../views/sys/ht.vue'
import WarehouseList from '../views/warehouse-list/index.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/login'
},
{
  path: '/login',
  name: '登录',
  component: Login
},
{
  path: '/dashhome',
  name: '首页',
  component: Dashboard,
  children: [{
    path: '/dashboard',
    name: '数据报表',
    component: Dashhome
  },
  {
    path: '/account',
    name: '账户信息',
    component: AccoutSetting
  },
  {
    path: '/product',
    name: '产品信息',
    component: Product
  },
  {
    path: '/product-store',
    name: '产品信息',
    component: ProductStore
  },
  {
    path: '/orders',
    name: '订单管理',
    component: allorders,
    redirect: '/allorders',
    children: [{
      path: '/allorders',
      name: '所有订单',
      component: allorders
    },
    {
      path: '/deleteorders',
      name: '删除订单',
      component: deleteorders
    }
    ]
  },
  {
    path: '/storages',
    name: '仓库管理',
    component: Storages,
    redirect: '/storagedashboard',
    children: [{
      path: '/sproduct',
      name: '仓库商品信息',
      component: Product
    },
    {
      path: '/storagedashboard',
      name: '数据报表',
      component: Dashhome
    },
    {
      path: '/forecaststorage',
      name: '预报入库',
      component: forecaststorage
    },
    {
      path: '/bulkstorage',
      name: '批量入库',
      component: bulkstorage
    },
    {
      path: '/allrecords',
      name: '全部记录',
      component: allrecords
    },
    {
      path: '/recordsbin',
      name: '记录回收站',
      component: recordsbin
    },
    {
      path: '/otherstockrecord',
      name: '其他入库记录',
      component: returningbin
    },
    {
      path: '/ordershipingrecord',
      name: '其他出库记录',
      component: shipmentbin
    },
    {
      path: '/directorder',
      name: '直接下单',
      component: directorder
    },
    {
      path: '/returningstock',
      name: '直接下单',
      component: returningstock
    },
    {
      path: '/batchorder',
      name: '批量下单',
      component: batchorder
    },
    {
      path: '/totalorder',
      name: '全部订单',
      component: totalorder
    },
    {
      path: '/orderrecycle',
      name: '订单回收站',
      component: orderrecycle
    },
    {
      path: '/fbashiping',
      name: 'FBA发货',
      component: fbashiping
    },
    {
      path: '/tuning',
      name: '调库',
      component: tuning
    },
    {
      path: '/clearinventory',
      name: '清理库存',
      component: clearinventory
    },
    {
      path: '/inventoryrecord',
      name: '库存记录',
      component: inventoryrecord
    },
    {
      path: '/operationflow',
      name: '操作流水',
      component: operationflow
    }
    ]
  },
  {
    path: '/warehouse',
    name: '仓库管理',
    component: Warehouse,
    redirect: '/allgoods',
    children: [{
      path: '/allgoods',
      name: '所有商品',
      component: allgoods
    },
    {
      path: '/deletegoods',
      name: '删除商品',
      component: deletegoods
    }
    ]
  },
  {
    path: '/warehouse-list',
    name: '仓库列表',
    component: WarehouseList,
    // redirect: '/allgoods',
    children: [{
      path: '/allgoods',
      name: '所有商2品',
      component: allgoods
    },
    {
      path: '/deletegoods',
      name: '删除3商品',
      component: deletegoods
    }
    ]
  },
  {
    path: '/sys',
    name: '系统设置 > 库位管理',
    component: sys,
    children: [{
      path: '/store-info',
      name: '店铺信息',
      component: StoreInfo
    },
    {
      path: '/ht',
      name: '合同条款',
      component: Ht
    }
    ]
  }
  ]
}
]

// const routesForStore = [{
//   path: '/',
//   redirect: '/login'
// }]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 检查登入状态
  var islogin = true
  var token = window.localStorage.getItem('wms_auth_access_token')
  var expires = window.localStorage.getItem('wms_auth_expires')
  if (token && expires && Number(expires) > new Date().getTime()) {
    islogin = true
  } else {
    islogin = false
  }
  console.log(islogin)
  // 访问登入页面时，如果已登入，跳转至控制面板，否则放行
  if (to.path === '/login' && !islogin) {
    return next()
  }
  if (to.path === '/login' && islogin && from.path !== '/dashboard') {
    return next('/dashboard')
  }
  // 如果未登入，跳转至登入页面，否则放行
  if (!islogin) {
    return next('/login')
  } else {
    next()
  }
})

export default router
