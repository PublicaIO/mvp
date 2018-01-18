import UserDashboard from 'components/pages/user/dashboard';
import UserProfile from 'components/pages/user/profile';

import BookCreate from 'components/pages/book/create';
import BookProfileBuilder from 'components/pages/book/profileBuilder';

export default [
    {
        path: '/user/dashboard',
        component: UserDashboard,
        alias: '/'
    },
    // {
    //     path: '/user/profile',
    //     component: UserProfile
    // },
    // {
    //     path: '/book/create',
    //     component: BookCreate
    // },
    // {
    //     path: '/book/:id/build/',
    //     component: BookProfileBuilder
    // }
];
