import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
// 加入代码


  routes: [
    {
      path: '/',
      redirect: '/helloHome'
    },
    {
      path: '/',
      component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
      meta: { title: 'helloFront' },
      children: [
        {
          path: '/helloHome',
          component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/index.vue'),
          meta: { title: '首页' }
        },
        {
          path: '/notes',
          component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/notes.vue'),
          meta: { title: '贴吧' }
        },
        {
          path: '/goodsDesc',
          component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/goodsDesc.vue'),
          meta: { title: '商品详情' }
        },
        {
          path: '/carts',
          component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/carts.vue'),
          meta: { title: '购物车' }
        },
        {
          path: '/collection',
          component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/collection.vue'),
          meta: { title: '我的收藏' }
        },
        {
          path: '/detailOrder',
          component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/detailOrder.vue'),
          meta: {title: '订单详情'}
        },
        {
          path: '/myOrders',
          component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/myOrders.vue'),
          meta: { title: '我的订单' }
        },
        {
          path: '/makeSureOrder',
          component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/makeSureOrder.vue'),
          meta: { title: '确认订单' }
        },
        {
          path: '/submitOrder',
          component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/submitOrder.vue'),
          meta: { title: '提交订单' }
        },
        {
          path: '/categoryDetail',
          component: () => import(/* webpackChunkName: "403" */ '../components/page/categoryDetail.vue'),
          meta: { title: 'categoryDetail' }
        },
        {
          path: '/userInfo',
          component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/userInfo.vue'),
          meta: { title: '个人信息' }
        },
        {
          path: '/search',
          component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/search.vue'),
          meta: { title: '搜索商品' }
        },
        {
          path: '/addressMag',
          component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/addressMag.vue'),
          meta: { title: '地址管理' }
        },
        {
          path: '/404',
          component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
          meta: { title: '404' }
        },
        {
          path: '/403',
          component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
          meta: { title: '403' }
        }

      ]
    },
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "login" */ '../components/page/login.vue'),
      meta: { title: '登录' }
    },
    {
      path: '/register',
      component: () => import(/* webpackChunkName: "login" */ '../components/page/register.vue'),
      meta: { title: '注册' }
    },
    // {
    //   path: '/register',
    //   component: () => import(/* webpackChunkName: "login" */ '../components/page/Register.vue'),
    //   meta: { title: '注册' }
    // },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
