const firebase = require('firebase');
const database = firebase.database();

const getBooks = (req, res) => {
    const currentUser = firebase.auth().currentUser.uid;
    const books = [];

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
        
    }).catch((error) => {
        res.json({
            error: true,
            code: error.code,
            message: error.message
        });
    });
};

module.exports = {
    getBooks
}