import Vue from 'vue'
import app from './app.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'
import './assets/styles/main.scss'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale'
import en from 'element-ui/lib/locale/lang/en'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(ElementUI);
locale.use(en)

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')