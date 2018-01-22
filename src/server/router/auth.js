const express = require('express');
const auth = require('../controller/auth');
const firebase = require('firebase');
const firebaseAdmin = require('firebase-admin');
const passport = require('passport');
const passportConfig = require('../config/passport');
const GoodreadsStrategy = require('passport-goodreads');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook');

const socialCallback = (token, tokenSecret, profile, done) => {
    process.nextTick(() => socialLogin(profile, done));
}

const socialCallback2 = (req, accessToken, refreshToken, profile, done) => {
    process.nextTick(() => socialLogin(profile, done));
}

const updateProfile = (profile, done) => {
    const database = firebase.database();
    const user = firebase.auth().currentUser;
    let displayName;

    console.log(profile);

    if (profile.provider === 'linkedin') {
        displayName = `${profile.name.givenName} ${profile.name.familyName}`;
    } else {
        displayName = profile.displayName;
    }

    console.log(displayName);

    user.updateProfile({ displayName })
    .then(() => done(null, profile))
    .catch((error) => done(error, null));
}

const socialLogin = (profile, done) => {
    firebaseAdmin.auth().createCustomToken(profile.id)
    .then((customToken) => done(null, customToken))
    .catch((error) => done(error, null));
}

passport.use(new GoodreadsStrategy(passportConfig.goodreads, socialCallback));
passport.use(new LinkedInStrategy(passportConfig.linkedin, socialCallback));
passport.use(new FacebookStrategy(passportConfig.facebook, socialCallback))

module.exports = (() => {
    const router = express.Router();

    router.get('/facebook', passport.authenticate('facebook'), () => {});
    router.get('/facebook/callback', passport.authenticate('facebook'), (req, res) => {
        res.redirect(`/#/?token=${req.user}`);
    });

    router.get('/linkedin', passport.authenticate('linkedin'), () => {});
    router.get('/linkedin/callback', passport.authenticate('linkedin') , (req, res) => {
        res.redirect(`/#/?token=${req.user}`);
    });

    router.get('/goodreads', passport.authenticate('goodreads'), () => {});
    router.get('/goodreads/callback', passport.authenticate('goodreads'), (req, res) => {
        res.redirect(`/#/?token=${req.user}`);
    });

    return router;
})();
