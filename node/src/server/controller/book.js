const firebase = require('firebase');
const database = firebase.database();

const save = (req, res) => {
    const bookKey = database.ref().child('books').push().key;
    const updates = {};
    updates[`/books/${bookKey}`] = req.body;

    database.ref().update(updates)
    .then((resp) => res.success({ bookKey }))
    .catch((error) => res.error(error.code, error.message));
}

const get = (req, res) => {
    const bookID = req.params.id;

    database.ref(`/books/${bookID}`)
    .once('value')
    .then((book) => res.success({ book: Object.assign({ id: book.key }, book.val()) }))
    .catch((error) => res.error(error.code, error.message));
}

module.exports = {
    save,
    get
}
