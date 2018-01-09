import Dashboard from 'components/pages/dashboard';
import BookCreate from 'components/pages/book/create';
import BookProfileBuilder from 'components/pages/book/profileBuilder';

export default [
    {
        path: '/user/dashboard',
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
