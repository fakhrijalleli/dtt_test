import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/views/Home";
import Detail from "@/views/Detail";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,

        }, {
            path: '/home',
            name: 'home',
            component: Home,

        },
        {
            path: '/home',
            name: 'home',
            component: Home,

        },
        {
            path: '/detail',
            name: 'Detail',
            component: Detail
        },
        {
            path: '/random',
            name: 'Random',
            component: Detail

        },
    ]
})
