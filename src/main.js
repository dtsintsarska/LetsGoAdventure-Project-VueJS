import Vue from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import store from "./store"

import VueToastify from 'vue-toastify';


Vue.use(VueToastify, {
    theme: 'light',
    position: 'center-right'
  }
);


Vue.config.productionTip = false

new Vue({ 
  store,
  router,
  render: h => h(App),
  
}).$mount('#app')
