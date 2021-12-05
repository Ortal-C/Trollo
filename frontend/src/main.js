import Vue from 'vue'
import app from './app.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'
import './assets/styles/main.scss'
import ElementUI from 'element-ui';
import VueDragscroll from 'vue-dragscroll'
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueDragscroll)

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')