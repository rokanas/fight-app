import { createRouter, createWebHistory } from 'vue-router'
import LogSign from './views/LogSign.vue'
import Profile from './views/Profile.vue'
import EditProfile from './views/EditProfile.vue'
import Opponent from './views/Opponent.vue'
import FightDateHistory from './views/FightDateHistory.vue'
import Fight from './views/Fight.vue'
import Date from './views/Date.vue'
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
    path: '/opponent/:id',
    name: 'Opponent',
    component: Opponent
  },
  {
    path: '/fight-date-history/:id',
    name: 'FightDateHistory',
    component: FightDateHistory
  },
  {
    path: '/fight/:id',
    name: 'Fight',
    component: Fight
  },
  {
    path: '/date/:id',
    name: 'Date',
    component: Date
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
