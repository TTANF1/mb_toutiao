import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/login', component: () => import('@/views/login') },
  {
    path: '/layout',
    component: () => import('@/views/layout'),
    children: [
      { path: '/home', component: () => import('@/views/home') },
      { path: '/question', component: () => import('@/views/question') },
      { path: '/video', component: () => import('@/views/video') },
      { path: '/my', component: () => import('@/views/my') }
    ]
  },
  { path: '/search', component: () => import('@/views/search') },
  {
    path: '/article/:articleId',
    component: () => import('@/views/article'),
    props: true // 组件获取路由参数
  },
  {
    path: '/user/profile',
    component: () => import('@/views/user-profile')
  }
]

const router = new VueRouter({
  routes
})

export default router
