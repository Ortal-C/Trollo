import Vue from 'vue'
import app from './app.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'
import './assets/styles/main.scss'
import ElementUI from 'element-ui';
import VueDragscroll from 'vue-dragscroll'
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale'
import en from 'element-ui/lib/locale/lang/en'

Vue.config.productionTip = false
Vue.use(VueDragscroll)
Vue.use(ElementUI);
locale.use(en)

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')