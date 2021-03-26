import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/Homepage.vue'
import Adventure from '../views/adventure-details-page/Adventure.vue';
import getCookie from '../helpers/cookie'


Vue.use(VueRouter)

function getAuth() {
  const token = getCookie("x-auth-token");
  if (token) {
    return true
  }
  return false
}

const routes = [{
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
    component: () => import( /* webpackChunkName: "about" */ '../views/about-page/AboutUs.vue')
  },
  {
    path: '/aboutus/contacts',
    name: 'ContactUs',
    component: () => import( /* webpackChunkName: "contact" */ '../views/contacts-page/ContactUs.vue')
  },
  {
    path: '/aboutus/team',
    name: 'Team',
    component: () => import( /* webpackChunkName: "team" */ '../views/team-page/Team.vue')
  },
  {
    path: '/adventures',
    name: 'Adventures',
    component: () => import( /* webpackChunkName: "adventures" */ '../views/all-adventures-page/Adventures.vue')
  },

  {
    path: '/adventures/search/:category',
    name: 'SearchByCategory',
    component: () => import( /* webpackChunkName: "adventuresbycategory" */ '../views/category-search-page/SearchByCategory.vue')
  },
  {
    path: '/adventures/search/name/:regex',
    name: 'SearchByInput',
    component: () => import( /* webpackChunkName: "adventuresbyinput" */ '../views/input-search-page/SearchByInput.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import( /* webpackChunkName: "register" */ '../views/register-page/Register.vue'),
    beforeEnter: (from, to, next) => {
      if (getAuth()) {
        next('/')
      } else {
        next()
      }
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "login" */ '../views/login-page/Login.vue'),
    beforeEnter: (from, to, next) => {
      if (getAuth()) {
        next('/')
      } else {
        next()
      }
    },

  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: () => import( /* webpackChunkName: "profile" */ '../views/profile-page/ProfileUser.vue'),
    beforeEnter: (from, to, next) => {
      if (getAuth()) {
       next()
      } else {
         next('/')
      }
    },
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import( /* webpackChunkName: "logout" */ '../views/logout-page/Logout.vue')
  },
  {
    path: '/adventures/create-new',
    name: 'Create',
    component: () => import( /* webpackChunkName: "create" */ '../views/create-adventure-page/CreateAdventure.vue')
  },
  {
    path: '/adventures/enroll/:id',
    name: 'Enroll',
    component: () => import( /* webpackChunkName: "enroll */ '../views/enroll-adventure/EnrollPage.vue'),
    beforeEnter: (from, to, next) => {
      if (getAuth()) {
        next()
      } else {
        next('/login')
      }
    },
  },
  {
    path: '/adventures/:id',
    name: 'Adventure',
    component: Adventure
  },

  {
    path: '*',
    name: '404',
    component: () => import( /* webpackChunkName: "404" */ '../views/404/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router