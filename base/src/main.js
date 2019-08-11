import Vue from 'vue';
import App from './App';
import { router } from './router';
import { Toast,Lazyload } from 'vant';

// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.use(Toast);
Vue.use(Lazyload);

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
