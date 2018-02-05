import UserDashboard from 'components/pages/user/dashboard';
import UserLogin from 'components/pages/login';
import UserFAQ from 'components/pages/user/faq';
import UserPasswordReset from 'components/pages/user/passwordReset'

import BookCreate from 'components/pages/book/create';
import BookProfileBuilder from 'components/pages/book/profileBuilder';

export default [
    {
        path: '/user/dashboard',
        component: UserDashboard,
        alias: '/'
    },
    {
        path: '/user/submit-question',
        component: UserDashboard
    },
    {
        path: '/user/faq',
        component: UserFAQ
    },
    {
        path: '/user/login',
        component: UserLogin
    },
    {
        path: '/user/password-reset',
        component: UserPasswordReset
    },
    {
        path: '*',
        component: UserDashboard
    }
];
