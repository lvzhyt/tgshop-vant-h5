import Vue from 'vue';
import App from './App';
import { router } from './router';
import { Toast,Lazyload } from 'vant';


Vue.use(Toast);
Vue.use(Lazyload);

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
