import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/pages/Home';
import Inicio from '@/pages/Inicio';
import Duvidas from '@/pages/Duvidas';
import Entrar from '@/pages/Entrar';
import EsqueciSenha from '@/pages/EsqueciSenha';
import Register from '@/pages/register/Register';
import Contato from '@/pages/Contato';

Vue.use(VueRouter)

const routes = [
    {
        name: 'home',
        path: '/home',
        component: Home,
    },
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
        name: 'forgotPassword',
        path: '/forgot_password',
        component: EsqueciSenha,
    },
    {
        name: 'register',
        path: '/register',
        component: Register,
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