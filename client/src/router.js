import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue' // Import App.vue

const routes = [
  {
    path: '/',
    name: 'App',
    component: App,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
