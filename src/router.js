import Vue from 'vue'
import Router from 'vue-router'

import Calendar from '@/views/Calendar'
import Profile from '@/views/Profile'
import Wishes from '@/views/Wishes'
import Inventory from '@/views/Inventory'
import Create from '@/views/Create'
import CreateSchedule from '@/components/CreateSchedule'
import CreateMemorial from '@/components/CreateMemorial'
import CreateWishes from '@/components/CreateWishes'
import CreateInventory from '@/components/CreateInventory'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/calendar' },

    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/wishes',
      name: 'wishes',
      component: Wishes,
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: Inventory,
    },
    {
      path: '/create',
      name: 'create',
      component: Create,
      children: [
        { path: 'schedule', name: 'createSchedule', component: CreateSchedule },
        { path: 'memorial', name: 'createMemorial', component: CreateMemorial },
        { path: 'wishes', name: 'createWishes', component: CreateWishes },
        { path: 'inventory', name: 'createInventory', component: CreateInventory },
      ],
    },
  ],
})
