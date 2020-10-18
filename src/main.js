import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store';
import { makeServer } from './server';

Vue.config.productionTip = false

// TODO: Retirar API para mockar em desenvolvimento quando tiver API oficial
makeServer()

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
