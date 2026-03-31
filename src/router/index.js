import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

// Game views are lazy-loaded so they are excluded from the initial bundle.
// Each becomes its own chunk and is only fetched when first navigated to.
const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/alphabet', name: 'alphabet', component: () => import('@/views/AlphabetGameView.vue') },
  { path: '/counting', name: 'counting', component: () => import('@/views/CountingGameView.vue') },
  { path: '/colors', name: 'colors', component: () => import('@/views/ColorGameView.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export default createRouter({
  history: createWebHistory('/tiny-taps/'),
  routes,
})
