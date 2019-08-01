import Vue from 'vue';
import Router from 'vue-router';
import { setToken, getToken, canTurnTo, setTitle } from '@/libs/util'

Vue.use(Router);

const LOGIN_PAGE_NAME = 'login'
const HOME_PAGE_NAME = 'home'
const ACCESS_ANON = "anon"

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
    name: 'goods',
    component: () => import('./view/goods'),
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
  }
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

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
