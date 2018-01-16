const firebase = require('firebase');
const userSchema = require('../schema/user');
const database = firebase.database();

const isAuthenticated = (req, res, next) => {
    const user = firebase.auth().currentUser;

    if (user !== null) {
        req.user = user;
        next();
    } else {
        res.redirect('/user/login');
    }
}

const loginPage = (req, res) => {
    res.render('login');
};

const loginRequest = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then((resp) => res.success(resp.providerData))
    .catch((error) => res.error(error.code, error.message));
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

    // Perform additional user data validation before creating db record.
    if (!userSchema.validate(user)) {
        return res.error('DATA_VALIDATION', 'Validation errors');
    }

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
    register
}
