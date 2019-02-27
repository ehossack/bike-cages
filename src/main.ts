import BootstrapVue from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import VeeValidate from 'vee-validate';
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VeeValidate);
new Vue({
  render: createElement => createElement(App)
}).$mount('#app');
