const firebase = require('firebase');
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

            res.success({ books });
        })
        .catch((error) => res.error(error.code, error.message));
    } else {
        res.error('BACK_TO_LOGIN');
    }
};

const getProfile = (req, res) => {
    const user = firebase.auth().currentUser;

    if (user) {
        res.success({ user });
    } else {
        res.error('BACK_TO_LOGIN');
    }
}

const saveEmail = (req, res) => {
    const currentUser = firebase.auth().currentUser;
    const email = req.body.email;

    currentUser.updateEmail(email)
    .then(() => res.success())
    .catch((error) => res.error(error.code, error.message));
}

const saveProfile = (req, res) => {
    // @TODO: implement
    const currentUser = firebase.auth().currentUser;
    const userData = req.body;
}

module.exports = {
    getBooks,
    getProfile,
    saveProfile,
    saveEmail
}