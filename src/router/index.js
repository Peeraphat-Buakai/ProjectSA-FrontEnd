import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import home from '@/views/home'
import register from '@/views/register'
import additem from '@/components/additem'
import claim from '@/components/claim'
import statusAdmin from '@/components/statusAdmin'
import statusUser from '@/components/statusUser'
import delay from '@/components/delay'
import delay1 from '@/components/delay1'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: login
  },
  {
    path: '/delay',
    name: 'Delay',
    component: delay
  },
  {
    path: '/delay1',
    name: 'Delay1',
    component: delay1
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/',
    name: 'home',
    component: home,
    children: [
      { path: '/', component: claim },
      { path: '/statusUser', component: statusUser },
      { path: '/statusAdmin', component: statusAdmin },
      { path: '/additem', component: additem }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
