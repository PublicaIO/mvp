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
        <p>${faq.question}</p>
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
        type: req.body.type
    }

    firebaseAdminApp.database().ref().child('faq').push(faq)
    .then(() => {
        sendEmail(faq, (error, message) => {
            if (error) {
                res.error('EMAIL_SEND', error.message);
            } else {
                res.success();
            }
        });
    })
    .catch((error) => res.error(error.code, error.message));
}

const get = (req, res) => {
    let ref = firebaseAdminApp.database().ref('/faq');

    ref = ref.orderByChild('type').equalTo('public');
    ref = ref.orderByChild('answer').equalTo(true);

    ref.once('value')
    .then((faqs) => {
        for (let key in faqs) {
            // if (faq.answer) {

            // }
        }

        res.success({ faqs: faqs.val() })
    })
    .catch((error) => res.error(error.code, error.message))
}

module.exports = {
    save,
    get
}
