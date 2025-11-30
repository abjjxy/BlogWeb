import { createRouter, createWebHistory } from 'vue-router'
import { isLogin } from '@/utils/auth'

const routes = [
  // 前台路由
  {
    path: '/',name: 'FrontLayout',component: () => import('@/layouts/FrontLayout.vue'),
    children: [
      { path: '', name: 'BlogList', component: () => import('@/pages/front/BlogList.vue') },
      { path: '/blog/:id', name: 'BlogDetail', component: () => import('@/pages/front/BlogDetail.vue') },
    ]
  },

  // 后台路由
  {
    path: '/admin/login',name: 'AdminLogin',component: () => import('@/pages/admin/Login.vue')
  },

  {
    path: '/admin',name: 'AdminLayout',component: () => import('@/layouts/AdminLayout.vue'),meta: { requireAuth: true },
    children: [
      { path: '', name: 'AdminHome', component: () => import('@/pages/admin/Home.vue') },
      { path: 'blogs', name: 'BlogManage', component: () => import('@/pages/admin/BlogManage.vue') },
      { path: 'blogs/create', name: 'BlogCreate', component: () => import('@/pages/admin/BlogForm.vue') },
      { path: 'blogs/:id/edit', name: 'BlogEdit', component: () => import('@/pages/admin/BlogForm.vue') },
      { path: 'categories', name: 'CategoryManage', component: () => import('@/pages/admin/CategoryManage.vue') },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫：验证登录状态
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth && !isLogin()) {
    next('/admin/login') // 未登录跳转至登录页
  } else {
    next()
  }
})

export default router