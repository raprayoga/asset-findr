import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../Layout/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: 'home',
          name: 'Home',
          component: () => import('@/views/HomeView.vue')
        },
        {
          path: 'assets',
          name: 'Manage Assets',
          component: () => import('@/views/ManageAssetsView.vue'),
        },
        {
          path: 'assets/add',
          name: 'Add Assets',
          component: () => import('@/views/AddAssetView.vue'),
        },
        {
          path: 'settings',
          name: 'Settings',
          component: () => import('@/views/SettingView.vue')
        }
      ]
    }
  ]
})

export default router
