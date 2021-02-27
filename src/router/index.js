import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/Homepage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/aboutUs',
    name: 'AboutUs',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/about-page/AboutUs.vue')
  },
  {
    path: '/aboutus/contacts',
    name: 'ContactUs',
    component: () => import(/* webpackChunkName: "contact" */ '../views/contacts-page/ContactUs.vue')
  },
  {
    path: '/aboutus/team',
    name: 'Team',
    component: () => import(/* webpackChunkName: "team" */ '../views/team-page/Team.vue')
  },
  {
    path: '/adventures',
    name: 'Adventures',
    component: () => import(/* webpackChunkName: "adventures" */ '../views/all-adventures-page/Adventures.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
