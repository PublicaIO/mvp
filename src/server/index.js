require('dotenv').config();
const path = require('path');
const debug = require('debug')('express:view');
const express = require('express');
const router = require('./router');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'app', 'views'));

app.use(express.static('public'));

app.get('/', router);

app.listen(3000, () => console.log('Listening on 3000'));
