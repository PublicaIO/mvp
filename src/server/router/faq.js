const express = require('express');
const faq = require('../controller/faq');
const auth = require('../controller/auth');

module.exports = (() => {
    const router = express.Router();

    router.post('/save', auth.isAuthenticated, faq.save);
    router.get('/:id', faq.get);

    return router;
})();
