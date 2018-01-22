require('dotenv').config();
const path = require('path');
const debug = require('debug')('express:view');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const firebase = require('firebase');
const firebaseAdmin = require('firebase-admin');
const firebaseConfig = require('./config/firebase');
const firebaseAdminAccount = require(path.join(__dirname, '..', '..', 'config', 'firebase-admin.json'));

firebase.initializeApp(firebaseConfig);

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(firebaseAdminAccount),
    databaseURL: 'https://test-113fe.firebaseio.com'
});

const router = require('./router');
const responseMiddleware = require('./utils/response');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'app', 'views'));
app.set('trust proxy', 1);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(responseMiddleware);

app.use(cookieParser('thisismysecret'));
app.use(session({
    secret: 'thisismysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(router);

app.listen(3000, () => console.log('Listening on 3000'));
