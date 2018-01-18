const express = require('express');
const book = require('../controller/book');
const auth = require('../controller/auth');

module.exports = (() => {
    const router = express.Router();

    // router.post('/save', auth.isAuthenticated, book.save);
    // router.get('/:id', book.get);

    return router;
})();
