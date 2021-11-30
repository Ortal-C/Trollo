import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import boardList from '../views/board-list.vue'
import board from '../views/board.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/board',
    name: 'boardList',
    component: boardList
  },
  {
    path: '/board/boardId',
    name: 'boardApp',
    component: board
  },
]

const router = new VueRouter({
  routes
})

export default router
