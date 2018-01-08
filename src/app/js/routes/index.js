import Dashboard from 'components/pages/dashboard';
import BookCreate from 'components/pages/bookCreate';
import BookProfileBuilder from 'components/pages/bookProfileBuilder';

export default [
    {
        path: '/dashboard',
        component: Dashboard,
        alias: '/'
    },
    {
        path: '/book/create',
        component: BookCreate
    },
    {
        path: '/book/:id/build/',
        component: BookProfileBuilder
    }
];
