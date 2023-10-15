import { createRouter, createWebHistory } from 'vue-router'
import LogSign from './views/LogSign.vue'
import Profile from './views/Profile.vue'
import EditProfile from './views/EditProfile.vue'
import FightDateHistory from './views/FightDate.vue'
import Fight from './views/Fight.vue'
import Date from './views/Date.vue'

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
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/edit-profile',
    name: 'EditProfile',
    component: EditProfile
  },
  {
    path: '/fight-date-history',
    name: 'FightDateHistory',
    component: FightDateHistory
  },
  {
    path: '/fight',
    name: 'Fight',
    component: Fight
  },
  {
    path: '/date',
    name: 'Date',
    component: Date
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
