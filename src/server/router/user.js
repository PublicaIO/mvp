const express = require('express');
const auth = require('../controller/auth');
const user = require('../controller/user');

module.exports = (() => {
    const router = express.Router();

    router.get('/login', auth.loginPage);
    router.post('/login', auth.loginRequest);
    router.post('/register', auth.register);
    router.get('/logout', auth.logout);
    router.post('/loginsocial', auth.loginSocial);

    // router.get('/books', user.getBooks);
    // router.get('/profile', user.getProfile);
    // router.post('/profile/save', user.saveProfile);

    return router;
})();
