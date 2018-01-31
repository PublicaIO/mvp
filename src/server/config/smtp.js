const config = {
    server: {
        user: process.env.SMTP_USERNAME,
        password: process.env.SMTP_PASSWORD,
        host: process.env.SMTP_HOST,
        ssl: true
    },

    faq: {
        sender: process.env.SMTP_FAQEMAIL_SENDER,
        receiver: process.env.SMTP_FAQEMAIL_RECEIVER
    }
}

module.exports = config;