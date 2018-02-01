const request = require('request');
const path = require('path');
const firebaseAdmin = require('firebase-admin');

const configPath = path.join(__dirname, '..', '..', 'config');
const firebaseAdminAccount = require(path.join(configPath, 'firebase-admin.json'));
const firebaseConfig = require(path.join(configPath, 'firebase'));

const firebaseAdminApp = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(firebaseAdminAccount),
    databaseURL: firebaseConfig.databaseURL
}, 'PODCAST-APP');

const getMP3 = (req, res) => {
    if (!req.query.id) {
        res.error('FILE_NOT_FOUND', 'Podcast not found');
        return;
    }

    firebaseAdminApp.database().ref(`/podcasts/${req.query.id}`).once('value')
        .then((snapshot) => {
            const podcast = snapshot.val();

            res.setHeader('Content-type', 'audio/mpeg');
            res.setHeader('content-disposition', `attachment; filename="${podcast.title}.mp3"`);

            request(podcast.url).pipe(res);
        })
        .catch(() => {
            res.error('FILE_NOT_FOUND', 'Podcast not found');
        });
}

module.exports = {
    getMP3
}
