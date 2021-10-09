import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      index: 1 // 添加 meta 属性，约定 1 为第一级
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      index: 2 // 添加 meta 属性，约定 2 为第二级
    }
  },
  {
    path: '/category',
    name: 'category',
    component: () => import(/* webpackChunkName: "category" */ '../views/Category.vue'),
    meta: {
      index: 1
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue'),
    meta: {
      index: 1
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue'),
    meta: {
      index: 1
    }
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import(/* webpackChunkName: "detail" */ '../views/Detail.vue'),
    meta: {
      index: 2
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      index: 2
    }
  },
  {
    path: '/product-list',
    name: 'product-list',
    meta: {
      index: 2
    },
    component: () => import(/* webpackChunkName: "product-list" */ '../views/ProductList.vue')
  },
  {
    path: '/product/:id',
    name: 'product',
    meta: {
      index: 3
    },
    component: () => import(/* webpackChunkName: "product" */ '../views/ProductDetail.vue')
  },
  {
    path: '/create-order',
    name: 'create-order',
    meta: {
      index: 2
    },
    component: () => import(/* webpackChunkName: "create-order" */ '../views/CreateOrder.vue')
  },
  {
    path: '/address',
    name: 'address',
    meta: {
      index: 2
    },
    component: () => import(/* webpackChunkName: "address" */ '../views/Address.vue')
  },
  {
    path: '/address-edit',
    name: 'address-edit',
    meta: {
      index: 2
    },
    component: () => import(/* webpackChunkName: "address-edit" */ '../views/AddressEdit.vue')
  },
  {
    path: '/order',
    name: 'order',
    meta: {
      index: 2
    },
    component: () => import(/* webpackChunkName: "order" */ '../views/Order.vue')
  },
  {
    path: '/order-detail',
    name: 'order-detail',
    meta: {
      index: 3
    },
    component: () => import(/* webpackChunkName: "order-detail" */ '../views/OrderDetail.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    meta: {
      index: 2
    },
    component: () => import(/* webpackChunkName: "setting" */ '../views/Setting.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
