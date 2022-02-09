import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/author-management',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/author-management',
        component: () => import('@/views/AuthorManagement.vue'),
      },
      {
        path: '/tag-group-management',
        component: () => import('@/views/TagGroupManagement.vue'),
      },
      {
        path: '/tag-management',
        component: () => import('@/views/TagManagement.vue'),
      },
      {
        path: '/category-management',
        component: () => import('@/views/CategoryManagement.vue'),
      },
      {
        path: '/resource-management',
        component: () => import('@/views/Resource.vue'),
      },
      {
        path: '/paragraph',
        component: () => import('@/views/Paragraph.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/Test.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
