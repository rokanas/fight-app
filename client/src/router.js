import { createRouter, createWebHistory } from 'vue-router'
import LogSign from './views/LogSign.vue'
import Profile from './views/Profile.vue'
import EditProfile from './views/EditProfile.vue'
import ChallengeToFight from './views/ChallengeToFight.vue'
import AskOnDate from './views/AskOnDate.vue'

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
    path: '/challenge-to-fight',
    name: 'ChallengeToFight',
    component: ChallengeToFight
  },
  {
    path: '/ask-on-date',
    name: 'AskOnDate',
    component: AskOnDate
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
