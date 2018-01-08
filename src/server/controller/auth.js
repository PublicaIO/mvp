const firebase = require('firebase');

const isAuthenticated = (req, res, next) => {
    const user = firebase.auth().currentUser;

    if (user !== null) {
        req.user = user;
        next();
    } else {
        res.redirect('/login');
    }
}

const login = (req, res) => {
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
    }).catch((error) => {
        res.status(500).json({
            error: true,
            code: error.code,
            message: error.message
        });
    });
};

const logout = (req, res) => {
    firebase.auth().signOut()
    .then((resp) => {
        res.json({
            error: false
        });
    }).catch((error) => {
        res.status(500).json({
            error: true,
            code: error.code,
            message: error.message
        });
    });
}

const register = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then((resp) => {
        res.json({
            error: false
        });
    }).catch((error) => {
        res.status(500).json({
            error: true,
            code: error.code,
            message: error.message
        });
    });
}

module.exports = {
    isAuthenticated,
    login,
    logout,
    register
}
