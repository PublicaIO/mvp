const express = require('express');
const userRoutes = require('./user');
const faqRoutes = require('./faq');
const podcastRoutes = require('./podcast');
const firebase = require('firebase');

module.exports = (() => {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.render('index');
    });

    router.use('/user', userRoutes);
    router.use('/faq', faqRoutes);
    router.use('/podcast', podcastRoutes);

    return router;
})();
