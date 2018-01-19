const express = require('express');
const auth = require('../controller/auth');
const book = require('../controller/book');
const userRoutes = require('./user');
const bookRoutes = require('./book');
const firebase = require('firebase');

module.exports = (() => {
    const router = express.Router();

    router.get('/', auth.isAuthenticated, (req, res) => {
        const currentUser = firebase.auth().currentUser;
        const isSocial = currentUser && currentUser.providerData.length > 0 && currentUser.providerData[0].providerId !== 'password';
        const user = {
            id: currentUser.uid,
            displayName: currentUser.displayName,
            email: currentUser.email
        }
        res.render('index', { data: { user, isSocial } });
    });

    router.use('/user', userRoutes);
    // router.use('/book', bookRoutes);

    return router;
})();
