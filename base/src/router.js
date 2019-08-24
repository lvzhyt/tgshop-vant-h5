import Vue from 'vue';
import Router from 'vue-router';
import { getToken, canTurnTo } from '@/libs/util'

Vue.use(Router);

const LOGIN_PAGE_NAME = 'login'
const ACCESS_ANON = "anon"
const ACCESS_AUTH = "auth"

const routes = [
  {
    path: '*',
    redirect: '/home'
  },
  {
    name: 'home',
    component: () => import('./view/home'),
    meta: {
      title: '首页',
      access: ACCESS_ANON
    }
  },
  {
    name: 'honey',
    component: () => import('./view/honey'),
    meta: {
      title: 'honey',
      access: ACCESS_ANON
    }
  },
  {
    name: 'login',
    component: () => import('./view/login'),
    meta: {
      title: '登录',
      access: ACCESS_ANON
    }
  },
  {
    name: 'search',
    component: () => import('./view/search'),
    meta: {
      title: '搜索'
    }
  },
  {
    name: 'category',
    component: () => import('./view/category'),
    meta: {
      title: '分类'
    }
  },{
    name: 'find',
    component: () => import('./view/find'),
    meta: {
      title: '发现'
    }
  },
  {
    name: 'user',
    component: () => import('./view/user'),
    meta: {
      title: '会员中心'
    }
  },
  {
    name: 'cart',
    component: () => import('./view/cart'),
    meta: {
      title: '购物车'
    }
  },
  {
    name: 'goods-detail',
    component: () => import('./view/goods/goods-detail'),
    meta: {
      title: '商品详情'
    }
  },
  {
    name: 'goods-list',
    component: () => import('./view/goods/goods-list'),
    meta: {
      title: '商品列表',
      access: ACCESS_ANON
    }
  },
  {
    name: 'order_confirm',
    component: () => import('./view/trade/order_confirm'),
    meta: {
      title: '填写订单',
      access: ACCESS_AUTH
    }
  }
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

//登录访问控制
router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  const token = getToken()
  if (title) {
    document.title = title;
  }
  if(!token) {
    // 未登录
    let accessAble = canTurnTo(to.name, ACCESS_ANON, routes)
    if(accessAble){
      next()
    }else {
      // 跳转到登录页
      next({
        name: LOGIN_PAGE_NAME
      })
    }
  }else{
    next()
  }
});

export {
  router
};
