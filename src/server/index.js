require('dotenv').config();
const path = require('path');
const debug = require('debug')('express:view');
const firebase = require('firebase');
const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const app = express();
const firebaseConfig = require('./config/firebase');
firebase.initializeApp(firebaseConfig); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'app', 'views'));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(3000, () => console.log('Listening on 3000'));
