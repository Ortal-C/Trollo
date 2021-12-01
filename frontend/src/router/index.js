import Vue from 'vue'
import VueRouter from 'vue-router'
import homePage from '../views/home-page.vue'
import boardApp from '../views/board-app.vue'
import boardDetails from '../views/board-details.vue'
import cardDetails from '../views/card-details.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homePage',
    component: homePage
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
  {
    path: '/board/:boardId/:groupId/:cardId',
    name: 'cardDetails',
    component: cardDetails
  },
]

const router = new VueRouter({
  routes
})

export default router