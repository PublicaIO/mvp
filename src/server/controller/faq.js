const path = require('path');
const firebaseAdmin = require('firebase-admin');
const firebaseAdminAccount = require(path.join(__dirname, '..', '..', '..', 'config', 'firebase-admin.json'));
const email = require('emailjs');
const smtpConfig = require(path.join(__dirname, '..', 'config', 'smtp'));

const firebaseAdminApp = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(firebaseAdminAccount),
    databaseURL: 'https://test-113fe.firebaseio.com'
}, 'FAQ-APP');

const sendEmail = (faq, callback) => {
    const server = email.server.connect(smtpConfig.server);

    const emailContent = `
        <p>New ${faq.type} question has been asked by ${faq.email}:</p>
        <p style="font-style: italic">"${faq.question}"</p>
    `;

    const data = {
        text: emailContent,
        from: smtpConfig.faq.sender,
        to: smtpConfig.faq.receiver,
        subject: `New ${faq.type} question has been asked!`,
        attachment: [
            { data: emailContent, alternative: true }
        ]
    }

    server.send(data, callback);
}

const save = (req, res) => {
    const faq = {
        email: req.body.email,
        question: req.body.question,
        type: req.body.type,
        answer: '',
        published: false
    }

    firebaseAdminApp.database().ref().child('faq').push(faq)
    .then(() => {
        sendEmail(faq, (error, message) => {
            if (error) {
                console.error('EMAIL_SEND', error.message);
            }
        });

        // Send success response disregarding of email status.
        res.success();
    })
    .catch((error) => res.error(error.code, error.message));
}

const get = (req, res) => {
    firebaseAdminApp.database().ref('/faq')
        .orderByChild('type')
        .equalTo('public')
        .once('value')
    .then((snapshot) => {
        const faqs = {};
        snapshot = snapshot.val();

        for (let key in snapshot) {
            if (snapshot[key].published) {
                faqs[key] = snapshot[key];
            }
        }

        res.success({ faqs })
    })
    .catch((error) => res.error(error.code, error.message))
}

module.exports = {
    save,
    get
}
