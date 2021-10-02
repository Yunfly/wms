// /* global BigInt */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/login.vue'
import Dashboard from '../components/dashboard.vue'
import Dashhome from '../components/dashhome.vue'
// import Orders from '../views-store/orders/orders.vue'
import ProductStore from '../views-store/product/product.vue'

import Storages from '../views-store/storage/storages.vue'
import forecaststorage from '../views-store/storage/forecaststorage.vue'
import bulkstorage from '../views-store/storage/bulkstorage.vue'
import allrecords from '../views-store/storage/allrecords2.vue'
import recordsbin from '../views-store/storage/recordsbin.vue'
import returningbin from '../views-store/storage/returningbin.vue'
import shipmentbin from '../views-store/storage/shipmentbin.vue'
import directorder from '../views-store/storage/directorder.vue'
import returningstock from '../views-store/storage/returningstock.vue'
import batchorder from '../views-store/storage/batchorder.vue'
import totalorder from '../views-store/storage/totalorder.vue'
import orderrecycle from '../views-store/storage/orderrecycle.vue'
import fbashiping from '../views-store/storage/fbashiping.vue'
import tuning from '../views-store/storage/tuning.vue'
import clearinventory from '../views-store/storage/clearinventory.vue'
import inventoryrecord from '../views-store/storage/inventoryrecord.vue'
import operationflow from '../views-store/storage/operationflow.vue'

import UserList from '../views-store/user-list/index.vue'

import sys from '../views-store/sys/index.vue'
import StoreInfo from '../views-store/sys/storehouse-info.vue'
import Ht from '../views-store/sys/ht.vue'

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
    path: '/user-list',
    name: '用户列表',
    component: UserList
  },
  {
    path: '/product-store',
    name: '产品信息(仓库)',
    component: ProductStore
  },
  {
    path: '/storages',
    name: '仓库管理',
    component: Storages,
    redirect: '/storagedashboard',
    children: [{
      path: '/sproduct',
      name: '仓库商品信息',
      component: ProductStore
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
    path: '/sys',
    name: '系统设置 > 仓库信息',
    component: sys,
    children: [{
      path: '/store-info',
      name: '我的仓库',
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
