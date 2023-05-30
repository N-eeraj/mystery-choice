import { createRouter, createWebHistory } from 'vue-router'

import home from '@pages/home.vue'
import create from '@pages/create.vue'
import choose from '@pages/choose.vue'

console.log(process.env.NODE_ENV)

const router = createRouter({
    history: createWebHistory(),
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
        }
    ]
})

export default router