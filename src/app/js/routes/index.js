import UserDashboard from 'components/pages/user/dashboard';
import UserLogin from 'components/pages/login';

import BookCreate from 'components/pages/book/create';
import BookProfileBuilder from 'components/pages/book/profileBuilder';

export default [
    {
        path: '/user/dashboard',
        component: UserDashboard,
        alias: '/'
    },
    {
        path: '/user/login',
        component: UserLogin
    },
    {
        path: '*',
        component: UserDashboard
    }
];
