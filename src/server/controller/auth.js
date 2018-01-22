const path = require('path');
const firebase = require('firebase');
const firebaseAdmin = require('firebase-admin');
const auth = require('../controller/auth');
const userSchema = require('../schema/user');
const database = firebase.database();
const emailExistence = require('email-existence');

const isAuthenticated = (req, res, next) => {
    const token = req.body.token;
    firebaseAdmin.auth().verifyIdToken(token)
    .then((decodedToken) => {
        if (decodedToken.uid !== null) {
            next();
        } else {
            res.redirect('/user/login');
        }
    })
    .catch(res.error);
}

const verifyToken = (req, res) => {
    const token = req.body.token;
    firebaseAdmin.auth().verifyIdToken(token)
    .then((decodedToken) => res.success(decodedToken))
    .catch(res.error);
}

const loginPage = (req, res) => res.render('login');

const loginRequest = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((resp) => res.success(resp.providerData))
        .catch((error) => res.error(error.code, error.message));
    })
    .catch(console.log);
};

const logout = (req, res) => {
    firebase.auth().signOut()
    .then((resp) => res.success())
    .catch((error) => res.error(error.code, error.message));
}

const register = (req, res) => {
    const user = {
        email: req.body.user_register.email,
        password: req.body.user_register.password,
        firstname: req.body.user_register.firstname,
        lastname: req.body.user_register.lastname
    }

    if (!userSchema.validate(user)) {
        return res.error('DATA_VALIDATION', 'Validation errors');
    }

    emailExistence.check(user.email, (err, emailExist) => {
        if (emailExist) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((resp) => {
                createProfile({
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname
                })
                .then(() => res.success())
                .catch((error) => res.error(error.code, error.message));
            })
            .catch((error) => res.error(error.code, error.message));
        } else {
            res.error('EMAIL_DONT_EXIST', 'This e-mail does not exist');
        }
    });
}

const createProfile = (userData) => {
    const database = firebase.database();
    
    return database.ref().child('users').push({
        email: userData.email,
        firstname: userData.firstname,
        lastname: userData.lastname
    });
}

module.exports = {
    isAuthenticated,
    loginPage,
    loginRequest,
    logout,
    register,
    verifyToken
}
