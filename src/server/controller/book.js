const firebase = require('firebase');
const database = firebase.database();

const save = (req, res) => {
    const newBookKey = database.ref().child('books').push().key;
    const updates = {};
    updates[`/books/${newBookKey}`] = req.body;

    database.ref().update(updates).then((resp) => {
        res.json({
            error: false,
            book: newBookKey
        });
    }).catch((error) => {
        res.json({
            error: true,
            code: error.code,
            message: error.message
        });
    });
}

const get = (req, res) => {
    const bookID = req.params.id;

    database.ref(`/books/${bookID}`)
    .once('value')
    .then((book) => {
        res.json({
            error: false,
            body: Object.assign({ id: book.key }, book.val())
        });
    }).catch((error) => {
        res.json({
            error: true,
            code: error.code,
            message: error.message
        })
    });
}

module.exports = {
    save,
    get
}
