import Vue from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import Vuelidate from 'vuelidate'
import VueToastify from 'vue-toastify';


Vue.use(VueToastify, {
    theme: 'light',
    position: 'center-right'
  }
);
Vue.use(Vuelidate);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
