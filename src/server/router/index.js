const express = require('express');
const auth = require('../controller/auth');
const book = require('../controller/book');

module.exports = (() => {
    const router = express.Router();

    router.get('/', auth.isAuthenticated, (req, res) => {
        res.render('index');
    });

    router.get('/login', (req, res) => {
        res.render('login');
    });

    router.post('/login', auth.login);
    router.post('/register', auth.register);
    router.get('/logout', auth.logout);

    router.post('/book/save', book.save);
    router.get('/book/:id', book.get);

    return router;
})();
