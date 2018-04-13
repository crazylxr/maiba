import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/index/index.vue'
import Login from '../container/login/index.vue'
import User from '../container/admin/user/index.vue'
import Classification from '../container/admin/classification/index.vue'
import GoodsInfoManage from '../container/admin/goodsInfoManage/index.vue'

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
      component: Index
    }, {

    }, {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
