// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// import axios from './config/service'
import axios from 'axios'
import commonFilter from '@/tools/commonFilter'
import publicMethod from '@/tools/publicMethod'
import echarts from 'echarts'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
// link
axios.defaults.baseURL = 'http://saas-backend.dev.moneyworks.cn:30080/api/v2/'


// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// Vue.prototype.api = axios;
Vue.prototype.$http = axios

// console.log(process.env);

// 全局过滤器
Object.keys(commonFilter).forEach(key => {
  Vue.filter(key, commonFilter[key])
})
// 全局公共方法
Vue.prototype.publicMethod = publicMethod

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
