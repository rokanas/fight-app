import { createRouter, createWebHistory } from 'vue-router'
import LogSign from './views/LogSign.vue'
import Profile from './views/Profile.vue'
import EditProfile from './views/EditProfile.vue'
import Opponent from './views/Opponent.vue'
import FightDateHistory from './views/FightDateHistory.vue'
import Fight from './views/Fight.vue'
import Date from './views/Date.vue'
import ChallengeFight from './views/CreateFight.vue'
import AskDate from './views/CreateDate.vue'

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
    path: '/opponent/:id/challenge-fight',
    name: 'ChallengeFight',
    component: ChallengeFight
  },
  {
    path: '/opponent/:id/ask-date',
    name: 'AskDate',
    component: AskDate
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
