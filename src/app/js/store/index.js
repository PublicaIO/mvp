export default {
    state: {
        user: null,
        isSocial: false
    },

    mutations: {
        setUser(state, user) {
            state.user = user;
        },

        setSocial(state, isSocial) {
            state.isSocial = isSocial;
        },

        setUserEmail(state, email) {
            state.user.email = email;
        }
    }
};
