import Vue from 'vue';
import VueRouter from 'vue-router';

// import HeaderMenu from '@/components/header_menu/HeaderMenu';
import Inicio from '@/pages/Inicio';
import Duvidas from '@/pages/Duvidas';
import Entrar from '@/pages/Entrar';
import Contato from '@/pages/Contato';

Vue.use(VueRouter)

const routes = [
    {
        name: 'inicio',
        path: '/inicio',
        component: Inicio,
    },

    {
        name: 'duvidas',
        path: '/duvidas',
        component: Duvidas,
    },

    {
        name: 'entrar',
        path: '/entrar',
        component: Entrar,
    },

    {
        name: 'contato',
        path: '/contato',
        component: Contato,
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;