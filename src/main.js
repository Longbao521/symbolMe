import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入字体图标
import './assets/iconFont/iconfont.css'
import './assets/iconFont1/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
// 导入动画库
import './assets/css/animate.css'
// 导入侧边栏图标
import './assets/asideIconFont/iconfont.css'
// 导入视频播放样式
import 'video.js/dist/video-js.css'
// 导入矢量图标
// import 'font-awesome/less/font-awesome.less'
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
// 全局注册命令，防止按钮在发送请求过程中，发送多次请求
Vue.directive('btn-control', {
  // 插入dom时
  inserted: function (el, bind) {
    el.addEventListener('click', () => {
      el.disabled = true
      bind.value().then(res => { // bind.value()会触发相应的函数，指令绑定的函数返回值后，触发
        el.disabled = false
      })
    })
  }
})
// 全局注册div拖拽命令
Vue.directive('drag', {
  bind: function (el, bind) {
    el.onclick = function (e) {
      var flag = bind.value.getFlag() // 得到绑定元素的状态
      flag = !flag // 状态取反
      var disx = e.pageX - el.offsetLeft
      var disy = e.pageY - el.offsetTop
      document.onmousemove = function (e) {
        var xx = e.pageX - disx + 'px'
        var yy = e.pageY - disy + 'px'
        el.style.left = xx
        el.style.top = yy
        bind.value.setXY(xx, yy) // 保存拖拽的位置
      }
      if (!flag) {
        document.onmousemove = document.onmouseup = null // 不处于拖拽状态
      }
      bind.value.setFlag(flag)
      bind.value.setActive(flag)
      bind.value.setRedBorder(!flag)
    }
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
