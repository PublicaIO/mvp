import Login from 'components/pages/login';
import Dashboard from 'components/pages/dashboard';

export default [
    {
        path: '/dashboard',
        component: Dashboard,
        alias: '/',
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        component: Login,
    }
];
