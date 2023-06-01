import { createRouter, createWebHistory } from 'vue-router'

import home from '@pages/home.vue'
import create from '@pages/create.vue'
import choose from '@pages/choose.vue'
import results from '@pages/results.vue'
import pageNotFound from '@pages/page-not-found.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/create',
            name: 'create',
            component: create
        },
        {
            path: '/choose',
            name: 'choose',
            component: choose
        },
        {
            path: '/results',
            name: 'results',
            component: results
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'page-not-found',
            component: pageNotFound
        }
    ]
})

export default router