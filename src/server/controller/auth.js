const firebase = require('firebase');
const errorHandler = require('../utils/errorHandler');
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
    .then((resp) => {
        res.json({
            error: false,
            body: resp.providerData
        });
    })
    .catch((error) => {
        res.status(500).json(errorHandler);
    });
};

const logout = (req, res) => {
    firebase.auth().signOut()
    .then((resp) => {
        res.json({
            error: false
        });
    })
    .catch((error) => {
        res.status(500).json(errorHandler);
    });
}

const register = (req, res) => {
    const user = {
        email: req.body.user_register.email,
        password: req.body.user_register.password,
        firstname: req.body.user_register.firstname,
        lastname: req.body.user_register.lastname,
        displayname: `${req.body.user_register.firstname} ${req.body.user_register.lastname}`
    }

    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then((resp) => {
        updateProfile({
            displayName: user.displayname,
            firstname: user.firstname,
            lastname: user.lastname
        })
        .then(() => {
            res.json({
                error: false
            });
        })
        .catch((error) => {
            res.status(500).json(errorHandler);
        });
    })
    .catch((error) => {
        res.status(500).json(errorHandler);
    });
}

const updateProfile = (userData) => {
    const user = firebase.auth().currentUser;
    return user.updateProfile(userData);
}

module.exports = {
    isAuthenticated,
    loginPage,
    loginRequest,
    logout,
    register
}
