import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入登录模块
import Login from '../components/login.vue'
// 导入主页模块
import Home from '../components/Home.vue'
// 导入个人信息模块
import Info from '../components/info/info.vue'
// 导入上传博客模块
import uploadBlog from '../components/blog/upload.vue'
// 导入技能模块
import skill from '../components/skill/skill.vue'
// 导入我的博客模块
import BlogInit from '../components/blog/BlogInit.vue'
// 导入项目模块
import project from '../components/project/index.vue'

// 全局使用vue-router
Vue.use(VueRouter)

// FIXME:改善home子路由地址
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/info',
      children: [
        {
          path: '/info',
          component: Info
        },
        {
          path: '/uploadBlog',
          component: uploadBlog
        },
        {
          path: '/skill',
          component: skill
        },
        {
          path: '/myBlog',
          redirect: '/BlogInit'
        },
        {
          path: '/BlogInit',
          component: BlogInit
        },
        {
          path: '/project',
          component: project
        }
      ]
    }
  ]
})
// 挂载路由导航守卫，实现权限验证

router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next() 放行 next(login) 回到登录页
  if (to.path === '/login') return next()
  // 获取token
  const token = window.sessionStorage.getItem('authorization')
  if (!token) return next('/login')
  next()
})
export default router
