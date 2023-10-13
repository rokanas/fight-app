import { createRouter, createWebHistory } from 'vue-router'
import LogSign from './views/LogSign.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LogSign
  },
  {
    path: '/',
    redirect: '/login'
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
