const express = require('express');
const podcast = require('../controller/podcast');
const auth = require('../controller/auth');

module.exports = (() => {
    const router = express.Router();

    router.get('/getMP3', podcast.getMP3);

    return router;
})();
