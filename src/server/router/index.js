const express = require('express');
const auth = require('../controller/auth');
const book = require('../controller/book');
const userRoutes = require('./user');
const faqRoutes = require('./faq');
const bookRoutes = require('./book');
const firebase = require('firebase');

module.exports = (() => {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.render('index');
    });

    router.use('/user', userRoutes);
    router.use('/faq', faqRoutes);
    // router.use('/book', bookRoutes);

    return router;
})();
