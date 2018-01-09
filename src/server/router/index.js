const express = require('express');
const auth = require('../controller/auth');
const book = require('../controller/book');
const userRoutes = require('./user');
const bookRoutes = require('./book');
const firebase = require('firebase');

module.exports = (() => {
    const router = express.Router();

    router.get('/', auth.isAuthenticated, (req, res) => {
        res.render('index', {
            user: firebase.auth().currentUser.uid
        });
    });

    router.use('/user', userRoutes);
    router.use('/book', bookRoutes);

    return router;
})();
