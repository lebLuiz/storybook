import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const routes = [
    {
        name: 'inicio',
        path: '/inicio',
    },

    {
        name: 'duvidas',
        path: '/duvidas',
    },

    {
        name: 'entrar',
        path: '/entrar',
    },

    {
        name: 'contato',
        path: '/contato',
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;