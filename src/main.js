import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入字体图标
import './assets/iconFont/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
// 导入动画库
import './assets/css/animate.css'
// 导入侧边栏图标
import './assets/asideIconFont/iconfont.css'
// 导入视频播放样式
import 'video.js/dist/video-js.css'
// 导入axios
import axios from 'axios'

Vue.config.productionTip = false
// 设置axios全局根路径
axios.defaults.baseURL = 'http://127.0.0.1:3000/'
// 为axios设置拦截函数
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('authorization')
  return config
})
// 全局注册axios
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
