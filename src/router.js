import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    redirect: '/projects',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginPage.vue'),
    meta: { guestOnly: true, title: 'Log in' },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterPage.vue'),
    meta: { guestOnly: true, title: 'Create account' },
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/views/ProjectsPage.vue'),
    meta: { requiresAuth: true, title: 'ProjectsPage' },
  },
  {
    path: '/projects/:id(\\d+)',
    name: 'project-detail',
    component: () => import('@/views/ProjectDetailPage.vue'),
    props: (route) => ({ id: Number(route.params.id) }),
    meta: { requiresAuth: true, title: 'Project' },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/projects',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.meta.guestOnly && auth.isAuthenticated) {
    return { name: 'projects' }
  }
})

export default router
