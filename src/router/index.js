import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AlphabetGameView from '@/views/AlphabetGameView.vue'
import CountingGameView from '@/views/CountingGameView.vue'
import ColorGameView from '@/views/ColorGameView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/alphabet', name: 'alphabet', component: AlphabetGameView },
  { path: '/counting', name: 'counting', component: CountingGameView },
  { path: '/colors', name: 'colors', component: ColorGameView },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export default createRouter({
  history: createWebHistory('/tiny-taps/'),
  routes,
})
