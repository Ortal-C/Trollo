import Vue from 'vue'
import VueRouter from 'vue-router'
import homePage from '../views/home-page.vue'
import boardApp from '../views/board-app.vue'
import boardDetails from '../views/board-details.vue'
import cardDetails from '../views/card-details.vue'
import loginPage from '../views/login-page.vue'
import signUpPage from '../views/sign-up-page.vue'
import dashboard from '../views/dashboard.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'homePage',
        component: homePage
    },
    {
        path: '/login',
        name: 'loginPage',
        component: loginPage
    },
    {
        path: '/signup',
        name: 'signUpPage',
        component: signUpPage
    },
    {
        path: '/board',
        name: 'boardApp',
        component: boardApp
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: dashboard
    },
    {
        path: '/board/:boardId',
        name: 'boardDetails',
        component: boardDetails,
        children: [{
            path: '/board/:boardId/:groupId/:cardId',
            name: 'cardDetails',
            component: cardDetails
        }, ]
    },
]

const router = new VueRouter({
    routes
})

export default router