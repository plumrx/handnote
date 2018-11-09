import Vue from 'vue'
import Router from 'vue-router'

import Calendar from '@/views/Calendar'
import Profile from '@/views/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'calendar',
      component: Calendar,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
  ],
})
