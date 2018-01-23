require('dotenv').config();
const path = require('path');
const debug = require('debug')('express:view');
const firebase = require('firebase');
const firebaseConfig = require('./config/firebase');
firebase.initializeApp(firebaseConfig); 
const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const responseMiddleware = require('./utils/response');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'app', 'views'));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(responseMiddleware);

app.use(router);

app.listen(3000, () => console.log('Listening on 3000'));
