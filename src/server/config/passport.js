const passport = {
    goodreads: {
        consumerKey: process.env.GOODREADS_KEY,
        consumerSecret: process.env.GOODREADS_SECRET,
        callbackURL: process.env.GOODREADS_CALLBACK
    },

    linkedin: {
        clientID: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
        callbackURL: process.env.LINKEDIN_CALLBACK,
        scope: ['r_emailaddress', 'r_basicprofile'],
        state: true,
        passReqToCallback: true
    },

    facebook: {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK
    }
}

module.exports = passport;