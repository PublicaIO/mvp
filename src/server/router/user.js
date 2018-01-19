const path = require('path');
const express = require('express');
const auth = require('../controller/auth');
const user = require('../controller/user');
const authRouter = require('./auth');

module.exports = (() => {
    const router = express.Router();

    router.get('/login', auth.loginPage);
    router.post('/login', auth.loginRequest);
    router.post('/register', auth.register);
    router.get('/logout', auth.logout);
    router.use('/auth', authRouter);
    router.post('/save-email', user.saveEmail);

    return router;
})();
