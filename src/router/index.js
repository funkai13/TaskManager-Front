import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('../views/Tasks/Index.vue')
    },
    {
      path: '/create/task',
      name: 'createtask',
      component: () => import('../views/Tasks/Create.vue')
    },
    {
      path: '/edit/task',
      name: 'edittask',
      component: () => import('../views/Tasks/Edit.vue')
    },
    {
      path: '/employees',
      name: 'employees',
      component: () => import('../views/Employees/Index.vue')
    },
    {
      path:'/comments',
      name:'comments',
      component: () => import('../views/Tasks/CommentTask.vue')
    },
    {
      path:'/newpassword',
      name:'newpassword',
      component: () => import('../views/NewPassword.vue')
    }
  ]
})
router.beforeEach(async (to) => {
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const auth = useAuthStore()
  if (authRequired && !auth.role) {
    auth.returnUrl = to.fullPath
    return '/login'
  }
})

export default router
