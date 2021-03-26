import Vue from 'vue';
import Vuex from 'vuex';
import adminList from '../helpers/admin';
import getCookie from '../helpers/cookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    isAdmin: false,
    loggedIn: false,
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getIsAdmin(state) {
      return state.isAdmin;
    },
    isLoggedIn(state) {
      return state.loggedIn
    }
  },
  mutations: {
    logIn(state, userInfo) {
      if (adminList.includes(userInfo.id.toString())) {
        state.isAdmin = true;
      }
      state.user = {...userInfo, loggedIn: true};
      state.loggedIn = true;
      localStorage.setItem('user', 'logged')
     
    },
    logOut(state) {
      document.cookie =
        'x-auth-token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
      state.user = null;
      state.isAdmin = false;
      state.loggedIn = false;
      localStorage.clear()
    },
  },
  actions: {
    async verifyUser(context) {
      const token = getCookie('x-auth-token');
      const storage = localStorage.getItem('user')

      if (storage != 'logged') {
        context.commit('logOut');
        return;
      }
      
     fetch('http://localhost:9999/api/user/verify', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
        .then((promise) => {
          return promise.json();
        })
        .then((response) => {
          if (response.status) {
            context.commit('logIn', {
              username: response.user.username,
              id: response.user._id,
            }) 
          } else {
            context.commit('logOut')
          }
        });
    },
  },
});
