require('dotenv').config();
const debug = require('debug')('express:view');
const express = require('express');
const app = express();
const path = require('path');
const firebase = require('firebase');
const config = require('./firebase.js');

firebase.initializeApp(config);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'app', 'views'));

app.use(express.static('public'));

app.get('/', (req, res) => {
    const user = firebase.auth().currentUser;
    debug(user);
    res.render('index');
});

app.post('/login', (req, res) => {

});

app.post('/logout', (req, res) => {
    
});

app.listen(3000, () => console.log('Listening on 3000'));
