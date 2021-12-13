import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import axios from 'axios';
import store from '../store/index.js'

import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';



import Axios from 'axios';
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
// Vue.prototype.$http = Axios
// //定义全局默认配置
// // axios.defaults.headers.common['Authentication'] = store.state.token;
Axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem("token")
    //token存在
    if (token) {
      console.log(token);
      config.headers.Authorization = 'JWT ' + token;
    }
    return config;
  },error => {
    return Promise.reject(error);
  }
);



Vue.config.productionTip = false

/**
 * ElementUI配置并生效，全局使用
 */
Vue.use(ElementUI, {
  size: 'small'
});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
