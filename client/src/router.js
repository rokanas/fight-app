import { createRouter, createWebHistory } from 'vue-router'
import LogSign from './views/LogSign.vue'
import Profile from './views/Profile.vue'
import EditProfile from './views/EditProfile.vue'
import Opponent from './views/Opponent.vue'

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
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/profile/:id/edit',
    name: 'EditProfile',
    component: EditProfile
  },
  {
    path: '/opponent',
    name: 'Opponent',
    component: Opponent
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
