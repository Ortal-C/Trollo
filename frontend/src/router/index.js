import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import boardApp from '../views/board-app.vue'
import boardDetails from '../views/board-details.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/board',
    name: 'boardApp',
    component: boardApp
  },
  {
    path: '/board/:boardId',
    name: 'boardDetails',
    component: boardDetails
  },
]

const router = new VueRouter({
  routes
})

export default router