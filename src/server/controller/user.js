const firebase = require('firebase');
const errorHandler = require('../utils/errorHandler');
const database = firebase.database();

const getBooks = (req, res) => {
    const currentUser = firebase.auth().currentUser ? firebase.auth().currentUser.uid : false;
    const books = [];

    if (currentUser) {
        database.ref(`/books/`)
        .once('value')
        .then((booksSnapshot) => {
            booksSnapshot.forEach((book, bookID) => {
                if (book.val().user == currentUser) {
                    books.push(Object.assign({ id: book.key }, book.val()));
                }
            });

            res.json({
                error: false,
                body: books
            });
            
        })
        .catch((error) => {
            res.status(500).json({
                error: true,
                code: error.code,
                message: error.message
            });
        });
    } else {
        res.status(500).json({
            error: true,
            code: 'BACK_TO_LOGIN'
        });
    }
};

const getProfile = (req, res) => {
    const user = firebase.auth().currentUser;

    if (user) {
        res.json(user);
    } else {
        res.status(500).json({
            error: true,
            code: 'BACK_TO_LOGIN'
        });
    }
}

const saveProfile = (req, res) => {
    const currentUser = firebase.auth().currentUser;
    const userData = req.body;

    currentUser.updateProfile(userData).then((resp) => {
        res.json({
            error: false
        });
    }).catch(errorHandler);
}

module.exports = {
    getBooks,
    getProfile,
    saveProfile
}