import Vue from 'vue'
import Router from 'vue-router'
import AdminIndex from '../components/index/index.vue'
import Login from '../container/login/index.vue'
import User from '../container/admin/user/index.vue'
import Classification from '../container/admin/classification/index.vue'
import GoodsInfoManage from '../container/admin/goodsInfoManage/index.vue'
import GoodsDetail from '../container/main/goodsDetail/index.vue'

import Index from '../container/main/index'
import ShoppingCart from '../container/main/shoppingCart/index'
import DeliverAddress from '../container/main/deliverAddress/index'
import PersonCenter from '../container/main/personalCenter/index'
import BuyNow from '../container/main/buyNow/index'

import ColorEgg from '../container/main/colorEgg/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin',
      children: [{
        path: 'user',
        component: User
      }, {
        path: 'classification',
        component: Classification
      }, {
        path: 'goods',
        component: GoodsInfoManage
      }],
      component: AdminIndex
    }, {
      path: '/index',
      component: Index
    }, {
      path: '/detail/:id',
      component: GoodsDetail
    }, {
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: ShoppingCart
    }, {
      path: '/my',
      children: [{
        path: 'deliverAddress',
        name: 'deliverAddress',
        component: DeliverAddress
      }],
      component: PersonCenter
    }, {
      path: '/buyNow/:ids',
      name: 'buyNow',
      component: BuyNow
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/colorEgg',
      name: 'colorEgg',
      component: ColorEgg
    }
  ]
})
