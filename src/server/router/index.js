const express = require('express');
const auth = require('../controller/auth');

module.exports = (() => {
    const router = express.Router();

    router.get('/', auth.isAuthenticated, (req, res) => {
        res.render('index');
    });

    router.get('/login', (req, res) => {
        res.render('login');
    });

    router.post('/login', auth.login);
    router.get('/logout', auth.logout);
    router.post('/register', auth.register);

    return router;
})();
