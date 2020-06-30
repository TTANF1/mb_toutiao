import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
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
  { path: '/search', component: () => import('@/views/search') }
]

const router = new VueRouter({
  routes
})

export default router
